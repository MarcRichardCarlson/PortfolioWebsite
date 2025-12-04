import React, { memo } from 'react';
import Image from "next/image";
import RevealOnScroll from "../RevealOnScroll";
import PortraitImage from "../../public/images/DSCF9509.png"
import { useLiquidGlass } from '@/contexts/LiquidGlassContext';

const Portrait = memo(() => {
  const { isLiquidGlassEnabled } = useLiquidGlass();
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <RevealOnScroll direction="bottom" duration={0.2} delay={0}>
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
          {isLiquidGlassEnabled && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none rounded-full border-4 border-white/20 shadow-inner" />
          )}
        </div>
      </RevealOnScroll>
    </div>
  );
});

Portrait.displayName = 'Portrait';

export default Portrait;
