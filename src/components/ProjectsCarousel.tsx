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
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Autonomous Drone System',
    description: 'AI-powered drone navigation system with real-time obstacle avoidance.',
    tags: ['Python', 'ROS2', 'Computer Vision'],
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 2,
    title: 'Smart Home Controller',
    description: 'IoT platform for home automation with voice control and mobile app.',
    tags: ['React', 'Node.js', 'ESP32'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 3,
    title: 'Industrial Robot Arm',
    description: 'Custom 6-DOF robotic arm with precision control for manufacturing.',
    tags: ['C++', 'ROS', 'CAD'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 4,
    title: 'ML Pipeline Framework',
    description: 'Automated machine learning pipeline for data processing and model training.',
    tags: ['Python', 'TensorFlow', 'Docker'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 5,
    title: 'Real-time Analytics Dashboard',
    description: 'Live monitoring system for industrial equipment with predictive maintenance.',
    tags: ['React', 'WebSocket', 'D3.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

const ProjectsCarousel = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-20 md:py-32 bg-card">
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
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-4">
              {projects.map((project) => (
                <CarouselItem key={project.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
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
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {project.description}
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
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
