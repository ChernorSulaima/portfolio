import React from 'react';

interface ProgressBarProps {
  percentage: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full h-2 bg-secondary dark:bg-secondary rounded-full overflow-hidden">
      <div 
        className="h-full bg-primary dark:bg-primary-foreground transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;