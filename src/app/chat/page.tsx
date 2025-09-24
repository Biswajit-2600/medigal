"use client";

import { useState } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import AppLayout from '@/components/layout/AppLayout';

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'assistant',
      content: "Hello! I'm your AI medical assistant. I can help answer general health questions and provide medical information. Please note that I cannot replace professional medical advice. How can I help you today?",
      timestamp: '09:50',
    },
  ]);

  const [balance, setBalance] = useState(150);
  const COINS_PER_MESSAGE = 2;

  const handleSendMessage = (message: string) => {
    if (balance < COINS_PER_MESSAGE) {
      alert('Insufficient coins. Please recharge your wallet.');
      return;
    }

    const newMessage: Message = {
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setBalance((prev) => prev - COINS_PER_MESSAGE);

    // Here you would typically make an API call to get the AI response
    // For now, we'll simulate a response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        type: 'assistant',
        content: 'This is a placeholder response. In a real application, this would be the AI\'s response to your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-screen">
        <ChatHeader balance={balance} />
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} coinsPerMessage={COINS_PER_MESSAGE} />
      </div>
    </AppLayout>
  );
}