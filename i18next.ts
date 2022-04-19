import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'ru',
  lng: 'ru',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru: {
      translation: {
        test: 'тест',
      },
    },
  },
});

export default i18n;
