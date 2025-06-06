
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
      case 'normal': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div className="w-full h-10 bg-muted/30 rounded">
      <svg width={width} height={height} className="w-full h-full">
        <polyline
          points={points}
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth="2"
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
