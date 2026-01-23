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
import ChatbotSection from '@/components/ChatbotSection';
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
          <ExperienceCarousel />
          <CompetitionsSection />
          <ProjectsCarousel />
          <SkillsSection />
          <BadgesSection />
          <AboutSection />
          <ChatbotSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
