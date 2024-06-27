import CTA from "./CTA";
import CTA2 from "./CTA2";
import Portrait from "./Portrait";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

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
      <div className="relative z-10 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left text-white">
        <span className="text-black font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{t("hero-text")}👋</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-black">
          <span className="text-indigo-700">Front</span>end<br />{t("hero-header")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-600">
          {t("hero-text2")}
        </p>
        <div className="flex flex-row gap-4">
          <CTA onClick={scrollToContact} />
          <CTA2 onClick={scrollToProjects} />
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:ml-8 xl:ml-16 2xl:ml-24 h-auto">
        <Portrait />
      </div>
    </section>
  );
}

export default HeroSection;
