import React from 'react';
import ResponsiveButton from '../Buttons';
import { useTranslation } from '@/i18n/client';
import { useCurrentLocale } from '@/hooks/locale';

interface MaintenanceCardProps {
  title: string;
  disclaimer: string;
  priceRange: string;
  features: string[];
  gradientClassName: string;
  onSelect: () => void;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ title, priceRange, features, disclaimer, onSelect }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');

  return (
    <div 
      className='relative flex flex-col gap-2 justify-between rounded-2xl p-4 md:p-6 min-w-72 sm:min-w-80 bg-dark-grey font-inter overflow-hidden lg:max-w-80 cursor-pointer drop-shadow-none sm:drop-shadow-xl'
      onClick={onSelect}
    >
      <div className='flex flex-col gap-2 sm:gap-4'>
        <div className='absolute inset-0 opacity-25 pointer-events-none'></div>

        <div className='flex flex-col gap-2'>
          <h3 className='text-white-grey text-center relative text-transparent bg-clip-text font-extrabold text-xl sm:text-2xl'>{title}</h3>
          <p className="text-xs text-center text-light-grey">{disclaimer}</p>
        </div>

        <p className='items-end justify-center relative flex flex-row gap-1 text-gray-600 text-transparent bg-clip-text text-center text-4xl font-bold'>
          <div className='relative flex flex-col items-center'>
            <span className='absolute top-0 -left-3 text-white-grey text-lg'>{t("dollar")}</span>
            <span className='text-indigo-500'>{priceRange}</span>
            <span className='text-white-grey text-xs font-semibold'>{t("price-monthly")}</span>
          </div>
        </p>

        <ul className="relative list-none p-2 sm:p-4 flex flex-col justify-center gap-1 sm:gap-3 text-light-grey">
          {features.map((inclusion, index) => (
            <div key={index} className='flex flex-row gap-2 items-center'>
              <li className="before:content-['•'] before:text-light-grey before:mr-2 before:ml-2">{inclusion}</li>
            </div>
          ))}
        </ul>
      </div>   
      <div className='relative z-10 w-full flex justify-center sm:justify-end lg:justify-center'>
        <ResponsiveButton size="lg" variant="plan" onClick={onSelect}>
            {t("price-select-package")}
        </ResponsiveButton>
      </div>
    </div>
  );
}

const Maintenance: React.FC<{ onSelect: (selectedPackage: string) => void }> = ({ onSelect }) => {
  const locale = useCurrentLocale();
  const { t } = useTranslation(locale, 'translation');

  const handleSelect = (packageTitle: string) => {
    onSelect(packageTitle);
  };

  return (
    <div className='flex flex-col gap-6 lg:gap-8'>
      <div className="grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2 lg:flex lg:flex-row lg:justify-center">
        <MaintenanceCard
          title={t("price-maintenance-basic")}
          disclaimer={t("price-disclaimer")}
          priceRange={t("price-basic-maintenance")}
          features={[
            t("price-maintenance-basic-feature1"),
            t("price-maintenance-basic-feature2"),
            t("price-maintenance-basic-feature3"),
            t("price-maintenance-basic-feature4"),
            t("price-maintenance-basic-feature5"),
          ]}
          gradientClassName="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          onSelect={() => handleSelect(t("price-maintenance-basic"))}
        />
        <MaintenanceCard
          title={t("price-maintenance-standard")}
          disclaimer={t("price-disclaimer")}
          priceRange={t("price-standard-maintenance")}
          features={[
            t("price-maintenance-standard-feature1"),
            t("price-maintenance-standard-feature2"),
            t("price-maintenance-standard-feature3"),
            t("price-maintenance-standard-feature4"),
            t("price-maintenance-standard-feature5"),
            t("price-maintenance-standard-feature6"),
          ]}
          gradientClassName="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
          onSelect={() => handleSelect(t("price-maintenance-standard"))}
        />
        <MaintenanceCard
          title={t("price-maintenance-premium")}
          disclaimer={t("price-disclaimer")}
          priceRange={t("price-premium-maintenance")}
          features={[
            t("price-maintenance-premium-feature1"),
            t("price-maintenance-premium-feature2"),
            t("price-maintenance-premium-feature3"),
            t("price-maintenance-premium-feature4"),
            t("price-maintenance-premium-feature5"),
            t("price-maintenance-premium-feature6"),
            t("price-maintenance-premium-feature7"),
          ]}
          gradientClassName="bg-gradient-to-r from-green-500 via-blue-500 to-cyan-500"
          onSelect={() => handleSelect(t("price-maintenance-premium"))}
        />
      </div>
    </div>
  );
};

export default Maintenance;
