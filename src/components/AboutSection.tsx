import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Cpu, Code, Wrench, Zap } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  const highlights = [
    { icon: Cpu, label: 'Mechatronics' },
    { icon: Code, label: 'Software' },
    { icon: Wrench, label: 'Hardware' },
    { icon: Zap, label: 'Innovation' },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2
                className={`text-3xl md:text-5xl font-bold mb-6 ${
                  isInView ? 'animate-fade-in' : 'opacity-0'
                }`}
              >
                {t('about.title')}
              </h2>
              <p
                className={`text-lg text-muted-foreground leading-relaxed mb-8 ${
                  isInView ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                {t('about.description')}
              </p>
              
              {/* Highlight Cards */}
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className={`p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${
                      isInView ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <item.icon className="h-8 w-8 text-primary mb-2" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div
              className={`relative ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_30s_linear_infinite]" />
                <div className="absolute inset-8 rounded-full border-2 border-accent/30 animate-[spin_20s_linear_infinite_reverse]" />
                <div className="absolute inset-16 rounded-full border-2 border-primary/40 animate-[spin_15s_linear_infinite]" />
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-foreground">5+</span>
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-card shadow-lg animate-float">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-3 rounded-full bg-card shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-card shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-3 rounded-full bg-card shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
