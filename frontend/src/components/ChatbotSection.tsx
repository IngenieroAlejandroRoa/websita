import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatbotSection = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: {
      title: "Chat with Me",
      subtitle: "Hello, this is a trained chatbot to answer your questions about me, my skills, projects, work or contact information, instantly",
      placeholder: "Type your message...",
      send: "Send",
      error: "Sorry, I couldn't connect to the chatbot service.",
      thinking: "Thinking..."
    },
    es: {
      title: "Chatea Conmigo",
      subtitle: "Hola, este es un chatbot entrenado para responder tus dudas sobre mí, mis habilidades, proyectos, trabajo o información de contacto, al instante",
      placeholder: "Escribe tu mensaje...",
      send: "Enviar",
      error: "Lo siento, no pude conectarme al servicio de chatbot.",
      thinking: "Pensando..."
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { 
        text: data.answer,
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: content[language].error,
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chatbot" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-4xl font-bold mb-4">{content[language].title}</h2>
          <p className="text-muted-foreground">{content[language].subtitle}</p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6 border-2 border-black">
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>{language === 'es' ? '¡Haz una pregunta para comenzar!' : 'Ask a question to start!'}</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs px-4 py-2 rounded-lg bg-muted flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{content[language].thinking}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder={content[language].placeholder}
              className="flex-1"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {content[language].send}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
