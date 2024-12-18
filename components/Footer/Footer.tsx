"use client";

import React, { RefObject, useState } from "react";
import { motion } from "framer-motion";
import LanguagePicker from "./LanguagePicker";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import Popup from "../PopUp";
import LetsWork from "./LetsWork";
import MediaIcons from "../Footer/FooterMediaIcons"

interface FooterProps {
  heroRef: RefObject<HTMLElement>;
  projectsRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
}

const Footer: React.FC<FooterProps> = ({ heroRef, projectsRef, aboutRef, contactRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<'success' | 'fail'>('success');

  const scrollToSection = (ref: RefObject<HTMLElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setPopupType('success');
    setShowPopup(true); // Show success popup
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_4fr] gap-8 w-full h-[600px] px-4 sm:px-6 md:px-8 text-black dark:text-white h-full pb-8">
      
      <LetsWork/>

      <MediaIcons linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"} facebookUrl={"https://www.facebook.com/marc.carlson.7"} instagramUrl={"https://www.instagram.com/marcrcarlson/"} githubUrl={"https://github.com/MarcRichardCarlson"} />


      <footer className="w-full flex flex-col justify-between gap-8 text-black dark:text-white relative shadow-custom-shadow bg-light-grey dark:bg-dark-grey p-8 rounded-3xl">
        <div className="absolute top-4 right-4 md:right-8">
          <LanguagePicker />
        </div>
  
        <p className="text-2xl md:text-3xl font-bold text-black dark:text-white">Before you go, Check out these links</p>
        <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-inter font-bold">{t("footer-menu-header")}</h4>
              <div className="flex flex-col gap-0">
                <motion.a
                  onClick={() => scrollToSection(heroRef)}
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer hover:underline underline-offset-4"
                  >
                  {t("nav-home")}
                </motion.a>
                <motion.a
                  onClick={() => scrollToSection(projectsRef)}
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer hover:underline underline-offset-4"
                  >
                  {t("nav-projects")}
                </motion.a>
                <motion.a
                  onClick={() => scrollToSection(aboutRef)}
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer hover:underline underline-offset-4"
                  >
                  {t("nav-about")}
                </motion.a>
                <motion.a
                  onClick={() => scrollToSection(contactRef)}
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer hover:underline underline-offset-4"
                  >
                  {t("nav-contact")}
                </motion.a>
              </div>
            </div>

            <div className="hidden md:block w-px bg-stone"></div>

            <div className="flex flex-col gap-4">
              <h4 className="font-inter font-bold">{t("footer-contact-header")}</h4>
              <div className="flex flex-col gap-0">
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer hover:underline underline-offset-4"
                  onClick={() => copyToClipboard('070 632 36 10')}
                  >
                  070 632 36 10
                </motion.p>
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer hover:underline underline-offset-4"
                  onClick={() => copyToClipboard('Marc.carlson117@gmail.com')}
                  >
                  Marc.carlson117@gmail.com
                </motion.p>
                <motion.p
                  whileHover={{ scale: 1.1 }}
                  className="cursor-pointer hover:underline underline-offset-4"
                  onClick={() => copyToClipboard('122 37 Enskede')}
                  >
                  122 37 Enskede
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-left md:text-center text-sm">© 2024, Carlsonmarc | Powered by Marc Carlson</p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute bottom-8 right-8 bg-white text-black p-2 px-4 rounded-sm shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
          ↑
        </motion.button>


        {showPopup && (
          <Popup
          message={popupType === 'success' ? 'Copied to clipboard!' : 'Failed to copy!'}
          onClose={closePopup}
          type={popupType}
          />
        )}
      </footer>
    </div>
  );
};

export default Footer;
