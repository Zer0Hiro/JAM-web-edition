import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import CodeEditor from "./CodeEditor";

export default function LessonView({
  lesson,
  onBack,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  onComplete,
  completed,
}) {
  const [expandedStep, setExpandedStep] = useState(0);
  const [expandedChallenges, setExpandedChallenges] = useState({});
  const [showFunFact, setShowFunFact] = useState(false);

  const PHASE_COLORS = {
    1: "#22d3ee",
    2: "#34d399",
    3: "#f97316",
    4: "#a78bfa",
    5: "#f43f5e",
  };
  const phaseColor = PHASE_COLORS[lesson.phase] || "#22d3ee";

  function toggleChallenge(id) {
    setExpandedChallenges((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function renderMarkdown(text) {
    // Very simple markdown-like rendering
    return text.split("\n\n").map((paragraph, pi) => {
      // Code blocks
      if (paragraph.trim().startsWith("```")) {
        const code = paragraph.replace(/```\w*/g, "").trim();
        return (
          <pre
            key={pi}
            className="bg-[var(--color-bg-primary)] rounded-lg p-4 text-sm overflow-x-auto my-3 border border-[var(--color-border)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <code className="text-[var(--color-accent-cyan)]">{code}</code>
          </pre>
        );
      }

      // Regular text with inline formatting
      let html = paragraph
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[var(--color-text-primary)] font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-[var(--color-bg-primary)] px-1.5 py-0.5 rounded text-sm text-[var(--color-accent-cyan)]" style="font-family: var(--font-mono)">$1</code>')
        .replace(/\n- /g, '</p><p class="ml-4 before:content-[\'•_\'] text-[var(--color-text-secondary)] text-sm leading-relaxed mb-1">')
        .replace(/\n(\d+)\. /g, '</p><p class="ml-4 text-[var(--color-text-secondary)] text-sm leading-relaxed mb-1">$1. ');

      return (
        <p
          key={pi}
          className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer bg-transparent border-0"
          >
            <ArrowLeft size={16} />
            All Lessons
          </button>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold"
              style={{
                backgroundColor: `${phaseColor}20`,
                color: phaseColor,
              }}
            >
              {lesson.id}
            </span>
            <span className="font-semibold text-sm">{lesson.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {hasPrev && (
              <button
                onClick={onPrev}
                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)] transition-colors cursor-pointer bg-transparent border-0"
                title="Previous lesson"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNext}
                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)] transition-colors cursor-pointer bg-transparent border-0"
                title="Next lesson"
              >
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Lesson content */}
          <div>
            {/* Title section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: phaseColor }}
                >
                  Phase {lesson.phase}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {"///"}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  Lesson {lesson.id}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-lg text-[var(--color-text-secondary)]">
                {lesson.goal}
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-3 mb-8">
              {lesson.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--color-border)] overflow-hidden"
                  style={{
                    backgroundColor:
                      expandedStep === idx
                        ? "var(--color-bg-card)"
                        : "var(--color-bg-secondary)",
                  }}
                >
                  <button
                    onClick={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer bg-transparent border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: `${phaseColor}20`,
                          color: phaseColor,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span className="font-medium text-[var(--color-text-primary)]">
                        {step.title}
                      </span>
                    </div>
                    {expandedStep === idx ? (
                      <ChevronUp size={16} className="text-[var(--color-text-muted)]" />
                    ) : (
                      <ChevronDown size={16} className="text-[var(--color-text-muted)]" />
                    )}
                  </button>

                  {expandedStep === idx && (
                    <div className="px-4 pb-4 pl-[52px]">
                      {renderMarkdown(step.content)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Challenges */}
            {lesson.challenges && lesson.challenges.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sparkles size={18} style={{ color: phaseColor }} />
                  Try It Yourself
                </h2>
                <div className="space-y-2">
                  {lesson.challenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                    >
                      <p className="text-sm text-[var(--color-text-primary)] mb-2">
                        {challenge.text}
                      </p>
                      <button
                        onClick={() => toggleChallenge(challenge.id)}
                        className="text-xs text-[var(--color-accent-purple)] hover:text-[var(--color-accent-cyan)] transition-colors cursor-pointer bg-transparent border-0 p-0"
                      >
                        {expandedChallenges[challenge.id] ? "Hide hint" : "Show hint"}
                      </button>
                      {expandedChallenges[challenge.id] && (
                        <p className="mt-2 text-xs text-[var(--color-text-muted)] italic bg-[var(--color-bg-secondary)] p-2 rounded-lg">
                          <Lightbulb size={12} className="inline mr-1" />
                          {challenge.hint}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun fact */}
            {lesson.funFact && (
              <div className="mb-8">
                <button
                  onClick={() => setShowFunFact(!showFunFact)}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--color-accent-orange)] hover:text-[var(--color-accent-cyan)] transition-colors cursor-pointer bg-transparent border-0 p-0"
                >
                  <Lightbulb size={16} />
                  {showFunFact ? "Hide fun fact" : "Show fun fact"}
                </button>
                {showFunFact && (
                  <div className="mt-3 p-4 rounded-xl bg-orange-950/20 border border-orange-500/20 text-sm text-[var(--color-text-secondary)]">
                    {lesson.funFact}
                  </div>
                )}
              </div>
            )}

            {/* Completion / navigation */}
            <div className="flex items-center gap-3">
              {!completed && (
                <button
                  onClick={() => onComplete && onComplete(lesson.id)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                             bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer border-0"
                >
                  <CheckCircle2 size={16} />
                  Mark as Complete
                </button>
              )}
              {completed && (
                <span className="flex items-center gap-2 text-sm text-green-400 font-medium">
                  <CheckCircle2 size={16} />
                  Completed
                </span>
              )}
              {hasNext && (
                <button
                  onClick={onNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                             text-[var(--color-text-primary)] border-2 border-[var(--color-border)]
                             hover:border-[var(--color-accent-cyan)] transition-colors cursor-pointer bg-transparent"
                >
                  Next Lesson
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Code editor (sticky) */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <CodeEditor initialCode={lesson.code} />
          </div>
        </div>
      </div>
    </div>
  );
}
