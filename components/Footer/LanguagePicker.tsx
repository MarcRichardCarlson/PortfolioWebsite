"use client";

import { SyntheticEvent, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { AppLocale } from "@/app/[locale]/locales";
import { useCurrentLocale } from "@/hooks/locale";
import Image from 'next/image';
import ArrowIcon from '../../public/icons/IcTwotoneKeyboardArrowUp.svg';
import Globe from '../../public/icons/CarbonEarthEuropeAfrica.svg';
import useMedia from "use-media";


interface AppLocaleSwitcherProps {
  className?: string;
  locale: AppLocale;
}

const allLanguageItems = [
  { label: "en", displayNameEn: "English", displayNameSv: "Engelska" },
  { label: "sv", displayNameEn: "Swedish", displayNameSv: "Svenska" },
];

export default function AppLocaleSwitcher() {
  const activeLocale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);

  const isMediumScreen = useMedia("(min-width: 768px)");

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const targetLocale = e.currentTarget.dataset.locale;
    if (!targetLocale || targetLocale === activeLocale) return;

    const { pathname, search } = window.location;
    const path = pathname.slice(3);
    const newUri = search
      ? `/${targetLocale}${path}${search}`
      : `/${targetLocale}${path}`;
    window.location.href = newUri;
  };

  // Get display names based on the current locale
  const displayNames = useMemo(() => {
    return allLanguageItems.map((item) => ({
      ...item,
      displayName:
        activeLocale === "en" ? item.displayNameEn : item.displayNameSv,
    }));
  }, [activeLocale]);

  return (
    <div className="relative w-fit">
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row justify-between text-CustomWhite cursor-pointer text-base md:text-sm hover:text-CustomHover font-ttcommons bg-dark-grey p-3 md:p-4 w-fit md:w-24 rounded-lg"
      >
        <span className="md:block hidden"> 
          {activeLocale === "en" ? "EN" : "SV"}
        </span>

        <Image
          src={ArrowIcon}
          alt="Arrow"
          width={20}
          height={20}
          className={`md:block hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
        <Image
          src={Globe}
          alt="Arrow"
          width={20}
          height={20}
          className="block md:hidden"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <AnimatePresence>
          <motion.div
  initial={{ y: -10, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: -10, opacity: 0 }}
  transition={{ duration: 0.3 }}
  className={`absolute mt-1 bg-dark-grey shadow-lg z-50 rounded-lg ${
    isMediumScreen ? "right-0" : "-left-[3.25rem]"
  }`}
>
  {displayNames.map((locale) => (
    <button
      key={locale.label}
      onClick={handleClick}
      data-locale={locale.label}
      className={twMerge(
        "block w-full text-left px-4 py-3 text-CustomWhite hover:bg-light-grey hover:bg-opacity-10 cursor-pointer w-24",
        locale.label === activeLocale && "text-green-500"
      )}
    >
      {locale.displayName}
    </button>
  ))}
</motion.div>

        </AnimatePresence>
      )}
    </div>
  );
}
