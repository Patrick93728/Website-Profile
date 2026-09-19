import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Light mode is always the default.
    // Only switch to dark if the user explicitly chose dark before.
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass-panel glass-panel-hover text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
