import React from 'react';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import WheelMarquee from './WheelMarquee';

const Education: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const items = [
    <div key="item-1" className="flex flex-col gap-2">
      <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white-grey">KYH Liljeholmen {t("about-item1")} -  
        <span className='text-tech-orange sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Stockholm</span></h2>
      <p className="text-neutral-600 font-semibold text-sm md:text-base lg:text-md">{t("about-item-text1")}</p>
    </div>,
    <div key="item-2" className="flex flex-col gap-2">
      <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white-grey">NTI {t("about-item2")} -  
        <span className='text-tech-orange sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Stockholm</span></h2>
      <p className="text-neutral-600 font-semibold text-sm md:text-lg lg:text-xl">{t("about-item-text2")}</p>
    </div>,
    <div key="item-3" className="flex flex-col gap-2">
      <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white-grey">NTI {t("about-item3")} -  
      <span className='text-tech-orange sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Stockholm</span></h2>
      <p className="text-neutral-600 font-semibold text-sm md:text-lg lg:text-xl">{t("about-item-text3")}</p>
    </div>,
    <div key="item-4" className="flex flex-col gap-2">
      <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white-grey">NTI {t("about-item4")} -  
      <span className='text-tech-orange sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Stockholm</span></h2>
      <p className="text-neutral-600 font-semibold text-sm md:text-lg lg:text-xl">{t("about-item-text4")}</p>
    </div>,
    <div key="item-5" className="flex flex-col gap-2">
      <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white-grey">NTI {t("about-item5")} -  
      <span className='text-tech-orange sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Stockholm</span></h2>
      <p className="text-neutral-600 font-semibold text-sm md:text-lg lg:text-xl">{t("about-item-text5")}</p>
    </div>
  ];

  return (
    <div className="flex flex-col gap-4 items-start justify-center">
      <WheelMarquee items={items} />
    </div>
  );
}

export default Education;
