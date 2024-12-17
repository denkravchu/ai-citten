// components/BreathingPattern.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { Wind } from 'lucide-react';
import WebGL from './WebGL';
const BreathingPattern = () => {
  const [breathingState, setBreathingState] = useState('CITTEN_WALKING');
  const [isActive, setIsActive] = useState(false);

  // Cat pumping cycle effect
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setBreathingState(prevState => {
        switch (prevState) {
          case 'CITTEN_WALKING':
            return 'TO____';
          case 'TO____':
            return '()(),()()(),()()()';
          case '()(),()()(),()()()':
            return 'OR MORE?>??>?';
          default:
            return 'CITTEN_WALKING';
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div style={{ height: '100%' }} className="border border-green-500/30 rounded-lg p-4">
      <h2 className="text-sm mb-4 flex items-center gap-2">
        <Wind className="w-4 h-4" />
        MEOW_GOING_TO_....exe
      </h2>

      <div style={{ justifyContent: 'flex-end', width: '100%', height: '90%' }} className="flex flex-col items-center relative">
        <div className="canvas-container">
          <Suspense fallback={null}>
            <WebGL />
          </Suspense>
        </div>

        <div style={{ zIndex: 1 }} className="mt-4 text-center relative">
          <div className="text-2xl mb-2">
            {breathingState.toUpperCase()}_
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-4 py-2 border border-green-500/30 rounded hover:bg-green-500/10 transition-colors"
          >
            {isActive ? '<STOP>' : '>> INSIDE?'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreathingPattern;