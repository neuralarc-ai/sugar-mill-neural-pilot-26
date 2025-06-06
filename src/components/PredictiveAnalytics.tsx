
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { HealthGauge } from './HealthGauge';
import { TimeSeriesChart } from './TimeSeriesChart';
import { TrendingUpIcon, InfoIcon, Cog, CalendarIcon, ClockIcon, DollarSignIcon, MapPinIcon, AlertTriangleIcon } from 'lucide-react';

interface MaintenanceItem {
  id: string;
  equipment: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  daysUntil: number;
  estimatedDuration: string;
  location: string;
  cost: string;
}

export const PredictiveAnalytics = () => {
  const [healthScore, setHealthScore] = useState(87);
  const [maintenanceItems] = useState<MaintenanceItem[]>([
    {
      id: '1',
      equipment: 'Centrifuge Unit #2',
      task: 'Bearing replacement & lubrication',
      priority: 'high',
      daysUntil: 3,
      estimatedDuration: '4 hours',
      location: 'Sugar House',
      cost: '$2,400'
    },
    {
      id: '2',
      equipment: 'Steam Boiler',
      task: 'Pressure valve inspection',
      priority: 'medium',
      daysUntil: 7,
      estimatedDuration: '2 hours',
      location: 'Boiler Room',
      cost: '$800'
    },
    {
      id: '3',
      equipment: 'Crusher Unit',
      task: 'Belt tension adjustment',
      priority: 'medium',
      daysUntil: 12,
      estimatedDuration: '1 hour',
      location: 'Crushing Station',
      cost: '$200'
    },
    {
      id: '4',
      equipment: 'Evaporator System',
      task: 'Cleaning and descaling',
      priority: 'low',
      daysUntil: 21,
      estimatedDuration: '6 hours',
      location: 'Evaporation Plant',
      cost: '$1,200'
    },
    {
      id: '5',
      equipment: 'Clarifier Pumps',
      task: 'Impeller inspection',
      priority: 'medium',
      daysUntil: 15,
      estimatedDuration: '3 hours',
      location: 'Clarification Plant',
      cost: '$600'
    },
    {
      id: '6',
      equipment: 'Mill Drive Motor',
      task: 'Electrical connection check',
      priority: 'low',
      daysUntil: 28,
      estimatedDuration: '2 hours',
      location: 'Mill House A',
      cost: '$400'
    }
  ]);

  const [healthPrediction] = useState(() => {
    const data = [];
    let currentScore = 87;
    
    for (let i = 0; i < 30; i++) {
      let trend = -0.3;
      if (i === 3) trend = -2;
      if (i === 7) trend = 1.5;
      if (i === 15) trend = 1;
      if (i === 21) trend = 2;
      
      const noise = (Math.random() - 0.5) * 1.5;
      currentScore = Math.max(70, Math.min(95, currentScore + trend + noise));
      
      data.push({
        day: i + 1,
        health: Math.round(currentScore * 10) / 10,
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000)
      });
    }
    return data;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthScore(prev => {
        const change = (Math.random() - 0.5) * 0.3;
        return Math.max(75, Math.min(95, prev + change));
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': 
        return (
          <Badge className="bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-500 transition-colors duration-200">
            <AlertTriangleIcon className="h-3 w-3 mr-1" />
            HIGH PRIORITY
          </Badge>
        );
      case 'medium': 
        return (
          <Badge className="bg-white text-slate-700 border-slate-300">
            MEDIUM
          </Badge>
        );
      case 'low': 
        return (
          <Badge className="bg-slate-100 text-slate-600 border-slate-200">
            LOW
          </Badge>
        );
      default: 
        return null;
    }
  };

  const getCardBorder = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-yellow-400';
      case 'medium': return 'border-l-4 border-l-slate-300';
      case 'low': return 'border-l-4 border-l-slate-200';
      default: return '';
    }
  };

  return (
    <div className="space-y-8">
      {/* Health Prediction Chart */}
      <Card className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-6 border-b border-slate-100">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors duration-200">
              <TrendingUpIcon className="h-5 w-5 text-slate-700" />
            </div>
            Equipment Health Prediction
            <span className="text-sm font-normal text-slate-500">(30 Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <TimeSeriesChart data={healthPrediction} />
            </div>
            <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-6">
              <HealthGauge score={healthScore} />
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-slate-900 animate-pulse">
                  {Math.round(healthScore)}%
                </div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                  Overall System Health
                </div>
                <Badge className={`transition-all duration-300 ${
                  healthScore >= 85 ? 'bg-green-400 text-black border-green-400' :
                  healthScore >= 75 ? 'bg-yellow-400 text-black border-yellow-400' :
                  'bg-white text-red-700 border-red-200'
                }`}>
                  {healthScore >= 85 ? '✓ EXCELLENT' : healthScore >= 75 ? '⚠ GOOD' : '✗ NEEDS ATTENTION'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Recommendations */}
      <Card className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <CardHeader className="pb-6 border-b border-slate-100">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Cog className="h-5 w-5 text-slate-700" />
            </div>
            Maintenance Schedule & Recommendations
            <Badge className="bg-slate-100 text-slate-700 border-slate-200">
              {maintenanceItems.length} Tasks
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceItems.map((item, index) => (
              <Card 
                key={item.id} 
                className={`bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${getCardBorder(item.priority)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    {getPriorityBadge(item.priority)}
                    <div className="flex items-center space-x-1 text-sm font-mono text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                      <CalendarIcon className="h-3 w-3" />
                      <span>{item.daysUntil}d</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900 text-lg">{item.equipment}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.task}</p>
                  </div>
                  
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <MapPinIcon className="h-3 w-3" />
                        <span>Location</span>
                      </div>
                      <span className="font-medium text-slate-700">{item.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <ClockIcon className="h-3 w-3" />
                        <span>Duration</span>
                      </div>
                      <span className="font-medium text-slate-700">{item.estimatedDuration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-slate-500">
                        <DollarSignIcon className="h-3 w-3" />
                        <span>Est. Cost</span>
                      </div>
                      <span className="font-medium text-slate-700">{item.cost}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                      <span>Urgency</span>
                      <span>{Math.max(0, 100 - (item.daysUntil / 30) * 100).toFixed(0)}%</span>
                    </div>
                    <Progress 
                      value={Math.max(0, 100 - (item.daysUntil / 30) * 100)} 
                      className="h-2 bg-slate-100"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
