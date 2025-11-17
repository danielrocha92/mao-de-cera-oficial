'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggleButton.module.css';

const ThemeToggleButton = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const combinedClassName = `${styles.toggleButton} ${className || ''}`;

  return (
    <button onClick={toggleTheme} className={combinedClassName} aria-label="Toggle theme">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggleButton;

