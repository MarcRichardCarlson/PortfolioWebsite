import Portrait from "./Portrait";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import ResponsiveButton from "../Buttons";
import LanguagePicker from "../Footer/LanguagePicker";

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
    <section className="bg-black-soil relative mx-auto flex lg:flex-row justify-center items-center transition-all duration-300 ease-in-out overflow-hidden h-screen">
      <div className='absolute top-4 right-4 md:top-4 md:right-8 text-white'>
      <LanguagePicker />
      </div>
      <div className="max-w-[1400px] px-4 sm:px-6 md:px-8 relative z-10 flex flex-col items-center md:items-start text-white-grey gap-16px">

        <div className="flex flex-col xl:flex-row items-center gap-6 w-full justify-between">

          <h1 className="md:text-left text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold font-inter">
            <span className="bg-gradient-to-r from-green-800 via-green-600 to-green-400 bg-clip-text text-transparent">
              {t("hero-text")},
            </span>
            <br></br>
            {t("hero-header")}
          </h1>

          <Portrait />
        </div>

        <span className="flex flex-wrap items-center justify-start md:text-left text-center font-targa text-white-grey text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-600">
          {t("hero-text2")}
        </span>

        <div className="flex flex-row gap-8px">

          <ResponsiveButton size="xl" variant="primary" onClick={scrollToContact}>
            {t("CTA")}
          </ResponsiveButton>
          <ResponsiveButton size="xl" variant="secondary" onClick={scrollToProjects}>
            {t("CTA2")}
          </ResponsiveButton>
        </div>
        {/* <div className="mt-20">
          <SpolaKnapp />
        </div> */}
      </div>
    </section>
  );
}

export default HeroSection;
