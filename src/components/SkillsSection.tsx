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
import {
  Code,
  Cpu,
  Database,
  Globe,
  Wrench,
  Zap,
  Target,
  BookOpen,
  Award,
  Rocket,
  Brain,
  Cog,
  Box,
  CircuitBoard,
  Printer,
  Boxes,
  Smartphone,
  Bot,
  Cloud,
  Users,
  TrendingUp,
  Crosshair,
  Eye,
} from 'lucide-react';

const learningItems = [
  { name: 'Machine Learning & Deep Learning', nameEs: 'Machine Learning y Deep Learning', icon: Brain, progress: 60 },
  { name: 'Advanced Robotics: ROS 2, URDF, ISAAC SIM', nameEs: 'Robótica Avanzada: ROS 2, URDF, ISAAC SIM', icon: Cpu, progress: 70 },
  { name: 'Cloud Architecture', nameEs: 'Arquitectura en la Nube', icon: Globe, progress: 45 },
  { name: 'IoT Systems ESP32', nameEs: 'Sistemas IoT ESP32', icon: Zap, progress: 55 },
  { name: 'Linux & Raspberry Pi', nameEs: 'Linux y Raspberry Pi', icon: Code, progress: 65 },
  { name: 'Computer Vision', nameEs: 'Visión por Computador', icon: Target, progress: 50 },
];

const skills = [
  { name: 'Leadership', nameEs: 'Liderazgo', icon: Users },
  { name: 'Persistence', nameEs: 'Persistencia', icon: TrendingUp },
  { name: 'Discipline', nameEs: 'Disciplina', icon: Crosshair },
  { name: 'Algorithms', nameEs: 'Algoritmos', icon: Code },
  { name: '3D Design', nameEs: 'Diseño 3D', icon: Box },
  { name: 'PCB Design', nameEs: 'Diseño de Circuitos Impresos', icon: CircuitBoard },
  { name: '3D Printing', nameEs: 'Impresión 3D', icon: Printer },
  { name: 'Prototyping', nameEs: 'Prototipado', icon: Boxes },
  { name: 'Web & Mobile Development', nameEs: 'Desarrollo Web y Móvil', icon: Smartphone },
  { name: 'Robotics', nameEs: 'Robótica', icon: Bot },
  { name: 'Cloud Architecture', nameEs: 'Arquitectura de Nube', icon: Cloud },
  { name: 'Computer Vision', nameEs: 'Visión Artificial', icon: Eye },
];

const upcomingGoals = [
  { title: 'Robot Angel IDE #1 de Robótica', titleEn: 'Make Robot Angel the #1 Robotics IDE', icon: Rocket },
  { title: 'Certificación AI Engineer AWS', titleEn: 'AWS AI Engineer Certification', icon: Brain },
  { title: 'Campeón Robot Batalla 1L', titleEn: 'Robot Battle 1L Champion', icon: Award },
  { title: 'Campeón de Hackathon', titleEn: 'Hackathon Champion', icon: Award },
  { title: 'Terminar las 2 Ingenierías', titleEn: 'Complete Both Engineering Degrees', icon: BookOpen },
  { title: 'Certificación CSWP SolidWorks', titleEn: 'CSWP SolidWorks Certification', icon: Cog },
  { title: 'Máster en Inteligencia Artificial', titleEn: 'Master\'s in Artificial Intelligence', icon: Brain },
  { title: '10,000 Seguidores Corto Circuito', titleEn: '10,000 Followers for Short Circuit', icon: Target },
];

const roboticsSkills = [
  { name: 'ROS/ROS2', level: 90 },
  { name: 'Python', level: 95 },
  { name: 'C++', level: 85 },
  { name: 'MATLAB', level: 80 },
  { name: 'Arduino/ESP32', level: 90 },
  { name: 'PCB Design', level: 75 },
  { name: 'CAD (SolidWorks)', level: 85 },
  { name: 'PLC Programming', level: 70 },
];

const SkillsSection = () => {
  const { t, language } = useLanguage();
  const { ref, isInView } = useInView();

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32 bg-black text-white" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {t('skills.title')}
          </h2>
        </div>

        {/* Upcoming Goals Carousel */}
        <div className="mb-20">
          <h3
            className={`text-2xl font-bold mb-8 text-center ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <Target className="inline-block mr-2 h-6 w-6 text-primary" />
            {t('skills.goals')}
          </h3>
          <div className="max-w-4xl mx-auto">
            <Carousel opts={{ align: 'start', loop: true }}>
              <CarouselContent className="-ml-4">
                {upcomingGoals.map((goal, index) => (
                  <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <goal.icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-medium">{language === 'en' ? goal.titleEn : goal.title}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-primary text-white hover:bg-primary/90" />
              <CarouselNext className="hidden md:flex -right-12 bg-primary text-white hover:bg-primary/90" />
            </Carousel>
          </div>
        </div>

        {/* Learning Grid */}
        <div className="mb-20">
          <h3
            className={`text-2xl font-bold mb-8 text-center ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <BookOpen className="inline-block mr-2 h-6 w-6 text-primary" />
            {t('skills.learning')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {learningItems.map((item, index) => (
              <Card
                key={item.name}
                className={`group hover:shadow-lg transition-all duration-300 border-0 ${
                  isInView ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <CardContent className="p-4 text-center">
                  <div className="relative mx-auto w-16 h-16 mb-3">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-muted/30"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${item.progress * 1.76} 176`}
                        className="text-primary transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{language === 'en' ? item.name : item.nameEs}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-20">
          <h3
            className={`text-2xl font-bold mb-8 text-center ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            <Wrench className="inline-block mr-2 h-6 w-6 text-primary" />
            Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <Card
                key={skill.name}
                className={`group hover:shadow-lg transition-all duration-300 border-0 hover:scale-105 ${
                  isInView ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.5 + index * 0.05}s` }}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <skill.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{language === 'en' ? skill.name : skill.nameEs}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default SkillsSection;
