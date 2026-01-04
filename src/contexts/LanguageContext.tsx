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
    'nav.logo': 'Engineer Alejandro Roa',
    'nav.home': 'Home',
    'nav.projects': 'Featured',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.competitions': 'Competitions',
    'nav.skills': 'Skills',
    'nav.badges': 'Badges',
    'nav.allprojects': 'Projects',
    'nav.chatbot': 'Chat',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.greeting': 'Hello, I am',
    'hero.name': 'Alejandro Roa',
    'hero.title1': 'Mechatronics Engineer',
    'hero.title2': 'Software Engineer',
    'hero.focus': 'Focus on robotics and applied artificial intelligence, from physical integration and computer vision to automation and scalable cloud solutions.',
    'hero.cta': 'View My Work',
    'hero.contact': 'Contact Me',
    
    // Carousel
    'carousel.swipe': 'Swipe to see more',
    
    // Featured Projects
    'featured.title': 'Featured Projects',
    'featured.subtitle': 'Innovative solutions that make a difference',
    'featured.shortcircuit.title': 'Corto Circuito - Science Outreach',
    'featured.shortcircuit.subtitle': 'Science Outreach',
    'featured.shortcircuit.desc': 'This is a project where I share tips, explain concepts and projects, and seek to transmit my love for science and engineering with the aim of someday inspiring at least one person to find what they love and dedicate themselves to it, hoping that passion and flame is the same one I overflow with for this profession. I invite you to take a look at the reels, the links are below (I recommend Instagram).',
    'featured.angelrobot.title': 'Robot Angel - Open Source Robotics IDE',
    'featured.angelrobot.subtitle': 'Open Source Robotics IDE',
    'featured.angelrobot.desc': 'Born as my systems engineering degree project but with a much more ambitious goal: to become the #1 robotics-dedicated IDE worldwide. It is a 100% open-source project to democratize robotics one dreamer at a time. I invite you to take a look at the code and contribute or learn about everything it offers on its page to start using it. The links are below.',
    'featured.learnmore': 'Learn More',
    
    // About
    'about.title': 'The Engineer Behind the Screen',
    'about.description': 'Behind this profession, I am a passionate person who overflows with intensity, for basketball, being a university champion. I participate in powerlifting, love my family, partner, and friends intensely, enjoy driving, good cinema, art, and philosophy—how not to be entertained with Diogenes the dog? And of course, I am a geek passionate about technology and science. But above all, I am a dreamer, and right now there is one very big goal: someday, my own research and development center in Bogotá, Colombia, supporting the talent from where I grew up.',
    
    // Experience
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional journey',
    'experience.0.title': 'Research Intern',
    'experience.0.company': 'Innovation and Transfer Management, Universidad EAN',
    'experience.0.period': 'Present',
    'experience.0.description': 'Developing an environmental monitoring system with real-time visualization and prediction for the research management of Universidad EAN.',
    'experience.1.title': 'Junior Programmer',
    'experience.1.company': 'Freelancer',
    'experience.1.period': '2025',
    'experience.1.description': 'Developed a Linux simulation with Geolandspill for crude oil spill modeling for an oil company.',
    'experience.2.title': 'Assistant Teacher',
    'experience.2.company': 'Fundación Nuevo Amanecer ESAL Chocó and Universidad EAN',
    'experience.2.period': '2025',
    'experience.2.description': 'Taught classes in the STEMChocó project, achieving the construction of a CANSAT with low-income girls.',
    'experience.3.title': 'University Tutor - Circuits',
    'experience.3.company': 'Universidad EAN',
    'experience.3.period': '2025',
    'experience.3.description': 'Provided tutoring and collaborated in directing class laboratories for the Circuits subject.',
    'experience.4.title': 'University Tutor - Electronics',
    'experience.4.company': 'Universidad EAN',
    'experience.4.period': '2025',
    'experience.4.description': 'Provided tutoring and collaborated in directing class laboratories for the Electronics subject.',
    
    // Competitions
    'competitions.title': 'Competitions & Hackathons',
    'competitions.description': 'Throughout my career, I have participated in various competitions and hackathons that have challenged my technical skills and teamwork abilities. These experiences have been fundamental in my professional development, allowing me to apply my knowledge in real-world scenarios and learn from other talented professionals.',
    
    // Skills
    'skills.title': 'Goals & Skills',
    'skills.learning': 'Currently Learning',
    'skills.goals': 'Upcoming Goals',
    'skills.robotics': 'Robotics & Programming',
    
    // Badges
    'badges.title': 'Badges',
    'badges.subtitle': 'Professional certifications and achievements',
    'badges.credlyTitle': 'View My Badges',
    'badges.credlyDesc': 'Verified certifications on Credly',
    'badges.viewBadges': 'Open Credly Profile',
    
    // Projects
    'projects.title': 'Other interesting projects...',
    'projects.subtitle': 'A collection of my work',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s build something amazing together',
    'contact.services': 'Services I Offer',
    'contact.service1': '3D Design',
    'contact.service2': 'Web and Mobile Development',
    'contact.service3': 'Circuit Design',
    'contact.service4': 'Prototyping',
    'contact.service5': 'Consulting',
    'contact.service6': 'Robotics Consulting',
    'contact.service7': 'Engineering Tutoring',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    'contact.follow': 'Follow Me',
    
    // Footer
    'footer.sourceCode': 'Website source code',
    'footer.lastUpdate': 'Last updated December 2025 by',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    // Navigation
    'nav.logo': 'Ingeniero Alejandro Roa',
    'nav.home': 'Inicio',
    'nav.projects': 'Destacados',
    'nav.about': 'Sobre Mí',
    'nav.experience': 'Experiencia',
    'nav.competitions': 'Competencias',
    'nav.skills': 'Habilidades',
    'nav.badges': 'Insignias',
    'nav.allprojects': 'Proyectos',
    'nav.chatbot': 'Chat',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Alejandro Roa',
    'hero.title1': 'Ingeniero Mecatrónico',
    'hero.title2': 'Ingeniero de Software',
    'hero.focus': 'Enfoque en robótica e inteligencia artificial aplicada, desde la integración física y visión artificial hasta la automatización y soluciones cloud escalables.',
    'hero.cta': 'Ver Mi Trabajo',
    'hero.contact': 'Contáctame',
    
    // Carousel
    'carousel.swipe': 'Desliza para ver más',
    
    // Featured Projects
    'featured.title': 'Proyectos Destacados',
    'featured.subtitle': 'Soluciones innovadoras que marcan la diferencia',
    'featured.shortcircuit.title': 'Corto Circuito - Divulgación Científica',
    'featured.shortcircuit.subtitle': 'Divulgación Científica',
    'featured.shortcircuit.desc': 'Este es un proyecto en el que comparto tips, explico conceptos, proyectos y busco transmitir mi amor por la ciencia e ingeniería con el fin de algún día inspirar al menos a 1 persona a encontrar lo que ama y dedicarse a eso, esperando que esa pasión y esa llama sea la misma que desbordo por esta profesión. Te invito a darle un vistazo a los reels, aquí abajo están los links (Te recomiendo Instagram).',
    'featured.angelrobot.title': 'Robot Angel - Open Source Robotics IDE',
    'featured.angelrobot.subtitle': 'IDE de Robótica Open Source',
    'featured.angelrobot.desc': 'Nace como mi proyecto de grado de ingeniería de sistemas pero con una meta mucho más ambiciosa, convertirse en el IDE dedicado a robótica #1 a nivel mundial. Es un proyecto 100% open source para democratizar la robótica 1 soñador a la vez. Te invito a echarle un ojo al código y contribuir o aprender sobre todo lo que ofrece en su página para empezar a usarlo, dejo los links aquí abajo.',
    'featured.learnmore': 'Saber Más',
    
    // Acerca de
    'about.title': 'El Ingeniero Detrás de la Pantalla',
    'about.description': 'Detrás de esta profesión soy una persona apasionada, desbordante de intensidad, por el basketball siendo campeón universitario, participo en powerlifting, amo con intensidad a mi familia, pareja y amigos, me encanta conducir, el buen cine, el arte, la filosofía, cómo no entretenerse con Diógenes el perro, y por supuesto soy un geek apasionado por la tecnología y la ciencia, pero sobre todo soy un soñador y en este momento hay 1 objetivo muy grande, algún día mi propio centro de investigación y desarrollo en Bogotá Colombia apoyando el talento de donde crecí.',
    
    // Experiencia
    'experience.title': 'Experiencia Laboral',
    'experience.subtitle': 'Mi trayectoria profesional',
    'experience.0.title': 'Investigador Interno',
    'experience.0.company': 'Gerencia de Innovación y Transferencia, Universidad EAN',
    'experience.0.period': 'Presente',
    'experience.0.description': 'Desarrollando un sistema de monitoreo ambiental con visualización y predicción en tiempo real para la gerencia de investigación de la Universidad EAN.',
    'experience.1.title': 'Programador Junior',
    'experience.1.company': 'Freelancer',
    'experience.1.period': '2025',
    'experience.1.description': 'Desarrollé una simulación en Linux con Geolandspill sobre el derrame de crudo para una petrolera.',
    'experience.2.title': 'Profesor Asistente',
    'experience.2.company': 'Fundación Nuevo Amanecer ESAL Chocó y Universidad EAN',
    'experience.2.period': '2025',
    'experience.2.description': 'Impartí clases en el proyecto STEMChocó, con las cuales logramos realizar un CANSAT con niñas de bajos recursos.',
    'experience.3.title': 'Monitor Universitario - Circuitos',
    'experience.3.company': 'Universidad EAN',
    'experience.3.period': '2025',
    'experience.3.description': 'Impartí monitorías y colaboré en la dirección de laboratorios de clase para la materia de Circuitos.',
    'experience.4.title': 'Monitor Universitario - Electrónica',
    'experience.4.company': 'Universidad EAN',
    'experience.4.period': '2025',
    'experience.4.description': 'Impartí monitorías y colaboré en la dirección de laboratorios de clase para la materia de Electrónica.',
    
    // Competencias
    'competitions.title': 'Competencias y Hackatones',
    'competitions.description': 'A lo largo de mi carrera, he participado en diversas competencias y hackatones que han desafiado mis habilidades técnicas y capacidad de trabajo en equipo. Estas experiencias han sido fundamentales en mi desarrollo profesional, permitiéndome aplicar mis conocimientos en escenarios del mundo real y aprender de otros profesionales talentosos.',
    
    // Habilidades
    'skills.title': 'Metas y Habilidades',
    'skills.learning': 'Aprendiendo Actualmente',
    'skills.goals': 'Próximas Metas',
    'skills.robotics': 'Robótica y Programación',
    
    // Insignias
    'badges.title': 'Insignias',
    'badges.subtitle': 'Certificaciones profesionales y logros',
    'badges.credlyTitle': 'Ver Mis Insignias',
    'badges.credlyDesc': 'Certificaciones verificadas en Credly',
    'badges.viewBadges': 'Abrir Perfil de Credly',
    
    // Projects
    'projects.title': 'Otros proyectos interesantes...',
    'projects.subtitle': 'Una colección de mi trabajo',
    
    // Contact
    'contact.title': 'Contáctame',
    'contact.subtitle': 'Construyamos algo increíble juntos',
    'contact.services': 'Servicios que Ofrezco',
    'contact.service1': 'Diseño 3D',
    'contact.service2': 'Desarrollo Web y Móvil',
    'contact.service3': 'Diseño de Circuitos',
    'contact.service4': 'Prototipado',
    'contact.service5': 'Consultorías',
    'contact.service6': 'Asesoría con Robots',
    'contact.service7': 'Tutorías de Ingeniería',
    'contact.name': 'Nombre',
    'contact.email': 'Correo',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.success': '¡Mensaje enviado exitosamente!',
    'contact.follow': 'Sígueme',
    
    // Footer
    'footer.sourceCode': 'Código fuente de la web',
    'footer.lastUpdate': 'Última actualización diciembre 2025 por',
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
