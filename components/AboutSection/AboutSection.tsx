import React from "react";
import Skills, { columnNames } from "./Skills";
import Education from "./Education";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import TypingEffect from "./TypingEffect";
import SkillDashboard from "./SkillDashboard";

const AboutSection: React.FC = () => {
    const locale = useCurrentLocale();
    const { t } = useTranslation(locale, "translation");

    return (
        <div className="bg-black-soil min-h-screen flex justify-center items-center">
            <div className="w-full max-w-[1400px] mx-auto">
                <section className="w-full w-full flex flex-col xl:flex-row justify-around px-4 sm:px-6 md:px-8 gap-16 xl:gap-0 pt-24 xl:pt-0 pb-4">
                    <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center xl:justify-start">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white-grey">
                            <span>{t("about-header")}</span><span className="bg-gradient-to-r from-green-800 via-green-600 to-green-400 bg-clip-text text-transparent">.</span>
                        </h1>

                        <TypingEffect/>

                        <span className="text-base md:text-sm lg:text-sm xl:text-lg font-inter text-white-grey whitespace-normal">
                            {t("about-text")}
                        </span>

                    </div>
                    
                    <div className="w-full xl:w-1/2">
                        <Education/>
                    </div>

                </section>

                <div className="flex flex-col gap-16">
                    <SkillDashboard/>
                    <Skills columnNames={columnNames} />
                </div>
                

            </div>
        </div>
    );
};

export default AboutSection;
