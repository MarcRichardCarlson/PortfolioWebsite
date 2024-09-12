import React from "react";
import Skills, { columnNames } from "./Skills";
import Education from "./Education";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import TypingEffect from "./TypingEffect";

const AboutSection: React.FC = () => {
    const locale = useCurrentLocale();
    const { t } = useTranslation(locale, "translation");

    return (
        <>
        <section className="w-full py-8 min-h-screen flex flex-col gap-4 justify-between px-4 sm:px-8 md:px-16">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white-grey">
                    <span>{t("about-header")}</span><span className="text-indigo-700">.</span>
                </h1>

                <TypingEffect/>

                <div className='flex flex-row justify-left items-center gap-4'>
                    <span className="text-xs sm:text-sm md:text-base md:w-full lg:w-1/2 font-inter font-semibold text-white-grey">
                        {t("about-text")}
                    </span>
                </div>
            </div>

            <div className="w-full h-px bg-indigo-700"></div>

            <Education/>

        </section>
        <Skills columnNames={columnNames} />
        </>
    );
};

export default AboutSection;
