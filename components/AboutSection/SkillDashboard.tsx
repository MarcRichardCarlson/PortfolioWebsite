import React from 'react';
import CircularProgress from './CircularProgress';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import AnimateOnView from '../AnimateOnView';

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
    <div className='overflow-hidden flex flex-col gap-16 pb-16 bg-light-grey dark:bg-dark-grey p-8 rounded-3xl shadow-custom-shadow'>
      <AnimateOnView direction="left" duration={1} delay={0}>
        <h3 className='text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-montserrat text-white-grey'>
          {t("about-title")}.
        </h3>
      </AnimateOnView>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between items-center gap-6">
        {skills.map((skill) => (
          <AnimateOnView 
            key={skill.name} // Add the key prop here
            direction="bottom" 
            duration={1} 
            delay={0.4}
          >
            <div className="flex flex-row md:flex-col items-center justify-start xl:justify-center gap-4 m-0 p-0">
              <CircularProgress value={skill.level} text={`${skill.level}%`} size={120} />
              <p className="text-black dark:text-white text-sm lg:text-lg font-orbitron">{skill.name}</p>
            </div>
          </AnimateOnView>
        ))}
      </div>
    </div>
  );
};

export default SkillDashboard;
