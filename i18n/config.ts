import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import zhCommon from './locales/zh/common';
import enCommon from './locales/en/common';

const resources = {
  zh: {
    common: zhCommon,
  },
  en: {
    common: enCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    defaultNS: 'common',
    ns: ['common'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
