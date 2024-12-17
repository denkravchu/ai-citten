// components/Footer.jsx
import React from 'react';

const Footer = () => {
  const socialLinks = [
    {
      name: '[TWITTER]',
      url: 'https://x.com/AiCittenAgent',
    },
    {
      name: '[PUMPFUN]',
      url: 'https://pump.fun/',
    },
    {
      name: '[TELEGRAM]',
      url: 'https://bit.ly/aicittenagent',
    }
  ];

  return (
    <footer className="border-t border-green-500/30 mt-6 pt-4">
      <div className="flex justify-center gap-6">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500/70 hover:text-green-500 transition-colors tracking-widest"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;