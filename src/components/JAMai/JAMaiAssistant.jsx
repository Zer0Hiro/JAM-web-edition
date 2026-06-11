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
    } catch (error) {
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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-accent-support/45 bg-card px-5 py-3 font-display text-sm font-bold text-ink shadow-card ring-1 ring-accent/25 transition hover:-translate-y-0.5 hover:border-accent-support hover:bg-elevated hover:shadow-pop focus:outline-none focus:ring-4 focus:ring-accent-support/20"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-deep text-white shadow-card">
          <MessageCircle size={18} />
        </span>

        <span className="flex flex-col items-start leading-tight">
          <span>JAMai Tutor</span>
          <span className="text-[11px] font-medium text-ink-secondary">
            Ask · Learn · Debug
          </span>
        </span>
      </button>
    )
  }

  return (
    <aside className="fixed bottom-6 right-6 z-50 flex h-[640px] w-[400px] max-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-xl border border-accent-support/30 bg-card font-display shadow-card ring-1 ring-accent/20 max-sm:inset-3 max-sm:h-auto max-sm:w-auto">
      <header className="relative overflow-hidden border-b border-accent-support/20 bg-elevated px-5 py-4 text-ink">
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent-support/25 blur-3xl" />
        <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute bottom-0 right-20 h-24 w-24 rounded-full bg-accent/25 blur-2xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-deep text-white shadow-card">
              <Bot size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-base font-bold tracking-tight">
                JAMai Tutor
                <Sparkles size={15} className="text-accent" />
              </div>

              <div className="mt-0.5 text-xs font-medium text-ink-secondary">
                JEM learning assistant
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-xl p-2 text-ink-muted transition hover:bg-white/10 hover:text-ink focus:outline-none focus:ring-4 focus:ring-accent-support/20"
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
                className="flex items-center justify-center gap-1.5 rounded-xl border border-accent-support/20 bg-card px-3 py-2 text-xs font-semibold text-ink-secondary transition hover:border-accent-support/70 hover:bg-elevated hover:text-accent-support disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-accent-support/20"
              >
                <Icon size={13} />
                {action.label}
              </button>
            )
          })}
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto bg-layer p-4">
        {messages.map((message, index) => {
          const isUser = message.role === 'user'

          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[86%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'rounded-br-md bg-accent-support text-[#071018] shadow-card'
                    : 'rounded-bl-md border border-accent-support/20 bg-card text-ink-secondary shadow-soft'
                }`}
              >
                {!isUser && (
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-support">
                    <Bot size={12} />
                    JAMai
                  </div>
                )}

                <div className="whitespace-pre-wrap">{message.content}</div>

                {message.sources?.length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-accent-support/15 pt-3">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                      Sources
                    </div>

                    {message.sources.map((source, sourceIndex) => (
                      <div
                        key={`${source.id || source.title}-${sourceIndex}`}
                        className="rounded-xl border border-accent-support/20 bg-accent-support/10 px-3 py-2 font-mono text-[11px] text-accent-support"
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
            <div className="rounded-xl rounded-bl-md border border-accent-support/20 bg-card px-4 py-3 text-sm text-ink-secondary shadow-soft">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-support">
                <Bot size={12} />
                JAMai
              </div>
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-accent-support/20 bg-elevated p-4">
        <div className="flex gap-2 rounded-xl border border-accent-support/20 bg-card p-2 transition focus-within:border-accent-support focus-within:shadow-card">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about code, sound, or English..."
            className="max-h-24 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ink-secondary outline-none placeholder:text-ink-muted"
          />

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-deep to-accent-support text-white transition hover:scale-105 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-4 focus:ring-accent-support/20"
            aria-label="Send message to JAMai"
          >
            <Send size={18} />
          </button>
        </div>

        <div className="mt-2 text-center font-mono text-[10px] text-ink-muted">
          JAMai module · /api/jamai/chat
        </div>
      </div>
    </aside>
  )
}
