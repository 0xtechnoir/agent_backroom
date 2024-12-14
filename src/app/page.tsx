'use client';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
  _id: string;
  timestamp: string;
  role: string;
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<typeof Socket | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/messages');
        const jsonString = await response.json();
        const data = JSON.parse(jsonString);
        console.log("data: ", data);
        setMessages(data.map((doc: any) => ({
          _id: doc._id,
          timestamp: doc.timestamp,
          role: 'user',
          content: doc.content
        })));
      } catch (error) {
        console.error('Failed to fetch documents:', error);
      }
    };

    fetchDocuments();

    // Clean up function to handle component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []); // This useEffect only handles fetchDocuments

  // Separate useEffect for socket connection
  useEffect(() => {
    const existingSessionId = localStorage.getItem('sessionId');
    
    // Only create socket if it doesn't exist
    if (!socketRef.current) {
      const socket = io("http://localhost:4000", {
        auth: {
          sessionId: existingSessionId
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket']
      });

      socket.on('connect', () => {
        console.log('Connected with session ID:', existingSessionId || socket.id);
        if (!existingSessionId) {
          localStorage.setItem('sessionId', socket.id);
        }
      });

      socket.on('newDocument', (timestamp: string, content: string) => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            _id: timestamp,
            timestamp,
            role: 'user',
            content
          }
        ]);
      });

      socketRef.current = socket;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []); // Empty dependency array

  useEffect(() => {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  

  return (
    <main className="min-h-screen bg-parchment text-ink font-medieval p-5">
      <h1 className="text-4xl text-center mb-5">Shadows and Light</h1>
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