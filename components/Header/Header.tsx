"use client";

import React, { RefObject, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import HeaderMediaIcons from './HeaderMediaIcons';
import Projects from '../../public/IcRoundCode.svg'
import Home from '../../public/BxHomeAlt2.svg'
import About from '../../public/TablerUser.svg'
import Packages from '../../public/TablerPackages.svg'
import Contact from '../../public/PhPaperPlaneTiltBold.svg'
import Image from 'next/image';
import Profile from '../../public/images/Profile.png';

interface NavbarProps {
  heroRef: RefObject<HTMLElement>;
  projectsRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
  packagesRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
}

const Navbar: React.FC<NavbarProps> = ({ heroRef, projectsRef, aboutRef, packagesRef, contactRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (ref: RefObject<HTMLElement>, section: string) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(section);
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: heroRef, id: "home" },
        { ref: projectsRef, id: "projects" },
        { ref: aboutRef, id: "about" },
        { ref: packagesRef, id: "packages" },
        { ref: contactRef, id: "contact" },
      ];
  
      let activeSectionId = "home"; // Default section
  
      // Loop through each section and check if the top is within the viewport
      sections.forEach((section) => {
        const element = section.ref.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust the logic to consider when the section is at the top part of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            activeSectionId = section.id;
          }
        }
      });
  
      // Update the active section if necessary
      setActiveSection(activeSectionId);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    // Initial check in case the page loads in the middle of a section
    handleScroll();
  
    // Cleanup the scroll listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef, projectsRef, aboutRef, packagesRef, contactRef]);
  
  
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
    { 
      label: (
        <>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={Home.src} alt="Home" width={24} height={24}/>
          </span>
          <span className="hidden md:flex md:items-center md:gap-2">
            <Image src={Home.src} alt="Home" width={20} height={20} className="invert"/>
            {t("nav-home")}
          </span>
        </>
      ), 
      section: "home", 
      ref: heroRef 
    },
    { 
      label: (
        <>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={Projects.src} alt="Projects" width={24} height={24}/>
          </span>
          <span className="hidden md:flex md:items-center md:gap-2">
            <Image src={Projects.src} alt="Projects" width={20} height={20} className="invert"/>
            {t("nav-projects")}
          </span>
        </>
      ), 
      section: "projects", 
      ref: projectsRef 
    },
    { 
      label: (
        <>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={About.src} alt="About" width={24} height={24}/>
          </span>
          <span className="hidden md:flex md:items-center md:gap-2">
            <Image src={About.src} alt="About" width={20} height={20} className="invert"/>
            {t("nav-about")}
          </span>
        </>
      ), 
      section: "about", 
      ref: aboutRef
    },
    { 
      label: (
        <>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={Packages.src} alt="Packages" width={24} height={24}/>
          </span>
          <span className="hidden md:flex md:items-center md:gap-2">
            <Image src={Packages.src} alt="Packages" width={20} height={20} className="invert"/>
            Packages
          </span>
        </>
      ), 
      section: "packages", 
      ref: packagesRef
    },
    { 
      label: (
        <>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={Contact.src} alt="Contact" width={24} height={24}/>
          </span>
          <span className="hidden md:md:flex md:items-center md:gap-2">
            <Image src={Contact.src} alt="Contact" width={20} height={20} className="invert"/>
            {t("nav-contact")}
          </span>
        </>
      ), 
      section: "contact", 
      ref: contactRef
    },
  ];

  return (
  <nav className="z-50 bg-dark-grey bg-opacity-50 shadow-lg min-w-[60px] h-full flex flex-col gap-4 md:gap-0 justify-between items-center py-8 md:min-w-[250px] sticky top-0 transition-all duration-300 ease-in-out">
    <div className='w-10 h-10 md:w-16 md:h-16 relative'>
      <Image
        src={Profile}
        alt="Portrait"
        fill
        className="rounded-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <p className='text-light-grey hidden md:block'>Developer</p>
    <h2 className="text-white-grey text-base font-bold mb-8 hidden md:block">Marc Richard Carlson</h2>
      <div className="flex flex-col gap-2 items-start w-full px-2">
        {navItems.map(({ label, section, ref }) => (
          <motion.a
            key={section}
            onClick={() => scrollToSection(ref, section)}
            className={`rounded-md md:px-6 py-2 w-full font-inter text-base font-bold cursor-pointer ${
              activeSection === section ? "bg-white-grey bg-opacity-10 text-indigo-400" : "text-white hover:text-indigo-400 hover:underline underline-offset-4"
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
        className="mt-auto"
      >
        <HeaderMediaIcons linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"} facebookUrl={"https://www.facebook.com/marc.carlson.7"} instagramUrl={"https://www.instagram.com/marcrcarlson/"} githubUrl={"https://github.com/MarcRichardCarlson"} />
      </motion.div>
    </nav>
  );
};

export default Navbar;
