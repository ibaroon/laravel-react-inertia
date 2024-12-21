import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from '../public/locales/en/translation.json';
import translationAr from '../public/locales/ar/translation.json';


// const fallbackLng = ['en'];
// const availableLanguages = ['en', 'ar'];
const resources ={
  en:{translation: translationEn},
  ar:{translation: translationAr}
};
i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng : "en",
    keySeparator:".",
       detection: {
        // order and from where user language should be detected
        order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      
        // keys or params to lookup language from
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,
      
        // cache user language on
        caches: ['localStorage', 'cookie'],
        excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
      
        // optional expiry and domain for set cookie
        cookieMinutes: 10,
      
        // optional htmlTag with lang attribute, the default is:
        htmlTag: document.documentElement,
      
        // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
        cookieOptions: { path: '/', sameSite: 'strict' },
      
        // optional conversion function used to modify the detected language code
        convertDetectedLanguage: 'Iso15897',
        convertDetectedLanguage: (lng) => lng.replace('-', '_')
      },
    interpolation: {
        format: (value, format, lng) => {
            // ...
            if (format === "date") {
              return new Intl.DateTimeFormat(lng).format(value);
            }
            if (format === "currency") {
              return new Intl.NumberFormat(lng, {
                style: "currency",
                currency: "USD",
              }).format(value);
            }
          },
           escapeValue: false // react already safes from xss
      },
      react: {
        wait: true,
        bindI18n: "languageChanged loaded",
        bindStore: "added removed",
        nsMode: "default"
      }
  });

export default i18n;