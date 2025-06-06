import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  ZapIcon,
  DropletIcon,
  ThermometerIcon,
  GaugeIcon,
  DollarSignIcon,
  ClockIcon,
  AlertTriangleIcon,
  CheckCircleIcon
} from 'lucide-react';

interface LiveStat {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: number;
  trendLabel: string;
  icon: any;
  color: 'green' | 'yellow' | 'red' | 'blue';
  category: string;
}

export const LiveStatistics = () => {
  const [stats, setStats] = useState<LiveStat[]>([
    {
      id: 'production-rate',
      label: 'Production Rate',
      value: '2,847',
      unit: 'T/day',
      trend: 5.2,
      trendLabel: '+5.2% vs target',
      icon: TrendingUpIcon,
      color: 'green',
      category: 'Production'
    },
    {
      id: 'efficiency',
      label: 'Overall Efficiency',
      value: '94.7',
      unit: '%',
      trend: 2.1,
      trendLabel: '+2.1% this week',
      icon: ZapIcon,
      color: 'green',
      category: 'Performance'
    },
    {
      id: 'energy-cost',
      label: 'Energy Cost',
      value: '₹2.34',
      unit: '/kg sugar',
      trend: -8.5,
      trendLabel: '-8.5% savings',
      icon: DollarSignIcon,
      color: 'green',
      category: 'Financial'
    },
    {
      id: 'juice-extraction',
      label: 'Juice Extraction',
      value: '97.2',
      unit: '%',
      trend: 1.8,
      trendLabel: '+1.8% improved',
      icon: DropletIcon,
      color: 'green',
      category: 'Process'
    },
    {
      id: 'steam-efficiency',
      label: 'Steam Efficiency',
      value: '89.6',
      unit: '%',
      trend: 3.2,
      trendLabel: '+3.2% optimized',
      icon: ThermometerIcon,
      color: 'green',
      category: 'Energy'
    },
    {
      id: 'uptime',
      label: 'System Uptime',
      value: '99.4',
      unit: '%',
      trend: 0.8,
      trendLabel: '+0.8% this month',
      icon: CheckCircleIcon,
      color: 'green',
      category: 'Reliability'
    },
    {
      id: 'maintenance-saved',
      label: 'Maintenance Saved',
      value: '₹14.2',
      unit: 'Lakhs',
      trend: 22.5,
      trendLabel: '+22.5% predictive',
      icon: ClockIcon,
      color: 'blue',
      category: 'Financial'
    },
    {
      id: 'quality-index',
      label: 'Sugar Quality Index',
      value: '98.9',
      unit: '/100',
      trend: 1.2,
      trendLabel: '+1.2% grade A',
      icon: GaugeIcon,
      color: 'green',
      category: 'Quality'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => {
          const variation = (Math.random() - 0.5) * 0.02;
          let baseValue = parseFloat(stat.value.replace(/[^\d.]/g, ''));
          let newValue = baseValue + (baseValue * variation);
          
          // Keep values realistic
          if (stat.id === 'production-rate') {
            newValue = Math.max(2500, Math.min(3200, newValue));
          } else if (stat.unit === '%') {
            newValue = Math.max(85, Math.min(99.9, newValue));
          } else if (stat.id === 'energy-cost') {
            newValue = Math.max(2.0, Math.min(3.0, newValue));
          } else if (stat.id === 'maintenance-saved') {
            newValue = Math.max(10, Math.min(20, newValue));
          }

          let formattedValue: string;
          if (stat.id === 'production-rate') {
            formattedValue = Math.round(newValue).toLocaleString();
          } else if (stat.id === 'energy-cost') {
            formattedValue = `₹${newValue.toFixed(2)}`;
          } else if (stat.id === 'maintenance-saved') {
            formattedValue = `₹${newValue.toFixed(1)}`;
          } else {
            formattedValue = newValue.toFixed(1);
          }

          return {
            ...stat,
            value: formattedValue
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-50 border-green-200';
      case 'blue': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'yellow': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'red': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <Card className="modern-card">
      <CardHeader className="pb-6 border-b border-slate-100">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <div className="p-2 bg-slate-100 rounded-lg">
            <TrendingUpIcon className="h-5 w-5 text-slate-700" />
          </div>
          Live Performance Statistics
          <Badge className="bg-green-400 text-black border-green-400 animate-pulse">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={stat.id} 
              className={`bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <Badge className="text-xs bg-slate-100 text-slate-600 border-slate-200">
                    {stat.category}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-medium text-slate-900 text-sm">{stat.label}</h4>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                    <span className="text-sm text-slate-500">{stat.unit}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {stat.trend >= 0 ? (
                    <TrendingUpIcon className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDownIcon className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${
                    stat.trend >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trendLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
