import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Maintenance from './Maintenance';
import Development from './Development';
import Popup from '../PopUp';
import { useSelectedPackages } from '../ContactSection/SelectedPackagesContext';
import ResponsiveButton from '../Buttons';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const PriceSection: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<'success' | 'fail'>('success');
  const [hasSelectedPackage, setHasSelectedPackage] = useState(false);
  const { selectedPackages, addPackage, removePackage, resetPackages } = useSelectedPackages(); // Destructure resetPackages

  const handleDevelopmentSelect = (selectedPackage: string) => {
    setHasSelectedPackage(true);
    setShowMaintenance(true);
    addPackage(selectedPackage);
    setPopupType('success');
    setShowPopup(true); // Show success popup
  };

  const handleMaintenanceSelect = (selectedPackage: string) => {
    setHasSelectedPackage(true);
    setShowThankYou(true);
    addPackage(selectedPackage);
    setPopupType('success');
    setShowPopup(true); // Show success popup
  };

  const handleSkip = () => {
    if (!showMaintenance) {
      setShowMaintenance(true);
    } else if (hasSelectedPackage) {
      setShowThankYou(true);
    } else {
      setPopupType('fail');
      setShowPopup(true);
    }
  };

  const handleReset = () => {
    setShowMaintenance(false);
    setShowThankYou(false);
    setHasSelectedPackage(false);
    resetPackages(); // Call resetPackages to clear all selected packages
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const transitionSettings = {
    duration: 0.3,
    ease: [0.43, 0.13, 0.23, 0.96],
  };

  return (
    <div className="relative price-section min-h-screen flex flex-col gap-8 justify-around text-center font-inter p-4 md:p-8">
      <AnimatePresence mode="wait">
        {!showMaintenance && !showThankYou && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={transitionSettings}
            key="development"
            className="flex flex-col gap-8 z-10 relative"
          >
            <div className='flex flex-col gap-2'>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
                <span className="text-indigo-700">{t("price-development-header")}</span>{t("price-development-header2")}
              </h2>
              <span>{t("price-text")}</span>
            </div>

            <div className='w-full flex justify-end items-end'>
              <ResponsiveButton onClick={handleSkip} size="sm" variant="skip">
                {t("price-skip")}
              </ResponsiveButton>
            </div>

            <Development onSelect={handleDevelopmentSelect} />
          </motion.div>
        )}

        {showMaintenance && !showThankYou && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={transitionSettings}
            key="maintenance"
            className="flex flex-col gap-8 z-10 relative"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
              <span className="text-indigo-700">{t("price-maintenance-header")}</span>{t("price-maintnance-header2")}
            </h2>

            <div className='w-full flex justify-end items-end'>
              <ResponsiveButton onClick={handleSkip} size="sm" variant="skip">
              {t("price-skip")}
              </ResponsiveButton>
            </div>

            <Maintenance onSelect={handleMaintenanceSelect} />
          </motion.div>
        )}

        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionSettings}
            key="thankyou"
            className="p-4 relative flex flex-col gap-4"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {t("price-choice")}
            </h3>
            <p className="text-lg sm:text-md md:text-lg lg:text-xl xl:text-2xl">
              {t("price-description")}
            </p>
            <ul className="flex flex-col gap-2 font-semibold text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl">
              {selectedPackages.map((pkg, index) => (
                <li key={index} className="flex flex-row gap-4 items-center justify-center">
                  {pkg}
                  <ResponsiveButton size="sm" variant="remove" onClick={() => removePackage(pkg)}>
                    {t("remove")}
                  </ResponsiveButton>
                </li>
              ))}
            </ul>

            <div className='w-full flex justify-center items-center'>
              <ResponsiveButton onClick={handleReset} size="sm" variant="redo">
                
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m9 14l-4-4l4-4"></path><path d="M5 10h11a4 4 0 1 1 0 8h-1"></path></g></svg>
              </ResponsiveButton>
            </div>
            
            {/* Scroll to Contact Button */}
            <div className="relative w-full h-px flex items-center justify-center w-full bg-black-soil">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="flex justify-center items-center absolute h-10 w-10 sm:w-16 sm:h-16 bottom-2 sm:bottom-4 right-4 bg-green-200 text-black p-2 rounded-full shadow-lg"
                onClick={() => {
                  const contactSection = document.getElementById('contactRef');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6z"></path></svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showPopup && (
        <Popup
          message={popupType === 'success' ? t("price-popup-success") : t("price-popup-failed")}
          onClose={closePopup}
          type={popupType}
        />
      )}
    </div>
  );
};

export default PriceSection;
