import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../translations/en.json";
import itTranslation from "../translations/it.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng:
      global?.window &&
      localStorage.getItem("lng") &&
      ["en", "it"].includes(localStorage.getItem("lng"))
        ? localStorage.getItem("lng")
        : "en",
    fallbackLng: "en",
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
