'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'schoolbot-messages';
const MAX_MESSAGES = 10;

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "Hello! \u{1F44B} I'm the Greenwood Academy assistant. I can help you with admissions, fee structure, transport routes, facilities, and more.\n\nWhat would you like to know?",
};

const QUICK_ACTIONS = [
  'Fee Structure',
  'Admission Process',
  'Transport Routes',
  'School Facilities',
];

const ERROR_MESSAGE =
  "I'm having trouble connecting. Please try again or email us at admissions@greenwoodacademy.edu.in.";

// ---------------------------------------------------------------------------
// Markdown Renderer — supports bold, italic, links, and lists
// ---------------------------------------------------------------------------

function renderInlineMarkdown(line: string, lineIdx: number): React.ReactNode[] {
  // Process inline formatting: links, bold, italic
  // Order matters: links first, then bold, then italic
  const parts: React.ReactNode[] = [];
  // Combined regex: [text](url) | **bold** | *italic*
  const inlineRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match;

  while ((match = inlineRegex.exec(line)) !== null) {
    // Push text before match
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Link: [text](url)
      parts.push(
        <a
          key={`a-${lineIdx}-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest underline underline-offset-2 hover:text-forest-light"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // Bold: **text**
      parts.push(<strong key={`b-${lineIdx}-${match.index}`}>{match[3]}</strong>);
    } else if (match[4]) {
      // Italic: *text*
      parts.push(<em key={`i-${lineIdx}-${match.index}`}>{match[4]}</em>);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }
  if (parts.length === 0) parts.push(line);

  return parts;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const parts = renderInlineMarkdown(line, i);

    // Bullet points: lines starting with "- "
    if (line.trimStart().startsWith('- ')) {
      // Strip the leading "- " from text parts
      const strippedParts = parts.map((p, j) =>
        j === 0 && typeof p === 'string' ? p.replace(/^\s*-\s*/, '') : p
      );
      elements.push(
        <span key={`line-${i}`} className="flex gap-1.5 ml-1">
          <span className="shrink-0 mt-[2px]">•</span>
          <span>{strippedParts}</span>
        </span>
      );
    }
    // Numbered list: lines starting with "N. "
    else if (/^\d+\.\s/.test(line.trimStart())) {
      elements.push(
        <span key={`line-${i}`} className="flex gap-1.5 ml-1">
          <span>{parts}</span>
        </span>
      );
    }
    // Regular line
    else {
      elements.push(
        <span key={`line-${i}`}>
          {parts}
        </span>
      );
    }

    // Add line break between lines (not after last)
    if (i < lines.length - 1) {
      elements.push(<br key={`br-${i}`} />);
    }
  }

  return elements;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadMessages(): ChatMessage[] {
  if (typeof window === 'undefined') return [WELCOME_MESSAGE];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: ChatMessage[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // corrupt storage — start fresh
  }
  return [WELCOME_MESSAGE];
}

function saveMessages(messages: ChatMessage[]): void {
  try {
    // Always keep the welcome message first, then the last (MAX - 1) messages
    const toSave =
      messages.length <= MAX_MESSAGES
        ? messages
        : [messages[0], ...messages.slice(-(MAX_MESSAGES - 1))];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ChatWidget() {
  // ---- State ----------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // ---- Refs -----------------------------------------------------------------
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ---- Effects --------------------------------------------------------------

  // Load messages from localStorage on mount
  useEffect(() => {
    setMessages(loadMessages());
    setHasMounted(true);
  }, []);

  // Save messages whenever they change (after initial mount)
  useEffect(() => {
    if (hasMounted) {
      saveMessages(messages);
    }
  }, [messages, hasMounted]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow animation to start
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ---- Send message ---------------------------------------------------------

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: ChatMessage = { role: 'user', content: trimmed };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
      setIsLoading(true);
      setIsStreaming(false);

      try {
        const last10 = updatedMessages.slice(-MAX_MESSAGES);
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: last10 }),
        });

        if (!response.ok || !response.body) {
          throw new Error(`Response status: ${response.status}`);
        }

        // Add empty assistant message that we'll stream into
        const assistantMessage: ChatMessage = { role: 'assistant', content: '' };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsStreaming(true);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;

            try {
              const { text: chunk } = JSON.parse(data);
              fullText += chunk;
              // Update the last (assistant) message with accumulated text
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = {
                  role: 'assistant',
                  content: fullText,
                };
                return next;
              });
            } catch {
              // malformed JSON chunk — skip
            }
          }
        }

        // Process any remaining buffer
        if (buffer.trim()) {
          const remaining = buffer.trim();
          if (remaining.startsWith('data: ')) {
            const data = remaining.slice(6).trim();
            if (data !== '[DONE]') {
              try {
                const { text: chunk } = JSON.parse(data);
                fullText += chunk;
                setMessages((prev) => {
                  const next = [...prev];
                  next[next.length - 1] = {
                    role: 'assistant',
                    content: fullText,
                  };
                  return next;
                });
              } catch {
                // skip
              }
            }
          }
        }
      } catch {
        // Network error or non-OK response — show error message
        setMessages((prev) => {
          // If we already added an empty assistant message, replace it
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant' && last.content === '') {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: ERROR_MESSAGE };
            return next;
          }
          return [...prev, { role: 'assistant', content: ERROR_MESSAGE }];
        });
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    [messages, isLoading],
  );

  // ---- Event handlers -------------------------------------------------------

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleQuickAction = (text: string) => {
    sendMessage(text);
  };

  // ---- Derived state --------------------------------------------------------

  const showQuickActions = messages.length <= 1;
  const showTypingIndicator = isLoading && !isStreaming;

  // ---- Render ---------------------------------------------------------------

  return (
    <>
      {/* Inline keyframes for animations */}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse-soft {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(212, 165, 116, 0.4);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(212, 165, 116, 0);
          }
        }

        @keyframes bounce-dot {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes fade-in-message {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2.5s ease-in-out infinite;
        }

        .animate-fade-in-message {
          animation: fade-in-message 0.3s ease-out forwards;
        }

        .animate-bounce-dot {
          animation: bounce-dot 0.6s ease-in-out infinite;
        }

        /* Custom scrollbar for messages area */
        .chat-messages-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .chat-messages-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(82, 121, 111, 0.3);
          border-radius: 2px;
        }
        .chat-messages-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(82, 121, 111, 0.5);
        }
      `}</style>

      {/* ------------------------------------------------------------------ */}
      {/* Chat Panel                                                          */}
      {/* ------------------------------------------------------------------ */}
      {isOpen && (
        <div
          className="animate-slide-up fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl w-[calc(100vw-2rem)] max-w-[380px] h-[560px] max-h-[80vh]"
          role="dialog"
          aria-label="Chat with Greenwood Academy"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-forest px-4 py-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold leading-tight text-white">
                Greenwood Academy
              </h2>
              <p className="text-[11px] leading-tight text-white/70">
                AI Assistant
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="chat-messages-scrollbar flex-1 overflow-y-auto bg-ivory p-4 space-y-3"
          >
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={`animate-fade-in-message flex gap-2 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
                style={{ animationDelay: `${Math.min(idx * 0.05, 0.3)}s` }}
              >
                {/* Avatar — assistant only */}
                {msg.role === 'assistant' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf/20 mt-0.5">
                    <Bot className="h-4 w-4 text-leaf" />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-tr-sm bg-forest text-white'
                      : 'rounded-tl-sm bg-white text-charcoal shadow-sm'
                  }`}
                  style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
                >
                  {renderMarkdown(msg.content)}
                </div>
              </div>
            ))}

            {/* Quick Action Chips — shown in welcome state */}
            {showQuickActions && (
              <div className="animate-fade-in-message flex flex-wrap gap-2 pl-9">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="rounded-full border border-sage px-3 py-1 text-xs font-medium text-sage transition-all duration-200 hover:bg-sage hover:text-white hover:shadow-sm active:scale-95 cursor-pointer"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Typing Indicator */}
            {showTypingIndicator && (
              <div className="animate-fade-in-message flex items-start gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf/20 mt-0.5">
                  <Bot className="h-4 w-4 text-leaf" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="animate-bounce-dot inline-block h-2 w-2 rounded-full bg-sage"
                      style={{ animationDelay: '0s' }}
                    />
                    <span
                      className="animate-bounce-dot inline-block h-2 w-2 rounded-full bg-sage"
                      style={{ animationDelay: '0.15s' }}
                    />
                    <span
                      className="animate-bounce-dot inline-block h-2 w-2 rounded-full bg-sage"
                      style={{ animationDelay: '0.3s' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Invisible scroll anchor */}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 border-t border-gray-100 bg-white p-3 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask about admissions, fees, transport..."
              className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
              aria-label="Type your message"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-white transition-all duration-200 hover:bg-forest-light disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Send message"
            >
              <Send className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Chat Bubble (FAB)                                                   */}
      {/* ------------------------------------------------------------------ */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="animate-pulse-soft flex items-center gap-2.5 rounded-full bg-amber text-charcoal pl-5 pr-4 py-3.5 shadow-lg shadow-amber/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber/30 active:scale-100"
            aria-label="Open chat"
          >
            <span className="text-sm font-semibold">Chat with us</span>
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
