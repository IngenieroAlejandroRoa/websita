import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'ES' : 'EN'}</span>
    </Button>
  );
};

export default LanguageToggle;
