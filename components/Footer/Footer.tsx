"use client";

import React, { RefObject, useState } from "react";
import { motion } from "framer-motion";
import LanguagePicker from "./LanguagePicker";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import Popup from "../PopUp";
import LetsWork from "./LetsWork";
import MediaIcons from "../Footer/FooterMediaIcons"
import RevealOnScroll from "../RevealOnScroll";

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
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_4fr] gap-4 md:gap-8 w-full h-[600px] px-4 sm:px-6 md:px-8 text-black dark:text-white h-full pb-4 md:pb-8">

      <LetsWork contactRef={contactRef} />

      <MediaIcons linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"} facebookUrl={"https://www.facebook.com/marc.carlson.7"} instagramUrl={"https://www.instagram.com/marcrcarlson/"} githubUrl={"https://github.com/MarcRichardCarlson"} />

      <footer className="w-full flex flex-col justify-between gap-8 text-black dark:text-white relative shadow-custom-shadow bg-white dark:bg-dark-grey p-8 rounded-xl">

        <RevealOnScroll direction="top" duration={0.4} delay={0}>
          <div className="flex justify-between gap-2">
            <p className="text-2xl md:text-3xl font-bold text-black dark:text-white">{t("footer-menu-h1-header")}</p>
           {/*  <div className="min-h-12 min-w-12">
              <LanguagePicker />
            </div> */}
          </div>
        </RevealOnScroll>

        <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <RevealOnScroll direction="top" duration={0.4} delay={0.2}>
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
            </RevealOnScroll>

            <div className="hidden md:block w-px bg-stone"></div>

            <RevealOnScroll direction="top" duration={0.4} delay={0.4}>
              <div className="flex flex-col gap-4">
                <h4 className="font-inter font-bold">{t("footer-contact-header")}</h4>
                <div className="flex flex-col gap-0">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="cursor-pointer hover:underline underline-offset-4 text-left"
                    onClick={() => copyToClipboard('070 632 36 10')}
                  >
                    {t("footer-phone")}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="cursor-pointer hover:underline underline-offset-4 text-left"
                    onClick={() => copyToClipboard('Marc.carlson117@gmail.com')}
                  >
                    {t("footer-email")}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="cursor-pointer hover:underline underline-offset-4 text-left"
                    onClick={() => copyToClipboard('122 37 Enskede')}
                  >
                    {t("footer-address")}
                  </motion.button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        <div className="flex gap-4 justify-between w-full">

          <div className="hidden md:flex"></div>

          <RevealOnScroll direction="top" duration={0.6} delay={0}>
            <p className="text-left md:text-center text-sm">© 2024, Carlsonmarc | Powered by Marc Carlson</p>
          </RevealOnScroll>

          <RevealOnScroll direction="top" duration={0.4} delay={0.8}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white text-black p-2 px-4 rounded-sm shadow-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑
            </motion.button>
          </RevealOnScroll>
        </div>


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
