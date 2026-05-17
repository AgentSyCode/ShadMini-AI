'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useState } from 'react';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export default function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 mb-6 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar for assistant */}
      {!isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
              <path d="M12 2a10 10 0 0 1 10 10h-10V2z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Bubble */}
      <div className={`max-w-[80%] md:max-w-[70%] ${
        isUser
          ? 'order-1'
          : ''
      }`}>
        <div className={`px-5 py-3.5 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-l from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/20 rounded-tr-sm'
            : 'bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-lg rounded-tl-sm'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
          ) : (
            <div className="prose dark:prose-invert prose-sm max-w-none leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
              {isStreaming && (
                <span className="inline-flex items-center gap-1 ml-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                  <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action buttons for assistant */}
        {!isUser && !isStreaming && (
          <div className="flex gap-3 mt-2 px-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span className="text-green-500">تم النسخ</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span>نسخ</span>
                </>
              )}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
              <span>إعادة</span>
            </button>
          </div>
        )}
      </div>

      {/* Avatar for user */}
      {isUser && (
        <div className="flex-shrink-0 mt-1 order-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
