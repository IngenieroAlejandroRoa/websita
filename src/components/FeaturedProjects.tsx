import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Lightbulb, Bot } from 'lucide-react';
import shortCircuitImg from '@/assets/short-circuit-project.jpg';
import angelRobotImg from '@/assets/angel-robot-project.jpg';
import { useInView } from '@/hooks/useInView';

const FeaturedProjects = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  const projects = [
    {
      id: 'shortcircuit',
      title: t('featured.shortcircuit.title'),
      subtitle: t('featured.shortcircuit.subtitle'),
      description: t('featured.shortcircuit.desc'),
      image: shortCircuitImg,
      icon: Lightbulb,
      color: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      id: 'angelrobot',
      title: t('featured.angelrobot.title'),
      subtitle: t('featured.angelrobot.subtitle'),
      description: t('featured.angelrobot.desc'),
      image: angelRobotImg,
      icon: Bot,
      color: 'from-blue-500/20 to-purple-500/20',
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-card" ref={ref}>
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
            className={`text-lg text-muted-foreground max-w-2xl mx-auto ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 ${
                isInView ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-3 rounded-full bg-card/90 backdrop-blur-sm">
                  <project.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardContent className="p-6 md:p-8">
                <span className="text-sm font-medium text-primary mb-2 block">
                  {project.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                <Button
                  variant="ghost"
                  className="group/btn text-primary hover:text-primary hover:bg-primary/10 p-0"
                >
                  {t('featured.learnmore')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
