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
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
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
    <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالتك..."
          className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl resize-none outline-none focus:ring-2 ring-blue-500"
          dir="auto"
        />
        {isLoading ? (
          <button
            onClick={onStop}
            className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            ⏹️ إيقاف
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            ➤
          </button>
        )}
      </div>
    </div>
  );
}
