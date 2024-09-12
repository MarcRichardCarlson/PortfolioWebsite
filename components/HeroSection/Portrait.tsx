import React from 'react';
import Image from 'next/image';
import Photo1 from '../../public/images/portrait.png';

const Portrait: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col gap-4 items-center justify-center rounded-full border-2 border-indigo-700">
      <div className="w-24 h-24 sm:w-48 sm:h-24 md:w-64 md:h-32 lg:w-80 lg:h-48 xl:w-96 xl:h-64 relative rounded-full overflow-hidden">
        <Image
          src={Photo1}
          alt="Portrait"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Portrait;
