import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface Project {
  title: string;
  description: string;
  image: StaticImageData | string; 
  tag: {
    text: string;
    color: string;
  };
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setDescriptionHeight(descriptionRef.current.clientHeight);
    }
  }, [hoveredIndex]);

  return (
    <div className="max-w-[1400px] mx-auto h-full flex px-4 sm:px-6 md:px-8">

      {projects.map((project, index) => {
        let flexBasis = '33.33%';
        let flexGrow = 1;
        let flexShrink = 1;

        if (hoveredIndex === 0 && index === 0) {
          flexBasis = '45%';
        } else if (hoveredIndex === 0 && index !== 0) {
          flexBasis = '27.5%';
        } else if (hoveredIndex === 1 && index === 1) {
          flexBasis = '45%';
        } else if (hoveredIndex === 1 && index !== 1) {
          flexBasis = '27.5%';
        } else if (hoveredIndex === 2 && index === 2) {
          flexBasis = '45%';
        } else if (hoveredIndex === 2 && index !== 2) {
          flexBasis = '27.5%';
        }

        return (
          <motion.div
            key={index}
            className="relative bg-dark-grey overflow-hidden cursor-pointer border"
            style={{
              flexBasis,
              flexGrow,
              flexShrink,
              height: '600px',
              transition: 'flex-basis 0.3s ease-in-out',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative w-full h-full">
            <Image 
                src={project.image} 
                alt={project.title} 
                fill // replaces layout="fill"
                style={{ objectFit: 'cover' }} // replaces objectFit="cover"
                className="rounded-none"
                quality={100} // Adjust quality for balance between size and clarity
            />

              {/* Darkening overlay with opacity adjustment on hover */}
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0.75 }}
                animate={{ opacity: hoveredIndex === index ? 0 : 0.75 }}
                transition={{ duration: 0.3 }}
              />

              {/* Tag in top-left corner */}
              <div
                className="w-auto flex justify-center items-center absolute top-4 left-4 py-2 px-4 text-sm font-semibold"
                style={{
                  color: project.tag.color,
                  backgroundColor: `${project.tag.color}4D`,
                  borderRadius: '12px',
                }}
              >
                {project.tag.text}
              </div>

              {/* Container for header and description */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 text-white"
                initial={{ y: 0 }}
                animate={{ y: hoveredIndex === index ? -descriptionHeight : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header positioned above description text */}
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                {/* Invisible description element for height measurement */}
                <p className="text-sm opacity-0 absolute" ref={descriptionRef}>
                  {project.description}
                </p>
                {/* Visible description */}
                <p className="text-sm mt-1">
                  {hoveredIndex === index ? project.description : ''}
                </p>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Projects;
