import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';

const ContactSection = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('contact.success'),
      description: 'I will get back to you as soon as possible.',
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'alejoroaaparicio@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Bogotá, Colombia' },
    { icon: Phone, label: 'Phone', value: '+57 321 468 5538' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/IngenieroAlejandroRoa', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/alejandro-roa-aparicio-0846211ab/', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 bg-black text-white relative overflow-hidden" data-aos="fade-up">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {t('contact.title')}
          </h2>
          <p
            className={`text-lg text-gray-300 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card
            className={`border-0 shadow-xl bg-white ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}
            style={{ animationDelay: '0.3s' }}
          >
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-black">
                    {t('contact.name')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Alejandro Roa"
                    className="bg-gray-50 border-gray-200 text-black"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                    {t('contact.email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Alejo@example.com"
                    className="bg-gray-50 border-gray-200 text-black"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-black">
                    {t('contact.message')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="bg-gray-50 border-gray-200 text-black resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {t('contact.send')}
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div
            className={`space-y-8 ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-center gap-4 p-4 rounded-lg bg-white hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="p-3 rounded-full bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{info.label}</p>
                    {info.label === 'Email' ? (
                      <div className="space-y-1">
                        <a href="mailto:alejoroaaparicio@gmail.com" className="font-medium text-black hover:text-primary transition-colors block">
                          alejoroaaparicio@gmail.com
                        </a>
                        <a href="mailto:aroaapa33136@universidadean.edu.co" className="font-medium text-sm text-gray-600 hover:text-primary transition-colors block">
                          aroaapa33136@universidadean.edu.co
                        </a>
                      </div>
                    ) : (
                      <p className="font-medium text-black">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">{t('contact.follow')}</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full bg-white hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6 text-black group-hover:text-white transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
