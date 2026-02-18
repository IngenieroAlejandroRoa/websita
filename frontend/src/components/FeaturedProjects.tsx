import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Lightbulb, Bot, Instagram, Youtube, Music, ExternalLink, ChevronsRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import shortCircuitImg from '@/assets/logo insta.jpg';
import angelRobotImg from '@/assets/angel-robot-project.jpg';
import cortoCircuitoImg1 from '@/assets/corto circuito/1.jpg';
import cortoCircuitoImg2 from '@/assets/corto circuito/2.jpeg';
import cortoCircuitoImg4 from '@/assets/corto circuito/4.jpeg';
import cortoCircuitoImg5 from '@/assets/corto circuito/5.jpeg';
import robotAngelImg1 from '@/assets/robot angel/1.jpg';
import robotAngelImg2 from '@/assets/robot angel/2.png';
import robotAngelImg3 from '@/assets/robot angel/3.png';
import robotAngelImg4 from '@/assets/robot angel/4.png';
import { useInView } from '@/hooks/useInView';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const FeaturedProjects = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();
  
  const cortoCircuitoImages = [
    cortoCircuitoImg1,
    cortoCircuitoImg2,
    cortoCircuitoImg4,
    cortoCircuitoImg5,
  ];
  
  const robotAngelImages = [
    robotAngelImg1,
    robotAngelImg2,
    robotAngelImg3,
    robotAngelImg4,
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentRobotImageIndex, setCurrentRobotImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % cortoCircuitoImages.length);
    }, 1000); // Cambia cada 1 segundo
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRobotImageIndex((prevIndex) => (prevIndex + 1) % robotAngelImages.length);
    }, 1000); // Cambia cada 1 segundo
    
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      id: 'shortcircuit',
      title: t('featured.shortcircuit.title'),
      subtitle: t('featured.shortcircuit.subtitle'),
      description: t('featured.shortcircuit.desc'),
      images: cortoCircuitoImages,
      icon: Lightbulb,
      color: 'from-yellow-500/20 to-orange-500/20',
      social: [
        { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/corto.circuitx/' },
        { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@corto.circuitx' },
        { name: 'TikTok', icon: Music, url: 'https://www.tiktok.com/@corto.circuito.tiktok' },
        { name: 'GitHub', icon: FaGithub, url: 'https://github.com/CortoCircuitoProjects' },
      ],
    },
    {
      id: 'angelrobot',
      title: t('featured.angelrobot.title'),
      subtitle: t('featured.angelrobot.subtitle'),
      description: t('featured.angelrobot.desc'),
      images: robotAngelImages,
      icon: Bot,
      color: 'from-blue-500/20 to-purple-500/20',
      learnMoreUrl: 'https://ingenieroalejandroroa.github.io/Robot_Angel/',
      githubUrl: 'https://github.com/IngenieroAlejandroRoa/Robot_Angel',
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-black text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {t('featured.title')}
          </h2>
          <p
            className={`text-lg text-white/80 max-w-2xl mx-auto ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {t('featured.subtitle')}
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden max-w-6xl mx-auto">
          {/* Swipe indicator */}
          <div className="flex items-center justify-center gap-2 mb-4 text-red-600 animate-pulse">
            <ChevronsRight className="h-5 w-5" />
            <span className="text-sm font-semibold">{t('carousel.swipe')}</span>
            <ChevronsRight className="h-5 w-5" />
          </div>
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={project.id} className="pl-4">
                  <Card
                    className={`group overflow-hidden border-2 border-black shadow-lg hover:shadow-xl transition-all duration-500 ${
                      isInView ? 'animate-slide-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={
                          project.id === 'shortcircuit' 
                            ? project.images[currentImageIndex]
                            : project.id === 'angelrobot'
                            ? project.images[currentRobotImageIndex]
                            : project.image
                        }
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 p-3 rounded-full bg-card/90 backdrop-blur-sm">
                        <project.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardContent className="p-6 md:p-8 text-black">
                      <span className="text-sm font-medium text-primary mb-2 block">
                        {project.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      {project.social ? (
                        <div className="flex gap-3">
                          {project.social.map((social) => (
                            <a
                              key={social.name}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                              aria-label={social.name}
                            >
                              <social.icon className="h-5 w-5 text-primary" />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="flex gap-3 items-center">
                          <Button
                            variant="ghost"
                            className="group/btn text-primary hover:text-primary hover:bg-primary/10 p-0"
                            asChild
                          >
                            <a href={project.learnMoreUrl} target="_blank" rel="noopener noreferrer">
                              {t('featured.learnmore')}
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                            </a>
                          </Button>
                          <a
                            href={project.learnMoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                            aria-label="Website"
                          >
                            <ExternalLink className="h-5 w-5 text-primary" />
                          </a>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                              aria-label="GitHub"
                            >
                              <FaGithub className="h-5 w-5 text-primary" />
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden border-2 border-black shadow-lg hover:shadow-xl transition-all duration-500 ${
                isInView ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={
                    project.id === 'shortcircuit' 
                      ? project.images[currentImageIndex]
                      : project.id === 'angelrobot'
                      ? project.images[currentRobotImageIndex]
                      : project.image
                  }
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 p-3 rounded-full bg-card/90 backdrop-blur-sm">
                  <project.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardContent className="p-6 md:p-8 text-black">
                <span className="text-sm font-medium text-primary mb-2 block">
                  {project.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {project.description}
                </p>
                {project.social ? (
                  <div className="flex gap-3">
                    {project.social.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                        aria-label={social.name}
                      >
                        <social.icon className="h-5 w-5 text-primary" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-3 items-center">
                    <Button
                      variant="ghost"
                      className="group/btn text-primary hover:text-primary hover:bg-primary/10 p-0"
                      asChild
                    >
                      <a href={project.learnMoreUrl} target="_blank" rel="noopener noreferrer">
                        {t('featured.learnmore')}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </Button>
                    <a
                      href={project.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                      aria-label="Website"
                    >
                      <ExternalLink className="h-5 w-5 text-primary" />
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                        aria-label="GitHub"
                      >
                        <FaGithub className="h-5 w-5 text-primary" />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
