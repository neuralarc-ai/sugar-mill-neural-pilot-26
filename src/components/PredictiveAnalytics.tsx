import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { HealthGauge } from './HealthGauge';
import { TimeSeriesChart } from './TimeSeriesChart';
import { TrendingUpIcon, InfoIcon, Cog } from 'lucide-react';

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
      if (i === 3) trend = -2; // Maintenance event
      if (i === 7) trend = 1.5; // Maintenance recovery
      if (i === 15) trend = 1; // Another maintenance
      if (i === 21) trend = 2; // Major maintenance
      
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '●';
      case 'medium': return '◐';
      case 'low': return '○';
      default: return '○';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Health Prediction Chart */}
      <Card className="lg:col-span-2 elegant-card animate-fade-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-medium">
            <TrendingUpIcon className="h-5 w-5 text-gray-700" />
            Equipment Health Prediction (30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeriesChart data={healthPrediction} />
        </CardContent>
      </Card>

      {/* Health Gauge */}
      <Card className="elegant-card animate-fade-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-medium">
            <InfoIcon className="h-5 w-5 text-gray-700" />
            Plant Health Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <HealthGauge score={healthScore} />
          <div className="mt-4 text-center">
            <div className="text-2xl font-semibold text-gray-900">{Math.round(healthScore)}%</div>
            <div className="text-sm text-gray-500">Overall Health</div>
            <div className="text-xs text-gray-400 mt-1">
              {healthScore >= 85 ? 'Excellent' : healthScore >= 75 ? 'Good' : 'Needs Attention'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Recommendations */}
      <Card className="lg:col-span-3 elegant-card animate-fade-in">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg font-medium">
            <Cog className="h-5 w-5 text-gray-700" />
            Maintenance Schedule & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maintenanceItems.map((item) => (
              <Card key={item.id} className="border border-gray-200 hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant={getPriorityColor(item.priority)} className="minimal-badge">
                      {getPriorityIcon(item.priority)} {item.priority.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.daysUntil} days
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{item.equipment}</h4>
                  <p className="text-xs text-gray-600 mb-2">{item.task}</p>
                  <p className="text-xs text-gray-500 mb-3">{item.location}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium text-gray-700">{item.estimatedDuration}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Est. Cost:</span>
                      <span className="font-medium text-gray-700">{item.cost}</span>
                    </div>
                  </div>
                  
                  <Progress 
                    value={Math.max(0, 100 - (item.daysUntil / 30) * 100)} 
                    className="mt-3 h-1.5"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
