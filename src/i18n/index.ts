import { getLocales } from 'expo-localization';
import I18n from 'i18n-js';

import en from './en.json';
import es from './es.json';

// Set the key-value pairs for the different languages
I18n.translations = {
  en: en,
  es: es,
};

// Set the locale once at the beginning of your app
const locales = getLocales();
const locale = locales[0]?.languageCode || 'es';

I18n.locale = locale.startsWith('en') ? 'en' : 'es';

// Enable fallback to English if a translation is missing in Spanish
I18n.enableFallback = true;
I18n.fallbacks = {
  es: 'en',
};

export default I18n;
