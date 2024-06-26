"use client";

import { SyntheticEvent, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { AppLocale } from "@/app/[locale]/locales";
import { useCurrentLocale } from "@/hooks/locale";

interface AppLocaleSwitcherProps {
  className?: string;
  locale: AppLocale;
}

const allLanguageItems = [{ label: "en" }, { label: "sv" }];

export default function AppLocaleSwitcher() {
  const activeLocale = useCurrentLocale();
  const locales = allLanguageItems.map((item) => item.label);

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    // check if the button has locale data associated with it
    const targetLocale = e.currentTarget.dataset.locale;
    if (!targetLocale) {
      console.warn(`locale switcher button has no locale`);
      return;
    }

    // do nothing if target locale is the same with the current locale
    if (targetLocale === activeLocale) return;

    // go to the same page but on a different locale
    const { pathname, search } = window.location;
    const path = pathname.slice(3);
    const newUri = search
      ? `/${targetLocale}${path}${search}`
      : `/${targetLocale}${path}`;
    window.location.href = newUri;
  };

  return (
    <div className="flex items-center gap-6 relative w-fit">
      <div className="flex justify-between items-center gap-8">
        {locales.map((locale) => (
          <button
            key={locale}
            className={twMerge(
              "text-CustomWhite relative cursor-pointer text-base md:text-lg hover:text-CustomHover uppercase font-ttcommons",
              locale === activeLocale && "selected"
            )}
            onClick={handleClick}
            data-locale={locale}
          >
            {locale}
            {locale === activeLocale && (
              <motion.div
                className="absolute bottom--1 left-0 right-0 h-1 w-full bg-indigo-500"
                layoutId="languagePickerUnderline"
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLocale ? activeLocale : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.1 }}
        ></motion.div>
      </AnimatePresence>
    </div>
  );
}
