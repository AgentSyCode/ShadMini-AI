'use client';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

interface ChatHistoryItem {
  id: string;
  title: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  chats: ChatHistoryItem[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onRenameChat: (id: string, newTitle: string) => void;
  onDeleteChat: (id: string) => void;
}

export default function Sidebar({
  isOpen,
  onToggle,
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  return (
    <>
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
      >
        ☰
      </button>

      <aside
        className={`fixed top-0 right-0 h-full bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64 md:relative md:translate-x-0 md:flex md:flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600">ShadMini AI</h1>
          <button onClick={onToggle} className="md:hidden p-1 text-lg">✕</button>
        </div>

        <button
          onClick={onNewChat}
          className="mx-3 mt-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + محادثة جديدة
        </button>

        <div className="flex-1 overflow-y-auto mt-4 space-y-1 px-2">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                activeChatId === chat.id ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              {editingId === chat.id ? (
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  onBlur={() => {
                    onRenameChat(chat.id, editTitle);
                    setEditingId(null);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      onRenameChat(chat.id, editTitle);
                      setEditingId(null);
                    }
                  }}
                  className="bg-transparent border-b border-blue-500 outline-none w-full"
                  autoFocus
                  onClick={e => e.stopPropagation()}
                />
              ) : (
                <span className="truncate text-sm">{chat.title}</span>
              )}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setEditingId(chat.id);
                    setEditTitle(chat.title);
                  }}
                  className="text-xs text-gray-500 hover:text-blue-500"
                >
                  ✏️
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (confirm('هل تريد حذف هذه المحادثة؟')) onDeleteChat(chat.id);
                  }}
                  className="text-xs text-gray-500 hover:text-red-500"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t dark:border-gray-700">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
