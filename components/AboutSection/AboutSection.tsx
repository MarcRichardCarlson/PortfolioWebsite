import React from "react";
import Skills, { columnNames } from "./Skills";
import Education from "./Education";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import TypingEffect from "./TypingEffect";
import SkillDashboard from "./SkillDashboard";
import AnimateOnView from "../AnimateOnView";

const AboutSection: React.FC = () => {
    const locale = useCurrentLocale();
    const { t } = useTranslation(locale, "translation");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 px-4 sm:px-6 md:px-8 text-black dark:text-white">
            <section className="overflow-hidden bg-light-grey dark:bg-dark-grey rounded-3xl p-8 w-full shadow-custom-shadow">
                <div className="w-full flex flex-col gap-2">
                    <AnimateOnView direction="left" duration={1} delay={0}>
                        <h3 className="text-5xl font-montserrat">
                            <span>{t("about-header")}</span><span>.</span>
                        </h3>
                    </AnimateOnView>

                    <AnimateOnView direction="top" duration={1} delay={0.4}>
                        <TypingEffect />
                    </AnimateOnView>

                    <AnimateOnView direction="right" duration={1} delay={0}>
                        <span className="text-base lg:text-base xl:text-lg font-montserrat text-white-grey">
                            {t("about-text")}
                        </span>
                    </AnimateOnView>

                </div>

            </section>

            <Skills columnNames={columnNames} />
            <div className="bg-light-grey dark:bg-dark-grey p-8 rounded-3xl">
                <AnimateOnView direction="bottom" duration={1} delay={0.4}>
                    <Education />
                </AnimateOnView>
            </div>


            <SkillDashboard />


        </div>
    );
};

export default AboutSection;
