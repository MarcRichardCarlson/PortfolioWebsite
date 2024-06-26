import React from 'react';
import Image from 'next/image';
import Photo1 from '../../public/images/portrait.png';

const Portrait: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-4 items-center justify-center rounded-full border border-indigo-700">
      <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-112 xl:h-112 relative rounded-full overflow-hidden">
        <Image
          src={Photo1}
          alt="Portrait"
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default Portrait;
