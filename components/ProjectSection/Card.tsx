import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import ResponsiveButton from '../Buttons';
import { useTranslation } from '@/i18n/client';
import { useCurrentLocale } from '@/hooks/locale';

interface CardProps {
  title: string;
  description: string;
  image: StaticImageData;
  isExpanded: boolean;
  height: 'full' | 'half';
}

const Card: React.FC<CardProps> = ({ title, description, image, isExpanded, height }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');
  const [hovered, setHovered] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState<string>('calc(22rem + 8px)');

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 640) {
        setDynamicHeight('calc(12rem + 8px)');
      } else {
        setDynamicHeight('calc(22rem + 8px)');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const heightClass = height === 'full' ? 'h-80 sm:h-44' : 'h-44';

  return (
    <motion.div
      layout
      className={`relative cursor-pointer bg-white rounded-lg shadow-xl overflow-hidden ${heightClass}`}
      style={height === 'full' ? { height: dynamicHeight } : {}}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      <Image src={image} alt={title} className="w-full h-full object-cover rounded-t-lg" />

      <div className='absolute top-4 right-4'>
        <ResponsiveButton size="sm" variant="bento">
          {t('projects-discover')}
        </ResponsiveButton>
      </div>

      {(isExpanded || hovered) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
        >
          <div className="text-center text-white max-h-full overflow-auto">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;
