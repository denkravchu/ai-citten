// components/BiometricMonitor.jsx
import React, { useState, useEffect } from 'react';
import { Activity, Brain, Heart } from 'lucide-react';

const BiometricMonitor = () => {
  const [metrics, setMetrics] = useState({
    heartRate: 72,
    cittenSync: 94,
    stressLevel: 45
  });

  useEffect(() => {
    // Function to generate natural fluctuations in biometric data
    const fluctuate = (value, min, max, maxChange) => {
      const change = (Math.random() - 0.5) * 2 * maxChange;
      return Math.min(max, Math.max(min, value + change));
    };

    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      setMetrics(prev => ({
        heartRate: Math.round(fluctuate(prev.heartRate, 65, 85, 2)),
        cittenSync: Math.round(fluctuate(prev.cittenSync, 90, 98, 1)),
        stressLevel: Math.round(fluctuate(prev.stressLevel, 35, 65, 3))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const biometricData = [
    {
      icon: Heart,
      label: 'HEART_RATE',
      value: `${metrics.heartRate} BPM`,
      color: 'text-red-500'
    },
    {
      icon: Brain,
      label: 'CITTEN_SYNC',
      value: `${metrics.cittenSync}%`,
      color: 'text-purple-500'
    },
    {
      icon: Activity,
      label: 'STRESS_LVL',
      value: `${metrics.stressLevel}%`,
      color: 'text-cyan-500'
    }
  ];

  return (
    <div className="border border-green-500/30 rounded-lg p-4">
      <h2 className="text-sm mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        BIOMETRIC_MONITOR
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {biometricData.map((metric, index) => (
          <div key={index} className="text-center">
            <metric.icon 
              className={`w-6 h-6 mx-auto mb-2 ${metric.color}`}
            />
            <div className="text-xs opacity-70">
              {metric.label}
            </div>
            <div className="text-xl">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiometricMonitor;