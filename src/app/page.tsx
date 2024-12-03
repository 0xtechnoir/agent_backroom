'use client';

import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  timestamp: string;
  role: string;
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="min-h-screen bg-parchment text-ink font-medieval p-5">
      <h1 className="text-4xl text-center mb-5">Medieval Messages</h1>
      <div
        id="message-container"
        className="max-w-3xl mx-auto p-4 border-2 border-ink bg-scroll rounded-lg shadow-lg overflow-y-auto h-96"
      >
        {messages.map((msg) => (
          <p key={msg._id} className="mb-2">
            <strong>{new Date(msg.timestamp).toLocaleString()}:</strong> {msg.content}
          </p>
        ))}
      </div>
    </main>
  );
}
