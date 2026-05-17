'use client';
import { useState, useRef, useEffect } from 'react';

interface InputBoxProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  onStop: () => void;
}

export default function InputBox({ onSend, isLoading, onStop }: InputBoxProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 shadow-2xl shadow-black/5 dark:shadow-black/20 transition-all duration-300 focus-within:border-blue-300/60 dark:focus-within:border-blue-500/40 focus-within:shadow-blue-500/10">
          {/* Attachment placeholder */}
          <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اسأل ShadMini عن أي شيء..."
            className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed py-2 px-1 placeholder:text-gray-400 dark:placeholder:text-gray-500 max-h-[200px]"
            dir="auto"
          />

          {/* Send / Stop button */}
          {isLoading ? (
            <button
              onClick={onStop}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 animate-pulse-glow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2"/>
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed active:scale-90"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Footer hint */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
          اضغط Enter للإرسال • Shift + Enter لسطر جديد
        </p>
      </div>
    </div>
  );
}
