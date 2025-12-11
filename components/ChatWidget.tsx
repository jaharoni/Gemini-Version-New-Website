import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi, I\'m your AI assistant. Ask me about my art, process, or available prints!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Production Implementation Check
      const apiKey = process.env.API_KEY;
      
      if (apiKey) {
         const ai = new GoogleGenAI({ apiKey });
         const response = await ai.models.generateContent({
           model: 'gemini-2.5-flash',
           contents: input,
           config: {
             systemInstruction: "You are a helpful assistant for an artist's portfolio website. You are polite, creative, and knowledgeable about art.",
           }
         });
         
         setMessages(prev => [...prev, { role: 'model', text: response.text || "I couldn't generate a response." }]);
      } else {
        // Fallback for Demo without API Key
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => [...prev, { role: 'model', text: "I'm currently in demo mode (no API key). If I were connected to Gemini, I would answer: " + input }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 glass-button bg-mustard-500 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6 text-charcoal-950" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] md:w-[400px] h-[500px] glass rounded-2xl flex flex-col shadow-2xl animate-fade-in overflow-hidden border border-white/20">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-mustard-400" />
              <h3 className="font-display text-lg text-cream-100">Art Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-sage-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-mustard-500 text-charcoal-950 rounded-tr-sm' 
                      : 'bg-white/10 text-cream-100 rounded-tl-sm border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                 <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-xs text-sage-400 animate-pulse">
                   Thinking...
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-charcoal-950/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about prints..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-cream-100 focus:outline-none focus:border-mustard-400/50 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-mustard-500 rounded-lg text-charcoal-950 hover:bg-mustard-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
