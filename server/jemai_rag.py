"""
JEMai RAG — local retrieval over JAM lesson files and knowledge docs.

Chunks lessons and markdown reference into sections. Scores by weighted
token overlap with domain boosts and intent classification.
No external AI API is used.
"""

import os
import re

_LESSONS_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'lessons')
)
_KNOWLEDGE_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), 'jemai_knowledge'
)

# Generic + JAM-domain weak words that don't discriminate sources
_STOPWORDS = {
    'a', 'an', 'the', 'is', 'it', 'in', 'on', 'at', 'to', 'for', 'of', 'and',
    'or', 'but', 'not', 'with', 'this', 'that', 'i', 'me', 'my', 'do', 'does',
    'did', 'how', 'what', 'why', 'can', 'be', 'as', 'are', 'was', 'were',
    'will', 'would', 'should', 'could', 'from', 'by', 'about', 'into', 'which',
    'you', 'your', 'we', 'they', 'its', 'if', 'so', 'up', 'out', 'no', 'all',
    'more', 'has', 'have', 'had', 'lesson', 'jam', 'work', 'works', 'make',
    'create', 'new', 'get', 'use', 'using', 'used', 'tell', 'show', 'want',
}

# Domain boosts: (query_trigger_terms, target_filename, boost_score)
# A chunk from target_filename gets the MAX applicable boost when query contains any trigger term.
_DOMAIN_BOOSTS = [
    ({'instrument', 'instruments'},                                                    'DSL_README.md', 10),
    ({'adsr', 'envelope', 'attack', 'decay', 'sustain', 'release'},                   'DSL_README.md', 8),
    ({'adsr', 'envelope', 'attack', 'decay', 'sustain', 'release'},                   'lesson07-envelope-shapes.js', 6),
    ({'bpm', 'tempo'},                                                                 'DSL_README.md', 6),
    ({'wave', 'waveform', 'sine', 'saw', 'square', 'triangle', 'oscillator', 'timbre'}, 'lesson03-wave-surfing.js', 8),
    ({'wave', 'waveform', 'sine', 'saw', 'square', 'triangle', 'oscillator'},         'DSL_README.md', 5),
    ({'loop', 'loops', 'looping', 'repeat', 'repeating', 'repeated'},                 'lesson06-loop-it.js', 10),
    ({'beat', 'beats', 'drum', 'drums', 'kick', 'snare', 'rhythm', 'pattern', 'patterns'}, 'lesson05-beat-drop.js', 10),
    ({'rest', 'pause', 'silence', 'timing'},                                           'lesson04-tick-tock.js', 8),
    ({'rest', 'pause', 'silence'},                                                     'DSL_README.md', 5),
    ({'sequence', 'sequences', 'play'},                                                'DSL_README.md', 6),
    ({'syntax', 'grammar', 'validation', 'error', 'errors', 'example', 'examples'},   'DSL_README.md', 10),
    ({'note', 'notes', 'pitch', 'octave', 'frequency'},                               'DSL_README.md', 5),
    ({'key', 'scale', 'major', 'minor', 'pentatonic', 'blues', 'dorian', 'phrygian'}, 'SYNTAX_GUIDE.md', 10),
    ({'chord', 'chords', 'triad', 'harmony'},                                          'SYNTAX_GUIDE.md', 9),
    ({'velocity', 'crescendo', 'decrescendo', 'dynamics', 'accent'},                  'SYNTAX_GUIDE.md', 9),
    ({'fade', 'fade_in', 'fade_out', 'swing', 'humanize', 'legato', 'polyphony'},     'SYNTAX_GUIDE.md', 9),
    ({'lfo', 'vibrato', 'tremolo', 'glide', 'portamento', 'pan', 'stereo'},           'SYNTAX_GUIDE.md', 9),
    ({'reverb', 'delay', 'echo', 'cutoff', 'resonance', 'filter', 'chorus', 'detune', 'voices'}, 'SYNTAX_GUIDE.md', 8),
    ({'pluck', 'handpan', 'bell', 'noise'},                                            'SYNTAX_GUIDE.md', 7),
    ({'compose', 'composing', 'song', 'songs', 'melody', 'bassline', 'structure', 'arrangement', 'mood', 'write'}, 'COMPOSING_SONGS.md', 9),
    ({'drum', 'drums', 'kick', 'snare', 'hat', 'beat', 'groove'},                     'COMPOSING_SONGS.md', 6),
]

# Terms that signal the user is asking about JAM syntax/reference (not lesson narrative)
_SYNTAX_TERMS = {
    'instrument', 'instruments', 'adsr', 'bpm', 'waveform', 'synth',
    'drum', 'validation', 'syntax', 'grammar', 'volume', 'freq', 'frequency',
    'oscillator', 'error', 'errors', 'example', 'examples',
    'octave', 'attack', 'decay', 'sustain', 'release', 'envelope',
    'key', 'scale', 'chord', 'chords', 'velocity', 'crescendo', 'decrescendo',
    'fade', 'swing', 'humanize', 'legato', 'polyphony', 'lfo', 'glide', 'pan',
    'reverb', 'delay', 'cutoff', 'resonance', 'chorus', 'detune', 'voices',
    'pluck', 'handpan', 'bell', 'time_signature',
}


# ---------------------------------------------------------------------------
# Intent classifier
# ---------------------------------------------------------------------------

def classify_intent(question):
    """Classify question into a retrieval intent. Keyword rules only, no LLM."""
    q = question.lower()
    tokens = set(re.findall(r'\b\w+\b', q))
    if any(p in q for p in ('translate', 'hard word', 'meaning of')):
        return 'translation'
    if 'hint' in tokens or 'stuck' in tokens:
        return 'hint'
    if tokens & {'error', 'wrong', 'broken', 'fix', 'debug', 'fail', 'failed', 'issue', 'problem'}:
        return 'code_debug'
    if tokens & _SYNTAX_TERMS:
        return 'syntax_reference'
    if any(p in q for p in ('explain', 'what is', 'how does', 'tell me about')):
        return 'lesson_concept'
    return 'general'


# ---------------------------------------------------------------------------
# Text utilities
# ---------------------------------------------------------------------------

def _normalize(token):
    """Strip trailing 's' from 5+ char tokens (basic plural normalization). Protect 'ss' endings."""
    if len(token) >= 5 and token.endswith('s') and not token.endswith('ss'):
        return token[:-1]
    return token


def _tokenize(text):
    tokens = re.findall(r'\b[a-z_]+\b', text.lower())
    return [_normalize(t) for t in tokens if t not in _STOPWORDS and len(t) > 2]


def _clean(text):
    """Strip noise, return lowercase for token matching."""
    text = text.replace('\\`', '')
    text = re.sub(r'```[\s\S]*?```', ' ', text)
    text = re.sub(r'`[^`]*`', ' ', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'[^\w\s_]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.lower().strip()


def _display(text):
    """Strip markup for human-readable display, preserving code content."""
    text = text.replace('\\`', '`')
    # Keep code block content; remove only fence markers and optional language tag
    text = re.sub(r'```[^\n]*\n([\s\S]*?)```', r'\1', text)
    text = re.sub(r'`([^`]*)`', r'\1', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'#+\s*', '', text)
    text = re.sub(r'\|[^\n]*', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


# ---------------------------------------------------------------------------
# JS lesson helpers
# ---------------------------------------------------------------------------

def _js_str(raw, key):
    m = re.search(r'\b' + re.escape(key) + r'\s*:\s*"([^"]*)"', raw)
    return m.group(1) if m else ''


def _js_int(raw, key):
    m = re.search(r'\b' + re.escape(key) + r'\s*:\s*(\d+)', raw)
    return int(m.group(1)) if m else None


def _js_concepts(raw):
    m = re.search(r'concepts\s*:\s*\[([^\]]+)\]', raw, re.DOTALL)
    if not m:
        return []
    return re.findall(r'"([^"]+)"', m.group(1))


def _js_array_block(raw, key):
    """Return the content between the outer brackets of a JS array by key."""
    m = re.search(r'\b' + re.escape(key) + r'\s*:\s*\[', raw)
    if not m:
        return ''
    start, depth, i = m.end(), 1, m.end()
    while i < len(raw) and depth > 0:
        if raw[i] == '[':
            depth += 1
        elif raw[i] == ']':
            depth -= 1
        i += 1
    return raw[start:i - 1]


def _js_steps(raw):
    steps_raw = _js_array_block(raw, 'steps')
    if not steps_raw:
        return []
    titles = re.findall(r'title\s*:\s*"([^"]+)"', steps_raw)
    contents = re.findall(r'content\s*:\s*`((?:[^`\\]|\\.)*)`', steps_raw, re.DOTALL)
    return [
        {'title': titles[j] if j < len(titles) else f'Step {j + 1}', 'content': c}
        for j, c in enumerate(contents)
    ]


def _js_challenges(raw):
    ch_raw = _js_array_block(raw, 'challenges')
    if not ch_raw:
        return []
    texts = re.findall(r'text\s*:\s*"([^"]+)"', ch_raw)
    hints = re.findall(r'hint\s*:\s*"([^"]+)"', ch_raw)
    return [{'text': t, 'hint': hints[j] if j < len(hints) else ''} for j, t in enumerate(texts)]


def _js_templates(raw, key):
    pattern = r'\b' + re.escape(key) + r'\s*:\s*`((?:[^`\\]|\\.)*)`'
    return re.findall(pattern, raw, re.DOTALL)


# ---------------------------------------------------------------------------
# Lesson chunk builder
# ---------------------------------------------------------------------------

def _build_lesson_chunks(fname, raw):
    lesson_id = _js_int(raw, 'id')
    title = _js_str(raw, 'title')
    subtitle = _js_str(raw, 'subtitle')
    goal = _js_str(raw, 'goal')
    concepts = _js_concepts(raw)
    steps = _js_steps(raw)
    code_texts = _js_templates(raw, 'code')
    challenges = _js_challenges(raw)
    fun_fact_m = re.search(r'funFact\s*:\s*"((?:[^"\\]|\\.)*)"', raw, re.DOTALL)
    fun_fact = fun_fact_m.group(1) if fun_fact_m else ''
    lid = str(lesson_id) if lesson_id else fname

    def _mk(sec_id, section_type, raw_text, snippet_text):
        return {
            'doc_title': title,
            'title': f"{title} / {sec_id}" if sec_id else title,
            'id': f"{lid}/{sec_id.lower().replace(' ', '_')}" if sec_id else lid,
            'file': fname,
            'lesson_id': lid,
            'source_type': 'lesson',
            'section_type': section_type,
            'goal': goal,
            'concepts': concepts,
            'snippet': snippet_text[:500],
            'clean_blob': _clean(raw_text),
            'blob_tokens': None,
        }

    chunks = []

    # Overview
    overview_raw = ' '.join([title, subtitle, goal, ' '.join(concepts), fun_fact])
    overview_display = title
    if goal:
        overview_display += f'\nGoal: {goal}'
    if concepts:
        overview_display += f'\nConcepts: {", ".join(concepts)}'
    ov = _mk('', 'lesson_overview', overview_raw, overview_display)
    ov['id'] = lid
    chunks.append(ov)

    # Steps
    for i, step in enumerate(steps):
        c = _mk(step['title'], f'lesson_step_{i}',
                step['title'] + ' ' + step['content'],
                _display(f"{step['title']}: {step['content']}"))
        c['id'] = f"{lid}/step/{i}"
        chunks.append(c)

    # Code
    if code_texts:
        c = _mk('Code Example', 'lesson_code',
                title + ' code ' + ' '.join(code_texts),
                code_texts[0].replace('\\`', '`')[:300])
        c['id'] = f"{lid}/code"
        chunks.append(c)

    # Challenges
    if challenges:
        ch_raw = ' '.join(c_['text'] + ' ' + c_['hint'] for c_ in challenges)
        ch_display = ' | '.join(c_['text'] for c_ in challenges)
        c = _mk('Challenges', 'lesson_challenges', ch_raw, ch_display)
        c['id'] = f"{lid}/challenges"
        chunks.append(c)

    return chunks


# ---------------------------------------------------------------------------
# Markdown chunk builder
# ---------------------------------------------------------------------------

def _build_md_chunks(fname, raw):
    stem = os.path.splitext(fname)[0]
    _DOC_TITLES = {
        'DSL_README': 'JAM Language Guide',
        'SYNTAX_GUIDE': 'JAM Syntax Guide',
        'COMPOSING_SONGS': 'Composing Songs in JAM',
    }
    doc_title = _DOC_TITLES.get(stem, stem.replace('_', ' ').title())

    parts = re.split(r'(?m)^(#{1,4}[^\n]+)\n', raw)
    chunks = []

    if parts[0].strip():
        intro = _display(parts[0])
        chunks.append({
            'doc_title': doc_title,
            'title': doc_title,
            'id': f"{stem}/intro",
            'file': fname,
            'source_type': 'reference',
            'section_type': 'reference_section',
            'snippet': intro[:500],
            'clean_blob': _clean(parts[0]),
            'blob_tokens': None,
        })

    i = 1
    while i + 1 < len(parts):
        heading_raw = parts[i]
        content_raw = parts[i + 1]
        heading_text = re.sub(r'^#+\s*', '', heading_raw).strip()
        section_slug = re.sub(r'\W+', '-', heading_text.lower()).strip('-')
        snippet = _display(content_raw)
        if not snippet.strip():
            snippet = heading_text
        chunks.append({
            'doc_title': doc_title,
            'title': f"{doc_title} / {heading_text}",
            'id': f"{stem}/{section_slug}",
            'file': fname,
            'source_type': 'reference',
            'section_type': 'reference_section',
            'snippet': snippet[:500],
            'clean_blob': _clean(heading_text + ' ' + content_raw),
            'blob_tokens': None,
        })
        i += 2

    return chunks


# ---------------------------------------------------------------------------
# Loader
# ---------------------------------------------------------------------------

def _load_all_chunks():
    chunks = []
    if os.path.isdir(_LESSONS_DIR):
        for fname in sorted(os.listdir(_LESSONS_DIR)):
            if not fname.endswith('.js') or fname == 'index.js':
                continue
            with open(os.path.join(_LESSONS_DIR, fname), 'r', encoding='utf-8') as f:
                raw = f.read()
            chunks.extend(_build_lesson_chunks(fname, raw))

    if os.path.isdir(_KNOWLEDGE_DIR):
        for fname in sorted(os.listdir(_KNOWLEDGE_DIR)):
            if not fname.endswith('.md'):
                continue
            with open(os.path.join(_KNOWLEDGE_DIR, fname), 'r', encoding='utf-8') as f:
                raw = f.read()
            chunks.extend(_build_md_chunks(fname, raw))

    for chunk in chunks:
        chunk['blob_tokens'] = set(_tokenize(chunk['clean_blob']))

    return chunks


# ---------------------------------------------------------------------------
# Scoring
# ---------------------------------------------------------------------------

def _domain_boost(chunk_file, q_tokens):
    max_boost = 0
    for terms, target_file, boost in _DOMAIN_BOOSTS:
        if chunk_file == target_file and q_tokens & terms:
            max_boost = max(max_boost, boost)
    return max_boost


def _score_chunk(chunk, q_tokens, intent, lesson_id):
    if not q_tokens:
        return 0
    overlap = len(q_tokens & chunk['blob_tokens'])
    title_tokens = set(_tokenize(chunk['title']))
    score = overlap + len(q_tokens & title_tokens) * 3
    score += _domain_boost(chunk['file'], q_tokens)
    if intent == 'syntax_reference' and chunk['source_type'] == 'reference':
        score += 2
    elif intent == 'lesson_concept' and chunk['source_type'] == 'lesson':
        score += 2
    elif intent == 'code_debug' and chunk['source_type'] == 'reference':
        score += 1
    if lesson_id is not None and chunk.get('lesson_id') == str(lesson_id):
        score += 5
    return score


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def jemai_retrieve(question, lesson_id=None, top_k=3):
    """
    Retrieve top_k relevant chunks for the question.
    Deduplicates by source file (best chunk per file).
    Returns list of result dicts compatible with jemai_chat_routes.
    """
    q_tokens = set(_tokenize(question))
    if not q_tokens:
        return []

    intent = classify_intent(question)
    chunks = _load_all_chunks()

    # Score and sort. Tie-break: prefer reference for syntax, lesson for concept, active lesson.
    def _sort_key(chunk):
        score = _score_chunk(chunk, q_tokens, intent, lesson_id)
        tiebreak = (
            (1 if chunk['source_type'] == 'reference' and intent == 'syntax_reference' else 0) +
            (1 if chunk['source_type'] == 'lesson' and intent == 'lesson_concept' else 0) +
            (1 if chunk.get('lesson_id') == str(lesson_id) else 0)
        )
        return (score, tiebreak)

    scored = sorted(chunks, key=_sort_key, reverse=True)

    seen_files = set()
    results = []
    for chunk in scored:
        score = _score_chunk(chunk, q_tokens, intent, lesson_id)
        if score <= 0:
            break
        if chunk['file'] not in seen_files:
            results.append({
                'doc_title': chunk['doc_title'],
                'title': chunk['doc_title'],
                'section': chunk['title'],
                'id': chunk['id'],
                'file': chunk['file'],
                'score': score,
                'source_type': chunk['source_type'],
                'section_type': chunk.get('section_type', ''),
                'snippet': chunk['snippet'],
                'goal': chunk.get('goal', ''),
                'concepts': chunk.get('concepts', []),
            })
            seen_files.add(chunk['file'])
        if len(results) >= top_k:
            break

    return results


def build_llm_context(results, max_chars=4000):
    """
    Build a clean text context block for a future LLM prompt.
    Not called yet — prepared for the next step when an LLM API is connected.

    Example output:
        [1] JAM Language Guide / Instruments
        source_type: reference
        file: DSL_README.md
        content:
        Define named instruments with INSTRUMENT name: ...

        [2] Loop It! / Why loops matter
        source_type: lesson
        file: lesson06-loop-it.js
        content:
        Every song you've ever heard is built from loops...
    """
    parts = []
    total = 0
    for i, result in enumerate(results, 1):
        section = result.get('section', result.get('title', ''))
        header = f"[{i}] {section}\nsource_type: {result['source_type']}\nfile: {result['file']}"
        snippet = result.get('snippet', '')
        block = f"{header}\ncontent:\n{snippet}"
        if total + len(block) > max_chars:
            break
        parts.append(block)
        total += len(block)
    return '\n\n'.join(parts)