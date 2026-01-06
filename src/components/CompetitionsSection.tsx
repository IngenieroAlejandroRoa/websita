import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { Trophy, Award, Medal, Target, Zap, Code, Rocket, Users, Crown, Star, ChevronsRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import photo1 from '@/assets/competencias/1.jpeg';
import photo2 from '@/assets/competencias/2.jpeg';
import photo3 from '@/assets/competencias/3.jpeg';
import photo4 from '@/assets/competencias/4.jpeg';
import photo5 from '@/assets/competencias/5.jpeg';
import photo6 from '@/assets/competencias/6.jpeg';
import photo7 from '@/assets/competencias/7.jpeg';
import photo8 from '@/assets/competencias/8.jpeg';
import photo9 from '@/assets/competencias/9.jpeg';
import nurmagomebotImg from '@/assets/robots/Nurmagomebot.jpeg';
import caronteImg from '@/assets/robots/Caronte.jpeg';

const CompetitionsSection = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9];

  const robots = [
    { 
      id: 0, 
      image: nurmagomebotImg, 
      nameEs: 'Nurmagomebot - Sumo RC 3Lbs', 
      nameEn: 'Nurmagomebot - Sumo RC 3Lbs', 
      competitionEs: 'EAN Bot 2025',
      competitionEn: 'EAN Bot 2025',
      positionEs: 'Campeón - 1er Lugar',
      positionEn: 'Champion - 1st Place',
      descriptionEs: 'Robot de sumo radiocontrolado de 3 libras diseñado para competencias de empuje y estrategia. Equipado con sensores de proximidad y sistema de tracción optimizado.', 
      descriptionEn: 'Radio-controlled 3-pound sumo robot designed for pushing and strategy competitions. Equipped with proximity sensors and optimized traction system.' 
    },
    { 
      id: 1, 
      image: caronteImg, 
      nameEs: 'Caronte - Robot de batalla 1Lbs', 
      nameEn: 'Caronte - Battle Robot 1Lbs', 
      competitionEs: 'RHA Robotics Internacional Batalla 1L',
      competitionEn: 'RHA International Robotics Battle 1L',
      positionEs: 'Fase de grupos',
      positionEn: 'Group Stage',
      descriptionEs: 'Robot de combate de 1 libra con sistema de arma activa. Diseñado para batallas de alta velocidad con chasis resistente y movilidad superior.', 
      descriptionEn: '1-pound battle robot with active weapon system. Designed for high-speed battles with resistant chassis and superior mobility.' 
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 800);

    return () => clearInterval(interval);
  }, [photos.length]);

  const highlights = [
    { icon: Award, label: 'Hackaton SostechPreneur 2025 EAN', labelEn: 'SostechPreneur 2025 Hackathon EAN' },
    { icon: Trophy, label: 'RHA Robotics Internacional Batalla 1L', labelEn: 'RHA International Robotics Battle 1L' },
    { icon: Rocket, label: 'CANSAT Congreso Internacional de Ingeniería y Automatización 2024', labelEn: 'CANSAT International Congress of Engineering and Automation 2024' },
    { icon: Code, label: 'Hackaton Facultad de Ingeniería Universidad EAN 2023', labelEn: 'Engineering Faculty Hackathon EAN University 2023' },
    { icon: Medal, label: 'Hackaton Facultad de Ingeniería Universidad EAN 2024', labelEn: 'Engineering Faculty Hackathon EAN University 2024' },
    { icon: Crown, label: 'EAN BOT 2025', labelEn: 'EAN BOT 2025' },
  ];

  return (
    <section id="competitions" ref={ref} className="py-20 md:py-32 bg-black text-white relative overflow-hidden" data-aos="fade-up">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`relative ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
                  <img
                    src={photos[currentPhotoIndex]}
                    alt={`Competition ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 text-white ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
                {t('competitions.title')}
              </h2>
              <p className={`text-lg text-white/80 leading-relaxed mb-8 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                {t('competitions.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={`p-4 rounded-lg bg-card border border-border hover:border-red-600/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <item.icon className="h-8 w-8 text-red-600 mb-2" />
                    <span className="font-bold text-xs md:text-sm text-black">{language === 'en' ? item.labelEn : item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Robots de competencia carousel */}
        <div className="container mx-auto px-4 mt-20">
          <div className="text-center mb-12">
            <h3 className={`text-2xl md:text-4xl font-bold mb-4 text-white ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              {language === 'en' ? 'Competition Robots' : 'Robots de competencia'}
            </h3>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Swipe indicator */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-4 text-primary animate-pulse">
              <ChevronsRight className="h-5 w-5" />
              <span className="text-sm font-semibold">{t('carousel.swipe')}</span>
              <ChevronsRight className="h-5 w-5" />
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {robots.map((robot) => (
                  <CarouselItem key={robot.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                    <Card className="h-full border-2 border-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={robot.image}
                          alt={language === 'en' ? robot.nameEn : robot.nameEs}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardContent className="p-6 md:p-8 text-black">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Trophy className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1 text-black">{language === 'en' ? robot.nameEn : robot.nameEs}</h3>
                            <p className="text-primary font-medium">{language === 'en' ? robot.competitionEn : robot.competitionEs}</p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary">
                            <span className="text-sm font-bold text-primary">{language === 'en' ? robot.positionEn : robot.positionEs}</span>
                          </div>
                        </div>
                        <p className="text-black/80 leading-relaxed text-sm">
                          {language === 'en' ? robot.descriptionEn : robot.descriptionEs}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
