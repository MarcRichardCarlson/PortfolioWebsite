"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

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
        <div className="bg-black-soil flex flex-col justify-center gap-8 min-w-64 w-full px-4 sm:px-6 md:px-8">
           
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 text-center sm:text-left max-w-[1400px]">
                {columnNames.map((colName, colIndex) => (
                    <div key={colIndex}>
                        <h3 className="text-white-grey font-extrabold text-2xl mb-4">{colName}</h3>
                        {techStacks[colName].map((tech, index) => (
                            tech && (
                                <motion.div
                                    key={tech}
                                    className="flex flex-col gap-2 text-center sm:text-left text-white-grey text-lg font-inter text-xs sm:text-sm md:text-md lg:text-lg"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.3 }}
                                >
                                    {tech}
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