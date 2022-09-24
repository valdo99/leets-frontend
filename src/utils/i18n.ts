import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../translations/en.json";
import itTranslation from "../translations/it.json";

const getLanguage = () => {
  if (typeof window === "undefined") return "en";

  const lang = localStorage.getItem("lng");
  if (!lang) return "en";

  if (["en", "it"].includes(lang)) return lang;
  return "en";
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: getLanguage(),
    fallbackLng: "it",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      it: {
        translation: itTranslation,
      },
    },
  });
