"use client";

import React, { useState, useEffect } from "react";
import Skills, { columnNames } from "./Skills";
import Education from "./Education";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import TypingEffect from "./TypingEffect";
import RevealOnScroll from "../RevealOnScroll";
import Image from 'next/image';
import AboutImage from "../../public/images/GrönaHusMockup.png"
import { useLiquidGlass } from '@/contexts/LiquidGlassContext';

const AboutSection: React.FC = () => {
    const locale = useCurrentLocale();
    const { t } = useTranslation(locale, "translation");
    const [mounted, setMounted] = useState(false);
    const { isLiquidGlassEnabled } = useLiquidGlass();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-4 md:pb-8 px-4 sm:px-6 md:px-8 text-black dark:text-white">
                <div className={`w-full flex flex-col h-full p-6 md:p-8 rounded-xl transition-all duration-200 ${
                    isLiquidGlassEnabled
                        ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-glass border border-white/20 dark:border-white/10'
                        : 'bg-white dark:bg-dark-grey'
                } shadow-custom-shadow`}>
                    <RevealOnScroll direction="left" duration={0.5} delay={0}>
                        <h3 className="text-xl md:text-3xl lg:text-5xl font-montserrat flex items-center gap-2 mb-2 md:mb-4">
                            <span className="bg-gradient-to-r from-true-blue to-tech-orange bg-clip-text text-transparent">{t("about-header")}</span>
                            <span className="text-tech-orange">.</span>
                        </h3>
                    </RevealOnScroll>

                    <RevealOnScroll direction="top" duration={0.5} delay={0.4}>
                        <div className="relative mb-2 md:mb-4">
                            <div className={`absolute -inset-1 rounded-lg blur transition-all duration-200 ${
                                isLiquidGlassEnabled
                                    ? 'bg-gradient-to-r from-true-blue/30 to-tech-orange/30 opacity-100'
                                    : 'bg-gradient-to-r from-true-blue/20 to-tech-orange/20 opacity-20'
                            }`}></div>
                            {mounted && <TypingEffect />}
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll direction="right" duration={0.5} delay={0}>
                        <div className="flex-1">
                            <span className="font-montserrat text-white-grey leading-[1.2] block text-[clamp(0.875rem,1.4vw,1rem)] md:text-[clamp(1rem,1.6vw,1rem)] lg:text-[clamp(1.125rem,1.8vw,1rem)] max-w-[100%]">
                                {t("about-text")}
                            </span>
                        </div>
                    </RevealOnScroll>
                </div>

                <Skills columnNames={columnNames} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 sm:px-6 md:px-8 mb-8">
                <div className={`text-black dark:text-white p-6 md:p-8 rounded-xl transition-all duration-200 ${
                    isLiquidGlassEnabled
                        ? 'liquid-glass dark:liquid-glass-dark liquid-glass-light backdrop-blur-glass border border-white/20 dark:border-white/10'
                        : 'bg-white dark:bg-dark-grey'
                } shadow-custom-shadow`}>
                    <RevealOnScroll direction="bottom" duration={0.5} delay={0}>
                        <Education />
                    </RevealOnScroll>
                </div>

                <div className="relative w-full transition-all duration-200">
                    <div className="relative w-full h-full">
                        <Image
                            src={AboutImage}
                            alt="About image"
                            sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full max-h-[500px] h-full object-cover rounded-xl shadow-custom-shadow"
                            unoptimized={true}
                        />
                        {isLiquidGlassEnabled && (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none rounded-xl border-4 border-white/20 shadow-inner" />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutSection;
