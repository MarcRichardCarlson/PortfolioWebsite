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
    <section className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 flex flex-col lg:flex-row justify-center items-center hero-section">
      <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left text-white gap-16px sm:gap-32px">
        <span className="text-black font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{t("hero-text")}👋</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-black">
          <span className="text-indigo-700">Front</span>end<br />{t("hero-header")}
        </h1>
        <div className="flex flex-wrap justify-center lg:justify-start text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-600">
          <span className="flex items-center flex-wrap justify-center lg:justify-start" style={{ flex: "1 1 auto", minWidth: "0" }}>
            {t("hero-text2")}&nbsp;
            <WeatherComponent city="Stockholm" />
          </span>&nbsp;
          <span style={{ flex: "1 1 auto", minWidth: "0" }}>
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
      <div className="mt-8 lg:mt-0 lg:ml-8 xl:ml-16 2xl:ml-24 h-auto">
        <Portrait />
      </div>
    </section>
  );
}

export default HeroSection;
