import React, { useState } from "react";
import Card from "./Card";
import ProjectImage1 from "../../public/images/dfsync.png";
import ProjectImage2 from "../../public/images/Discord_skin.png";
import ProjectImage3 from "../../public/images/README.webp";
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const ProjectSection = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  // State to manage visibility of each card's content
  const [showMore, setShowMore] = useState({
    project1: false,
    project2: false,
    project3: false,
  });

  const toggleShowMore = (project: keyof typeof showMore) => {
    setShowMore((prevState) => ({
      ...prevState,
      [project]: !prevState[project],
    }));
  };

  return (
    <section className="w-full px-4 md:px-8 py-12 bg-white min-h-screen flex flex-col gap-2 justify-around">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center">{t("projects-header")}</h2>
        <p className="text-center text-lg md:text-xl">
          {t("projects-text")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <Card
          title={t("projects-card-one-header")}
          image={ProjectImage1}
          showMore={showMore.project1}
          onToggle={() => toggleShowMore('project1')}
          showMoreContent={t("projects-card-one")}
        > {t("projects-card-one-sentance")}
        </Card>
        <Card
          title={t("projects-card-two-header")}
          image={ProjectImage2}
          showMore={showMore.project2}
          onToggle={() => toggleShowMore('project2')}
          showMoreContent={t("projects-card-two")}
        >
          {t("projects-card-two-sentance")}
        </Card>
        <Card
          title={t("projects-card-three-header")}
          image={ProjectImage3}
          showMore={showMore.project3}
          onToggle={() => toggleShowMore('project3')}
          showMoreContent={t("projects-card-three")}
        >
          {t("projects-card-three-sentance")}
        </Card>
      </div>
    </section>
  );
};

export default ProjectSection;
