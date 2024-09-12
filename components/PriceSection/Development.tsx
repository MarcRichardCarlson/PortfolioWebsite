import React from 'react';
import ResponsiveButton from '../Buttons';
import { useTranslation } from '@/i18n/client';
import { useCurrentLocale } from '@/hooks/locale';

interface DevelopmentCardProps {
  title: string;
  disclaimer: string;
  priceRange: string;
  features: string[];
  onSelect: () => void;
}

const DevelopmentCard: React.FC<DevelopmentCardProps> = ({ title, priceRange, features, disclaimer, onSelect }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');

  return (
    <div
      className='relative flex flex-col gap-2 justify-between p-4 rounded-2xl md:p-6 max-w-80 bg-dark-grey text-black font-inter overflow-hidden lg:max-w-80 cursor-pointer drop-shadow-none sm:drop-shadow-xl'
      onClick={onSelect}
    >
      <div className='flex flex-col gap-4'>
        <div className={`absolute inset-0 opacity-25 pointer-events-none`}></div>

        <div className='flex flex-col gap-2'>
          <h3 className='text-center relative text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-white'>{title}</h3>
          <p className="text-xs text-center text-light-grey">{disclaimer}</p>
        </div>

        <p className={`items-end justify-center relative flex flex-row gap-4 text-gray-600 text-transparent text-white bg-clip-text text-center font-bold`}>
          <span className='font-semibold text-xs'>{t('price-starting-at')}</span>
          <span className='text-indigo-500 relative'>
            <span className='absolute top-0 -left-3 text-white-grey text-lg'>{t("dollar")}</span>
            <span className='text-2xl md:text-4xl'>{priceRange}</span>
          </span>
        </p>

        <ul className="relative text-light-grey list-none p-2 sm:p-4 flex flex-col justify-center gap-1 sm:gap-3">
          {features.map((feature, index) => (
            <div key={index} className='flex flex-wrap gap-2 items-center'>
              <li className="before:content-['•'] before:text-light-grey before:mr-2 before:ml-2">{feature}</li>
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
    <div className='flex flex-col gap-6 lg:gap-8 mb-4'>
      <div className="grid justify-center gap-4  grid-cols-1 lg:grid-cols-2 lg:flex lg:flex-row">
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
          onSelect={() => handleSelect(t('price-advanced'))}
        />
      </div>
    </div>
  );
};

export default Development;
