import React from "react";
import Icon1 from "../../public/icons/PhHandWaving.svg"
import Icon2 from "../../public/icons/CarbonEarthEuropeAfrica.svg"
import Icon3 from "../../public/icons/HeroiconsFingerPrint20Solid.svg"
import Icon4 from "../../public/icons/PhChatCenteredText.svg"
import Image from "next/image";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import AnimateOnView from "../AnimateOnView";

const DynamicGrid: React.FC = () => {
    const locale = useCurrentLocale();
    const { t } = useTranslation(locale, "translation");

    const boxes = [
        { title: t("hero-gridbox-header-1"), content: t("hero-gridbox-text-1"), icon: <Image height={45} width={45} src={Icon1} alt=""/> },
        { title: t("hero-gridbox-header-2"), content: t("hero-gridbox-text-2"), icon: <Image height={45} width={45} src={Icon2} alt=""/> },
        { title: t("hero-gridbox-header-3"), content: t("hero-gridbox-text-3"), icon: <Image height={45} width={45} src={Icon3} alt=""/> },
        { title: t("hero-gridbox-header-4"), content: t("hero-gridbox-text-4"), icon: <Image height={45} width={45} src={Icon4} alt=""/>, button:<ResponsiveButton size="xl" variant="secondary">{t("CTA")}</ResponsiveButton>},
    ];

  return (
    <div className="w-full min-h-fit">
      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full h-full">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="overflow-hidden flex flex-col justify-start gap-4 p-8 bg-light-grey dark:bg-dark-grey rounded-3xl shadow-custom-shadow"
          >

            <AnimateOnView direction="left" duration={1} delay={0}>
              {/* Icon */}
              <div className="">{box.icon}</div>
            </AnimateOnView>
            <AnimateOnView direction="right" duration={1} delay={0.4}>
              {/* Title */}
              <h2 className="text-3xl font-semibold text-black dark:text-white">{box.title}</h2>
            </AnimateOnView>
            <AnimateOnView direction="left" duration={1} delay={0.8}>  
              {/* Content */}
              <p className="text-gray-600 dark:text-white">{box.content}</p>
            </AnimateOnView>
            <AnimateOnView direction="bottom" duration={1} delay={0}>  
              {/* Button */}
              <div>{box.button}</div>
            </AnimateOnView>

          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicGrid;
