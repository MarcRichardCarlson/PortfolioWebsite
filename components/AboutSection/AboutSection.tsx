import React from "react";
import Sidebar from "./Sidebar";
import Bento from "./Education";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const columnNames = ["Web Design", "Frontend", "Backend", "Soft Skills"];

const AboutSection = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");
  {t("about-header")}

  return (
  <section className="w-full py-8 bg-white min-h-screen flex flex-col gap-4 justify-around sidebar-section px-4 md:px-8">
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-black">
        <span>{t("about-header")}</span><span className="text-indigo-700">.</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-neutral-600">
        {t("about-text")}
      </p>
    </div>

    <Bento/>

    <Sidebar columnNames={columnNames} />
  </section>
)};

export default AboutSection;