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

const languagesByCountry = {
  AD: "ca",
  AE: "ar",
  AF: "fa",
  AG: "en",
  AI: "en",
  AL: "sq",
  AM: "hy",
  AO: "pt",
  AR: "es",
  AS: "en",
  AT: "de",
  AU: "en",
  AW: "nl",
  AZ: "az",
  BA: "bs",
  BB: "en",
  BD: "bn",
  BE: "nl",
  BF: "fr",
  BG: "bg",
  BH: "ar",
  BI: "fr",
  BJ: "fr",
  BM: "en",
  BN: "ms",
  BO: "es",
  BR: "pt",
  BS: "en",
  BT: "dz",
  BW: "en",
  BY: "be",
  BZ: "en",
  CA: "en",
  CD: "fr",
  CF: "fr",
  CG: "fr",
  CH: "de",
  CI: "fr",
  CK: "en",
  CL: "es",
  CM: "fr",
  CN: "zh",
  CO: "es",
  CR: "es",
  CU: "es",
  CV: "pt",
  CY: "el",
  CZ: "cs",
  DE: "de",
  DJ: "fr",
  DK: "da",
  DM: "en",
  DO: "es",
  DZ: "ar",
  EC: "es",
  EE: "et",
  EG: "ar",
  ER: "ar",
  ES: "es",
  ET: "am",
  FI: "fi",
  FJ: "en",
  FK: "en",
  FM: "en",
  FO: "da",
  FR: "fr",
  GA: "fr",
  GB: "en",
  GD: "en",
  GE: "ka",
  GF: "fr",
  GG: "en",
  GH: "en",
  GI: "en",
  GL: "da",
  GM: "en",
  GN: "fr",
  GP: "fr",
  GQ: "es",
  GR: "el",
  GT: "es",
  GU: "en",
  GW: "pt",
  GY: "en",
  HK: "zh",
  HN: "es",
  HR: "hr",
  HT: "fr",
  HU: "hu",
  ID: "id",
  IE: "en",
  IL: "he",
  IM: "en",
  IN: "hi",
  IQ: "ar",
  IR: "fa",
  IS: "is",
  IT: "it",
  JE: "en",
  JM: "en",
  JO: "ar",
  JP: "ja",
  KE: "sw",
  KG: "ky",
  KH: "km",
  KI: "en",
  KM: "ar",
  KN: "en",
  KP: "ko",
  KR: "ko",
  KW: "ar",
  KY: "en",
  KZ: "kk",
  LA: "lo",
  LB: "ar",
  LC: "en",
  LI: "de",
  LK: "si",
  LR: "en",
  LS: "en",
  LT: "lt",
  LU: "fr",
  LV: "lv",
  LY: "ar",
  MA: "ar",
  MC: "fr",
  MD: "ro",
  ME: "sr",
  MF: "fr",
  MG: "mg",
  MH: "en",
  MK: "mk",
  ML: "fr",
  MM: "my",
  MN: "mn",
  MO: "zh",
  MP: "en",
  MQ: "fr",
  MR: "ar",
  MS: "en",
  MT: "mt",
  MU: "en",
  MV: "en",
  MW: "en",
  MX: "es",
  MY: "ms",
  MZ: "pt",
  NA: "en",
  NC: "fr",
  NE: "fr",
  NG: "en",
  NI: "es",
  NL: "nl",
  NO: "no",
  NP: "ne",
  NR: "en",
  NZ: "en",
  OM: "ar",
  PA: "es",
  PE: "es",
  PF: "fr",
  PG: "en",
  PH: "fil",
  PK: "ur",
  PL: "pl",
  PM: "fr",
  PR: "es",
  PS: "ar",
  PT: "pt",
  PW: "en",
  PY: "es",
  QA: "ar",
  RE: "fr",
  RO: "ro",
  RS: "sr",
  RU: "ru",
  RW: "fr",
  SA: "ar",
  SB: "en",
  SC: "fr",
  SD: "ar",
  SE: "sv",
  SG: "en",
  SH: "en",
  SI: "sl",
  SK: "sk",
  SL: "en",
  SM: "it",
  SN: "fr",
  SO: "so",
  SR: "nl",
  SS: "en",
  ST: "pt",
  SV: "es",
  SY: "ar",
  SZ: "en",
  TC: "en",
  TD: "fr",
  TG: "fr",
  TH: "th",
  TJ: "fa",
  TK: "en",
  TL: "pt",
  TM: "tk",
  TN: "ar",
  TO: "en",
  TR: "tr",
  TT: "en",
  TV: "en",
  TW: "zh",
  TZ: "sw",
  UA: "uk",
  UG: "en",
  US: "en",
  UY: "es",
  UZ: "uz",
  VA: "it",
  VC: "en",
  VE: "es",
  VG: "en",
  VI: "en",
  VN: "vi",
  VU: "en",
  WS: "en",
  XK: "sq",
  YE: "ar",
  YT: "fr",
  ZA: "zu",
  ZM: "en",
  ZW: "en"
};

function greetingFromLocale(locale) {
  const language = locale?.split("-")?.[0]?.toLowerCase();
  return greetingsByLanguage[language];
}

function greetingFromCountryCode(countryCode) {
  const language = languagesByCountry[countryCode?.toUpperCase()];
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
        const countryGreeting = greetingFromCountryCode(data?.country_code);
        setGreeting(countryGreeting || languageGreeting || greetingsByLanguage.en);
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
