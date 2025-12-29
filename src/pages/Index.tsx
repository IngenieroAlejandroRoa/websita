import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import AboutSection from '@/components/AboutSection';
import ExperienceCarousel from '@/components/ExperienceCarousel';
import CompetitionsSection from '@/components/CompetitionsSection';
import SkillsSection from '@/components/SkillsSection';
import BadgesSection from '@/components/BadgesSection';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturedProjects />
          <AboutSection />
          <ExperienceCarousel />
          <CompetitionsSection />
          <SkillsSection />
          <BadgesSection />
          <ProjectsCarousel />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
