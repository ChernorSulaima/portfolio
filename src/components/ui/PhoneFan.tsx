import React from 'react';

type Preset = 'home' | 'mobile' | 'card' | 'hero';

const PRESETS: Record<
  Preset,
  { side: string; center: string; overlap: string; perspective: number; sideShadow: string; centerShadow: string }
> = {
  home: {
    side: '26%',
    center: '31%',
    overlap: '-5%',
    perspective: 1400,
    sideShadow: '0 30px 50px -20px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 40px 60px -20px rgba(0, 0, 0, 0.65)',
  },
  mobile: {
    side: '29%',
    center: '36%',
    overlap: '-6%',
    perspective: 900,
    sideShadow: '0 18px 30px -12px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 24px 40px -14px rgba(0, 0, 0, 0.65)',
  },
  card: {
    side: '19%',
    center: '23%',
    overlap: '-4%',
    perspective: 1000,
    sideShadow: '0 14px 24px -10px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 18px 30px -10px rgba(0, 0, 0, 0.65)',
  },
  hero: {
    side: '20%',
    center: '24%',
    overlap: '-4%',
    perspective: 1600,
    sideShadow: '0 30px 50px -20px rgba(0, 0, 0, 0.6)',
    centerShadow: '0 40px 70px -24px rgba(0, 0, 0, 0.7)',
  },
};

interface PhoneFanProps {
  /** Left, centre and right screens. */
  screens: [string, string, string];
  radius: string;
  preset: Preset;
  className?: string;
}

/** Three phone screenshots fanned out in 3D: the side phones turn towards the centre one. */
const PhoneFan: React.FC<PhoneFanProps> = ({ screens, radius, preset, className = '' }) => {
  const p = PRESETS[preset];
  const [left, center, right] = screens;

  const phone = (src: string, style: React.CSSProperties) => (
    <span
      className="relative flex-none block leading-[0]"
      style={{ borderRadius: radius, ...style }}
    >
      <img src={src} alt="" className="block w-full h-auto" />
    </span>
  );

  return (
    <span
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{ perspective: `${p.perspective}px` }}
    >
      {phone(left, {
        zIndex: 1,
        width: p.side,
        marginRight: p.overlap,
        transform: 'rotateY(20deg) scale(0.9)',
        boxShadow: p.sideShadow,
      })}
      {phone(center, { zIndex: 2, width: p.center, boxShadow: p.centerShadow })}
      {phone(right, {
        zIndex: 1,
        width: p.side,
        marginLeft: p.overlap,
        transform: 'rotateY(-20deg) scale(0.9)',
        boxShadow: p.sideShadow,
      })}
    </span>
  );
};

export default PhoneFan;
