
import React from 'react';

interface SparklineChartProps {
  data: number[];
  status: 'normal' | 'warning' | 'critical';
}

export const SparklineChart = ({ data, status }: SparklineChartProps) => {
  const width = 200;
  const height = 40;
  const padding = 4;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((value - min) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const getStrokeColor = () => {
    switch (status) {
      case 'normal': return '#212529';
      case 'warning': return '#6c757d';
      case 'critical': return '#000000';
      default: return '#adb5bd';
    }
  };

  const getStrokeWidth = () => {
    switch (status) {
      case 'critical': return '3';
      case 'warning': return '2';
      default: return '2';
    }
  };

  return (
    <div className="w-full h-10 bg-gray-50 rounded border">
      <svg width={width} height={height} className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${status}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={getStrokeColor()} stopOpacity="0.1" />
            <stop offset="100%" stopColor={getStrokeColor()} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Area under curve */}
        <path
          d={`M${padding},${height - padding} L${points} L${width - padding},${height - padding} Z`}
          fill={`url(#gradient-${status})`}
        />
        
        <polyline
          points={points}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth={getStrokeWidth()}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((value, index) => {
          const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
          const y = height - padding - ((value - min) / range) * (height - 2 * padding);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={getStrokeColor()}
              opacity={index === data.length - 1 ? 1 : 0.6}
            />
          );
        })}
      </svg>
    </div>
  );
};
