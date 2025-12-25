import { LanguageProvider } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import AboutSection from '@/components/AboutSection';
import ExperienceCarousel from '@/components/ExperienceCarousel';
import SkillsSection from '@/components/SkillsSection';
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
          <SkillsSection />
          <ProjectsCarousel />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
