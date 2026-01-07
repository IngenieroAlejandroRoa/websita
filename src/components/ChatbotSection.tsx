import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatbotSection = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);
  const [input, setInput] = useState('');

  const content = {
    en: {
      title: "Chat with Me",
      subtitle: "Hello, this is a trained chatbot to answer your questions about me, my skills, projects, work or contact information, instantly",
      placeholder: "Type your message...",
      send: "Send"
    },
    es: {
      title: "Chatea Conmigo",
      subtitle: "Hola, este es un chatbot entrenado para responder tus dudas sobre mí, mis habilidades, proyectos, trabajo o información de contacto, al instante",
      placeholder: "Escribe tu mensaje...",
      send: "Enviar"
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    
    // Simulated bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: language === 'es' 
          ? "Gracias por tu mensaje. Esta es una demo del chatbot." 
          : "Thanks for your message. This is a chatbot demo.",
        sender: 'bot' 
      }]);
    }, 1000);
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
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={content[language].placeholder}
              className="flex-1"
            />
            <Button onClick={handleSend}>
              <Send className="w-4 h-4 mr-2" />
              {content[language].send}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
