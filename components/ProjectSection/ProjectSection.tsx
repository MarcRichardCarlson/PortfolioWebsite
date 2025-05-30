import React from 'react';
import ProjectImage1 from '../../public/images/kjGgBSc75G0.png';
import ProjectImage2 from '../../public/images/HelloSmart.png';
import ProjectImage3 from '../../public/images/Lamtek.png';
import ProjectImage4 from '../../public/images/164fe47a71001a6c.png';
import ProjectImage5 from '../../public/images/discord.jpg';
import ProjectImage6 from '../../public/images/f1.png';
import ProjectImage7 from '../../public/images/zenithia.jpg';
import Projects from './Projects';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

const ProjectSection = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  return (
    <div className='px-4 sm:px-4 md:px-8 pb-4 md:pb-8'>
      <div className='rounded-xl overflow-hidden'>
        <Projects
          projects={[
            {
              title: 'GrönaHus',
              description: t("projects-grönahus"),
              image: ProjectImage1,
              tag: { text: t("projects-grönahus-tag"), color: '#4392f1' },
              website: 'https://www.gronahus.se/',
              customButton: {
                text: 'View Code',
                link: 'https://github.com/MarcRichardCarlson/GronaHus',
                type: 'secondary'
              }
            },
            {
              title: 'HelloSmart',
              description: t("projects-hellosmart"),
              image: ProjectImage2,
              tag: { text: t("projects-hellosmart-tag"), color: '#f2c14e' },
              website: 'https://www.hellosmart.se',
              customButton: {
                text: 'View Code',
                link: 'https://github.com/MarcRichardCarlson/HelloSmart',
                type: 'secondary'
              }
            },
            {
              title: 'Lamtek AB',
              description: t("projects-lamtek"),
              image: ProjectImage3,
              tag: { text: t("projects-lamtek-tag"), color: '#c5d1eb' },
              website: 'https://www.lamtek.se',
              customButton: {
                text: 'Private Repository',
                link: '#',
                type: 'secondary'
              }
            },
            {
              title: 'DigitalFans - Sync',
              description: t("projects-digitalfans"),
              image: ProjectImage4,
              tag: { text: t("projects-digitalfans-tag"), color: '#f7aef8' },
              website: 'https://sync.carlsonmarc.com/en',
              customButton: {
                text: 'Private Repository',
                link: '#',
                type: 'secondary'
              }
            },
            {
              title: 'Discord - Skin',
              description: t("projects-discord"),
              image: ProjectImage5,
              tag: { text: t("projects-discord-tag"), color: '#fe7f2d' },
              website: 'https://discord.com',
              customButton: {
                text: 'Download Theme',
                link: 'https://github.com/MarcRichardCarlson/DiscordSkin',
                type: 'secondary'
              }
            },
            {
              title: 'F1 Stream',
              description: t("projects-f1"),
              image: ProjectImage6,
              tag: { text: t("projects-f1-tag"), color: '#9046cf' },
              website: 'https://unknownmedia.se',
              customButton: {
                text: 'Private Repository',
                link: '#',
                type: 'secondary'
              }
            },
            {
              title: 'Zenithia',
              description: t("projects-zenithia"),
              image: ProjectImage7,
              tag: { text: t("projects-zenithia-tag"), color: '#9046cf' },
              website: 'https://zenithia.se',
              customButton: {
                text: 'Private Repository',
                link: '#',
                type: 'secondary'
              }
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProjectSection;
