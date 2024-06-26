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
    { url: ensureHttps(githubUrl), icon: Github, alt: 'Github', label: 'Github' },
    { url: ensureHttps(linkedinUrl), icon: LinkedIn, alt: 'LinkedIn', label: 'LinkedIn' },
    { url: ensureHttps(facebookUrl), icon: Facebook, alt: 'Facebook', label: 'Facebook' },
    { url: ensureHttps(instagramUrl), icon: Instagram, alt: 'Instagram', label: 'Instagram' },
  ];

  return (
    <div className='flex flex-col gap-4 font-inter'>
      <h4 className="font-inter font-bold underline underline-offset-4">{t("footer-socials-header")}</h4>
      <div className="flex flex-col items-left gap-4">
        {urls.map(({ url, icon, alt, label }, index) => (
          isValidUrl(url) ? (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer flex flex-row gap-2">
              <Image src={icon} alt={alt} width={25} height={25} style={{ filter: 'invert(1)' }} />
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-white cursor-pointer hover:underline underline-offset-4"
              >
                {label}
              </motion.span>
            </a>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default FooterMediaIcons;
