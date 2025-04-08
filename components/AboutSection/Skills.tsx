"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import RevealOnScroll from '../RevealOnScroll';

type TechStacks = {
    [category: string]: (string | null)[];
};

const columnNames = ["Web Design", "Frontend", "Backend", "Others"];

interface SkillsProps {
    columnNames: string[];
}

const Skills: React.FC<SkillsProps> = ({ columnNames }) => {
    const locale = useCurrentLocale();
    const { t } = useTranslation(locale, "translation");

    const techStacks: TechStacks = {
        "Web Design": [
            'UI/UX Design',
            t("about-skill-responsive"),
            'Wireframing',
            'Figma',
            t("about-skill-interaction"),
            t("about-skill-animation"),
            t("about-skill-grid"),
            'Prototyping',
            'User Research'
        ],
        "Frontend": [
            'Next.JS',
            'TypeScript',
            'JavaScript',
            'React.JS',
            'Tailwind CSS',
            'HTML',
            'CSS/SASS',
            'Bootstrap',
            'Framer Motion',
        ],
        "Backend": [
            'C# (.NET Core)',
            'Node.js',
            'Express.JS',
            'MongoDB',
            'Vercel',
            'No/MySQL',
            'Cloudflare',
            'Azure',
            'Firebase',
        ],
        "Others": [
            'Postman',
            'Git / GitHub',
            t("about-skill-time"),
            t("about-skill-agile"),
            t("about-skill-problem"),
            t("about-skill-communication"),
            t("about-skill-team"),
            t("about-skill-critical"),
            t("about-skill-flexibility"),
        ]
    };

    return (
        <div className="overflow-hidden flex flex-col justify-center gap-8 min-w-64 w-full px-4 sm:px-6 md:px-8 bg-white dark:bg-dark-grey p-6 md:p-8 rounded-xl shadow-custom-shadow font-montserrat shadow-custom-shadow">
            <div className="grid grid-cols-2 gap-4 2xl:grid-cols-4 md:gap-6 text-center sm:text-left">
                {columnNames.map((colName, colIndex) => (
                    <div key={colIndex} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-true-blue/20 to-tech-orange/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        <div className="relative">
                            <RevealOnScroll direction="left" duration={0.5} delay={0}>
                                <h3 className="whitespace-nowrap text-true-blue text-2xl mb-2 md:mb-6 font-bold">{colName}</h3>
                            </RevealOnScroll>

                            <div className="flex flex-col gap-1">
                                {techStacks[colName].map((tech, index) => (
                                    tech && (
                                        <motion.div
                                            key={tech}
                                            className="flex flex-col gap-2 text-center sm:text-left text-black dark:text-gray-200 text-xs sm:text-sx md:text-sm lg:text-base group/item"
                                            initial={{ opacity: 0, y: -50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.3 }}
                                        >
                                            <RevealOnScroll direction="top" duration={0.5} delay={0}>
                                                <span className="relative inline-block group-hover/item:text-tech-orange transition-colors duration-100 cursor-default">
                                                    {tech}
                                                </span>
                                            </RevealOnScroll>
                                        </motion.div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
export { columnNames };