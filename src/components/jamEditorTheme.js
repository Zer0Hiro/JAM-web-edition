import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";

// Token-driven editor theme — reads the app's CSS variables so it
// follows the light/dark toggle without a separate theme build.
const chrome = EditorView.theme({
  "&": {
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-text-primary)",
  },
  ".cm-content": {
    caretColor: "var(--color-accent)",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--color-accent)",
  },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection":
    {
      backgroundColor:
        "color-mix(in srgb, var(--color-accent-deep) 30%, transparent)",
    },
  ".cm-activeLine": {
    backgroundColor:
      "color-mix(in srgb, var(--color-accent) 6%, transparent)",
  },
  ".cm-activeLineGutter": {
    backgroundColor:
      "color-mix(in srgb, var(--color-accent) 8%, transparent)",
    color: "var(--color-text-secondary)",
  },
  ".cm-gutters": {
    backgroundColor: "var(--color-bg-secondary)",
    color: "var(--color-text-muted)",
    border: "none",
    borderRight: "1px solid var(--color-border)",
  },
  ".cm-matchingBracket": {
    backgroundColor:
      "color-mix(in srgb, var(--color-accent-support) 20%, transparent)",
    outline: "1px solid var(--color-accent-support)",
  },
  ".cm-tooltip": {
    backgroundColor: "var(--color-bg-elevated)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
  },
});

const highlights = HighlightStyle.define([
  { tag: tags.keyword, color: "var(--color-accent)", fontWeight: "600" },
  { tag: tags.string, color: "var(--color-accent-support)" },
  { tag: tags.number, color: "var(--color-warning)" },
  { tag: tags.comment, color: "var(--color-text-muted)", fontStyle: "italic" },
  { tag: tags.variableName, color: "var(--color-text-primary)" },
  { tag: tags.punctuation, color: "var(--color-text-muted)" },
  // C++ output view
  { tag: tags.typeName, color: "var(--color-accent-support)" },
  { tag: tags.function(tags.variableName), color: "var(--color-accent)" },
  { tag: tags.operator, color: "var(--color-text-secondary)" },
  { tag: tags.processingInstruction, color: "var(--color-accent-deep)" },
]);

export const jamEditorTheme = [chrome, syntaxHighlighting(highlights)];
