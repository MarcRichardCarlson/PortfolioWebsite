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
            description: 'A tech company where I conducted a detailed analysis of their website’s content, scalability, and SEO potential. I provided insights and made minor adjustments to enhance their overall site structure.',
            image: ProjectImage1,
            tag: { text: 'Content - SEO', color: '#4392f1' },
          },
          {
            title: 'Lamtek AB',
            description: 'A business specializing in paper laminate products. I’m currently developing a semi-e-commerce site for them, focusing on SEO to increase traffic, boost visibility, and drive customer engagement.',
            image: ProjectImage2,
            tag: { text: 'Semi-Ecommerce', color: '#c5d1eb' },
          },
          {
            title: 'HelloSmart',
            description: 'A company that sells motorized blinds for smart homes. I’m currently designing their full e-commerce site from scratch, with a strong emphasis on SEO to attract traffic and grow their online sales.',
            image: ProjectImage3,
            tag: { text: 'E-commerce', color: '#f2c14e' },
          }
        ]}
      />
      <Projects
        projects={[
          {
            title: 'DigitalFans - Sync',
            description: 'A company where I completed my internship during my studies in development. I created a customer analysis form to help them better understand client needs and improve their service offerings.',
            image: ProjectImage4,
            tag: { text: 'Assignment', color: '#f7aef8' },
          },
          {
            title: 'Discord - Skin',
            description: 'A passion project where I recreated the Discord interface as a custom “skin.” This was purely for learning, with no collaboration with Discord. It’s not fully functional but captures the design elements.',
            image: ProjectImage5,
            tag: { text: 'Passion - Project', color: '#fe7f2d' },
          },
          {
            title: 'Unknown Media',
            description: 'Coming Soon! A media company I may collaborate with to create a website showcasing their film projects and team. This project is currently in the planning stages.',
            image: ProjectImage6,
            tag: { text: 'Production -Website', color: '#9046cf' },
          },
        ]}
      />
    </div>
  );
};

export default ProjectSection;
