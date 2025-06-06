
import React from 'react';

interface HealthGaugeProps {
  score: number;
}

export const HealthGauge = ({ score }: HealthGaugeProps) => {
  const radius = 70;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 85) return '#000000';
    if (score >= 75) return '#374151'; 
    return '#000000';
  };

  const getBackgroundColor = () => '#f1f5f9';

  return (
    <div className="relative w-36 h-36 group">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Background circle */}
        <circle
          stroke={getBackgroundColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={getColor(score)}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-out"
          style={{
            animation: 'drawCircle 2s ease-out'
          }}
        />
        {/* Pulse ring for critical values */}
        {score < 75 && (
          <circle
            stroke={getColor(score)}
            fill="transparent"
            strokeWidth="2"
            r={normalizedRadius + 8}
            cx={radius}
            cy={radius}
            className="animate-ping opacity-30"
          />
        )}
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900 transition-all duration-300">
            {Math.round(score)}
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wider">Health</div>
        </div>
      </div>
      
      {/* Decorative dots */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-slate-300 rounded-full animate-pulse"></div>
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};
