import React from "react";
import Skills, { columnNames } from "./Skills";
import Education from "./Education";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import TypingEffect from "./TypingEffect";
import RevealOnScroll from "../RevealOnScroll";
import Image from 'next/image';
import AboutImage from "../../public/images/kjGgBSc75G0.png"

const AboutSection: React.FC = () => {
    const locale = useCurrentLocale();
    const { t } = useTranslation(locale, "translation");

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-4 md:pb-8 px-4 sm:px-6 md:px-8 text-black dark:text-white">
                <section className="overflow-hidden bg-light-grey dark:bg-dark-grey rounded-3xl p-6 md:p-8 w-full shadow-custom-shadow">
                    <div className="w-full flex flex-col gap-2">
                        <RevealOnScroll direction="left" duration={0.5} delay={0}>
                            <h3 className="text-3xl md:text-5xl font-montserrat">
                                <span>{t("about-header")}</span><span>.</span>
                            </h3>
                        </RevealOnScroll>

                        <RevealOnScroll direction="top" duration={0.5} delay={0.4}>
                            <TypingEffect />
                        </RevealOnScroll>

                        <RevealOnScroll direction="right" duration={0.5} delay={0}>
                            <span className="text-sm lg:text-base xl:text-lg font-montserrat text-white-grey">
                                {t("about-text")}
                            </span>
                        </RevealOnScroll>

                    </div>

                </section>


                <Skills columnNames={columnNames} />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 pb-4 md:pb-8 px-4 sm:px-6 md:px-8 gap-4 md:gap-8">
                <div className="text-black dark:text-white bg-light-grey dark:bg-dark-grey p-6 md:p-8 rounded-3xl ">
                    <RevealOnScroll direction="bottom" duration={0.5} delay={0}>
                        <Education />
                    </RevealOnScroll>
                </div>

                <Image
                    src={AboutImage}
                    alt="About image"
                    width={500}
                    height={500}
                    className="w-full max-h-[500px] h-full object-cover rounded-3xl"
                    unoptimized={true}
                />
            </div>
        </>
    );
};

export default AboutSection;
