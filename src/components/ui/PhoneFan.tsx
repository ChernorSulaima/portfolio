import React from 'react';
import IPhone from './IPhone';

type Preset = 'home' | 'mobile' | 'card' | 'hero';

const PRESETS: Record<
  Preset,
  { side: string; center: string; overlap: string; perspective: number; sideShadow: string; centerShadow: string; sizes: string }
> = {
  home: {
    side: '25%',
    center: '30%',
    overlap: '-5%',
    perspective: 1400,
    sideShadow: '0 30px 50px -20px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 40px 60px -20px rgba(0, 0, 0, 0.65)',
    sizes: '(min-width: 1100px) 250px, 30vw',
  },
  mobile: {
    side: '28%',
    center: '35%',
    overlap: '-6%',
    perspective: 900,
    sideShadow: '0 18px 30px -12px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 24px 40px -14px rgba(0, 0, 0, 0.65)',
    sizes: '35vw',
  },
  card: {
    side: '19%',
    center: '23%',
    overlap: '-4%',
    perspective: 1000,
    sideShadow: '0 14px 24px -10px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 18px 30px -10px rgba(0, 0, 0, 0.65)',
    sizes: '100px',
  },
  hero: {
    side: '19%',
    center: '23%',
    overlap: '-4%',
    perspective: 1600,
    sideShadow: '0 30px 50px -20px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 40px 70px -24px rgba(0, 0, 0, 0.7)',
    sizes: '(min-width: 1360px) 300px, 23vw',
  },
};

interface PhoneFanProps {
  /** Left, centre and right screens, as screenshot names under /images/apps. */
  screens: [string, string, string];
  preset: Preset;
  className?: string;
}

/** Three iPhones fanned out in 3D: the side phones turn towards the centre one. */
const PhoneFan: React.FC<PhoneFanProps> = ({ screens, preset, className = '' }) => {
  const p = PRESETS[preset];
  const [left, center, right] = screens;
  const radius = '17% / 8%';

  return (
    <span
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{ perspective: `${p.perspective}px` }}
    >
      <IPhone
        screen={left}
        sizes={p.sizes}
        style={{
          zIndex: 1,
          width: p.side,
          marginRight: p.overlap,
          transform: 'rotateY(20deg) scale(0.9)',
          borderRadius: radius,
          boxShadow: p.sideShadow,
        }}
      />
      <IPhone
        screen={center}
        sizes={p.sizes}
        style={{ zIndex: 2, width: p.center, borderRadius: radius, boxShadow: p.centerShadow }}
      />
      <IPhone
        screen={right}
        sizes={p.sizes}
        style={{
          zIndex: 1,
          width: p.side,
          marginLeft: p.overlap,
          transform: 'rotateY(-20deg) scale(0.9)',
          borderRadius: radius,
          boxShadow: p.sideShadow,
        }}
      />
    </span>
  );
};

export default PhoneFan;
