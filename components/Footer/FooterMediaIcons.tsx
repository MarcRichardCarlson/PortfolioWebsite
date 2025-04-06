import React from 'react';
import Facebook from '../../public/IcSharpFacebook.svg';
import Instagram from '../../public/BxBxlInstagram.svg';
import Github from '../../public/BxBxlGithub.svg';
import LinkedIn from '../../public/BxBxlLinkedinSquare.svg';
import Image from 'next/image';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import RevealOnScroll from '../RevealOnScroll';

type FooterMediaIconsProps = {
  linkedinUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  githubUrl: string;
};

const ensureHttps = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.protocol = 'https:';
    return parsedUrl.toString();
  } catch {
    return url;
  }
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const FooterMediaIcons: React.FC<FooterMediaIconsProps> = ({ linkedinUrl, facebookUrl, instagramUrl, githubUrl }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const urls = [
    { url: ensureHttps(githubUrl), icon: Github, alt: 'Github' },
    { url: ensureHttps(linkedinUrl), icon: LinkedIn, alt: 'LinkedIn' },
    { url: ensureHttps(facebookUrl), icon: Facebook, alt: 'Facebook' },
    { url: ensureHttps(instagramUrl), icon: Instagram, alt: 'Instagram' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full min-w-[325px] min-h-[325px] md:min-w-[350px] md:min-h-[350px]">
      {urls.map(({ url, icon, alt }, index) =>
        isValidUrl(url) ? (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[150px] flex justify-center items-center dark:bg-dark-grey bg-white dark:hover:bg-true-blue hover:bg-true-blue-light cursor-pointer flex flex-row gap-2 p-2 rounded-xl transition-colors duration-300 ease-in-out shadow-custom-shadow hover:shadow-lg transition-shadow duration-300"
          >
            <RevealOnScroll direction="top" duration={0.4} delay={0.4}>
              <Image src={icon} alt={alt} width={50} height={50} className="filter dark:invert" />
            </RevealOnScroll>
      
          </a>
        ) : null
      )}
    </div>
  );
};

export default FooterMediaIcons;
