"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import AnimateOnView from '../AnimateOnView';

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
        <div className="overflow-hidden flex flex-col justify-center gap-8 min-w-64 w-full px-4 sm:px-6 md:px-8 bg-light-grey dark:bg-dark-grey p-6 md:p-8 rounded-3xl shadow-custom-shadow font-montserrat">
           
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 gap-8 md:gap-4 text-center sm:text-left">
                {columnNames.map((colName, colIndex) => (
                    <div key={colIndex}>

                        <AnimateOnView direction="left" duration={0.5} delay={0}>
                            <h3 className="text-black dark:text-true-blue text-2xl mb-2 md:mb-4">{colName}</h3>
                        </AnimateOnView>
                        
                        {techStacks[colName].map((tech, index) => (
                            tech && (
                                <motion.div
                                    key={tech}
                                    className="flex flex-col gap-2 text-center sm:text-left text-black dark:text-gray-200 text-lg text-xs sm:text-sm md:text-md lg:text-lg"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.3 }}
                                >
                                    <AnimateOnView direction="top" duration={0.5} delay={0}>
                                        {tech}
                                    </AnimateOnView>
                                </motion.div>
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
export { columnNames };