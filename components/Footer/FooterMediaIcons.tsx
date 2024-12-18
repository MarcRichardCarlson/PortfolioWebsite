import React from 'react';
import Facebook from '../../public/IcSharpFacebook.svg';
import Instagram from '../../public/BxBxlInstagram.svg';
import Github from '../../public/BxBxlGithub.svg';
import LinkedIn from '../../public/BxBxlLinkedinSquare.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from "@/i18n/client";
import { useCurrentLocale } from "@/hooks/locale";

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
    { url: ensureHttps(githubUrl), icon: Github, alt: 'Github'},
    { url: ensureHttps(linkedinUrl), icon: LinkedIn, alt: 'LinkedIn'},
    { url: ensureHttps(facebookUrl), icon: Facebook, alt: 'Facebook'},
    { url: ensureHttps(instagramUrl), icon: Instagram, alt: 'Instagram'},
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full min-w-[350px] min-h-[350px]">
      {urls.map(({ url, icon, alt }, index) => (
      isValidUrl(url) ? (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="min-w-[150px] flex justify-center items-center dark:bg-dark-grey bg-light-grey cursor-pointer flex flex-row gap-2p-2 rounded-xl">
          <Image src={icon} alt={alt} width={50} height={50} className='filter dark:invert' />
        </a>
      ) : null
      ))}
    </div>
  );
};

export default FooterMediaIcons;
