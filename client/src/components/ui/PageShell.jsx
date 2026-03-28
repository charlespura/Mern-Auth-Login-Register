import React, { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function PageShell({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-top">
          <div className="brand">
            <span className="brand-dot" />
            MERN Auth
          </div>
          <button className="theme-toggle" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
        {children}
        <div className="credit">Built by Charles Pura</div>
      </div>
    </div>
  );
}

export default PageShell;
