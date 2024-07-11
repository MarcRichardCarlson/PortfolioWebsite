import React from 'react';
import ResponsiveButton from '../Buttons';
import { useTranslation } from '@/i18n/client';
import { useCurrentLocale } from '@/hooks/locale';

interface DevelopmentCardProps {
  title: string;
  disclaimer: string;
  priceRange: string;
  features: string[];
  gradientClassName: string;
  onSelect: () => void;
}

const DevelopmentCard: React.FC<DevelopmentCardProps> = ({ title, priceRange, features, disclaimer, gradientClassName, onSelect }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');

  return (
    <div
      className='relative flex flex-col gap-2 justify-between rounded-tl-md rounded-br-md rounded-tr-large rounded-bl-large p-4 md:p-6 min-w-72 sm:min-w-80 bg-white text-black font-inter overflow-hidden lg:max-w-80 cursor-pointer drop-shadow-none sm:drop-shadow-xl'
      onClick={onSelect}
    >
      <div className='flex flex-col gap-4'>
        <div className={`absolute inset-0 ${gradientClassName} opacity-25 pointer-events-none`}></div>

        <div className='flex flex-col gap-2'>
          <h3 className={`text-center relative text-2xl font-bold text-transparent bg-clip-text ${gradientClassName}`}>{title}</h3>
          <p className="text-xs text-center">{disclaimer}</p>
        </div>

        <p className={`items-end justify-center relative flex flex-row gap-1 text-gray-600 text-transparent bg-clip-text ${gradientClassName} text-center text-4xl font-bold`}>
          <span className='text-black font-semibold text-xs'>{t('price-starting-at')}</span>
          {priceRange}
        </p>

        <ul className="relative list-none p-2 sm:p-4 flex flex-col md:flex-row lg:flex-col justify-center gap-1 sm:gap-3">
          {features.map((feature, index) => (
            <div key={index} className='flex flex-row gap-2 items-center'>
              <div className={`h-px w-px p-1 rounded-full ${gradientClassName}`}></div>
              <li className="decoration-none">{feature}</li>
            </div>
          ))}
        </ul>
      </div>

      <div className='relative z-10 w-full flex justify-center sm:justify-end lg:justify-center'>
        <ResponsiveButton size="lg" variant="plan" onClick={onSelect}>
          {t('price-select-package')}
        </ResponsiveButton>
      </div>
    </div>
  );
};

const Development: React.FC<{ onSelect: (selectedPackage: string) => void }> = ({ onSelect }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');
  const handleSelect = (packageKey: string) => {
    onSelect(packageKey);
  };

  return (
    <div className='flex flex-col gap-6 lg:gap-8'>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2 lg:flex lg:flex-row lg:justify-center">
        <DevelopmentCard
          title={t('price-basic')}
          disclaimer={t('price-disclaimer')}
          priceRange={t('price-basic-development')}
          features={[
            t('price-basic-feature-1'),
            t('price-basic-feature-2'),
            t('price-basic-feature-3'),
            t('price-basic-feature-4'),
            t('price-basic-feature-5'),
          ]}
          gradientClassName="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          onSelect={() => handleSelect(t('price-basic'))}
        />
        <DevelopmentCard
          title={t('price-intermediate')}
          disclaimer={t('price-disclaimer')}
          priceRange={t('price-intermediate-development')}
          features={[
            t('price-intermediate-feature-1'),
            t('price-intermediate-feature-2'),
            t('price-intermediate-feature-3'),
            t('price-intermediate-feature-4'),
            t('price-intermediate-feature-5'),
            t('price-intermediate-feature-6'),
          ]}
          gradientClassName="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
          onSelect={() => handleSelect(t('price-intermediate'))}
        />
        <DevelopmentCard
          title={t('price-advanced')}
          disclaimer={t('price-disclaimer')}
          priceRange={t('price-advanced-development')}
          features={[
            t('price-advanced-feature-1'),
            t('price-advanced-feature-2'),
            t('price-advanced-feature-3'),
            t('price-advanced-feature-4'),
            t('price-advanced-feature-5'),
            t('price-advanced-feature-6'),
            t('price-advanced-feature-7'),
          ]}
          gradientClassName="bg-gradient-to-r from-green-400 via-blue-500 to-teal-500"
          onSelect={() => handleSelect(t('price-advanced'))}
        />
      </div>
    </div>
  );
};

export default Development;
