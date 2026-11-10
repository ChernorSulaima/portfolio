import React from 'react';
import { phoneShot } from '../../lib/shots';

interface IPhoneProps {
  /** Screenshot name under /images/apps, a full 402 x 874 point screen. */
  screen: string;
  alt?: string;
  /** How wide the phone is on screen, for picking the right image (an <img sizes> value). */
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * An iPhone 16 Pro drawn in CSS around a real screenshot. Every measurement is a percentage of
 * the phone's own size (taken from the device: a 402 x 874 point screen with 62 point corners,
 * inside a 421 x 893 point body), so the frame stays sharp and in proportion at any width.
 */
const IPhone: React.FC<IPhoneProps> = ({ screen, alt = '', sizes = '240px', loading = 'lazy', className = '', style }) => {
  const shot = phoneShot(screen);
  return (
    <span className={`iphone ${className}`} style={style}>
      <span aria-hidden="true" className="iphone-btn iphone-btn-action" />
      <span aria-hidden="true" className="iphone-btn iphone-btn-up" />
      <span aria-hidden="true" className="iphone-btn iphone-btn-down" />
      <span aria-hidden="true" className="iphone-btn iphone-btn-power" />
      <span className="iphone-band">
        <span className="iphone-bezel">
          <span className="iphone-screen">
            <img src={shot.src} srcSet={shot.srcSet} sizes={sizes} alt={alt} loading={loading} decoding="async" />
            <span aria-hidden="true" className="iphone-island" />
            <span aria-hidden="true" className="iphone-glare" />
          </span>
        </span>
      </span>
    </span>
  );
};

export default IPhone;
