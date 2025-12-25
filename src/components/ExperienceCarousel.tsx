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

const experiences = [
  {
    id: 1,
    title: 'Senior Robotics Engineer',
    company: 'Tech Innovations Inc.',
    period: '2022 - Present',
    description: 'Leading the development of autonomous robotic systems and AI integration projects.',
  },
  {
    id: 2,
    title: 'Software Engineer',
    company: 'Digital Solutions Lab',
    period: '2020 - 2022',
    description: 'Developed full-stack applications and embedded systems for industrial automation.',
  },
  {
    id: 3,
    title: 'Mechatronics Developer',
    company: 'Automation Systems Co.',
    period: '2018 - 2020',
    description: 'Designed and implemented control systems for manufacturing equipment.',
  },
  {
    id: 4,
    title: 'Research Assistant',
    company: 'University Research Lab',
    period: '2016 - 2018',
    description: 'Conducted research on human-robot interaction and machine learning applications.',
  },
];

const ExperienceCarousel = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
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

        <div
          className={`max-w-5xl mx-auto ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
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
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{exp.period}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ExperienceCarousel;
