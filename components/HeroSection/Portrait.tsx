import React from 'react';
import Image from 'next/image';
import PortraitImage from '../../public/images/DSCF9509.png';

const Portrait: React.FC = () => {
  return (
    <div className="z-50 h-24 w-24 relative overflow-hidden">
      <Image
        src={PortraitImage}
        alt="Portrait"
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default Portrait;
