import { useCallback, useState } from 'react';
import I18n from '@/i18n';

type Language = 'en' | 'es';

export function useI18n() {
  const [locale, setLocale] = useState<Language>(
    (I18n.locale as Language) || 'en'
  );

  const t = useCallback((key: string, options?: Record<string, any>) => {
    return I18n.t(key, options);
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    I18n.locale = lang;
    setLocale(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = locale === 'en' ? 'es' : 'en';
    changeLanguage(newLang);
  }, [locale, changeLanguage]);

  return {
    t,
    locale,
    changeLanguage,
    toggleLanguage,
  };
}
