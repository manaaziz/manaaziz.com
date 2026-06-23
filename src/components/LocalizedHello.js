"use client";

import { useEffect, useState } from "react";

const greetingsByLanguage = {
  af: "Hallo",
  ak: "Maakye",
  am: "ሰላም",
  ar: "مرحبا",
  az: "Salam",
  be: "Вітаю",
  bg: "Здравей",
  bn: "নমস্কার",
  bs: "Zdravo",
  ca: "Hola",
  cs: "Ahoj",
  cy: "Helo",
  da: "Hej",
  de: "Hallo",
  dz: "ཀུ་ཟུ་ཟང་པོ",
  el: "Γεια",
  en: "Hello",
  es: "Hola",
  et: "Tere",
  eu: "Kaixo",
  fa: "سلام",
  fi: "Hei",
  fil: "Kumusta",
  fr: "Bonjour",
  ga: "Dia dhuit",
  gl: "Ola",
  gu: "નમસ્તે",
  ha: "Sannu",
  he: "שלום",
  hi: "नमस्ते",
  hr: "Bok",
  hu: "Szia",
  hy: "Բարեւ",
  id: "Halo",
  ig: "Ndewo",
  is: "Halló",
  it: "Ciao",
  ja: "こんにちは",
  ka: "გამარჯობა",
  kk: "Сәлем",
  km: "សួស្តី",
  kn: "ನಮಸ್ಕಾರ",
  ko: "안녕하세요",
  ky: "Салам",
  lo: "ສະບາຍດີ",
  lt: "Labas",
  lv: "Sveiki",
  mg: "Salama",
  mi: "Kia ora",
  mk: "Здраво",
  ml: "നമസ്കാരം",
  mn: "Сайн байна уу",
  mr: "नमस्कार",
  ms: "Halo",
  mt: "Bongu",
  my: "မင်္ဂလာပါ",
  ne: "नमस्ते",
  nl: "Hallo",
  no: "Hei",
  pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  pl: "Cześć",
  ps: "سلام",
  pt: "Olá",
  ro: "Bună",
  ru: "Привет",
  si: "ආයුබෝවන්",
  sk: "Ahoj",
  sl: "Živjo",
  so: "Salaan",
  sq: "Përshëndetje",
  sr: "Здраво",
  sv: "Hej",
  sw: "Habari",
  ta: "வணக்கம்",
  te: "నమస్కారం",
  th: "สวัสดี",
  tk: "Salam",
  tr: "Merhaba",
  uk: "Привіт",
  ur: "السلام علیکم",
  uz: "Salom",
  vi: "Xin chào",
  xh: "Molo",
  yo: "Ẹ n lẹ",
  zu: "Sawubona",
  zh: "你好"
};

function greetingFromLocale(locale) {
  const language = locale?.split("-")?.[0]?.toLowerCase();
  return greetingsByLanguage[language];
}

function firstGreetingFromLocales(locales) {
  return locales.map(greetingFromLocale).find(Boolean);
}

function greetingScale(value) {
  const length = Array.from(value).length;

  if (length <= 5) return 1;
  if (length <= 7) return 0.78;
  if (length <= 9) return 0.66;
  if (length <= 12) return 0.54;
  if (length <= 16) return 0.45;
  return 0.36;
}

export default function LocalizedHello() {
  const [greeting, setGreeting] = useState(greetingsByLanguage.en);

  useEffect(() => {
    let cancelled = false;

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

        const languageGreeting = firstGreetingFromLocales(data?.languages?.split(",") || []);
        setGreeting(languageGreeting || greetingsByLanguage.en);
      })
      .catch(() => {
        if (!cancelled) {
          setGreeting(greetingsByLanguage.en);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span
      className="localized-greeting"
      style={{ "--greeting-scale": greetingScale(greeting) }}
    >
      {greeting}
    </span>
  );
}
