import { useState } from 'react'
import {
  Bot,
  MessageCircle,
  Send,
  X,
  Sparkles,
  BookOpen,
  Lightbulb,
  Languages,
} from 'lucide-react'
import { sendJAMaiChatMessage } from './JAMaiChatApi'

const quickActions = [
  {
    label: 'Explain',
    prompt: 'Explain this lesson in simple words',
    icon: BookOpen,
  },
  {
    label: 'Hint',
    prompt: 'Give me a small hint, not the full answer',
    icon: Lightbulb,
  },
  {
    label: 'Translate',
    prompt: 'Translate the hard English terms',
    icon: Languages,
  },
]

export default function JAMaiAssistant({ lessonId = null, code = null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi. I am JAMai Tutor for JAM. Ask me about the lesson, your code, English terms, or music concepts.',
      sources: [],
    },
  ])

  async function handleSend(customText = null) {
    const text = (customText || input).trim()

    if (!text || isLoading) {
      return
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: 'user',
        content: text,
        sources: [],
      },
    ])

    setInput('')
    setIsLoading(true)

    try {
      const data = await sendJAMaiChatMessage({
        message: text,
        lessonId,
        code,
      })

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: 'assistant',
          content: data.answer || 'JAMai could not generate an answer.',
          sources: data.sources || [],
        },
      ])
    } catch {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: 'assistant',
          content:
            'JAMai backend is not running yet, or /api/jamai/chat is not ready.',
          sources: [],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl glass-chip px-5 py-3
                   text-sm font-bold text-[var(--color-text-primary)] cursor-pointer
                   transition-all duration-300 hover:-translate-y-1
                   hover:shadow-[0_12px_36px_-8px_rgba(133,183,235,0.45)]
                   focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-cyan)]/20"
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--color-bg-primary)]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))",
            boxShadow: "0 4px 14px rgba(127,119,221,0.4)",
          }}
        >
          <MessageCircle size={18} />
        </span>

        <span className="flex flex-col items-start leading-tight">
          <span>JAMai Tutor</span>
          <span
            className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Ask · Learn · Debug
          </span>
        </span>
      </button>
    )
  }

  return (
    <aside
      className="fixed bottom-6 right-6 z-50 flex h-[640px] w-[400px] max-h-[calc(100vh-3rem)] flex-col
                 overflow-hidden rounded-3xl border border-[var(--color-border)]
                 bg-[var(--color-bg-card)]/95 shadow-2xl backdrop-blur-xl
                 max-sm:inset-3 max-sm:h-auto max-sm:w-auto"
    >
      {/* Accent hairline along the top edge */}
      <span
        className="absolute top-0 inset-x-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent-cyan), var(--color-accent-purple), transparent)",
        }}
        aria-hidden="true"
      />
      <header className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-5 py-4">
        <div
          className="absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl opacity-30"
          style={{ background: "var(--color-accent-cyan)" }}
        />
        <div
          className="absolute -bottom-16 left-8 h-32 w-32 rounded-full blur-3xl opacity-25"
          style={{ background: "var(--color-accent-purple)" }}
        />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-[var(--color-bg-primary)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))",
                boxShadow: "0 6px 18px rgba(127,119,221,0.35)",
              }}
            >
              <Bot size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-base font-bold tracking-tight text-[var(--color-text-primary)]">
                JAMai Tutor
                <Sparkles size={15} className="text-[var(--color-accent-magenta)]" />
              </div>

              <div
                className="mt-0.5 text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-text-muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                JEM learning assistant
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-xl p-2 text-[var(--color-text-muted)] cursor-pointer transition
                       hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]
                       focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-cyan)]/20"
            aria-label="Close JAMai Tutor"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative mt-4 grid grid-cols-3 gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon

            return (
              <button
                key={action.label}
                onClick={() => handleSend(action.prompt)}
                disabled={isLoading}
                className="flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs
                           font-semibold cursor-pointer transition-all duration-200
                           border-[var(--color-accent-cyan)]/25 bg-[var(--color-accent-cyan)]/5
                           text-[var(--color-text-secondary)]
                           hover:-translate-y-0.5 hover:border-[var(--color-accent-cyan)]/60
                           hover:text-[var(--color-accent-cyan)]
                           disabled:cursor-not-allowed disabled:opacity-50
                           focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-cyan)]/20"
              >
                <Icon size={13} />
                {action.label}
              </button>
            )
          })}
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[var(--color-bg-primary)]/60 p-4">
        {messages.map((message, index) => {
          const isUser = message.role === 'user'

          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'rounded-br-md text-[var(--color-bg-primary)]'
                    : 'rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]'
                }`}
                style={
                  isUser
                    ? {
                        background:
                          'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))',
                        boxShadow: '0 6px 20px rgba(133,183,235,0.3)',
                      }
                    : undefined
                }
              >
                {!isUser && (
                  <div
                    className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent-cyan)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    <Bot size={12} />
                    JAMai
                  </div>
                )}

                <div className="whitespace-pre-wrap">{message.content}</div>

                {message.sources?.length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-[var(--color-border)] pt-3">
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      Sources
                    </div>

                    {message.sources.map((source, sourceIndex) => (
                      <div
                        key={`${source.id || source.title}-${sourceIndex}`}
                        className="rounded-lg border border-[var(--color-accent-cyan)]/25 bg-[var(--color-accent-cyan)]/10 px-3 py-1.5 font-mono text-[11px] text-[var(--color-accent-cyan)]"
                      >
                        {source.title || source.id || source.file}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 text-sm text-[var(--color-text-secondary)]">
              <div
                className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent-cyan)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Bot size={12} />
                JAMai
              </div>
              <span className="inline-flex items-end gap-[3px] h-3 me-2" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="eq-bar w-[3px] h-full rounded-full"
                    style={{
                      background: 'var(--color-accent-cyan)',
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '0.8s',
                    }}
                  />
                ))}
              </span>
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
        <div
          className="flex gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2
                     transition focus-within:border-[var(--color-accent-cyan)]/60
                     focus-within:shadow-[0_0_20px_rgba(133,183,235,0.2)]"
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about code, sound, or English..."
            className="max-h-24 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
          />

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[var(--color-bg-primary)]
                       cursor-pointer transition hover:scale-105
                       hover:shadow-[0_6px_20px_rgba(133,183,235,0.35)]
                       disabled:cursor-not-allowed disabled:opacity-40
                       focus:outline-none focus:ring-4 focus:ring-[var(--color-accent-cyan)]/20"
            style={{
              background:
                'linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple))',
            }}
            aria-label="Send message to JAMai"
          >
            <Send size={18} />
          </button>
        </div>

        <div className="mt-2 text-center font-mono text-[10px] text-[var(--color-text-muted)]">
          JAMai module · /api/jamai/chat
        </div>
      </div>
    </aside>
  )
}
