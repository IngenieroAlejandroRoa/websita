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
      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors font-bold"
    >
      <Globe className="h-4 w-4" />
      <span className="font-bold">{language === 'en' ? 'ES' : 'EN'}</span>
    </Button>
  );
};

export default LanguageToggle;
