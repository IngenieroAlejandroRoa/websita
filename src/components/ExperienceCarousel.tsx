import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Calendar, ChevronsRight } from 'lucide-react';
import researchImg from '@/assets/work experience/research.png';
import juniorImg from '@/assets/work experience/junior.jpg';
import teacherImg from '@/assets/work experience/teacher.png';
import circuitsImg from '@/assets/work experience/circuits.jpeg';
import electronicImg from '@/assets/work experience/electronic.jpeg';

const ExperienceCarousel = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  const experiences = [
    { id: 0, image: researchImg },
    { id: 1, image: juniorImg },
    { id: 2, image: teacherImg },
    { id: 3, image: circuitsImg },
    { id: 4, image: electronicImg },
  ];

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32 bg-white text-black relative overflow-hidden" data-aos="fade-up">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
            {t('experience.title')}
          </h2>
          <p
            className={`text-lg text-muted-foreground ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Mobile swipe indicator */}
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
              {experiences.map((exp) => (
                <CarouselItem key={exp.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full border-2 border-black overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={exp.image}
                        alt={t(`experience.${exp.id}.title`)}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardContent className="p-6 md:p-8 text-black">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{t(`experience.${exp.id}.title`)}</h3>
                          <p className="text-primary font-medium">{t(`experience.${exp.id}.company`)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{t(`experience.${exp.id}.period`)}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {t(`experience.${exp.id}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-primary text-white hover:bg-primary/90 border-0" />
            <CarouselNext className="hidden md:flex -right-12 bg-primary text-white hover:bg-primary/90 border-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ExperienceCarousel;
