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

      // Scroll to the contact section with header offset
      const headerOffset = 80; // Height of the fixed header
      const elementPosition = contactRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };


  return (
    <div className="min-w-[325px] md:min-w-[350px] w-full p-6 md:p-8 bg-white dark:bg-dark-grey rounded-xl font-montserrat shadow-custom-shadow">
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
