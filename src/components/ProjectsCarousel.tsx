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
import chatbotImg from '@/assets/proyectos/chatbot.png';
import navegacionImg from '@/assets/proyectos/navegacionautonoma.png';
import servidorImg from '@/assets/proyectos/servidor.png';
import awsImg from '@/assets/proyectos/aws.png';

const projects = [
  {
    id: 1,
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
    id: 2,
    title: 'Serverless Cloud Architecture Design on AWS',
    titleEs: 'Diseño de Arquitectura Cloud Serverless en AWS',
    description: 'Serverless cloud architecture design using AWS services for scalable applications.',
    descriptionEs: 'Diseño de arquitectura cloud serverless utilizando servicios de AWS para aplicaciones escalables.',
    tags: ['AWS', 'Lambda', 'Serverless'],
    image: awsImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 3,
    title: 'Environmental Lab with Autonomous Navigation',
    titleEs: 'Laboratorio Ambiental con Navegación Autónoma',
    description: 'Autonomous robotic system for environmental monitoring and data collection.',
    descriptionEs: 'Sistema robótico autónomo para monitoreo ambiental y recolección de datos.',
    tags: ['ROS', 'Autonomous Navigation', 'IoT'],
    image: navegacionImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 4,
    title: 'ChatBot - Custom LMM Integration',
    titleEs: 'ChatBot - Integración de LMM Custom',
    description: 'Custom chatbot powered by Large Multimodal Models for enhanced interactions.',
    descriptionEs: 'ChatBot personalizado impulsado por Modelos de Lenguaje Multimodal para interacciones mejoradas.',
    tags: ['Python', 'LMM', 'AI'],
    image: chatbotImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 5,
    title: 'Machine Automation with Computer Vision',
    titleEs: 'Automatización de Máquinas con Visión Artificial',
    description: 'Automated system using computer vision for industrial machine control.',
    descriptionEs: 'Sistema automatizado usando visión artificial para control de maquinaria industrial.',
    tags: ['Python', 'OpenCV', 'Automation'],
    image: visionImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 6,
    title: 'GuitarBot - Guitar Playing Robot',
    titleEs: 'GuitarBot - Robot que Toca la Guitarra',
    description: 'Automated guitar playing robot with musical note recognition.',
    descriptionEs: 'Robot que toca guitarra automáticamente con reconocimiento de notas musicales.',
    tags: ['Arduino', 'Robotics', 'Music'],
    image: guitarImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 7,
    title: 'NASA Data Pipeline',
    titleEs: 'Pipeline de Datos de la NASA',
    description: 'Data pipeline and analysis project using NASA datasets.',
    descriptionEs: 'Pipeline y análisis de datos utilizando conjuntos de datos de la NASA.',
    tags: ['Python', 'Data Pipeline', 'NASA'],
    image: nasaImg,
    github: 'https://github.com/IngenieroAlejandroRoa',
    demo: 'https://github.com/IngenieroAlejandroRoa',
  },
  {
    id: 8,
    title: 'Own Server',
    titleEs: 'Servidor Propio',
    description: 'Custom server setup and configuration for hosting applications.',
    descriptionEs: 'Configuración de servidor personalizado para alojar aplicaciones.',
    tags: ['Linux', 'Server', 'DevOps'],
    image: servidorImg,
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
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
