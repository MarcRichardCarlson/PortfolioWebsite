"use client";

import React, { RefObject, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ChatIcon from '../../public/PhChatTeardropTextLight.svg';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import HeaderMediaIcons from './HeaderMediaIcons';

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
  const [activeSection, setActiveSection] = useState<string>("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (ref: RefObject<HTMLElement>, section: string) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
      setActiveSection(section);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: heroRef, id: "home" },
        { ref: projectsRef, id: "projects" },
        { ref: aboutRef, id: "about" },
        { ref: contactRef, id: "contact" },
      ];

      for (let section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (window.scrollY >= offsetTop && window.scrollY < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef, projectsRef, aboutRef, contactRef]);

  const navItemVariants = {
    rest: { scale: 1, opacity: 0.8, transition: { duration: 0.2 } },
    hover: { scale: 1.05, opacity: 1, transition: { duration: 0.3, type: "tween", stiffness: 300 } },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        type: "tween",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const navItems = [
    { label: t("nav-home"), section: "home", ref: heroRef },
    { label: t("nav-projects"), section: "projects", ref: projectsRef },
    { label: t("nav-about"), section: "about", ref: aboutRef },
    { label: t("nav-contact"), section: "contact", ref: contactRef },
  ];

  return (
    <nav className="z-50 bg-black-soil shadow-lg w-full flex flex-row justify-between items-center py-4 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-white text-xl font-bold">Macar.</h1>
      <div className="hidden md:flex space-x-6">
        {navItems.map(({ label, section, ref }) => (
          <motion.a
            key={section}
            onClick={() => scrollToSection(ref, section)}
            className={`font-inter text-md sm:text-md md:text-lg font-bold cursor-pointer ${
              activeSection === section ? "text-indigo-400 underline underline-offset-4" : "text-white hover:text-indigo-400 hover:underline underline-offset-4"
            }`}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={navItemVariants}
          >
            {label}
          </motion.a>
        ))}
      </div>
      <motion.div
        transition={{ type: 'tween', stiffness: 300, damping: 20 }}
        className="hidden md:flex justify-center items-center"
      >
        <HeaderMediaIcons linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"} facebookUrl={"https://www.facebook.com/marc.carlson.7"} instagramUrl={"https://www.instagram.com/marcrcarlson/"} githubUrl={"https://github.com/MarcRichardCarlson"} />
      </motion.div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-neutral-500 text-xl sm:text-2xl font-bold focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden absolute top-[60px] left-0 w-full bg-neutral-200 text-center py-4 z-30 shadow-xl flex flex-col items-center gap-4"
          >
            {navItems.map(({ label, section, ref }) => (
              <motion.a
                key={section}
                onClick={() => { scrollToSection(ref, section); toggleMenu(); }}
                className={`z-30 block py-2 text-xl sm:text-2xl font-bold cursor-pointer ${
                  activeSection === section ? "text-indigo-700 underline" : "text-neutral-500 hover:text-indigo-700"
                }`}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={navItemVariants}
              >
                {label}
              </motion.a>
            ))}
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: '#4338ca'}}
              transition={{ type: 'tween', stiffness: 300, damping: 20 }}
              className="cursor-pointer flex justify-center items-center"
            >
              <HeaderMediaIcons linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"} facebookUrl={"https://www.facebook.com/marc.carlson.7"} instagramUrl={"https://www.instagram.com/marcrcarlson/"} githubUrl={"https://github.com/MarcRichardCarlson"} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
