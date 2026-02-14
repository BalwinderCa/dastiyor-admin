"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import ru from "@/constant/locales/ru.json";
import tg from "@/constant/locales/tg.json";

const translations = { ru, tg };
const STORAGE_KEY = "dastiyor_locale";

const LanguageContext = createContext({
  locale: "ru",
  setLocale: () => {},
  t: (key) => key,
});

const getNested = (obj, path) => {
  return path.split(".").reduce((o, k) => (o?.[k] ?? null), obj);
};

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState("ru");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "ru" || stored === "tg") setLocaleState(stored);
    setMounted(true);
  }, []);

  const setLocale = useCallback((value) => {
    setLocaleState(value);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, value);
  }, []);

  const t = useCallback(
    (key, params = {}) => {
      if (!mounted) return key;
      const text = getNested(translations[locale] || ru, key) || getNested(ru, key) || key;
      if (typeof text !== "string") return key;
      return Object.entries(params).reduce((s, [k, v]) => s.replace(`{${k}}`, String(v)), text);
    },
    [locale, mounted]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) return { locale: "ru", setLocale: () => {}, t: (k) => k };
  return ctx;
}
