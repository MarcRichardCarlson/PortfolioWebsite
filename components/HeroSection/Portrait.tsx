import React from 'react';
import Image from 'next/image';
import Photo1 from '../../public/images/Portrait.png';

const Portrait: React.FC = () => {
  return (
    <div className="z-50 w-24 h-24 sm:w-48 sm:h-48 md:w-48 md:h-48 lg:w-48 lg:h-48 xl:w-64 xl:h-64 relative overflow-hidden rounded-full bg-gradient-to-r from-green-800 via-green-600 to-green-400">
      <Image
        src={Photo1}
        alt="Portrait"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-full object-cover p-1"
      />
    </div>
  );
};

export default Portrait;
