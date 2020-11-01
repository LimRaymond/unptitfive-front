import React, { useState, useEffect } from 'react';

import './useDarkMode.css';

export default function useDarkMode() {
  const [mode, setMode] = useState(() => localStorage.getItem('mode'));

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('mode', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('mode', 'light');
    }
  }, [mode]);

  return (
    // eslint-disable-next-line
    <a className="cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => setMode((mode) => (mode === 'dark' ? 'light' : 'dark'))}>
      <small>
        {mode === 'dark' ? 'Light' : 'Dark'}
        Mode
      </small>
    </a>
  );
}
