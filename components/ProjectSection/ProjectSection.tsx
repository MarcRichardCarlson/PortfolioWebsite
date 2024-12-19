import React from 'react';
import ProjectImage1 from '../../public/images/hD$VW$d5L.png';
import ProjectImage2 from '../../public/images/6e0e167b589.png';
import ProjectImage3 from '../../public/images/Lamtek.png';
import ProjectImage4 from '../../public/images/164fe47a71001a6c.png';
import ProjectImage5 from '../../public/images/Discord.png';
import ProjectImage6 from '../../public/images/UnknownMedia.png';
import Projects from './Projects';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const ProjectSection = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  return (
    <div className='px-4 sm:px-6 md:px-8 pb-4 md:pb-8'>
      <div className='rounded-3xl dark:bg-dark-grey overflow-hidden'>
        <Projects
          projects={[
            {
              title: 'GrönaHus',
              description: t("projects-grönahus"),
              image: ProjectImage1,
              tag: { text: t("projects-grönahus-tag"), color: '#4392f1' },
            },
            {
              title: 'HelloSmart',
              description: t("projects-hellosmart"),
              image: ProjectImage2,
              tag: { text: t("projects-hellosmart-tag"), color: '#f2c14e' },
            },
            {
              title: 'Lamtek AB',
              description: t("projects-lamtek"),
              image: ProjectImage3,
              tag: { text: t("projects-lamtek-tag"), color: '#c5d1eb' },
            },
            {
              title: 'DigitalFans - Sync',
              description: t("projects-digitalfans"),
              image: ProjectImage4,
              tag: { text: t("projects-digitalfans-tag"), color: '#f7aef8' },
            },
            {
              title: 'Discord - Skin',
              description: t("projects-discord"),
              image: ProjectImage5,
              tag: { text: t("projects-discord-tag"), color: '#fe7f2d' },
            },
            {
              title: 'Unknown Media',
              description: t("projects-media"),
              image: ProjectImage6,
              tag: { text: t("projects-media-tag"), color: '#9046cf' },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProjectSection;
