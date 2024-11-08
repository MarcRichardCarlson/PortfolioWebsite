import React from 'react';
import ProjectImage1 from '../../public/images/GrönaHus.png';
import ProjectImage2 from '../../public/images/Lamtek.png';
import ProjectImage3 from '../../public/images/HelloSmart.png';
import ProjectImage4 from '../../public/images/DFSync.png';
import ProjectImage5 from '../../public/images/Discord.png';
import ProjectImage6 from '../../public/images/UnknownMedia.png';
import Projects from './Projects';

const ProjectSection = () => {
  return (
    <div className='bg-black-soil pb-0 md:pb-32'>
      <Projects
        projects={[
          {
            title: 'GrönaHus',
            description: 'Description for Project One',
            image: ProjectImage1,
            tag: { text: 'Content - SEO', color: '#4392f1' },
          },
          {
            title: 'Lamtek AB',
            description: 'Description for Project Two',
            image: ProjectImage2,
            tag: { text: 'Semi-Ecommerce', color: '#c5d1eb' },
          },
          {
            title: 'HelloSmart',
            description: 'Description for Project Three',
            image: ProjectImage3,
            tag: { text: 'E-commerce', color: '#f2c14e' },
          }
        ]}
      />
      <Projects
        projects={[
          {
            title: 'DigitalFans - Sync',
            description: 'Description for Project Four',
            image: ProjectImage4,
            tag: { text: 'Assignment', color: '#f7aef8' },
          },
          {
            title: 'Discord - Skin',
            description: 'Description for Project Five',
            image: ProjectImage5,
            tag: { text: 'Passion - Project', color: '#fe7f2d' },
          },
          {
            title: 'Unknown Media',
            description: 'Description for Project Six',
            image: ProjectImage6,
            tag: { text: 'Production -Website', color: '#9046cf' },
          },
        ]}
      />
    </div>
  );
};

export default ProjectSection;
