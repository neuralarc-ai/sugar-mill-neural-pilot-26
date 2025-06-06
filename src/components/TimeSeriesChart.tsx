
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
  const height = 200;
  const padding = 40;

  const minHealth = Math.min(...data.map(d => d.health));
  const maxHealth = Math.max(...data.map(d => d.health));
  const healthRange = maxHealth - minHealth || 1;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((item.health - minHealth) / healthRange) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="w-full h-full min-w-[600px]">
        <defs>
          <linearGradient id="healthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#212529" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#212529" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[70, 75, 80, 85, 90, 95].map(value => {
          const y = height - padding - ((value - minHealth) / healthRange) * (height - 2 * padding);
          return (
            <g key={value}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#dee2e6"
                strokeDasharray="2,2"
                opacity="0.6"
              />
              <text
                x={padding - 10}
                y={y + 4}
                fontSize="10"
                fill="#6c757d"
                textAnchor="end"
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
        />
        
        {/* Main line */}
        <polyline
          points={points}
          fill="none"
          stroke="#212529"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
          const y = height - padding - ((item.health - minHealth) / healthRange) * (height - 2 * padding);
          
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#212529"
              stroke="white"
              strokeWidth="2"
              className="hover:r-5 transition-all cursor-pointer"
            >
              <title>{`Day ${item.day}: ${item.health}% health`}</title>
            </circle>
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
              y={height - 10}
              fontSize="10"
              fill="#6c757d"
              textAnchor="middle"
            >
              Day {item.day}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
