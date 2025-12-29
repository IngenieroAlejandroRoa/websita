import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { Trophy, Award, Medal, Target, Zap, Code, Rocket, Users, Crown, Star } from 'lucide-react';
import photo1 from '@/assets/competencias/1.jpeg';
import photo2 from '@/assets/competencias/2.jpeg';
import photo3 from '@/assets/competencias/3.jpeg';
import photo4 from '@/assets/competencias/4.jpeg';
import photo5 from '@/assets/competencias/5.jpeg';
import photo6 from '@/assets/competencias/6.jpeg';
import photo7 from '@/assets/competencias/7.jpeg';

const CompetitionsSection = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 800);

    return () => clearInterval(interval);
  }, [photos.length]);

  const highlights = [
    { icon: Trophy, label: 'NASA Challenge', labelEn: 'NASA Challenge' },
    { icon: Medal, label: 'Robótica', labelEn: 'Robotics' },
    { icon: Award, label: 'Hackathon', labelEn: 'Hackathon' },
    { icon: Target, label: 'Innovación', labelEn: 'Innovation' },
    { icon: Zap, label: 'Rapidez', labelEn: 'Speed' },
    { icon: Code, label: 'Programación', labelEn: 'Programming' },
    { icon: Rocket, label: 'Lanzamiento', labelEn: 'Launch' },
    { icon: Users, label: 'Equipo', labelEn: 'Team' },
    { icon: Crown, label: 'Ganador', labelEn: 'Winner' },
    { icon: Star, label: 'Excelencia', labelEn: 'Excellence' },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white text-black relative overflow-hidden" data-aos="fade-up">
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
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
                {t('competitions.title')}
              </h2>
              <p className={`text-lg text-muted-foreground leading-relaxed mb-8 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                {t('competitions.description')}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={`p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col items-center justify-center text-center ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <item.icon className="h-8 w-8 text-primary mb-2" />
                    <span className="font-medium text-sm">{language === 'en' ? item.labelEn : item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionsSection;
