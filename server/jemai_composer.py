"""
JEMai composer — rule-based JAM song generation, no LLM.

Detects "write me a song"-style requests, picks a musical style from the
message keywords, and assembles a complete, valid JAM program: key, tempo,
instruments, a seeded random-walk melody over the scale, a root-note
bassline, a style-appropriate drum pattern, and an arrangement.

Deterministic per message: the same request always yields the same song
(seeded from a hash of the message), while different requests vary.
"""

import hashlib
import random
import re

# ---------------------------------------------------------------------------
# Request detection
# ---------------------------------------------------------------------------

_COMPOSE_VERBS = r'(write|make|compose|create|generate|build|give)'
_COMPOSE_NOUNS = r'(song|music|melody|melodies|tune|beat|track|jam|composition|riff|loop|theme|anthem|soundtrack|jingle|groove)'

_COMPOSE_RE = re.compile(
    _COMPOSE_VERBS + r'\b[\w\s,]{0,40}?\b' + _COMPOSE_NOUNS, re.IGNORECASE
)
# Noun-less requests: "compose something spooky", "make me something chill"
_COMPOSE_LOOSE_RE = re.compile(
    r'\bcompose\b|' + _COMPOSE_VERBS + r'\s+(me\s+)?something\b', re.IGNORECASE
)


def is_compose_request(message):
    """True when the user is asking JEMai to write music for them."""
    return bool(_COMPOSE_RE.search(message) or _COMPOSE_LOOSE_RE.search(message))


# ---------------------------------------------------------------------------
# Styles
# ---------------------------------------------------------------------------
# scale: note names the melody walks over (kept inside the declared KEY)
# bass_root: low root + fifth used by the bassline

_STYLES = {
    'happy': {
        'triggers': {'happy', 'upbeat', 'fun', 'cheerful', 'joyful', 'bright', 'party', 'dance'},
        'key': 'KEY C MAJOR',
        'bpm': (120, 140),
        'wave': 'SQUARE',
        'adsr': 'ADSR 5 60 150 100',
        'fx': 'REVERB 60',
        'scale': ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'],
        'bass_root': ('C2', 'G2'),
        'drums': 'four_floor',
        'note_lens': ['0.5', '0.5', '0.5', '1'],
        'label': 'a happy, upbeat tune in C major',
    },
    'sad': {
        'triggers': {'sad', 'melancholy', 'emotional', 'cry', 'lonely', 'slow', 'rainy', 'heartbreak'},
        'key': 'KEY A MINOR',
        'bpm': (72, 88),
        'wave': 'TRIANGLE',
        'adsr': 'ADSR 40 120 300 400',
        'fx': 'REVERB 140',
        'scale': ['A3', 'B3', 'C4', 'D4', 'E4', 'G4'],
        'bass_root': ('A2', 'E2'),
        'drums': 'sparse',
        'note_lens': ['1', '1', '0.5', '2'],
        'label': 'a slow, emotional piece in A minor',
    },
    'spooky': {
        'triggers': {'spooky', 'scary', 'creepy', 'halloween', 'dark', 'mysterious', 'horror', 'haunted'},
        'key': 'KEY D PHRYGIAN',
        'bpm': (84, 100),
        'wave': 'TRIANGLE',
        'adsr': 'ADSR 20 100 250 300',
        'fx': 'REVERB 120\n    DELAY 300 120',
        'scale': ['D4', 'Eb4', 'F4', 'G4', 'A4', 'D4'],
        'bass_root': ('D2', 'A2'),
        'drums': 'sparse',
        'note_lens': ['0.5', '1', '1', '2'],
        'label': 'a spooky, mysterious melody in D phrygian',
    },
    'chill': {
        'triggers': {'chill', 'calm', 'relax', 'relaxing', 'lofi', 'lo-fi', 'dreamy', 'ambient', 'peaceful', 'soft'},
        'key': 'KEY C PENTATONIC',
        'bpm': (80, 96),
        'wave': 'SIN',
        'adsr': 'ADSR 30 100 250 300',
        'fx': 'REVERB 130',
        'scale': ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'],
        'bass_root': ('C2', 'G2'),
        'drums': 'shuffle',
        'note_lens': ['0.5', '1', '1', '2'],
        'label': 'a chill, dreamy groove on the C pentatonic scale',
        'swing': 'SWING 35',
    },
    'epic': {
        'triggers': {'epic', 'dramatic', 'battle', 'boss', 'heroic', 'cinematic', 'intense', 'powerful'},
        'key': 'KEY D MINOR',
        'bpm': (104, 120),
        'wave': 'SAW',
        'adsr': 'ADSR 10 80 250 200',
        'fx': 'REVERB 100\n    VOICES 3\n    DETUNE 12',
        'scale': ['D3', 'F3', 'G3', 'A3', 'C4', 'D4'],
        'bass_root': ('D2', 'A2'),
        'drums': 'driving',
        'note_lens': ['0.5', '0.5', '1', '2'],
        'label': 'an epic, dramatic theme in D minor',
    },
    'retro': {
        'triggers': {'retro', 'game', 'chiptune', '8bit', '8-bit', 'arcade', 'video', 'mario', 'pixel'},
        'key': 'KEY C MAJOR',
        'bpm': (140, 160),
        'wave': 'SQUARE',
        'adsr': 'ADSR 2 40 120 60',
        'fx': '',
        'scale': ['C4', 'E4', 'G4', 'C5', 'G4', 'E4'],
        'bass_root': ('C2', 'G2'),
        'drums': 'four_floor',
        'note_lens': ['0.25', '0.25', '0.5', '1'],
        'label': 'a fast retro game tune in C major',
    },
}

_DEFAULT_STYLE = 'happy'

_DRUM_PATTERNS = {
    'four_floor': """PATTERN beat:
    BEAT 1: kick
    BEAT 1.5: hat
    BEAT 2: snare
    BEAT 2.5: hat
    BEAT 3: kick
    BEAT 3.5: hat
    BEAT 4: snare""",
    'driving': """PATTERN beat:
    BEAT 1: kick
    BEAT 2: kick
    BEAT 2.5: snare
    BEAT 3: kick
    BEAT 3.5: hat
    BEAT 4: snare""",
    'shuffle': """PATTERN beat:
    BEAT 1: kick
    BEAT 2.5: hat
    BEAT 3: snare
    BEAT 3.5: hat""",
    'sparse': """PATTERN beat:
    BEAT 1: kick
    BEAT 3: snare""",
}


def detect_style(message):
    """Pick the style whose trigger words best match the message."""
    tokens = set(re.findall(r'\b[\w-]+\b', message.lower()))
    best, best_hits = _DEFAULT_STYLE, 0
    for name, style in _STYLES.items():
        hits = len(tokens & style['triggers'])
        if hits > best_hits:
            best, best_hits = name, hits
    return best


# ---------------------------------------------------------------------------
# Song assembly
# ---------------------------------------------------------------------------

def _melody_lines(rng, style):
    """Seeded random-walk over the style's scale: 2 phrases of 4 notes,
    AAB-ish — the second phrase reuses the first's start, new ending."""
    scale = style['scale']
    lens = style['note_lens']
    idx = rng.randrange(len(scale))
    phrase = []
    for i in range(4):
        phrase.append((scale[idx], lens[i % len(lens)]))
        idx = max(0, min(len(scale) - 1, idx + rng.choice([-2, -1, -1, 1, 1, 2])))
    # Second phrase: same first two notes, fresh ending that lands near the root
    phrase2 = phrase[:2]
    idx = rng.randrange(len(scale))
    phrase2.append((scale[idx], lens[2 % len(lens)]))
    phrase2.append((scale[0], '2'))
    lines = [f'    PLAY lead {n} {d}' for n, d in phrase + phrase2]
    lines.append('    REST 1')
    return '\n'.join(lines)


def _bass_lines(style):
    root, fifth = style['bass_root']
    return '\n'.join([
        f'    PLAY bass {root} 1',
        f'    PLAY bass {root} 1',
        f'    PLAY bass {fifth} 1',
        f'    PLAY bass {root} 1',
    ])


def compose_song(message):
    """Build a complete JAM song for the request.

    Returns dict: {code, style, label} — code is a valid .jam program.
    """
    style_name = detect_style(message)
    style = _STYLES[style_name]
    seed = int(hashlib.md5(message.lower().strip().encode()).hexdigest(), 16)
    rng = random.Random(seed)

    bpm = rng.randrange(style['bpm'][0], style['bpm'][1] + 1, 2)
    swing = style.get('swing', '')

    config = [f'BPM {bpm}', style['key']]
    if swing:
        config.append(swing)

    fx_block = f"\n    {style['fx']}" if style['fx'] else ''

    code = f"""# {style['label'].capitalize()} — composed by JEMai
{chr(10).join(config)}

INSTRUMENT lead:
    TYPE SYNTH
    WAVE {style['wave']}
    {style['adsr']}{fx_block}
    VOLUME 200

INSTRUMENT bass:
    TYPE SYNTH
    WAVE SAW
    ADSR 5 60 200 80
    CUTOFF 600
    VOLUME 190

INSTRUMENT kick:
    TYPE DRUM
    WAVE SIN
    FREQ 55
    DECAY 100
    VOLUME 255

INSTRUMENT snare:
    TYPE DRUM
    WAVE NOISE
    FREQ 200
    DECAY 70
    VOLUME 190

INSTRUMENT hat:
    TYPE DRUM
    WAVE NOISE
    FREQ 7000
    DECAY 30
    VOLUME 120

SEQUENCE melody:
{_melody_lines(rng, style)}

SEQUENCE bassline:
{_bass_lines(style)}

{_DRUM_PATTERNS[style['drums']]}

PLAY_SEQUENCE melody
LOOP 3:
    PLAY_TOGETHER:
        PLAY_SEQUENCE melody
        PLAY_SEQUENCE bassline
        PLAY_PATTERN beat
FADE_OUT 4
PLAY_SEQUENCE melody
"""
    return {'code': code, 'style': style_name, 'label': style['label']}
