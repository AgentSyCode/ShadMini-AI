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
}

export default function ChatArea({ selectedModel, onModelChange }: ChatAreaProps) {
  const { messages, isLoading, streamingContent, sendMessage, stopGeneration, clearChat } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt, selectedModel);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700 bg-white dark:bg-gray-900">
        <ModelSelector selectedModel={selectedModel} onSelect={onModelChange} />
        <button
          onClick={clearChat}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          🧹 مسح المحادثة
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <InputBox
        onSend={(text) => sendMessage(text, selectedModel)}
        isLoading={isLoading}
        onStop={stopGeneration}
      />
    </div>
  );
}
