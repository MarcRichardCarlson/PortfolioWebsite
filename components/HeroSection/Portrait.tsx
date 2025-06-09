import React, { memo } from 'react';
import Image from "next/image";
import RevealOnScroll from "../RevealOnScroll";
import PortraitImage from "../../public/images/DSCF9509.png"

const Portrait = memo(() => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <RevealOnScroll direction="bottom" duration={1} delay={0}>
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64">
          <Image
            src={PortraitImage}
            alt="Portrait"
            fill
            sizes="(max-width: 768px) 256px, 320px"
            className="object-cover rounded-full"
            priority
            quality={90}
          />
        </div>
      </RevealOnScroll>
    </div>
  );
});

Portrait.displayName = 'Portrait';

export default Portrait;
