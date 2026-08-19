import en from "./en.json";
import ms from "./ms.json";

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ms", label: "MY" },
] as const;

export type Language = (typeof LANGUAGES)[number]["code"];

export const isLanguage = (code?: string | null): code is Language =>
  LANGUAGES.some((language) => language.code === code);

export const resources = {
  en: { translation: en },
  ms: { translation: ms },
};
