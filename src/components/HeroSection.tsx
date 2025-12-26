import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import heroVideo from '@/assets/video3.mp4';
import profilePhoto from '@/assets/me2.png';

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
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center lg:video-position-75"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-8 lg:gap-16 min-h-screen">
          {/* Profile Image - Left side */}
          <div className="relative animate-scale-in lg:mb-0 mb-8 lg:order-1 order-2">
            <img 
              src={profilePhoto} 
              alt="Alejandro Roa Aparicio" 
              className="w-96 h-96 md:w-[550px] md:h-[550px] lg:w-[750px] lg:h-[750px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Content - Right side */}
          <div className="text-center lg:text-center lg:mb-0 mb-8 lg:self-center lg:order-2 order-1">
            {/* Translucent backdrop for text */}
            <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-transparent backdrop-blur-sm rounded-2xl p-8 lg:p-10">
              <p className="text-lg md:text-xl text-white font-bold mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t('hero.greeting')}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="text-white">{t('hero.name')}</span>
              </h1>
              <div className="space-y-2 mb-8">
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-red-600 animate-fade-in-left" style={{ animationDelay: '0.6s' }}>
                  {t('hero.title1')}
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-red-600 animate-fade-in-right" style={{ animationDelay: '0.8s' }}>
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
                  href="https://github.com/IngenieroAlejandroRoa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alejandro-roa-aparicio-0846211ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:alejoroaaparicio@gmail.com"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
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
