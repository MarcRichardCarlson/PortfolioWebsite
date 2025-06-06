import React from "react";
import Icon1 from "../../public/icons/PhHandWaving.svg"
import Icon2 from "../../public/icons/CarbonEarthEuropeAfrica.svg"
import Icon3 from "../../public/icons/HeroiconsFingerPrint20Solid.svg"
import Icon4 from "../../public/icons/PhChatCenteredText.svg"
import Image from "next/image";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import RevealOnScroll from "../RevealOnScroll";

interface DynamicGridProps {
  contactRef: React.RefObject<HTMLElement>;
}

const DynamicGrid: React.FC<DynamicGridProps> = ({ contactRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const handleScrollToContact = () => {
    if (contactRef && contactRef.current) {
      // Create and style the dark overlay
      const darkOverlay = document.createElement("div");
      darkOverlay.style.position = "fixed";
      darkOverlay.style.inset = "0";
      darkOverlay.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Start transparent
      darkOverlay.style.zIndex = "10";
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

  const boxes = [
    { title: t("hero-gridbox-header-1"), content: t("hero-gridbox-text-1"), icon: <Image height={45} width={45} src={Icon1} alt="" className="w-8 h-8 md:w-12 md:h-12" /> },
    { title: t("hero-gridbox-header-2"), content: t("hero-gridbox-text-2"), icon: <Image height={45} width={45} src={Icon2} alt="" className="w-8 h-8 md:w-12 md:h-12" /> },
    { title: t("hero-gridbox-header-3"), content: t("hero-gridbox-text-3"), icon: <Image height={45} width={45} src={Icon3} alt="" className="w-8 h-8 md:w-12 md:h-12" /> },
    { title: t("hero-gridbox-header-4"), content: t("hero-gridbox-text-4"), icon: <Image height={45} width={45} src={Icon4} alt="" className="w-8 h-8 md:w-12 md:h-12" />, button: <ResponsiveButton size="xl" variant="secondary">{t("CTA")}</ResponsiveButton> },
  ];

  return (
    <div className="w-full min-h-fit">
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full h-full">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="overflow-hidden flex flex-col justify-start gap-4 p-6 md:p-8 bg-white dark:bg-dark-grey rounded-xl shadow-custom-shadow"
          >

            <RevealOnScroll direction="left" duration={1} delay={0}>
              {/* Icon */}
              <div className="">{box.icon}</div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" duration={1} delay={0.4}>
              {/* Title */}
              <h2 className="text-xl md:text-3xl font-semibold text-black dark:text-white">{box.title}</h2>
            </RevealOnScroll>
            <RevealOnScroll direction="left" duration={1} delay={0.8}>
              {/* Content */}
              <p className="text-gray-800 dark:text-white">{box.content}</p>
            </RevealOnScroll>
            {box.button && (
              <RevealOnScroll direction="bottom" duration={1} delay={0}>
                {/* Button */}
                <div onClick={handleScrollToContact}>{box.button}</div>
              </RevealOnScroll>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicGrid;
