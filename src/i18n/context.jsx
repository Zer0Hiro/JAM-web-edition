import { createContext, useContext, useState, useCallback, useEffect } from "react";
import en from "./en";
import he from "./he";

const TRANSLATIONS = { en, he };
const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "he", label: "עברית", flag: "🇮🇱" },
];

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem("jam-lang") || "en";
  });

  const setLang = useCallback((code) => {
    setLangState(code);
    localStorage.setItem("jam-lang", code);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, langs: LANGS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
