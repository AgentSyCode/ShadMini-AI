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
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
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
      <main className="flex-1 flex flex-col h-full">
        <ChatArea
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
      </main>
    </div>
  );
}
