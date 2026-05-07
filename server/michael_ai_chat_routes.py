from flask import Blueprint, request, jsonify
from michael_ai_rag import michael_ai_retrieve

michael_ai_chat_bp = Blueprint("michael_ai_chat", __name__)

_SUGGESTIONS = ["Explain this lesson", "Give me a hint", "Translate hard words"]

_NO_MATCH = (
    "I could not find a direct match in the JAM lesson files yet. "
    "Try asking about loop, beat, note, wave, envelope, or sound."
)


@michael_ai_chat_bp.route("/api/michael-ai/chat", methods=["POST"])
def michael_ai_chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "").strip()
    lesson_id = data.get("lessonId")

    if not message:
        return jsonify({"answer": "Please write a question.", "sources": [], "suggestions": []}), 400

    lid = None
    if lesson_id is not None:
        try:
            lid = int(lesson_id)
        except (ValueError, TypeError):
            lid = None

    results = michael_ai_retrieve(message, lesson_id=lid, top_k=3)

    if not results:
        return jsonify({"answer": _NO_MATCH, "sources": [], "suggestions": _SUGGESTIONS})

    top = results[0]
    concepts_str = ", ".join(top["concepts"]) if top["concepts"] else "JAM concepts"
    snippet = top["snippet"][:200].strip() if top["snippet"] else ""

    lines = [
        f"Found in **{top['title']}**",
        "",
        f"Goal: {top['goal']}",
        f"Key concepts: {concepts_str}",
    ]
    if snippet:
        lines += ["", f"> {snippet}"]

    sources = [
        {"title": r["title"], "id": r["id"], "file": r["file"], "score": r["score"]}
        for r in results
    ]

    return jsonify({
        "answer": "\n".join(lines),
        "sources": sources,
        "suggestions": _SUGGESTIONS,
    })
