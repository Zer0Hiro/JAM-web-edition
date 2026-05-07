from flask import Blueprint, request, jsonify
from jamai_rag import jamai_retrieve

jamai_chat_bp = Blueprint("jamai_chat", __name__)

_SUGGESTIONS = ["Explain this lesson", "Give me a hint", "Translate hard words"]

_NO_MATCH = (
    "I could not find a direct match in the JAM lesson files yet. "
    "Try asking about loop, beat, note, wave, envelope, or sound."
)


def _build_answer(top):
    snippet = (top.get("snippet") or "")[:200].strip()
    title = top.get("doc_title") or top.get("title", "")
    if top.get("source_type") == "reference":
        lines = [f"Found in **{title}**"]
        if snippet:
            lines += ["", f"> {snippet}"]
    else:
        goal = top.get("goal", "")
        concepts_str = ", ".join(top.get("concepts") or []) or "JAM concepts"
        lines = [f"Found in **{title}**"]
        if goal:
            lines += ["", f"Goal: {goal}"]
        lines.append(f"Key concepts: {concepts_str}")
        if snippet:
            lines += ["", f"> {snippet}"]
    return "\n".join(lines)


@jamai_chat_bp.route("/api/jamai/chat", methods=["POST"])
def jamai_chat():
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

    results = jamai_retrieve(message, lesson_id=lid, top_k=3)

    if not results:
        return jsonify({"answer": _NO_MATCH, "sources": [], "suggestions": _SUGGESTIONS})

    sources = [
        {
            "title": r.get("doc_title") or r["title"],
            "id": r["id"],
            "file": r["file"],
            "score": r["score"],
            "source_type": r["source_type"],
        }
        for r in results
    ]

    return jsonify({
        "answer": _build_answer(results[0]),
        "sources": sources,
        "suggestions": _SUGGESTIONS,
    })