"use client";

import React from "react";
import Card from "./Card";
import ProjectImage1 from "../../public/images/dfsync.png";
import ProjectImage2 from "../../public/images/background.jpg";
import ProjectImage3 from "../../public/images/background.jpg";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const ProjectSection = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  return (
    <section className="w-full px-4 md:px-8 py-12 bg-white min-h-screen flex flex-col justify-around">
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold text-center">{t("projects-header")}</h2>
      <p className="text-center text-lg md:text-xl">
        {t("projects-text")}
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      <Card title="E-commerce Platform" image={ProjectImage1}>
        <p className="text-sm md:text-base">
          A robust e-commerce platform designed to enhance user experience and streamline transactions.
        </p>
      </Card>
      <Card title="Portfolio Website" image={ProjectImage2}>
        <p className="text-sm md:text-base">
          An elegant portfolio website showcasing skills and achievements with a focus on user engagement.
        </p>
      </Card>
      <Card title="Interactive Web App" image={ProjectImage3}>
        <p className="text-sm md:text-base">
          An interactive web application integrating advanced features to deliver dynamic user experiences.
        </p>
      </Card>
    </div>
  </section>
  )
};

export default ProjectSection;
