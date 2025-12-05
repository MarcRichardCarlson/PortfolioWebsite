"use client";

import React, { RefObject, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import RevealOnScroll from "../RevealOnScroll";
import Image from "next/image";
import CloseIcon from "../../public/icons/IcRoundClose.svg"
import MenuIcon from "../../public/icons/TablerMenu2.svg"
import { useLiquidGlass } from '@/contexts/LiquidGlassContext';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isLiquidGlassEnabled } = useLiquidGlass();

  const scrollToSection = (ref: RefObject<HTMLElement>, section: string) => {
    if (ref.current) {
      const headerOffset = 80; // Height of the fixed header
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setActiveSection(section); // Immediately update active section when clicked
      setIsOpen(false); // Close menu on section click
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        { id: 'home', ref: heroRef },
        { id: 'about', ref: aboutRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef }
      ];

      const headerHeight = 80;
      const currentScroll = window.scrollY + headerHeight;
      let currentSection = 'home';

      // Basic section tracking
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          const sectionBottom = sectionTop + section.ref.current.offsetHeight;

          if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            currentSection = section.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    // Add throttling to improve performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Call once on mount to set initial active section
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [heroRef, projectsRef, aboutRef, contactRef]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (isOpen && !document.getElementById('menu')?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

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
    { label: t("nav-about"), ref: aboutRef, section: "about" },
    { label: t("nav-projects"), ref: projectsRef, section: "projects" },
    { label: t("nav-contact"), ref: contactRef, section: "contact" },
  ];

  return (
    <nav className={`z-50 w-full fixed top-0 left-0 transition-all duration-200 ${
      isScrolled && !isOpen
        ? isLiquidGlassEnabled
          ? 'py-4 liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-glass shadow-lg border-b border-white/20 dark:border-white/10'
          : 'py-4 bg-white/80 dark:bg-dark-grey/90 backdrop-blur-sm shadow-lg'
        : 'py-10 bg-transparent border-b border-transparent'
    } px-4 sm:px-6 md:px-8 flex justify-between items-center`}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <RevealOnScroll direction="left" duration={0.2} delay={0}>
          <span className={`text-black dark:text-white font-bold font-orbitron transition-all duration-200 ${
            isScrolled ? 'text-xl' : 'text-2xl'
          }`}>
            MarcCarlson
          </span>
        </RevealOnScroll>
      </div>

      {/* Menu for Large Screens */}
      <div className="hidden md:flex gap-4 relative">
        {navItems.map(({ label, section, ref }) => (
          <div key={section} className="relative">
            <motion.button
              onClick={() => scrollToSection(ref, section)}
              className={`cursor-pointer text-black dark:text-white font-semibold px-4 py-2 transition-all bg-transparent border-none select-none ${activeSection === section ? 'text-true-blue' : ''
                }`}
            >
              <RevealOnScroll direction="left" duration={0.2} delay={0}>
                {label}
              </RevealOnScroll>
            </motion.button>
            {activeSection === section && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-0 left-[10%] w-[80%] h-[3px] bg-true-blue rounded-full shadow-[0_0_8px_rgba(0,122,255,0.4)] dark:shadow-[0_0_8px_rgba(0,122,255,0.6)]"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Hamburger for Smaller Screens */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className={`py-2 px-4 rounded transition-all duration-200 ${
            isScrolled && isLiquidGlassEnabled
              ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-glass border border-white/20 dark:border-white/10'
              : 'bg-light-grey dark:bg-dark-grey'
          } text-black dark:text-white select-none`}
        >
          <Image src={MenuIcon} alt={"Hamburger Menu Icon"} className="filter dark:invert" />
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
            transition={{ duration: 0.1 }}
            className="fixed top-0 left-0 w-full h-fit liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-[100px] border-b border-white/30 dark:border-white/20 shadow-2xl z-50 flex flex-col p-4 pb-6 gap-4"
          >
            <button
              onClick={toggleMenu}
              className={`self-end py-2 px-2 rounded-lg transition-all duration-200 ${
                isLiquidGlassEnabled
                  ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-glass border border-white/20 dark:border-white/10'
                  : 'bg-light-grey dark:bg-input-black'
              } text-black dark:text-white select-none`}
            >
              <Image src={CloseIcon} alt={"Menu Closing Icon"} className="filter dark:invert" />
            </button>
            {navItems.map(({ label, section, ref }) => (
              <motion.button
                key={section}
                onClick={() => scrollToSection(ref, section)}
                className={`w-full overflow-hidden rounded-lg cursor-pointer font-semibold px-4 py-4 transition-all border-none text-left select-none liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-xl border border-white/40 dark:border-white/30 ${
                  activeSection === section 
                    ? 'text-true-blue' 
                    : 'text-black dark:text-white'
                }`}
              >
                <RevealOnScroll direction="right" duration={0.2} delay={0}>
                  {label}
                </RevealOnScroll>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
