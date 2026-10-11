import React from 'react';
import { useInView } from '../../hooks/useInView';

interface RevealProps {
  children: React.ReactNode;
  /** Where the element slides in from. */
  from?: 'up' | 'left' | 'right';
  /** Delay in ms, for staggering siblings. */
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Fades and slides its content in the first time it scrolls into view. */
const Reveal: React.FC<RevealProps> = ({ children, from = 'up', delay = 0, className = '', style }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-from={from}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
};

export default Reveal;
