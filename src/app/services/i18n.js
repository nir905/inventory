import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import he from "./he.json";

const resources = {
  en: { translation: en },
  he: { translation: he },
};

const getDefaultLang = () => {
  try {
    return JSON.parse(localStorage.getItem("lang"));
  } catch (err) {
    return "en";
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDefaultLang(),
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
