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
import { Briefcase, Calendar } from 'lucide-react';

const ExperienceCarousel = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  const experiences = [0, 1, 2, 3, 4];

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32 bg-black text-white" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('experience.title')}
          </h2>
          <p
            className={`text-lg text-red-600 font-bold ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {t('experience.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {experiences.map((id) => (
                <CarouselItem key={id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full border-0">
                    <CardContent className="p-6 md:p-8 text-black">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{t(`experience.${id}.title`)}</h3>
                          <p className="text-primary font-medium">{t(`experience.${id}.company`)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{t(`experience.${id}.period`)}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {t(`experience.${id}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-red-600 text-white hover:bg-red-700 border-0" />
            <CarouselNext className="hidden md:flex -right-12 bg-red-600 text-white hover:bg-red-700 border-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ExperienceCarousel;
