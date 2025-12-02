import React, { memo, useCallback } from 'react';
import Icon1 from "../../public/icons/PhHandWaving.svg"
import Icon2 from "../../public/icons/CarbonEarthEuropeAfrica.svg"
import Icon3 from "../../public/icons/HeroiconsFingerPrint20Solid.svg"
import Icon4 from "../../public/icons/PhChatCenteredText.svg"
import Image from "next/image";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import RevealOnScroll from "../RevealOnScroll";
import { useLiquidGlass } from '@/contexts/LiquidGlassContext';

interface DynamicGridProps {
  contactRef: React.RefObject<HTMLElement>;
}

const DynamicGrid: React.FC<DynamicGridProps> = memo(({ contactRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const { isLiquidGlassEnabled } = useLiquidGlass();

  const handleScrollToContact = useCallback(() => {
    if (contactRef && contactRef.current) {
      const headerOffset = 80;
      const elementPosition = contactRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, [contactRef]);

  const boxes = [
    {
      title: t("hero-gridbox-header-1"),
      content: t("hero-gridbox-text-1"),
      icon: <Image height={45} width={45} src={Icon1} alt="" className="w-8 h-8 md:w-12 md:h-12" priority />
    },
    {
      title: t("hero-gridbox-header-2"),
      content: t("hero-gridbox-text-2"),
      icon: <Image height={45} width={45} src={Icon2} alt="" className="w-8 h-8 md:w-12 md:h-12" priority />
    },
    {
      title: t("hero-gridbox-header-3"),
      content: t("hero-gridbox-text-3"),
      icon: <Image height={45} width={45} src={Icon3} alt="" className="w-8 h-8 md:w-12 md:h-12" priority />
    },
    {
      title: t("hero-gridbox-header-4"),
      content: t("hero-gridbox-text-4"),
      icon: <Image height={45} width={45} src={Icon4} alt="" className="w-8 h-8 md:w-12 md:h-12" priority />,
      button: <ResponsiveButton size="xl" variant="secondary">{t("CTA")}</ResponsiveButton>
    },
  ];

  const GridBox = memo(({ box, index }: { box: any, index: number }) => (
    <div
      key={index}
      className={`overflow-hidden flex flex-col justify-start gap-4 p-6 md:p-8 rounded-xl transition-all duration-200 ${
        isLiquidGlassEnabled
          ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-glass border border-white/20 dark:border-white/10'
          : 'bg-white dark:bg-dark-grey'
      } shadow-custom-shadow`}
    >
      <RevealOnScroll direction="left" duration={1} delay={0}>
        <div className="">{box.icon}</div>
      </RevealOnScroll>
      <RevealOnScroll direction="right" duration={1} delay={0.4}>
        <h2 className="text-xl md:text-3xl font-semibold text-black dark:text-white">{box.title}</h2>
      </RevealOnScroll>
      <RevealOnScroll direction="left" duration={1} delay={0.8}>
        <p className="text-gray-800 dark:text-white">{box.content}</p>
      </RevealOnScroll>
      {box.button && (
        <RevealOnScroll direction="bottom" duration={1} delay={0}>
          <div onClick={handleScrollToContact}>{box.button}</div>
        </RevealOnScroll>
      )}
    </div>
  ));

  GridBox.displayName = 'GridBox';

  return (
    <div className="w-full min-h-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full h-full">
        {boxes.map((box, index) => (
          <GridBox key={index} box={box} index={index} />
        ))}
      </div>
    </div>
  );
});

DynamicGrid.displayName = 'DynamicGrid';

export default DynamicGrid;
