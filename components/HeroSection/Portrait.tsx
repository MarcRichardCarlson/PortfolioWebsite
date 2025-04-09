import React from 'react';
import Image from 'next/image';
import PortraitImage from '../../public/images/DSCF9509.png';

const Portrait: React.FC = () => {
  return (
    <div className="md:h-24 md:w-24 h-36 w-36 relative overflow-hidden">
      <Image
        src={PortraitImage}
        alt="Portrait"
        fill
        style={{ objectFit: 'cover' }}
        className="rounded-full"
        sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Portrait;
