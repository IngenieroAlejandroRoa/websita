import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { Award } from 'lucide-react';

const BadgesSection = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView();

  return (
    <section id="badges" ref={ref} className="py-20 md:py-32 bg-white text-black" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            {t('badges.title')}
          </h2>
          <p
            className={`text-lg text-muted-foreground ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            {t('badges.subtitle')}
          </p>
        </div>

        {/* Credly Profile Link */}
        <div className="max-w-2xl mx-auto">
          <a
            href="https://www.credly.com/users/alejandro-roa-aparicio"
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-2xl group ${
              isInView ? 'animate-scale-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Award className="h-12 w-12 text-primary group-hover:text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black group-hover:text-primary transition-colors">
                  {t('badges.credlyTitle')}
                </h3>
                <p className="text-muted-foreground">{t('badges.credlyDesc')}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
              <span>{t('badges.viewBadges')}</span>
              <Award className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BadgesSection;
