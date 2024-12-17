// components/BreathingPattern.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { Wind } from 'lucide-react';
import WebGL from './WebGL';
const BreathingPattern = () => {
  const [breathingState, setBreathingState] = useState('inhale');
  const [isActive, setIsActive] = useState(false);

  // Breathing cycle effect
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setBreathingState(prevState => {
        switch (prevState) {
          case 'inhale':
            return 'hold';
          case 'hold':
            return 'exhale';
          case 'exhale':
            return 'inhale';
          default:
            return 'inhale';
        }
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="border border-green-500/30 rounded-lg p-4">
      <h2 className="text-sm mb-4 flex items-center gap-2">
        <Wind className="w-4 h-4" />
        MEEEOW_MEME_MEEEEEOW.exe
      </h2>

      <div style={{ justifyContent: 'flex-end' }} className="flex flex-col items-center relative h-64">
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
            {isActive ? '>> TERMINATE' : '>> INITIALIZE'}_
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreathingPattern;