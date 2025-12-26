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
} from 'lucide-react';

const learningItems = [
  { name: 'Machine Learning', icon: Brain, progress: 60 },
  { name: 'Cloud Architecture', icon: Globe, progress: 45 },
  { name: 'Advanced Robotics', icon: Cpu, progress: 70 },
  { name: 'Rust Programming', icon: Code, progress: 30 },
  { name: 'IoT Systems', icon: Zap, progress: 55 },
  { name: 'Computer Vision', icon: Target, progress: 50 },
];

const upcomingGoals = [
  { title: 'AWS Solutions Architect Certification', icon: Award },
  { title: 'Launch Open Source Robot Framework', icon: Rocket },
  { title: 'Complete PhD in Robotics', icon: BookOpen },
  { title: 'Build AI-Powered Home Assistant', icon: Brain },
  { title: 'Contribute to ROS2 Core', icon: Cog },
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
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32 bg-white text-black" data-aos="fade-up">
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
                  <span className="text-sm font-medium">{item.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
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
                        <span className="font-medium">{goal.title}</span>
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

        {/* Robotics & Programming Skills Carousel */}
        <div className="mb-20">
          <h3
            className={`text-2xl font-bold mb-8 text-center ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            <Cog className="inline-block mr-2 h-6 w-6 text-primary" />
            {t('skills.robotics')}
          </h3>
          <div className="max-w-5xl mx-auto">
            <Carousel opts={{ align: 'start', loop: true }}>
              <CarouselContent className="-ml-4">
                {roboticsSkills.map((skill, index) => (
                  <CarouselItem key={index} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="secondary">{skill.level}%</Badge>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
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


      </div>
    </section>
  );
};

export default SkillsSection;
