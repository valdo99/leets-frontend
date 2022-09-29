import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { en, it } from "make-plural/plurals";
import React, { ReactNode, useEffect } from "react";

import { DEFAULT_LOCALE, isAvailableLocale, Locale } from "./available-locales";
import { messages } from "./en/messages";

i18n.loadLocaleData({
  en: { plurals: en },
  it: { plurals: it },
});
i18n.load("en", messages);
i18n.activate("en");

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivateLanguage(locale: Locale) {
  const { messages } = await import(`../locales/${locale}/messages.js`);
  i18n.load(locale, messages);
  i18n.activate(locale);
  localStorage.setItem("locale", locale);
}

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || DEFAULT_LOCALE;
    if (i18n._locale !== savedLocale && isAvailableLocale(savedLocale)) dynamicActivateLanguage(savedLocale);
  }, []);

  return (
    <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
      {children}
    </I18nProvider>
  );
};
