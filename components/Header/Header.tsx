"use client";

import React, { RefObject, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import HeaderMediaIcons from './HeaderMediaIcons';
import Projects from '../../public/IcRoundCode.svg'
import Home from '../../public/BxHomeAlt2.svg'
import About from '../../public/TablerUser.svg'
import Contact from '../../public/PhPaperPlaneTiltBold.svg'
import Image from 'next/image';
import TextSwitcher from './TextSwitcher';
import Logo from '../../public/favicon/favicon.ico'

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
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(section);
    }
  };
  

  useEffect(() => {
    let lastActiveSectionId = "home"; // Track the last active section

    const handleScroll = () => {
      const sections = [
        { ref: heroRef, id: "home" },
        { ref: projectsRef, id: "projects" },
        { ref: aboutRef, id: "about" },
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

      // Log only if the section has changed
      if (activeSectionId !== lastActiveSectionId) {
        console.log("Current section:", activeSectionId);
        lastActiveSectionId = activeSectionId;
      }

      // Update the active section if necessary
      setActiveSection(activeSectionId);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case the page loads in the middle of a section
    handleScroll();

    // Cleanup the scroll listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroRef, projectsRef, aboutRef, contactRef]);


  
  
  const navItemVariants = {
    rest: { scale: 1, opacity: 0.8, transition: { duration: 0.2 } },
    hover: { opacity: 1, transition: { duration: 0.1, type: "tween", stiffness: 300 } },
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
        <div className='flex'>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={Home.src} alt="Home" width={24} height={24}/>
          </span>
          <span className="hidden md:flex justify-start md:gap-2">
            <Image src={Home.src} alt="Home" width={20} height={20} className="invert self-start" />
            <span className="self-start text-white">{t("nav-home")}</span>
          </span>
        </div>
      ), 
      section: "home", 
      ref: heroRef 
    },
    { 
      label: (
        <div className='flex'>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={Projects.src} alt="Projects" width={24} height={24}/>
          </span>
          <span className="hidden md:flex justify-start md:gap-2">
            <Image src={Projects.src} alt="Projects" width={22} height={22} className="invert"/>
            <span className="self-start text-white">{t("nav-projects")}</span>
          </span>
        </div>
      ), 
      section: "projects", 
      ref: projectsRef 
    },
    { 
      label: (
        <div className='flex'>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={About.src} alt="About" width={24} height={24}/>
          </span>
          <span className="hidden md:flex justify-start md:gap-2">
            <Image src={About.src} alt="About" width={22} height={22} className="invert"/>
            <span className="self-start text-white">{t("nav-about")}</span>
          </span>
        </div>
      ), 
      section: "about", 
      ref: aboutRef
    },
    { 
      label: (
        <div className='flex'>
          <span className="md:hidden flex items-center justify-center invert">
            <Image src={Contact.src} alt="Contact" width={24} height={24}/>
          </span>
          <span className="hidden md:flex justify-start md:gap-2">
            <Image src={Contact.src} alt="Contact" width={20} height={20} className="invert"/>
            <span className="self-start text-white">{t("nav-contact")}</span>
          </span>
        </div>
      ), 
      section: "contact", 
      ref: contactRef
    },
  ];

  return (
  <nav className="z-50 bg-dark-grey shadow-lg min-w-[60px] h-full flex flex-col gap-4 md:gap-2 justify-between items-center md:items-start px-0 md:px-8 py-10 md:min-w-[250px] lg:min-w-[350px] sticky top-0 transition-all duration-300 ease-in-out">
    <Image src={Logo} className='h-8 w-8 md:h-24 md:w-24' alt={'Logo'}/>
    <div className='hidden md:flex flex-col justify-center items-left'>
      <TextSwitcher/>
      <p className='text-light-grey hidden md:block uppercase'>Developer</p>
      <h2 className="text-white-grey text-base font-bold mb-8 hidden md:block">Marc Richard Carlson</h2>
    </div>

    <div className="flex flex-col gap-4 md:gap-2 items-start w-full">
      {navItems.map(({ label, section, ref }) => (
        <motion.a
          key={section}
          onClick={() => scrollToSection(ref, section)}
          className={`flex items-center justify-center md:justify-start rounded-sm px-2 md:px-8 py-4 md:py-6 w-full font-inter text-base font-bold cursor-pointer transition-all duration-300 ${
            activeSection === section
              ? "bg-white-grey bg-opacity-10 text-green-500"
              : "text-white hover:text-green-500 hover:underline underline-offset-4 decoration-green-400"
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
