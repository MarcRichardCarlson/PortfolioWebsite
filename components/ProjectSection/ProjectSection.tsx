import React, { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { useCurrentLocale } from '@/hooks/locale';
import { motion, LayoutGroup } from 'framer-motion';
import Card from './Card';
import ProjectImage1 from '../../public/images/dfsync.png';
import ProjectImage2 from '../../public/images/Discord.jpg';
import ProjectImage3 from '../../public/images/CMS.jpg';
import ProjectImage4 from '../../public/images/ecommerce.png';
import ProjectImage5 from '../../public/images/wordpress.png';
import ProjectImage6 from '../../public/images/pexels-ekaterina-bolovtsova-7307529.jpg';
import ProjectImage7 from '../../public/images/pexels-karolina-grabowska-5632402.jpg';

const ProjectSection: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const projects = [
    { title: t('projects-card-one-header'), description: t('projects-card-one'), image: ProjectImage1, size: 'medium' as const, height: 'half' as const },
    { title: t('projects-card-two-header'), description: t('projects-card-two'), image: ProjectImage2, size: 'large' as const, height: 'full' as const },
    { title: t('projects-card-three-header'), description: t('projects-card-three'), image: ProjectImage3, size: 'large' as const, height: 'full' as const },
    { title: t('projects-card-four-header'), description: t('projects-card-four'), image: ProjectImage4, size: 'small' as const, height: 'half' as const },
    { title: t('projects-card-five-header'), description: t('projects-card-five'), image: ProjectImage5, size: 'small' as const, height: 'half' as const },
    { title: t('projects-card-six-header'), description: t('projects-card-six'), image: ProjectImage6, size: 'small' as const, height: 'half' as const },
    { title: t('projects-card-seven-header'), description: t('projects-card-seven'), image: ProjectImage7, size: 'small' as const, height: 'half' as const },
  ];

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className='flex flex-col gap-32px w-full py-8 bg-white min-h-screen px-2 md:gap-64px md:px-4 lg:px-8 xl:px-16'>
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
        {t('projects-header')}
        <span className="text-indigo-700">.</span>
      </h2>

      <div className="flex flex-col gap-2 justify-start items-center">
        <LayoutGroup>
          <div className="flex flex-col justify-center gap-2 w-full md:flex-row">
            {/* First Row: Medium Box and Large Box */}
            <motion.div
              layout
              onClick={() => handleCardClick(0)}
              className="h-full w-full md:w-1/3"
              initial={{ borderRadius: 10 }}
              animate={{ borderRadius: expandedCard === 0 ? 20 : 10 }}
            >
              <Card
                title={projects[0].title}
                description={projects[0].description}
                image={projects[0].image}
                isExpanded={expandedCard === 0}
                height={projects[1].height}
              />
            </motion.div>
            <motion.div
              layout
              onClick={() => handleCardClick(1)}
              className="h-full w-full md:w-2/3"
              initial={{ borderRadius: 10 }}
              animate={{ borderRadius: expandedCard === 1 ? 20 : 10 }}
            >
              <Card
                title={projects[1].title}
                description={projects[1].description}
                image={projects[1].image}
                isExpanded={expandedCard === 1}
                height={projects[1].height}
              />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center gap-2 w-full md:flex-row">
            {/* Second Row: Large Box and 2x2 Grid of Small Boxes */}
            <motion.div
              layout
              onClick={() => handleCardClick(2)}
              className="h-full w-full md:w-2/3"
              initial={{ borderRadius: 10 }}
              animate={{ borderRadius: expandedCard === 2 ? 20 : 10 }}
            >
              <Card
                title={projects[2].title}
                description={projects[2].description}
                image={projects[2].image}
                isExpanded={expandedCard === 2}
                height={projects[1].height}
              />
            </motion.div>
            <div className="grid grid-cols-2 gap-2 w-full md:w-1/3" style={{ gridAutoRows: '1fr' }}>


              {projects.slice(3, 7).map((project, index) => (
                <motion.div
                  key={index + 3}
                  layout
                  onClick={() => handleCardClick(index + 3)}
                  className="min-w-32"
                  initial={{ borderRadius: 10 }}
                  animate={{ borderRadius: expandedCard === index + 3 ? 20 : 10 }}
                >
                  <Card
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    isExpanded={expandedCard === index + 3}
                    height={project.height}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </LayoutGroup>
      </div>
    </div>  
  );
};

export default ProjectSection;
