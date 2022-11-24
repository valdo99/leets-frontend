const availableLocales = ["en", "it"] as const;

type Locale = typeof availableLocales[number];

const isAvailableLocale = (locale: string): locale is Locale => {
  const found = availableLocales.find((l) => l === locale);
  return found !== undefined;
};

const DEFAULT_LOCALE: Locale = "it";

export { availableLocales, DEFAULT_LOCALE, isAvailableLocale };
export type { Locale };

type LocalesInfo = {
  [locale in Locale]: {
    label: string;
  };
};

export const localesInfo: LocalesInfo = {
  en: {
    label: "English",
  },
  it: {
    label: "Italiano",
  },
};
