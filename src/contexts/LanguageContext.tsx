import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Hello, I am',
    'hero.name': 'Alejandro Roa',
    'hero.title1': 'Mechatronics Engineer',
    'hero.title2': 'Software Engineer',
    'hero.cta': 'View My Work',
    'hero.contact': 'Contact Me',
    
    // Featured Projects
    'featured.title': 'Featured Projects',
    'featured.subtitle': 'Innovative solutions that make a difference',
    'featured.shortcircuit.title': 'Short Circuit',
    'featured.shortcircuit.subtitle': 'Science Outreach',
    'featured.shortcircuit.desc': 'Inspiring the next generation of engineers through hands-on electronics workshops and STEM education programs.',
    'featured.angelrobot.title': 'Angel Robot',
    'featured.angelrobot.subtitle': 'Open Source Robotics IDE',
    'featured.angelrobot.desc': 'An intuitive development environment for programming and controlling robotic systems with visual and code-based interfaces.',
    'featured.learnmore': 'Learn More',
    
    // About
    'about.title': 'The Engineer Behind the Screen',
    'about.description': 'Passionate about bridging the gap between hardware and software, I create innovative solutions that push the boundaries of what\'s possible in robotics and automation.',
    
    // Experience
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey',
    
    // Skills
    'skills.title': 'Skills & Expertise',
    'skills.learning': 'Currently Learning',
    'skills.goals': 'Upcoming Goals',
    'skills.robotics': 'Robotics & Programming',
    'skills.certificates': 'Certifications',
    
    // Projects
    'projects.title': 'All Projects',
    'projects.subtitle': 'A collection of my work',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s build something amazing together',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.experience': 'Experiencia',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Alejandro Roa',
    'hero.title1': 'Ingeniero Mecatrónico',
    'hero.title2': 'Ingeniero de Software',
    'hero.cta': 'Ver Mi Trabajo',
    'hero.contact': 'Contáctame',
    
    // Featured Projects
    'featured.title': 'Proyectos Destacados',
    'featured.subtitle': 'Soluciones innovadoras que marcan la diferencia',
    'featured.shortcircuit.title': 'Short Circuit',
    'featured.shortcircuit.subtitle': 'Divulgación Científica',
    'featured.shortcircuit.desc': 'Inspirando a la próxima generación de ingenieros a través de talleres prácticos de electrónica y programas de educación STEM.',
    'featured.angelrobot.title': 'Angel Robot',
    'featured.angelrobot.subtitle': 'IDE de Robótica Open Source',
    'featured.angelrobot.desc': 'Un entorno de desarrollo intuitivo para programar y controlar sistemas robóticos con interfaces visuales y basadas en código.',
    'featured.learnmore': 'Saber Más',
    
    // About
    'about.title': 'El Ingeniero Detrás de la Pantalla',
    'about.description': 'Apasionado por cerrar la brecha entre hardware y software, creo soluciones innovadoras que expanden los límites de lo posible en robótica y automatización.',
    
    // Experience
    'experience.title': 'Experiencia Laboral',
    'experience.subtitle': 'Mi trayectoria profesional',
    
    // Skills
    'skills.title': 'Habilidades y Experiencia',
    'skills.learning': 'Aprendiendo Actualmente',
    'skills.goals': 'Próximas Metas',
    'skills.robotics': 'Robótica y Programación',
    'skills.certificates': 'Certificaciones',
    
    // Projects
    'projects.title': 'Todos los Proyectos',
    'projects.subtitle': 'Una colección de mi trabajo',
    
    // Contact
    'contact.title': 'Contáctame',
    'contact.subtitle': 'Construyamos algo increíble juntos',
    'contact.name': 'Nombre',
    'contact.email': 'Correo',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.success': '¡Mensaje enviado exitosamente!',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
