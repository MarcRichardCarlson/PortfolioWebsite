"use client";

import React, { RefObject, useState } from "react";
import { motion } from "framer-motion";
import MediaIcons from "./FooterMediaIcons";
import LanguagePicker from "./LanguagePicker";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import Popup from "../PopUp";

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
    <footer className="flex flex-col gap-6 bg-black-soil bg-opacity-95 text-white relative p-8">
      <div className="absolute top-4 right-8">
        <LanguagePicker />
      </div>
      <div className="w-full flex flex-col md:flex-row justify-around items-start md:items-center relative z-10">
        <div className="flex flex-col md:flex-row md:space-x-8 gap-4 md:gap-0">
          <div className="flex flex-col gap-4">
            <h4 className="font-inter font-bold underline underline-offset-4">{t("footer-menu-header")}</h4>
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
            <h4 className="font-inter font-bold underline underline-offset-4">{t("footer-contact-header")}</h4>
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

          <div className="hidden md:block w-px bg-stone"></div>

          <MediaIcons linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"} facebookUrl={"https://www.facebook.com/marc.carlson.7"} instagramUrl={"https://www.instagram.com/marcrcarlson/"} githubUrl={"https://github.com/MarcRichardCarlson"} />
        </div>
      </div>

      <p className="text-left md:text-center text-sm">&copy; 2024 MarcRichardCarlson</p>

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
  );
};

export default Footer;
