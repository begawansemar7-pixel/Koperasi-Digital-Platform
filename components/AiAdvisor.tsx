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
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  // Initialize chat session when opened
  useEffect(() => {
    if (isOpen && !chatRef.current) {
      chatRef.current = createChatSession();
    }
  }, [isOpen]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        chatRef.current = createChatSession();
      }
      
      const stream = await chatRef.current.sendMessageStream({ message: messageText });
      
      let aiResponseText = '';
      setMessages(prev => [...prev, { sender: 'ai', text: '' }]); // Placeholder for streaming response

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
       setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.sender === 'ai' && lastMessage.text === '') {
          lastMessage.text = 'Maaf, terjadi kesalahan. Coba lagi nanti.';
        } else {
          newMessages.push({ sender: 'ai', text: 'Maaf, terjadi kesalahan. Coba lagi nanti.' });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Send initial prompt when chat is open and ready
  useEffect(() => {
    if (isOpen && chatRef.current && initialPrompt) {
      sendMessage(initialPrompt);
      setInitialPrompt(null); // Clear after sending
    }
  }, [isOpen, chatRef.current, initialPrompt]);

  // Listen for global event to open the advisor
  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
        const customEvent = event as CustomEvent<{ prompt?: string }>;
        setIsOpen(true);
        if (customEvent.detail?.prompt) {
            setInitialPrompt(customEvent.detail.prompt);
        }
    };
    window.addEventListener('open-ai-advisor', handleOpenEvent);
    return () => {
        window.removeEventListener('open-ai-advisor', handleOpenEvent);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
  
  const suggestedPrompts = [
    "Apa itu SHU?",
    "Bagaimana cara mengajukan pinjaman?",
    "Apa saja jenis simpanan yang ada?",
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-secondary text-white p-4 rounded-full shadow-lg hover:bg-secondary/90 transition-transform duration-300 transform hover:scale-110 z-50"
        aria-label="Toggle AI Advisor"
      >
        {isOpen ? <XMarkIcon className="h-8 w-8" /> : <ChatBubbleLeftRightIcon className="h-8 w-8" />}
      </button>

      <div className={`fixed bottom-24 right-6 w-80 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col z-40 overflow-hidden border transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
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
            {messages.length === 1 && !isLoading && (
                <div className="p-2 space-y-2">
                    <p className="text-xs text-gray-500 text-center">Atau coba tanya:</p>
                    {suggestedPrompts.map((prompt, i) => (
                        <button
                            key={i}
                            onClick={() => sendMessage(prompt)}
                            className="w-full text-left text-sm text-blue-600 bg-blue-50 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}
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
          <form onSubmit={handleFormSubmit} className="p-4 border-t">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan..."
                className="w-full pr-12 py-2 pl-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-white text-gray-900"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-secondary text-white p-2 rounded-full disabled:bg-gray-300"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
      </div>
    </>
  );
};

export default AiAdvisor;