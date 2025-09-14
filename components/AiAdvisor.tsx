
import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, XMarkIcon } from './Icons';
import { createChatSession } from '../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AiAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Halo! Saya asisten keuangan AI Anda. Tanyakan apa saja tentang literasi keuangan, koperasi, atau tips menabung.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = createChatSession();
    }
  }, [isOpen]);
  
  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        throw new Error("Chat session not initialized");
      }
      
      const stream = await chatRef.current.sendMessageStream({ message: input });
      
      let aiResponseText = '';
      setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

      for await (const chunk of stream) {
        aiResponseText += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { sender: 'ai', text: aiResponseText };
            return newMessages;
        });
      }

    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Maaf, terjadi kesalahan. Coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-secondary/90 transition-transform duration-300 transform hover:scale-110 z-40"
      >
        {isOpen ? <XMarkIcon className="h-8 w-8" /> : <ChatBubbleLeftRightIcon className="h-8 w-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col z-40 overflow-hidden border">
          <div className="bg-secondary p-4 text-white">
            <h3 className="font-bold text-lg">AI Financial Advisor</h3>
            <p className="text-xs opacity-80">Powered by Gemini</p>
          </div>
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
             {isLoading && messages[messages.length-1].sender === 'user' && (
                <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl">
                        <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
             )}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan..."
                className="w-full pr-12 py-2 pl-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-secondary text-white p-2 rounded-full disabled:bg-gray-300"
                disabled={isLoading || !input.trim()}
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AiAdvisor;
