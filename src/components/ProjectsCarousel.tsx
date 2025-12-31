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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ChevronRight, ChevronsRight } from 'lucide-react';
import nasaImg from '@/assets/proyectos/Analisis de datos de la NASA.png';
import visionImg from '@/assets/proyectos/Automatización con vision artifical.jpeg';
import brazoImg from '@/assets/proyectos/Brazo robotico con Vision Artificial.jpeg';
import guitarImg from '@/assets/proyectos/GuitarBot.jpeg';

const projects = [
  {
    id: 1,
    title: 'NASA Data Analysis',
    titleEs: 'Análisis de Datos de la NASA',
    description: 'Data analysis and visualization project using NASA datasets.',
    descriptionEs: 'Proyecto de análisis y visualización de datos utilizando conjuntos de datos de la NASA.',
    tags: ['Python', 'Data Science', 'Visualization'],
    image: nasaImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 2,
    title: 'Automation with Computer Vision',
    titleEs: 'Automatización con Visión Artificial',
    description: 'Automated system using computer vision for industrial applications.',
    descriptionEs: 'Sistema automatizado usando visión artificial para aplicaciones industriales.',
    tags: ['Python', 'OpenCV', 'AI'],
    image: visionImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 3,
    title: 'Robotic Arm with Computer Vision',
    titleEs: 'Brazo Robótico con Visión Artificial',
    description: 'Robotic arm integrated with computer vision for precision control.',
    descriptionEs: 'Brazo robótico integrado con visión artificial para control de precisión.',
    tags: ['ROS', 'Computer Vision', 'Robotics'],
    image: brazoImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 4,
    title: 'GuitarBot',
    titleEs: 'GuitarBot',
    description: 'Automated guitar playing robot with musical note recognition.',
    descriptionEs: 'Robot que toca guitarra automáticamente con reconocimiento de notas musicales.',
    tags: ['Arduino', 'Robotics', 'Music'],
    image: guitarImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
];

const ProjectsCarousel = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView();

  // Duplicate projects for infinite loop
  const loopedProjects = [...projects, ...projects];

  return (
    <section id="all-projects" ref={ref} className="py-20 md:py-32 bg-white text-black" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {t('projects.title')}
          </h2>
          <p
            className={`text-lg text-muted-foreground ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {t('projects.subtitle')}
          </p>
        </div>

        <div
          className={`max-w-6xl mx-auto ${isInView ? 'animate-slide-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          {/* Swipe indicator */}
          <div className="flex items-center justify-center gap-2 mb-4 text-primary animate-pulse">
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
              {loopedProjects.map((project, index) => (
                <CarouselItem key={`${project.id}-${index}`} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="group overflow-hidden border-2 border-black shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={language === 'en' ? project.title : project.titleEs}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex-1"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6 text-black">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {language === 'en' ? project.title : project.titleEs}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {language === 'en' ? project.description : project.descriptionEs}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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

export default ProjectsCarousel;
