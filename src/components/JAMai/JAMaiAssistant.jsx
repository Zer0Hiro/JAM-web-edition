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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-cyan-300/45 bg-[#151935] px-5 py-3 font-display text-sm font-bold text-white shadow-2xl shadow-cyan-500/30 ring-1 ring-fuchsia-500/25 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-[#1a1f40] hover:shadow-cyan-400/40 focus:outline-none focus:ring-4 focus:ring-cyan-400/20"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-400 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/25">
          <MessageCircle size={18} />
        </span>

        <span className="flex flex-col items-start leading-tight">
          <span>JAMai Tutor</span>
          <span className="text-[11px] font-medium text-slate-300">
            Ask · Learn · Debug
          </span>
        </span>
      </button>
    )
  }

  return (
    <aside className="fixed bottom-6 right-6 z-50 flex h-[640px] w-[400px] max-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-[28px] border border-cyan-300/30 bg-[#151935] font-display shadow-2xl shadow-cyan-500/30 ring-1 ring-fuchsia-500/20 max-sm:inset-3 max-sm:h-auto max-sm:w-auto">
      <header className="relative overflow-hidden border-b border-cyan-300/20 bg-[#1d2347] px-5 py-4 text-white">
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/25 blur-3xl" />
        <div className="absolute -bottom-16 left-8 h-32 w-32 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute bottom-0 right-20 h-24 w-24 rounded-full bg-violet-500/25 blur-2xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/25">
              <Bot size={22} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-base font-bold tracking-tight">
                JAMai Tutor
                <Sparkles size={15} className="text-fuchsia-400" />
              </div>

              <div className="mt-0.5 text-xs font-medium text-slate-300">
                JAM learning assistant
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="rounded-2xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-400/20"
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
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-cyan-300/20 bg-[#2a315f] px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-cyan-200/70 hover:bg-[#333b73] hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-cyan-400/20"
              >
                <Icon size={13} />
                {action.label}
              </button>
            )
          })}
        </div>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[#10142b] p-4">
        {messages.map((message, index) => {
          const isUser = message.role === 'user'

          return (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[86%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'rounded-br-md bg-gradient-to-br from-cyan-400 to-blue-500 text-[#071018] shadow-lg shadow-cyan-500/30'
                    : 'rounded-bl-md border border-cyan-300/20 bg-[#252c57] text-slate-100 shadow-sm shadow-cyan-500/10'
                }`}
              >
                {!isUser && (
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                    <Bot size={12} />
                    JAMai
                  </div>
                )}

                <div className="whitespace-pre-wrap">{message.content}</div>

                {message.sources?.length > 0 && (
                  <div className="mt-3 space-y-1.5 border-t border-cyan-300/15 pt-3">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Sources
                    </div>

                    {message.sources.map((source, sourceIndex) => (
                      <div
                        key={`${source.id || source.title}-${sourceIndex}`}
                        className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 font-mono text-[11px] text-cyan-200"
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
            <div className="rounded-3xl rounded-bl-md border border-cyan-300/20 bg-[#252c57] px-4 py-3 text-sm text-slate-300 shadow-sm shadow-cyan-500/10">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
                <Bot size={12} />
                JAMai
              </div>
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-cyan-300/20 bg-[#1d2347] p-4">
        <div className="flex gap-2 rounded-3xl border border-cyan-300/20 bg-[#2a315f] p-2 transition focus-within:border-cyan-200 focus-within:shadow-lg focus-within:shadow-cyan-500/20">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask about code, sound, or English..."
            className="max-h-24 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400"
          />

          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-400 to-fuchsia-500 text-white transition hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-4 focus:ring-cyan-400/20"
            aria-label="Send message to JAMai"
          >
            <Send size={18} />
          </button>
        </div>

        <div className="mt-2 text-center font-mono text-[10px] text-slate-400">
          JAMai module · /api/jamai/chat
        </div>
      </div>
    </aside>
  )
}