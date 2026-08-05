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
  AQ: "en",
  AR: "es",
  AS: "en",
  AT: "de",
  AU: "en",
  AW: "nl",
  AX: "sv",
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
  BL: "fr",
  BM: "en",
  BN: "ms",
  BO: "es",
  BQ: "nl",
  BR: "pt",
  BS: "en",
  BT: "dz",
  BV: "no",
  BW: "en",
  BY: "be",
  BZ: "en",
  CA: "en",
  CC: "en",
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
  CW: "nl",
  CX: "en",
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
  EH: "ar",
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
  GS: "en",
  GT: "es",
  GU: "en",
  GW: "pt",
  GY: "en",
  HK: "zh",
  HM: "en",
  HN: "es",
  HR: "hr",
  HT: "fr",
  HU: "hu",
  ID: "id",
  IE: "en",
  IL: "he",
  IM: "en",
  IN: "hi",
  IO: "en",
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
  NU: "en",
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
  PN: "en",
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
  SJ: "no",
  SK: "sk",
  SL: "en",
  SM: "it",
  SN: "fr",
  SO: "so",
  SR: "nl",
  SS: "en",
  ST: "pt",
  SV: "es",
  SX: "nl",
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
  TF: "fr",
  TR: "tr",
  TT: "en",
  TV: "en",
  TW: "zh",
  TZ: "sw",
  UA: "uk",
  UG: "en",
  UM: "en",
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
  WF: "fr",
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

function normalizeCountryName(value) {
  return value
    ?.toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const countryNameAliases = {
  "aland islands": "AX",
  "antigua": "AG",
  "antigua and barbuda": "AG",
  "bahamas": "BS",
  "bolivia": "BO",
  "bosnia": "BA",
  "bosnia and herzegovina": "BA",
  "bosnia herzegovina": "BA",
  "british virgin islands": "VG",
  "brunei": "BN",
  "burma": "MM",
  "cabo verde": "CV",
  "cape verde": "CV",
  "caribbean netherlands": "BQ",
  "central african republic": "CF",
  "cocos islands": "CC",
  "cocos keeling islands": "CC",
  "congo brazzaville": "CG",
  "congo kinshasa": "CD",
  "cote d ivoire": "CI",
  "cote divoire": "CI",
  "curacao": "CW",
  "czech republic": "CZ",
  "czechia": "CZ",
  "democratic republic of the congo": "CD",
  "dominican republic": "DO",
  "dr congo": "CD",
  "east timor": "TL",
  "eswatini": "SZ",
  "falkland islands": "FK",
  "federated states of micronesia": "FM",
  "faroe islands": "FO",
  "french southern territories": "TF",
  "hong kong": "HK",
  "iran": "IR",
  "ivory coast": "CI",
  "laos": "LA",
  "macedonia": "MK",
  "macao": "MO",
  "macau": "MO",
  "marshall islands": "MH",
  "micronesia": "FM",
  "moldova": "MD",
  "myanmar": "MM",
  "myanmar burma": "MM",
  "netherlands antilles": "BQ",
  "palau": "PW",
  "palestine": "PS",
  "pitcairn": "PN",
  "reunion": "RE",
  "republic of the congo": "CG",
  "russia": "RU",
  "saint barthelemy": "BL",
  "saint helena": "SH",
  "saint kitts": "KN",
  "saint kitts and nevis": "KN",
  "saint lucia": "LC",
  "saint martin": "MF",
  "saint pierre": "PM",
  "saint pierre and miquelon": "PM",
  "saint vincent": "VC",
  "saint vincent and the grenadines": "VC",
  "sao tome": "ST",
  "sao tome and principe": "ST",
  "slovak republic": "SK",
  "south korea": "KR",
  "north korea": "KP",
  "south sudan": "SS",
  "st barthelemy": "BL",
  "st helena": "SH",
  "st kitts": "KN",
  "st kitts and nevis": "KN",
  "st lucia": "LC",
  "st martin": "MF",
  "st pierre": "PM",
  "st pierre and miquelon": "PM",
  "st vincent": "VC",
  "st vincent and the grenadines": "VC",
  "svalbard": "SJ",
  "svalbard and jan mayen": "SJ",
  "syria": "SY",
  "taiwan": "TW",
  "tanzania": "TZ",
  "the bahamas": "BS",
  "the gambia": "GM",
  "timor leste": "TL",
  "trinidad": "TT",
  "trinidad and tobago": "TT",
  "turkey": "TR",
  "turkiye": "TR",
  "turks and caicos": "TC",
  "turks and caicos islands": "TC",
  "uk": "GB",
  "united arab emirates": "AE",
  "united kingdom of great britain and northern ireland": "GB",
  "united kingdom": "GB",
  "united states minor outlying islands": "UM",
  "united states": "US",
  "united states of america": "US",
  "us virgin islands": "VI",
  "usa": "US",
  "vatican": "VA",
  "vatican city": "VA",
  "venezuela": "VE",
  "viet nam": "VN",
  "vietnam": "VN",
  "wallis and futuna": "WF",
  "western sahara": "EH"
};

function countryCodeFromName(countryName) {
  const normalizedName = normalizeCountryName(countryName);

  if (!normalizedName) return null;
  if (countryNameAliases[normalizedName]) return countryNameAliases[normalizedName];

  if (typeof Intl === "undefined" || typeof Intl.DisplayNames === "undefined") {
    return null;
  }

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return Object.keys(languagesByCountry).find((countryCode) => (
    normalizeCountryName(regionNames.of(countryCode)) === normalizedName
  ));
}

function greetingFromCountryCode(countryCode) {
  const language = languagesByCountry[countryCode?.toUpperCase()];
  return greetingsByLanguage[language];
}

function greetingFromCountry(countryCode, countryName) {
  return greetingFromCountryCode(countryCode) || greetingFromCountryCode(countryCodeFromName(countryName));
}

const lookupServices = [
  {
    url: "https://ipapi.co/json/",
    countryCode(data) {
      return data?.country_code || data?.country;
    },
    countryName(data) {
      return data?.country_name;
    }
  },
  {
    url: "https://ipwho.is/",
    countryCode(data) {
      if (data?.success === false) return null;
      return data?.country_code;
    },
    countryName(data) {
      if (data?.success === false) return null;
      return data?.country;
    }
  },
  {
    url: "https://freeipapi.com/api/json/",
    countryCode(data) {
      return data?.countryCode;
    },
    countryName(data) {
      return data?.countryName;
    }
  }
];

function firstGreetingFromLocales(locales) {
  return locales.map(greetingFromLocale).find(Boolean);
}

async function fetchJsonWithTimeout(url, signal) {
  const timeoutController = new AbortController();
  const timeout = window.setTimeout(() => timeoutController.abort(), 3500);

  function abortTimeout() {
    timeoutController.abort();
  }

  signal?.addEventListener("abort", abortTimeout, { once: true });

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: timeoutController.signal
    });

    if (!response.ok) {
      throw new Error("IP lookup unavailable");
    }

    return response.json();
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", abortTimeout);
  }
}

async function lookupGreeting(signal) {
  const languageGreeting = firstGreetingFromLocales(navigator.languages || [navigator.language]);

  for (const service of lookupServices) {
    try {
      const data = await fetchJsonWithTimeout(service.url, signal);
      const countryGreeting = greetingFromCountry(service.countryCode(data), service.countryName(data));

      if (countryGreeting) {
        return countryGreeting;
      }

      const serviceLanguageGreeting = firstGreetingFromLocales(data?.languages?.split(",") || []);
      if (serviceLanguageGreeting) {
        return serviceLanguageGreeting;
      }
    } catch (error) {
      if (signal?.aborted) {
        throw error;
      }
    }
  }

  return languageGreeting || greetingsByLanguage.en;
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
    const controller = new AbortController();

    lookupGreeting(controller.signal)
      .then((resolvedGreeting) => {
        setGreeting(resolvedGreeting);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setGreeting(greetingsByLanguage.en);
        }
      });

    return () => {
      controller.abort();
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
