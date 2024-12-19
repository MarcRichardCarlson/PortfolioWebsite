"use client";

import React, { RefObject, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import { RevealOnScroll } from "../RevealOnScroll";
import AnimateOnView from "../AnimateOnView";

interface NavbarProps {
  heroRef: RefObject<HTMLElement>;
  projectsRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
}

const Navbar: React.FC<NavbarProps> = ({ heroRef, projectsRef, aboutRef, contactRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (ref: RefObject<HTMLElement>, section: string) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // Close menu on section click
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isOpen && !document.getElementById('menu')?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Auto-close menu on screen resize above breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(false); // Close menu
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { label: t("nav-home"), ref: heroRef, section: "home" },
    { label: t("nav-projects"), ref: projectsRef, section: "projects" },
    { label: t("nav-about"), ref: aboutRef, section: "about" },
    { label: t("nav-contact"), ref: contactRef, section: "contact" },
  ];

  return (
    <nav className="z-50 w-full py-10 px-4 sm:px-6 md:px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <RevealOnScroll>
          <span className="text-black dark:text-white font-bold text-2xl font-orbitron">
            MarcCarlson
          </span>
        </RevealOnScroll>
      </div>

      {/* Menu for Large Screens */}
      <div className="hidden md:flex gap-4">
        {navItems.map(({ label, section, ref }) => (
          <motion.a
            key={section}
            onClick={() => scrollToSection(ref, section)}
            className="cursor-pointer text-black dark:text-white font-semibold px-4 py-2 hover:underline transition-all"
          >
            <AnimateOnView direction="left" duration={1} delay={0}>
              {label}
            </AnimateOnView>
          </motion.a>
        ))}
      </div>

      {/* Hamburger for Smaller Screens */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="py-2 px-4 rounded bg-light-grey dark:bg-dark-grey text-black dark:text-white"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Slide-down Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-fit bg-white dark:bg-black-smooth shadow-lg z-50 flex flex-col p-4 gap-4"
          >
            <button
              onClick={toggleMenu}
              className="self-end py-2 px-4 bg-light-grey dark:bg-dark-grey rounded-xl text-black dark:text-white"
            >
              ✖
            </button>
            {navItems.map(({ label, section, ref }) => (
              <motion.a
                key={section}
                onClick={() => scrollToSection(ref, section)}
                className="bg-light-grey dark:bg-dark-grey rounded-xl cursor-pointer text-black dark:text-white font-semibold px-4 py-2 hover:underline transition-all"
              >
                <AnimateOnView direction="top" duration={0.7} delay={0}>
                  {label}
                </AnimateOnView>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
