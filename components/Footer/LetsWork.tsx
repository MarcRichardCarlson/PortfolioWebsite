import React from "react";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const LetsWork = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  return (
    <div className="min-w-[350px] w-full p-8 bg-light-grey dark:bg-dark-grey rounded-3xl shadow-lg font-montserrat">
      {/* Smaller Boxes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"></div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"></div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hidden md:block"></div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"></div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"></div>

      {/* Central Call-to-Action */}
      <div className="flex flex-col justify-between items-start h-full">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
          {t("footer-lets-work1")}
          <br />
          {t("footer-lets-work2")}
        </h2>
        <div className="flex flex-col justify-start gap-2 text-gray-700 dark:text-gray-300">
          <a href="#collaborate" className="hover:text-gray-200 transition-all">
            Collaborate With Me
          </a>
          <a href="#hire-me" className="hover:text-gray-200 transition-all">
            Hire Me
          </a>
          <a href="#freelance" className="hover:text-gray-200 transition-all">
            Freelance a Project
          </a>
          <a href="#mentor-me" className="hover:text-gray-200 transition-all">
            Apply as a Mentor
          </a> 
        </div>
      </div>
    </div>
  );
};

export default LetsWork;
