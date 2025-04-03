import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const [activeTab, setActiveTab] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleCardClick = (index: number) => {
    setActiveTab(index);
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }
    setIsPaused(true);
    const newTimeout = setTimeout(() => {
      setIsPaused(false);
    }, 7000); // Stay for 7 seconds
    setTimeoutRef(newTimeout);
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    afterChange: (current: number) => setActiveTab(current),
    arrows: false,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-x-scroll scrollbar-hidden">
      <Slider ref={sliderRef} {...settings}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: activeTab === index ? 0 : 0 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col overflow-hidden cursor-pointer rounded-xl duration-300 px-0 md:px-4 ${activeTab === index ? 'scale-105' : 'scale-95'}`}
            style={{ width: '200px' }}
            onClick={() => handleCardClick(index)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div className="relative w-full h-64 sm:h-96 md:h-64 lg:h-96 overflow-hidden rounded-xl">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: activeTab === index ? 0.1 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
              {activeTab === index && (
                <>
                  <motion.h3
                    className="absolute top-6 md:top-8 left-4 md:left-8 text-xl font-semibold text-black dark:text-white whitespace-nowrap"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.span
                    className="absolute top-4 right-4 md:top-8 md:right-8 mt-2 lg:mt-0 py-1 px-3 text-xs font-semibold rounded-lg whitespace-nowrap"
                    style={{
                      color: project.tag.color,
                      backgroundColor: `${project.tag.color}33`,
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.tag.text}
                  </motion.span>
                  <motion.p
                    className="absolute bottom-6 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-sm text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default Projects;