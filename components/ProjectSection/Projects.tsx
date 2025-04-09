import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import ResponsiveButton from '../Buttons';
import arrow from '../../public/icons/PhArrowCounterClockwise.svg';
interface Project {
  title: string;
  description: string;
  image: StaticImageData | string;
  tag: {
    text: string;
    color: string;
  };
  website?: string;
  code?: string;
  customButton?: {
    text: string;
    link: string;
    type: 'primary' | 'secondary';
  };
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [columns, setColumns] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      let newColumns = 1;

      if (width >= 1536) newColumns = 4; // 2xl
      else if (width >= 1280) newColumns = 3; // xl
      else if (width >= 1024) newColumns = 3; // lg
      else if (width >= 768) newColumns = 2; // md

      setColumns(newColumns);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (selectedProject !== null) {
        const currentScrollY = window.scrollY;
        const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);

        if (scrollDiff > 100) {
          setSelectedProject(null);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProject]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const getCardSize = (index: number) => {
    // Special case for the last two cards to share the row
    if (index === projects.length - 2) {
      return 'col-span-1 row-span-1 min-h-[200px] w-full'; // Second to last card
    }
    if (index === projects.length - 1) {
      return 'col-span-1 row-span-1 min-h-[200px] w-full'; // Last card
    }

    const sizes = [
      'col-span-2 row-span-2 min-h-[400px]', // Large card
      'col-span-1 row-span-1 min-h-[200px] w-full', // Small card
      'col-span-1 row-span-2 min-h-[400px]', // Tall card
      'col-span-2 row-span-1 min-h-[200px]', // Wide card
      'col-span-1 row-span-1 min-h-[200px] w-full', // Small card
    ];
    return sizes[index % sizes.length];
  };

  return (
    <div className="w-full" ref={containerRef}>
      <motion.div
        className="grid gap-y-4 md:gap-y-8 gap-x-0 [@media(min-width:831px)]:gap-x-8"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridAutoRows: 'minmax(200px, 1fr)',
          gridAutoFlow: 'row dense',
          justifyItems: 'stretch',
          alignItems: 'stretch'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            variants={itemVariants}
            size={getCardSize(index)}
            onClick={() => setSelectedProject(index)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full p-6 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                onClick={() => setSelectedProject(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <motion.span
                      className="inline-block py-1 px-3 text-sm font-semibold rounded-lg mb-4"
                      style={{
                        color: projects[selectedProject].tag.color,
                        backgroundColor: `${projects[selectedProject].tag.color}33`,
                      }}
                    >
                      {projects[selectedProject].tag.text}
                    </motion.span>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {projects[selectedProject].title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {projects[selectedProject].description}
                    </p>
                  </div>
                  <div className="mt-6 flex gap-4">
                    {projects[selectedProject].customButton ? (
                      <a
                        href={projects[selectedProject].customButton.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${projects[selectedProject].customButton.type === 'primary'
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                      >
                        {projects[selectedProject].customButton.text}
                      </a>
                    ) : (
                      <>
                        {projects[selectedProject].website ? (
                          <a
                            href={projects[selectedProject].website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                          >
                            View Project
                          </a>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                          >
                            Internal Project
                          </button>
                        )}
                        {projects[selectedProject].code ? (
                          <a
                            href={projects[selectedProject].code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                          >
                            View Code
                          </a>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed"
                          >
                            Company Repository
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  variants: any;
  size: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variants, size, onClick }) => {
  return (
    <motion.div
      variants={variants}
      className={`relative group cursor-pointer rounded-xl overflow-hidden ${size} shadow-custom-shadow hover:shadow-lg transition-shadow duration-300`}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-1 group-hover:opacity-100 transition-opacity duration-300 z-1" />

      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-250 group-hover:scale-110"
      />


      <div className="flex flex-row justify-between items-center bg-black/90 absolute bottom-0 left-0 right-0 p-4">
        <motion.h3 className="text-xl font-bold text-white">
          {project.title}
        </motion.h3>

        <motion.span
          className=" py-1 px-3 text-sm font-semibold rounded-lg z-1"
          style={{
            color: project.tag.color,
            backgroundColor: `${project.tag.color}50`,
          }}
        >
          {project.tag.text}
        </motion.span>

      </div>
    </motion.div>
  );
};

export default Projects;