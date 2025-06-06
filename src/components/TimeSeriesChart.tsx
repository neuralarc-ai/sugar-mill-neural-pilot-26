
import React from 'react';

interface TimeSeriesChartProps {
  data: Array<{
    day: number;
    health: number;
    date: Date;
  }>;
}

export const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  const width = 600;
  const height = 220;
  const padding = 50;

  const minHealth = Math.min(...data.map(d => d.health)) - 5;
  const maxHealth = Math.max(...data.map(d => d.health)) + 5;
  const healthRange = maxHealth - minHealth || 1;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((item.health - minHealth) / healthRange) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const pathLength = points.split(' ').length * 10;

  return (
    <div className="w-full overflow-x-auto bg-white rounded-xl border border-slate-200 p-4">
      <svg width={width} height={height} className="w-full h-full min-w-[600px]">
        <defs>
          <linearGradient id="healthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid lines */}
        {[70, 75, 80, 85, 90, 95].map((value, index) => {
          const y = height - padding - ((value - minHealth) / healthRange) * (height - 2 * padding);
          return (
            <g key={value} className="opacity-30">
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="3,3"
                strokeWidth="1"
              />
              <text
                x={padding - 15}
                y={y + 4}
                fontSize="11"
                fill="#64748b"
                textAnchor="end"
                className="font-mono"
              >
                {value}%
              </text>
            </g>
          );
        })}
        
        {/* Area under curve */}
        <path
          d={`M${padding},${height - padding} L${points} L${width - padding},${height - padding} Z`}
          fill="url(#healthGradient)"
          className="animate-fade-in"
          style={{ animationDuration: '1.5s' }}
        />
        
        {/* Main line */}
        <polyline
          points={points}
          fill="none"
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#glow)"
          className="animate-fade-in"
          style={{ 
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            animation: 'drawLine 2s ease-out forwards, fade-in 0.5s ease-out'
          }}
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
          const y = height - padding - ((item.health - minHealth) / healthRange) * (height - 2 * padding);
          
          return (
            <g key={index}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="2"
                className="hover:r-6 transition-all duration-200 cursor-pointer animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.1 + 1}s`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                <title>{`Day ${item.day}: ${item.health.toFixed(1)}% health`}</title>
              </circle>
              {/* Pulse effect for current point */}
              {index === data.length - 1 && (
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1"
                  className="animate-ping opacity-40"
                />
              )}
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {data.filter((_, index) => index % 5 === 0).map((item, index) => {
          const originalIndex = index * 5;
          const x = padding + (originalIndex / (data.length - 1)) * (width - 2 * padding);
          return (
            <text
              key={originalIndex}
              x={x}
              y={height - 15}
              fontSize="11"
              fill="#64748b"
              textAnchor="middle"
              className="font-mono"
            >
              Day {item.day}
            </text>
          );
        })}
        
        {/* Y-axis title */}
        <text
          x={20}
          y={height / 2}
          fontSize="12"
          fill="#374151"
          textAnchor="middle"
          transform={`rotate(-90, 20, ${height / 2})`}
          className="font-medium"
        >
          Health Score (%)
        </text>
      </svg>
    </div>
  );
};
