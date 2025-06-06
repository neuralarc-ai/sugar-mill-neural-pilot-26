
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

  const getGradientColor = (health: number) => {
    if (health >= 80) return '#10b981';
    if (health >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="w-full h-full min-w-[600px]">
        <defs>
          <linearGradient id="healthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(value => {
          const y = height - padding - ((value - minHealth) / healthRange) * (height - 2 * padding);
          return (
            <g key={value}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="hsl(var(--border))"
                strokeDasharray="2,2"
                opacity="0.5"
              />
              <text
                x={padding - 10}
                y={y + 4}
                fontSize="10"
                fill="hsl(var(--muted-foreground))"
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
          stroke="#3b82f6"
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
              r="4"
              fill={getGradientColor(item.health)}
              stroke="white"
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            >
              <title>{`Day ${item.day}: ${item.health}% health`}</title>
            </circle>
          );
        })}
        
        {/* X-axis labels */}
        {data.filter((_, index) => index % 5 === 0).map((item, index, filteredData) => {
          const originalIndex = index * 5;
          const x = padding + (originalIndex / (data.length - 1)) * (width - 2 * padding);
          return (
            <text
              key={originalIndex}
              x={x}
              y={height - 10}
              fontSize="10"
              fill="hsl(var(--muted-foreground))"
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
