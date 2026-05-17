'use client';
import ModelSelector from './ModelSelector';
import WelcomeScreen from './WelcomeScreen';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import { useChat } from '@/hooks/useChat';
import { useEffect, useRef } from 'react';
import type { Message } from '@/hooks/useChat';

interface ChatAreaProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  onToggleSidebar: () => void;
}

export default function ChatArea({ selectedModel, onModelChange, onToggleSidebar }: ChatAreaProps) {
  const { messages, isLoading, streamingContent, sendMessage, stopGeneration, clearChat } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt, selectedModel);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Sticky Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-gray-200/40 dark:border-gray-800/40 shadow-sm sticky top-0 z-20 gap-3">
        {/* زر القائمة للجوال فقط */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 dark:text-gray-300"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <ModelSelector selectedModel={selectedModel} onSelect={onModelChange} />
        
        <button
          onClick={clearChat}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-lg text-sm text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 6h18"/>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
          </svg>
          <span className="hidden sm:inline font-medium">جديد</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 && !streamingContent && (
            <WelcomeScreen onQuickPrompt={handleQuickPrompt} />
          )}
          {messages.map((msg: Message) => (
            <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
          ))}
          {streamingContent && (
            <MessageBubble role="assistant" content={streamingContent} isStreaming />
          )}
          {isLoading && !streamingContent && (
            <div className="flex justify-start mb-6 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                    <path d="M12 2a10 10 0 0 1 10 10h-10V2z"/>
                  </svg>
                </div>
                <div className="px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-lg rounded-tl-sm">
                  <div className="flex gap-1.5">
                    <span className="typing-dot" />
                    <span className="typing-dot" style={{ animationDelay: '0.15s' }} />
                    <span className="typing-dot" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <InputBox
        onSend={(text) => sendMessage(text, selectedModel)}
        isLoading={isLoading}
        onStop={stopGeneration}
      />
    </div>
  );
}
