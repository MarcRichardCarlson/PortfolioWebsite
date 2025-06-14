import React from 'react';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import WheelMarquee from './WheelMarquee';

const Education: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const items = [
    <div key="item-1" className="flex flex-col gap-0 md:gap-2 p-4 rounded-lg hover:bg-white/5 transition-colors duration-100">
      <h2 className="sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white-grey group">
        KYH Liljeholmen {t("about-item1")} -
        <span className='text-tech-orange sm:text-sm md:text-base lg:text-base xl:text-lg ml-2'>Stockholm</span>
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 font-semibold text-sm md:text-base leading-relaxed">
        {t("about-item-text1")}
      </p>
    </div>,
    <div key="item-2" className="flex flex-col gap-0 md:gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors duration-100">
      <h2 className="sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white-grey group">
        NTI {t("about-item2")} -
        <span className='text-tech-orange sm:text-sm md:text-base lg:text-base xl:text-lg ml-2'>Stockholm</span>
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 font-semibold text-sm md:text-base leading-relaxed">
        {t("about-item-text2")}
      </p>
    </div>,
    <div key="item-3" className="flex flex-col gap-0 md:gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors duration-100">
      <h2 className="sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white-grey group">
        NTI {t("about-item3")} -
        <span className='text-tech-orange sm:text-sm md:text-base lg:text-base xl:text-lg ml-2'>Stockholm</span>
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 font-semibold text-sm md:text-base leading-relaxed">
        {t("about-item-text3")}
      </p>
    </div>,
    <div key="item-4" className="flex flex-col gap-0 md:gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors duration-100">
      <h2 className="sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white-grey group">
        NTI {t("about-item4")} -
        <span className='text-tech-orange sm:text-sm md:text-base lg:text-base xl:text-lg ml-2'>Stockholm</span>
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 font-semibold text-sm md:text-base leading-relaxed">
        {t("about-item-text4")}
      </p>
    </div>,
    <div key="item-5" className="flex flex-col gap-0 md:gap-3 p-4 rounded-lg hover:bg-white/5 transition-colors duration-100">
      <h2 className="sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white-grey group">
        NTI {t("about-item5")} -
        <span className='text-tech-orange sm:text-sm md:text-base lg:text-base xl:text-lg ml-2'>Stockholm</span>
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 font-semibold text-sm md:text-base leading-relaxed">
        {t("about-item-text5")}
      </p>
    </div>
  ];

  return (
    <div className="flex flex-col gap-3 items-center justify-center mt-6">
      <WheelMarquee items={items} />
    </div>
  );
}

export default Education;
