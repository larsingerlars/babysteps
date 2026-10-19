import { de } from "./de";
import { en, type Key } from "./en";
import { lv } from "./lv";

export type { Key };

type Dict = Record<Key, string>;

export const LOCALES = ["en", "lv", "de"] as const;

export type Locale = (typeof LOCALES)[number];

const dictionaries: Record<Locale, Dict> = { en, lv, de };

let activeLocale: Locale = "en";

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getLocale(): Locale {
  return activeLocale;
}

export function resolveLanguage(browserLang: string): Locale {
  return isLocale(browserLang) ? browserLang : "en";
}

export function setLocale(locale: Locale): void {
  activeLocale = locale;
}

export function t(key: Key): string {
  const value: string | undefined = dictionaries[activeLocale][key];

  if (value !== undefined) return value;
  if (import.meta.env.DEV) throw new Error(`Missing translation: ${key}`);

  return key;
}

export function applyTranslations(root: ParentNode = document): void {
  document.documentElement.lang = activeLocale;
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n as Key);
  });
  root.querySelectorAll<HTMLElement>("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle as Key);
  });
}
