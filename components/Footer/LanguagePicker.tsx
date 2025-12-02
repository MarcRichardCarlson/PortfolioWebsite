"use client";

import { SyntheticEvent, useMemo, useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import { AppLocale } from "@/app/[locale]/locales";
import { useCurrentLocale } from "@/hooks/locale";
import Image from "next/image";
import ArrowIcon from "../../public/icons/IcTwotoneKeyboardArrowUp.svg";
import Globe from "../../public/icons/CarbonEarthEuropeAfrica.svg";
import useMedia from "use-media";
import { useLiquidGlass } from "@/contexts/LiquidGlassContext";

const allLanguageItems = [
  { label: "en", displayNameEn: "English", displayNameSv: "Engelska" },
  { label: "sv", displayNameEn: "Swedish", displayNameSv: "Svenska" },
];

export default function AppLocaleSwitcher() {
  const activeLocale = useCurrentLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLiquidGlassEnabled } = useLiquidGlass();

  const isMediumScreen = useMedia("(min-width: 768px)");

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    const targetLocale = e.currentTarget.dataset.locale;

    // Close dropdown if the same locale is clicked
    if (!targetLocale || targetLocale === activeLocale) {
      setIsOpen(false);
      return;
    }

    const { pathname, search } = window.location;
    const path = pathname.slice(3);
    const newUri = search
      ? `/${targetLocale}${path}${search}`
      : `/${targetLocale}${path}`;
    window.location.href = newUri;
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get display names based on the current locale
  const displayNames = useMemo(() => {
    return allLanguageItems.map((item) => ({
      ...item,
      displayName:
        activeLocale === "en" ? item.displayNameEn : item.displayNameSv,
    }));
  }, [activeLocale]);

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      {/* Dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-row justify-between text-black dark:text-white cursor-pointer text-base xl:text-sm font-montserrat p-3 xl:p-4 w-fit xl:w-24 rounded-lg transition-all duration-200 ${
          isLiquidGlassEnabled
            ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-[30px] border border-white/20 dark:border-white/10'
            : 'bg-light-grey dark:bg-dark-grey'
        }`}
      >
        <span className="xl:block hidden">
          {activeLocale === "en" ? "EN" : "SV"}
        </span>

        <Image
          src={ArrowIcon}
          alt="Arrow"
          width={20}
          height={20}
          className={`xl:block hidden transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          } dark:filter dark:invert`} // Add dark:filter and dark:invert here
        />

        <Image
          src={Globe}
          alt="Arrow"
          width={20}
          height={20}
          className="block xl:hidden"
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
            className={`absolute mt-1 z-50 rounded-lg transition-all duration-200 ${
              isMediumScreen ? "right-0" : "-left-[3.25rem]"
            } ${
              isLiquidGlassEnabled
                ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-[30px] border border-white/20 dark:border-white/10'
                : 'bg-light-grey dark:bg-dark-grey'
            }`}
          >
            {displayNames.map((locale) => (
              <button
                key={locale.label}
                onClick={handleClick}
                data-locale={locale.label}
                className={twMerge(
                  "font-montserrat block w-full text-left px-4 py-3 text-black dark:text-white cursor-pointer min-w-fit rounded-lg transition-all duration-200",
                  locale.label === activeLocale 
                    ? "text-true-blue" 
                    : isLiquidGlassEnabled
                      ? "hover:bg-white/10 dark:hover:bg-white/5"
                      : "hover:bg-light-grey hover:bg-opacity-10"
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
