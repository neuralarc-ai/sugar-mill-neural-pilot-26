
import React from 'react';

interface HealthGaugeProps {
  score: number;
}

export const HealthGauge = ({ score }: HealthGaugeProps) => {
  const radius = 60;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 85) return '#212529';
    if (score >= 75) return '#6c757d'; 
    return '#000000';
  };

  const getBackgroundColor = () => '#e9ecef';

  return (
    <div className="relative w-32 h-32">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
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
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{Math.round(score)}</div>
          <div className="text-xs text-gray-500">Health</div>
        </div>
      </div>
    </div>
  );
};
