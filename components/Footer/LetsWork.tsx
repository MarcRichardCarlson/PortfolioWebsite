import React from "react";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import RevealOnScroll from "../RevealOnScroll";

interface LetsWorkProps {
  contactRef: React.RefObject<HTMLElement>;
}

const LetsWork: React.FC<LetsWorkProps> = ({ contactRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const handleScrollToContact = () => {
    if (contactRef && contactRef.current) {
      // Create and style the dark overlay
      const darkOverlay = document.createElement("div");
      darkOverlay.style.position = "fixed";
      darkOverlay.style.inset = "0";
      darkOverlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Start transparent
      darkOverlay.style.zIndex = "9999";
      darkOverlay.style.transition = "background-color 0.5s ease-in-out, opacity 0.5s ease-in-out";
      darkOverlay.style.opacity = "1"; // Ensure visibility
      document.body.appendChild(darkOverlay);
  
      // Smooth fade-in effect
      setTimeout(() => {
        darkOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      }, 10); // Delay to allow CSS transition to kick in
  
      setTimeout(() => {
        // Fade-out effect after 2 seconds
        darkOverlay.style.opacity = "0";
        setTimeout(() => darkOverlay.remove(), 500); // Remove after fade-out
      }, 2000);
  
      // Scroll to the contact section
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  return (
    <div className="min-w-[325px] md:min-w-[350px] w-full p-6 md:p-8 bg-white dark:bg-dark-grey rounded-xl font-montserrat shadow-custom-shadow hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col justify-between items-start h-full">
        <RevealOnScroll direction="bottom" duration={0.4} delay={0.4}>
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
            {t("footer-lets-work-header1")}
            <br />
            {t("footer-lets-work-header2")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll direction="left" duration={0.4} delay={0.6}>
          <div className="flex flex-col justify-start gap-2">
            {["footer-lets-work-text1", "footer-lets-work-text2", "footer-lets-work-text3", "footer-lets-work-text4"].map(
              (key, index) => (
                <button
                  key={index}
                  onClick={handleScrollToContact}
                  className="text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-black transition-all text-left"
                >
                  {t(key)}
                </button>
              )
            )}
          </div>
        </RevealOnScroll>
      
      </div>
    </div>
  );
};

export default LetsWork;
