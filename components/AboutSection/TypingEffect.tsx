import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/client';
import { useCurrentLocale } from '@/hooks/locale';

const TypingEffect: React.FC = () => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');

  const quotes  = useMemo(() => [
    t('about-text1'),
    t('about-text2'),
    t('about-text3'),
    t('about-text4'),
    t('about-text5'),
  ], [locale, t]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [text, setText] = useState('');
  const textRef = useRef<HTMLSpanElement>(null);
  const [minHeight, setMinHeight] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const height = textRef.current.clientHeight;
      setMinHeight(height);
    }
  }, [quotes]);

  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 640);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      // Finish writing the current quote if the screen is sm size
      if (!isErasing && currentCharIndex < quotes[currentQuoteIndex].length) {
        const timer = setTimeout(() => {
          setText(text + quotes[currentQuoteIndex].charAt(currentCharIndex));
          setCurrentCharIndex(currentCharIndex + 1);
        }, 50);
        return () => clearTimeout(timer);
      }
    } else {
      // Normal typing effect when the screen is above sm size
      if (isErasing) {
        if (currentCharIndex > 0) {
          const timer = setTimeout(() => {
            setText(text.slice(0, -1));
            setCurrentCharIndex(currentCharIndex - 1);
          }, 50);
          return () => clearTimeout(timer);
        } else {
          setIsErasing(false);
          setCurrentQuoteIndex((currentQuoteIndex + 1) % quotes.length);
        }
      } else {
        if (currentCharIndex < quotes[currentQuoteIndex].length) {
          const timer = setTimeout(() => {
            setText(text + quotes[currentQuoteIndex].charAt(currentCharIndex));
            setCurrentCharIndex(currentCharIndex + 1);
          }, 50);
          return () => clearTimeout(timer);
        } else {
          const timer = setTimeout(() => setIsErasing(true), 2000);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [currentCharIndex, isErasing, text, currentQuoteIndex, quotes, isSmallScreen]);

  return (
    <div className="flex justify-start items-center h-fit" style={{ minHeight }}>
      <motion.div
        className="flex items-center font-inter text-sm md:text-md lg:text-lg xl:text-xl text-neutral-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <span ref={textRef}>{text}</span>
        <motion.span
          className="text-2xl font-mono sm:min-h-16 md:min-h-12 lg:min-h-6"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          |
        </motion.span>
      </motion.div>
    </div>
  );
};

export default TypingEffect;
