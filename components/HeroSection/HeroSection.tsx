import Portrait from "./Portrait";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import LanguagePicker from '../Footer/LanguagePicker';
import HeaderMediaIcons from '../Header/HeaderMediaIcons';
import Image from "next/image";
import ImageCut from "../../public/images/o1fOaxeAF4K.png"
import DynamicGrid from "./DynamicGrid";
import AnimateOnView from "../AnimateOnView";

const HeroSection: React.FC<{ contactRef: React.RefObject<HTMLElement>, projectsRef: React.RefObject<HTMLElement> }> = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  return (
    <section className="relative z-10 flex flex-col items-center md:items-start text-white-grey gap-8 w-full transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8 pb-8">

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 w-full">

          <div className="overflow-hidden relative w-full flex flex-col gap-4 justify-between bg-custom-gradient-light dark:bg-custom-gradient rounded-3xl p-8 shadow-custom-shadow">
              
            <div className="flex flex-col gap-8">
              <AnimateOnView direction="left" duration={1} delay={0}>
                <div className="flex justify-between">
                  <Portrait />
                  <LanguagePicker />
                </div>
              </AnimateOnView>

              <AnimateOnView  direction="right" duration={0.8} delay={0.4}>
                <h1 className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat text-black dark:text-white">{t("hero-header")}</h1>
              </AnimateOnView>
            </div>

            <AnimateOnView direction="top" duration={1.2} delay={0.8}>
              <div className="flex justify-between w-full text-black">
                <HeaderMediaIcons linkedinUrl={"https://www.linkedin.com/in/marc-carlson-5671291a6/"} facebookUrl={"https://www.facebook.com/marc.carlson.7"} instagramUrl={"https://www.instagram.com/marcrcarlson/"} githubUrl={"https://github.com/MarcRichardCarlson"} />
              </div>
            </AnimateOnView>
          </div>

          <Image
            className="rounded-3xl shadow-custom-shadow w-full h-[600px]"
            src={ImageCut}
            alt="Decorative image 1"
          />
      </div>

      <DynamicGrid/>

    </section>
  );
}

export default HeroSection;
