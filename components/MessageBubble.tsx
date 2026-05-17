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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] p-3 rounded-2xl ${
        isUser
          ? 'bg-gradient-to-l from-blue-500 to-blue-600 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
      }`}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose dark:prose-invert max-w-none text-sm">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
            {isStreaming && <span className="typing-cursor" />}
          </div>
        )}

        {!isUser && !isStreaming && (
          <div className="flex gap-2 mt-2 text-xs text-gray-400 dark:text-gray-500">
            <button onClick={handleCopy} className="hover:text-blue-500">
              {copied ? '✓ تم النسخ' : '📋 نسخ'}
            </button>
            <button className="hover:text-blue-500">🔄 إعادة</button>
          </div>
        )}
      </div>
    </div>
  );
}
