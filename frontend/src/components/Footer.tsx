import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xl font-bold text-primary">
            Alejandro Roa Aparicio
          </div>
          <p className="text-sm text-muted-foreground">
            <a 
              href="https://github.com/IngenieroAlejandroRoa/websita" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              {t('footer.sourceCode')}
            </a>
            . {t('footer.lastUpdate')} {' '}
            <a 
              href="https://alejandroroa.engineer/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              Alejandro Roa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
