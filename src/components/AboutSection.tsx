import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { Heart, Users, Dumbbell, CircleDot, Car, BookOpen, Palette, Film, Gamepad2 } from 'lucide-react';
import photo1 from '@/assets/about me/1.jpeg';
import photo2 from '@/assets/about me/2.jpeg';
import photo3 from '@/assets/about me/3.jpeg';
import photo4 from '@/assets/about me/4.jpeg';
import photo5 from '@/assets/about me/5.jpeg';
import photo6 from '@/assets/about me/6.jpeg';
import photo7 from '@/assets/about me/7.jpeg';

const AboutSection = () => {
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
    { icon: Heart, label: 'Familia', labelEn: 'Family' },
    { icon: Heart, label: 'Pareja', labelEn: 'Partner' },
    { icon: Users, label: 'Amigos', labelEn: 'Friends' },
    { icon: Dumbbell, label: 'Gym', labelEn: 'Gym' },
    { icon: CircleDot, label: 'Basketball', labelEn: 'Basketball' },
    { icon: Car, label: 'Conducir', labelEn: 'Driving' },
    { icon: BookOpen, label: 'Filosofía', labelEn: 'Philosophy' },
    { icon: Palette, label: 'Arte', labelEn: 'Art' },
    { icon: Film, label: 'Cine', labelEn: 'Cinema' },
    { icon: Gamepad2, label: 'Geek', labelEn: 'Geek' },
  ];

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-black text-white relative overflow-hidden" data-aos="fade-up">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 text-white ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
                {t('about.title')}
              </h2>
              <p className={`text-lg text-white/80 leading-relaxed mb-8 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                {t('about.description')}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className={`p-4 rounded-lg bg-card border border-border hover:border-red-600/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <item.icon className="h-8 w-8 text-red-600 mb-2" />
                    <span className="font-bold text-sm text-black">{language === 'en' ? item.labelEn : item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
                  <img
                    src={photos[currentPhotoIndex]}
                    alt={`About me ${currentPhotoIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
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
