'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';

interface ChatHistoryItem {
  id: string;
  title: string;
}

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<ChatHistoryItem[]>([
    { id: '1', title: 'محادثة 1' },
  ]);
  const [activeChatId, setActiveChatId] = useState<string | null>('1');

  const handleToggleSidebar = () => setSidebarOpen(prev => !prev);

  const handleNewChat = () => {
    const newChat: ChatHistoryItem = {
      id: Date.now().toString(),
      title: 'محادثة جديدة',
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setSidebarOpen(false);
  };

  const handleRenameChat = (id: string, newTitle: string) => {
    setChats(prev => prev.map(chat => chat.id === id ? { ...chat, title: newTitle || chat.title } : chat));
  };

  const handleDeleteChat = (id: string) => {
    const newChats = chats.filter(chat => chat.id !== id);
    setChats(newChats);
    if (activeChatId === id) {
      setActiveChatId(newChats.length > 0 ? newChats[0].id : null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a]">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleToggleSidebar}
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          setActiveChatId(id);
          setSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
        onRenameChat={handleRenameChat}
        onDeleteChat={handleDeleteChat}
      />
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <ChatArea
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          onToggleSidebar={handleToggleSidebar}
        />
      </main>
    </div>
  );
}
