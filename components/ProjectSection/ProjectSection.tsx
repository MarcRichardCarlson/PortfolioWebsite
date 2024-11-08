import React from 'react';
import ProjectImage1 from '../../public/images/GrönaHus.png';
import ProjectImage2 from '../../public/images/Lamtek.png';
import ProjectImage3 from '../../public/images/HelloSmart.png';
import ProjectImage4 from '../../public/images/DFSync.png';
import ProjectImage5 from '../../public/images/Discord.png';
import ProjectImage6 from '../../public/images/UnknownMedia.png';
import Projects from './Projects';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const ProjectSection = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  return (
    <div className='bg-black-soil pb-0 md:pb-32'>
      <Projects
        projects={[
          {
            title: 'GrönaHus',
            description: t("projects-grönahus"),
            image: ProjectImage1,
            tag: { text: t("projects-grönahus-tag"), color: '#4392f1' },
          },
          {
            title: 'Lamtek AB',
            description: t("projects-lamtek"),
            image: ProjectImage2,
            tag: { text: t("projects-lamtek-tag"), color: '#c5d1eb' },
          },
          {
            title: 'HelloSmart',
            description: t("projects-hellosmart"),
            image: ProjectImage3,
            tag: { text: t("projects-hellosmart-tag"), color: '#f2c14e' },
          }
        ]}
      />
      <Projects
        projects={[
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
  );
};

export default ProjectSection;
