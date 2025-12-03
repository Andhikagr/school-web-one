import i18next from "i18next";
import { initReactI18next, Translation } from "react-i18next";
import { navbarLang } from "./navbar_lang";
import { berandaLang } from "./beranda_lang";
import { footerLang } from "./footer_lang";
import { getLangResource } from "./help_lang";
import { slideLang } from "./slide_lang";

const savedLang = localStorage.getItem("lang") || "id";

i18next.use(initReactI18next).init({
  resources: {
    id: {
      translation: {
        navbar: getLangResource(navbarLang, "id"),
        home: getLangResource(berandaLang, "id"),
        slider: getLangResource(slideLang, "id"),
        footer: getLangResource(footerLang, "id"),
      },
    },
    en: {
      translation: {
        navbar: getLangResource(navbarLang, "en"),
        home: getLangResource(berandaLang, "en"),
        slider: getLangResource(slideLang, "en"),
        footer: getLangResource(footerLang, "en"),
      },
    },
    ar: {
      translation: {
        navbar: getLangResource(navbarLang, "ar"),
        home: getLangResource(berandaLang, "ar"),
        slider: getLangResource(slideLang, "ar"),
        footer: getLangResource(footerLang, "ar"),
      },
    },
  },
  lng: savedLang,
  fallbackLng: "id",
  interpolation: { escapeValue: false },
});

i18next.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18next;
