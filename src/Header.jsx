// components/Header.jsx
import React from 'react';

const Header = ({ systemTime }) => {
  return (
    <header className="border-b border-green-500/30 pb-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Logo and Title Section */}
        <div className="flex items-center gap-2">
          <div className="text-2xl animate-pulse">█</div>
          <div>
            <h1 className="text-xl tracking-widest">
              AI CITTEN AGENT
            </h1>
            <a
              href="https://dexscreener.com/solana/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-500/70 hover:text-green-500 transition-colors tracking-widest"
            >
              CA: C6xv1P7mw1ZdKYeCtSGSSXELyWLrnVP5VkFphksUpump
            </a>
          </div>
        </div>

        {/* System Time */}
        <div className="text-sm opacity-70 tracking-widest">
          SYS_TIME: {systemTime}
        </div>
      </div>
    </header>
  );
};

export default Header;