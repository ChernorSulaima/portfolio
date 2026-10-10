import React from 'react';

interface BrowserBarProps {
  url: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: { bar: 'h-8 gap-2.5 px-3', dot: 'w-2 h-2', dots: 'gap-[5px]', spacer: 'w-[34px]' },
  md: { bar: 'h-10 gap-3 px-[14px]', dot: 'w-2.5 h-2.5', dots: 'gap-1.5', spacer: 'w-[42px]' },
  lg: { bar: 'h-11 gap-3 px-4', dot: 'w-2.5 h-2.5', dots: 'gap-1.5', spacer: 'w-[42px]' },
};

/** Window chrome (three dots + address) drawn above a website screenshot. */
const BrowserBar: React.FC<BrowserBarProps> = ({ url, size = 'md' }) => {
  const s = SIZES[size];
  return (
    <span className={`flex items-center border-b border-line ${s.bar}`}>
      <span className={`flex ${s.dots}`}>
        <span className={`rounded-full bg-line-2 ${s.dot}`} />
        <span className={`rounded-full bg-line-2 ${s.dot}`} />
        <span className={`rounded-full bg-line-2 ${s.dot}`} />
      </span>
      <span className="flex-1 flex justify-center">
        {size === 'sm' ? (
          <span className="font-mono text-[10px] text-muted">{url}</span>
        ) : (
          <span
            className={`rounded-md bg-surface-2 font-mono text-[12px] text-muted ${
              size === 'lg' ? 'px-3.5 py-[3px]' : 'px-3 py-[2px]'
            }`}
          >
            {url}
          </span>
        )}
      </span>
      <span className={s.spacer} />
    </span>
  );
};

export default BrowserBar;
