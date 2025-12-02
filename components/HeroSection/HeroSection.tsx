import React, { memo } from 'react';
import Portrait from "./Portrait";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import LanguagePicker from '../Footer/LanguagePicker';
import HeaderMediaIcons from '../Header/HeaderMediaIcons';
import Image from "next/image";
/* import ImageCut from "../../public/images/o1fOaxeAF4K.png"*/
import HeroImage from "../../public/images/HeroImage.png"
import DynamicGrid from "./DynamicGrid";
import RevealOnScroll from "../RevealOnScroll";
import { motion } from 'framer-motion';
import { useLiquidGlass } from '@/contexts/LiquidGlassContext';

const HeroSection: React.FC<{ contactRef: React.RefObject<HTMLElement>, projectsRef: React.RefObject<HTMLElement> }> = memo(({ contactRef, projectsRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  const { isLiquidGlassEnabled } = useLiquidGlass();

  return (
    <section className="mt-32 relative flex flex-col items-center md:items-start text-white-grey gap-4 md:gap-8 w-full transition-all duration-200 ease-in-out px-4 sm:px-6 md:px-8 pb-4 md:pb-8">

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:gap-8 w-full">

        <div className={`max-h-[500px] overflow-hidden relative w-full flex flex-col gap-4 justify-between rounded-xl p-6 md:p-8 transition-all duration-200 ${
          isLiquidGlassEnabled 
            ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-glass border border-white/20 dark:border-white/10' 
            : 'bg-custom-gradient-light dark:bg-custom-gradient'
        } shadow-custom-shadow`}>
          <div className="absolute top-4 right-4">
            <LanguagePicker />
          </div>

          <div className="flex flex-row items-center gap-6 md:gap-8 pt-12">
            <RevealOnScroll direction="left" duration={0.3} delay={0}>
              <div className="flex justify-between items-center">
                <Portrait />
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" duration={0.25} delay={0.1}>
              <h1 className="font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-montserrat text-black dark:text-white">{t("hero-header")}</h1>
            </RevealOnScroll>
          </div>

          <RevealOnScroll direction="top" duration={0.3} delay={0.2}>
            <div className="flex justify-between w-full text-black">
              <HeaderMediaIcons
                linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"}
                facebookUrl={"https://www.facebook.com/marc.carlson.7"}
                instagramUrl={"https://www.instagram.com/marcrcarlson/"}
                githubUrl={"https://github.com/MarcRichardCarlson"}
              />
            </div>
          </RevealOnScroll>
        </div>

        <div className="relative w-full transition-all duration-200"
          
        >
          <div className="relative w-full h-full">
            <Image
              className="max-h-[500px] rounded-xl shadow-custom-shadow w-full min-w-325 h-[500px] object-cover"
              src={HeroImage}
              alt="Decorative image 1"
              height={500}
              width={500}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {isLiquidGlassEnabled && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none rounded-xl border-4 border-white/20 shadow-inner" />
            )}
          </div>
        </div>
      </div>

      <DynamicGrid contactRef={contactRef} />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
