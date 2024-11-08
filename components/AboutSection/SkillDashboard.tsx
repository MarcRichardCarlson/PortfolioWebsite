import React from 'react';
import CircularProgress from './CircularProgress';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const SkillDashboard: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const skills = [
    { name: t("about-nature"), level: 71 },
    { name: t("about-art"), level: 46 },
    { name: t("about-tech"), level: 52 },
    { name: t("about-travel"), level: 100 },
    { name: t("about-music"), level: 93 },
  ];

  return (
    <div className='px-4 sm:px-6 md:px-8'>
      <div className='flex flex-col gap-10 border-t border-b py-12'>
        <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white-grey'>
          {t("about-title")}<span className="bg-gradient-to-r from-green-800 via-green-600 to-green-400 bg-clip-text text-transparent">.</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between items-center gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-row md:flex-col items-center justify-start xl:justify-center gap-4 m-0 p-0">
              <CircularProgress value={skill.level} text={`${skill.level}%`} size={120} />
              <p className="text-white text-sm lg:text-lg font-targa">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillDashboard;
