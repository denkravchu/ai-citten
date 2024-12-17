// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import BreathingPattern from './BreathingPattern';
import BiometricMonitor from './BiometricMonitor';
import Footer from './Footer';
import ChatInterface from './ChatInterface';
import './index.css'



// Main App Component
function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 p-4 flex flex-col font-mono">
      {/* Header */}
      <Header systemTime={time} />

      {/* Main content */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        <div className="space-y-6 flex flex-col" style={{ minHeight: '16rem' }}>
          <BiometricMonitor />
          <BreathingPattern />
        </div>
        <ChatInterface />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;