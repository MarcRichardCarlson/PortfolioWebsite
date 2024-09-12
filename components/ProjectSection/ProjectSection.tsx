import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from '@/i18n/client';
import { useCurrentLocale } from '@/hooks/locale';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Card from './Card';
import ProjectImage1 from '../../public/images/dfsync.png';
import ProjectImage2 from '../../public/images/Discord.jpg';
import ProjectImage3 from '../../public/images/CMS.jpg';
import ProjectImage4 from '../../public/images/ecommerce.png';
import ProjectImage5 from '../../public/images/wordpress.png';
import ProjectImage6 from '../../public/images/pexels-ekaterina-bolovtsova-7307529.jpg';
import ProjectImage7 from '../../public/images/pexels-karolina-grabowska-5632402.jpg';
import ArrowLeft from '../../public/IcRoundKeyboardArrowLeft.svg';
import ArrowRight from '../../public/IcRoundKeyboardArrowRight.svg';
import PlayIcon from '../../public/PhPlayBold.svg';
import PauseIcon from '../../public/HeroiconsPause20Solid.svg';

const ProjectSection: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');

  const projects = [
    { title: t('projects-card-one-header'), description: t('projects-card-one'), image: ProjectImage1 },
    { title: t('projects-card-two-header'), description: t('projects-card-two'), image: ProjectImage2 },
    { title: t('projects-card-three-header'), description: t('projects-card-three'), image: ProjectImage3 },
    { title: t('projects-card-four-header'), description: t('projects-card-four'), image: ProjectImage4 },
    { title: t('projects-card-five-header'), description: t('projects-card-five'), image: ProjectImage5 },
    { title: t('projects-card-six-header'), description: t('projects-card-six'), image: ProjectImage6 },
    { title: t('projects-card-seven-header'), description: t('projects-card-seven'), image: ProjectImage7 },
  ];

  const projectItems = [...projects, ...projects]; // Duplicate for smooth infinite scrolling

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Auto-scroll control
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get total width of card including margin
  const getCardTotalWidth = () => {
    const container = carouselRef.current;
    if (container) {
      const card = container.querySelector('.carousel-item') as HTMLElement;
      if (card) {
        const cardStyle = window.getComputedStyle(card);
        const cardWidth = card.offsetWidth;
        const cardMargin = parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
        return cardWidth + cardMargin;
      }
    }
    return 0;
  };

  // Scroll carousel by one card width
  const scrollByOneCard = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (container) {
      const totalCardWidth = getCardTotalWidth();
      const scrollAmount = direction === 'right' ? totalCardWidth : -totalCardWidth;
      const newScrollPosition = container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newScrollPosition, behavior: 'smooth' });

      setCurrentIndex((prevIndex) => {
        const newIndex = direction === 'right' ? prevIndex + 1 : prevIndex - 1;
        return (newIndex + projects.length) % projects.length;
      });
    }
  };

  // Handle seamless scrolling
  const handleScroll = () => {
    const container = carouselRef.current;
    if (container) {
      const totalCardWidth = getCardTotalWidth();
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2;
      const newIndex = Math.round(scrollPosition / totalCardWidth) % projects.length;
      setCurrentIndex(newIndex);

      if (container.scrollLeft <= totalCardWidth) {
        container.scrollLeft = container.scrollWidth / 2 - container.offsetWidth;
      } else if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - totalCardWidth) {
        container.scrollLeft = container.offsetWidth / 2;
      }
    }
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Update current index
  const updateCurrentIndex = () => {
    const container = carouselRef.current;
    if (container) {
      const totalCardWidth = getCardTotalWidth();
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2;
      const newIndex = Math.round(scrollPosition / totalCardWidth) % projects.length;
      setCurrentIndex(newIndex);
    }
  };

  // Auto-scroll to the right
  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      scrollByOneCard('right');
    }, 4000); // Change index every 4 seconds
  };

  // Pause auto-scrolling
  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Play/Pause button handler
  const togglePlayPause = () => {
    if (isPlaying) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
    setIsPlaying(!isPlaying);
  };

  // Start auto-scroll when component mounts
  useEffect(() => {
    if (isPlaying) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [isPlaying]);

  return (
    <div className='h-full pb-24 md:pb-0 flex flex-col gap-16px'>
      <div className='px-4 sm:px-8 md:px-16'>
        <h2 className="text-white-grey text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
          {t('projects-header')}
          <span className="text-indigo-700">.</span>
        </h2>
        <span className='text-white-grey'>{t('projects-text')}</span>
      </div>

      <div className="relative w-full flex flex-col gap-4">
        <motion.div
          className="carousel flex h-1/2 overflow-x-scroll no-scrollbar"
          ref={carouselRef}
        >
          {projectItems.map((project, index) => (
            <motion.div
              key={index}
              className="carousel-item min-w-[250px] md:min-w-[300px] mx-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                title={project.title}
                description={project.description}
                image={project.image}
                isExpanded={false}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className='flex justify-between items-center px-4 sm:px-8 md:px-16'>
          <div className='flex justify-around items-center gap-1 md:gap-2 bg-dark-grey px-6 rounded-full h-8 md:h-10 py-5 md:py-6'>
            {projects.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full ${
                  currentIndex === index ? 'bg-indigo-700' : 'bg-white-grey'
                }`}
                style={{
                  width: currentIndex === index ? '40px' : '8px',
                  transition: 'width 4s ease'
                }}
              />
            ))}
          </div>
          <div className='flex gap-2 p-1 rounded-full bg-light-grey bg-opacity-50'>
            <button
              className="flex justify-center items-center rounded-full h-8 w-8 md:h-10 md:w-10 cursor-pointer bg-dark-grey"
              onClick={() => scrollByOneCard('left')}
            >
              <Image src={ArrowLeft} alt="Left Arrow" className='invert'/>
            </button>
            <button
              className="flex justify-center items-center rounded-full h-8 w-8 md:h-10 md:w-10 cursor-pointer bg-dark-grey"
              onClick={() => scrollByOneCard('right')}
            >
              <Image src={ArrowRight} alt="Right Arrow" className='invert'/>
            </button>
            <button
              className="flex justify-center items-center rounded-full h-8 w-8 md:h-10 md:w-10 cursor-pointer bg-dark-grey"
              onClick={togglePlayPause}
            >
              <Image src={isPlaying ? PauseIcon : PlayIcon} alt={isPlaying ? 'Pause' : 'Play'} className='invert' width={20} height={20}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
