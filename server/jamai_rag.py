"""
JAMai RAG — local retrieval over JAM lesson files.

Reads all lesson .js files from src/lessons/, scores them by keyword
overlap with the user question, and returns the top matching chunks.
No external AI API is used.
"""

import os
import re

_LESSONS_DIR = os.path.normpath(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'lessons')
)

_STOPWORDS = {
    'a', 'an', 'the', 'is', 'it', 'in', 'on', 'at', 'to', 'for', 'of', 'and',
    'or', 'but', 'not', 'with', 'this', 'that', 'i', 'me', 'my', 'do', 'how',
    'what', 'can', 'be', 'as', 'are', 'was', 'were', 'will', 'would', 'should',
    'could', 'from', 'by', 'about', 'into', 'which', 'you', 'your', 'we', 'they',
    'its', 'if', 'so', 'up', 'out', 'no', 'all', 'more', 'has', 'have', 'had',
}


def _re_str(raw, key):
    """Extract a simple double-quoted JS string value for the given key."""
    m = re.search(r'\b' + re.escape(key) + r'\s*:\s*"([^"]*)"', raw)
    return m.group(1) if m else ''


def _re_int(raw, key):
    m = re.search(r'\b' + re.escape(key) + r'\s*:\s*(\d+)', raw)
    return int(m.group(1)) if m else None


def _re_concepts(raw):
    m = re.search(r'concepts\s*:\s*\[([^\]]+)\]', raw, re.DOTALL)
    if not m:
        return []
    return re.findall(r'"([^"]+)"', m.group(1))


def _re_template_all(raw, key):
    """Extract all JS template literal values for the given key (e.g. step content)."""
    pattern = r'\b' + re.escape(key) + r'\s*:\s*`((?:[^`\\]|\\.)*)`'
    return re.findall(pattern, raw, re.DOTALL)


def _clean_for_search(text):
    """Strip noise and return lowercase text for keyword matching."""
    text = text.replace('\\`', '')
    text = re.sub(r'```[\s\S]*?```', ' ', text)
    text = re.sub(r'`[^`]*`', ' ', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'[^\w\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.lower().strip()


def _make_snippet(step_texts):
    """Return a clean human-readable snippet from step content."""
    combined = ' '.join(step_texts)
    s = combined.replace('\\`', '`')
    s = re.sub(r'```[\s\S]*?```', '', s)
    s = re.sub(r'`[^`]*`', '', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'\1', s)
    s = re.sub(r'\*([^*]+)\*', r'\1', s)
    s = re.sub(r'\s+', ' ', s).strip()
    return s[:300]


def _load_lessons():
    lessons = []
    for fname in sorted(os.listdir(_LESSONS_DIR)):
        if not fname.endswith('.js') or fname == 'index.js':
            continue
        fpath = os.path.join(_LESSONS_DIR, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            raw = f.read()

        title = _re_str(raw, 'title')
        subtitle = _re_str(raw, 'subtitle')
        goal = _re_str(raw, 'goal')
        slug = _re_str(raw, 'slug')
        lesson_id = _re_int(raw, 'id')
        concepts = _re_concepts(raw)

        step_texts = _re_template_all(raw, 'content')
        code_texts = _re_template_all(raw, 'code')

        # funFact may span a line break before the string
        fun_fact_m = re.search(r'funFact\s*:\s*"((?:[^"\\]|\\.)*)"', raw, re.DOTALL)
        fun_fact = fun_fact_m.group(1) if fun_fact_m else ''

        blob = ' '.join([title, subtitle, goal, ' '.join(concepts),
                         ' '.join(step_texts), ' '.join(code_texts), fun_fact])

        lessons.append({
            'id': lesson_id,
            'slug': slug,
            'title': title,
            'file': fname,
            'goal': goal,
            'concepts': concepts,
            'snippet': _make_snippet(step_texts),
            'clean_blob': _clean_for_search(blob),
        })
    return lessons


def _tokenize(text):
    tokens = re.findall(r'\b[a-z]+\b', text.lower())
    return [t for t in tokens if t not in _STOPWORDS and len(t) > 2]


def jamai_retrieve(question, lesson_id=None, top_k=3):
    """
    Score JAM lesson files by keyword overlap with the question.
    Optionally boost the lesson matching lesson_id.
    Returns up to top_k results, only those with score > 0.
    """
    lessons = _load_lessons()
    q_tokens = set(_tokenize(question))

    if not q_tokens:
        return []

    scored = []
    for lesson in lessons:
        blob_tokens = set(_tokenize(lesson['clean_blob']))
        score = len(q_tokens & blob_tokens)
        if lesson_id is not None and lesson['id'] == lesson_id:
            score += 5
        scored.append((score, lesson))

    scored.sort(key=lambda x: x[0], reverse=True)

    results = []
    for score, lesson in scored[:top_k]:
        if score > 0:
            results.append({
                'title': lesson['title'],
                'id': str(lesson['id']),
                'file': lesson['file'],
                'score': score,
                'goal': lesson['goal'],
                'concepts': lesson['concepts'],
                'snippet': lesson['snippet'],
            })
    return results

