import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Profile Image Placeholder */}
          <div className="relative animate-scale-in">
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary to-accent p-1 animate-pulse-glow">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary">
                  AR
                </div>
              </div>
            </div>
            {/* Decorative Ring */}
            <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-[spin_20s_linear_infinite]" />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-lg md:text-xl text-muted-foreground mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('hero.greeting')}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span className="text-primary">{t('hero.name')}</span>
            </h1>
            <div className="space-y-2 mb-8">
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground animate-fade-in-left" style={{ animationDelay: '0.6s' }}>
                {t('hero.title1')}
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 animate-fade-in-right" style={{ animationDelay: '0.8s' }}>
                {t('hero.title2')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                {t('hero.cta')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                {t('hero.contact')}
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@alejandroroa.com"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
