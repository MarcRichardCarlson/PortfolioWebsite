import Portrait from "./Portrait";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import WeatherComponent from "./Weather";

const HeroSection: React.FC<{ contactRef: React.RefObject<HTMLElement>, projectsRef: React.RefObject<HTMLElement> }> = ({ contactRef, projectsRef }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 md:py-0 md:h-screen w-fit px-4 sm:px-8 md:px-16 flex lg:flex-row justify-start items-center transition-all duration-300 ease-in-out">
      <div className="relative z-10 flex flex-col items-center lg:items-start lg:text-left text-white-grey gap-16px sm:gap-32px">
        <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{t("hero-text")}👋</span>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
            <span className="text-indigo-700">Front</span>end<br />{t("hero-header")}
          </h1>
          <Portrait />
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-600">
          <span className="flex items-center flex-wrap justify-center lg:justify-start text-white-grey" style={{ flex: "1 1 auto", minWidth: "0" }}>
            {t("hero-text2")}&nbsp;
            <WeatherComponent city="Stockholm" />
          </span>&nbsp;
          <span className="text-center md:text-left text-white-grey" style={{ flex: "1 1 auto", minWidth: "0" }}>
            {t("hero-text3")}
          </span>
        </div>



        <div className="flex flex-row gap-8px">

          <ResponsiveButton size="xl" variant="primary" onClick={scrollToContact}>
            {t("CTA")}
          </ResponsiveButton>
          <ResponsiveButton size="xl" variant="secondary" onClick={scrollToProjects}>
            {t("CTA2")}
          </ResponsiveButton>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
