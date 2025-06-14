import React from 'react';
import Facebook from '../../public/IcSharpFacebook.svg';
import Instagram from '../../public/BxBxlInstagram.svg';
import Github from '../../public/BxBxlGithub.svg';
import LinkedIn from '../../public/BxBxlLinkedinSquare.svg';
import Image from 'next/image';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";
import DarkModeToggle from '../DarkModeToggle';

type HeaderMediaIconsProps = {
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

const HeaderMediaIcons: React.FC<HeaderMediaIconsProps> = ({ linkedinUrl, facebookUrl, instagramUrl, githubUrl }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, "translation");

  const urls = [
    { url: ensureHttps(githubUrl), icon: Github, alt: 'Github' },
    { url: ensureHttps(linkedinUrl), icon: LinkedIn, alt: 'LinkedIn' },
    { url: ensureHttps(facebookUrl), icon: Facebook, alt: 'Facebook' },
    { url: ensureHttps(instagramUrl), icon: Instagram, alt: 'Instagram' },
  ];

  return (
    <div className='flex justify-between items-center w-full'>
      <div className="gap-4 flex flex-row transition-all duration-100 ease-in-out">
        {urls.map(({ url, icon, alt }, index) => (
          isValidUrl(url) ? (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="cursor-pointer flex flex-col gap-2 md:flex-row">
              <Image src={icon} alt={alt} width={35} height={35} className='text-black dark:invert' />
            </a>
          ) : null
        ))}
      </div>
      <DarkModeToggle />
    </div>
  );
};


export default HeaderMediaIcons;
