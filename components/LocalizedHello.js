"use client";

import { useEffect, useState } from "react";

const greetingsByLanguage = {
  ar: "مرحبا",
  bg: "Здравей",
  de: "Hallo",
  el: "Γεια",
  en: "Hello",
  es: "Hola",
  fa: "سلام",
  fr: "Bonjour",
  hi: "नमस्ते",
  it: "Ciao",
  ja: "こんにちは",
  ko: "안녕하세요",
  nl: "Hallo",
  pt: "Olá",
  ru: "Привет",
  tr: "Merhaba",
  zh: "你好"
};

const greetingsByCountry = {
  AE: "مرحبا",
  BG: "Здравей",
  BR: "Olá",
  CA: "Hello",
  CN: "你好",
  DE: "Hallo",
  ES: "Hola",
  FR: "Bonjour",
  GB: "Hello",
  GR: "Γεια",
  IN: "नमस्ते",
  IR: "سلام",
  IT: "Ciao",
  JP: "こんにちは",
  KR: "안녕하세요",
  MX: "Hola",
  NL: "Hallo",
  PT: "Olá",
  RU: "Привет",
  TR: "Merhaba",
  US: "Hello"
};

function greetingFromLocale(locale) {
  const language = locale?.split("-")?.[0]?.toLowerCase();
  return greetingsByLanguage[language] || greetingsByLanguage.en;
}

export default function LocalizedHello() {
  const [greeting, setGreeting] = useState(greetingsByLanguage.en);

  useEffect(() => {
    let cancelled = false;
    const browserGreeting = greetingFromLocale(navigator.languages?.[0] || navigator.language);

    setGreeting(browserGreeting);

    fetch("https://ipapi.co/json/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("IP lookup unavailable");
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) {
          return;
        }

        const countryGreeting = greetingsByCountry[data?.country_code];
        const languageGreeting = greetingFromLocale(data?.languages?.split(",")?.[0]);
        setGreeting(countryGreeting || languageGreeting || browserGreeting);
      })
      .catch(() => {
        if (!cancelled) {
          setGreeting(browserGreeting);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <span>{greeting}</span>;
}
