import React from 'react';
import Icon from './Icon';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      data-testid="theme-toggle"
      className="icon-btn text-fg"
    >
      <Icon name={isDark ? 'sun' : 'moon'} />
    </button>
  );
};

export default ThemeToggle;
