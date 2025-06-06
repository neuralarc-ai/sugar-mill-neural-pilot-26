
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { HealthGauge } from './HealthGauge';
import { TimeSeriesChart } from './TimeSeriesChart';

interface MaintenanceItem {
  id: string;
  equipment: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  daysUntil: number;
  estimatedDuration: string;
}

export const PredictiveAnalytics = () => {
  const [healthScore, setHealthScore] = useState(87);
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([
    {
      id: '1',
      equipment: 'Centrifuge Unit #2',
      task: 'Bearing replacement',
      priority: 'high',
      daysUntil: 3,
      estimatedDuration: '4 hours'
    },
    {
      id: '2',
      equipment: 'Steam Boiler',
      task: 'Pressure valve inspection',
      priority: 'medium',
      daysUntil: 7,
      estimatedDuration: '2 hours'
    },
    {
      id: '3',
      equipment: 'Crusher Unit',
      task: 'Belt tension adjustment',
      priority: 'medium',
      daysUntil: 12,
      estimatedDuration: '1 hour'
    },
    {
      id: '4',
      equipment: 'Evaporator',
      task: 'Cleaning and descaling',
      priority: 'low',
      daysUntil: 21,
      estimatedDuration: '6 hours'
    }
  ]);

  // Generate 30 days of predicted health data
  const [healthPrediction] = useState(() => {
    const data = [];
    let currentScore = 87;
    
    for (let i = 0; i < 30; i++) {
      // Simulate gradual decline with some maintenance recovery points
      const trend = i < 5 ? -0.5 : i < 15 ? -0.3 : i < 25 ? -0.8 : 2; // Recovery after maintenance
      const noise = (Math.random() - 0.5) * 2;
      currentScore = Math.max(60, Math.min(100, currentScore + trend + noise));
      
      data.push({
        day: i + 1,
        health: Math.round(currentScore * 10) / 10,
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000)
      });
    }
    return data;
  });

  useEffect(() => {
    // Simulate real-time health score updates
    const interval = setInterval(() => {
      setHealthScore(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(60, Math.min(100, prev + change));
      });
    }, 5000);

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
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Health Prediction Chart */}
      <Card className="lg:col-span-2 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-4 h-4 gradient-blue rounded"></div>
            Equipment Health Prediction (30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeriesChart data={healthPrediction} />
        </CardContent>
      </Card>

      {/* Health Gauge */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-4 h-4 gradient-green rounded"></div>
            Plant Health Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <HealthGauge score={healthScore} />
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold">{Math.round(healthScore)}%</div>
            <div className="text-sm text-muted-foreground">Overall Health</div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Recommendations */}
      <Card className="lg:col-span-3 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-4 h-4 gradient-blue rounded"></div>
            Maintenance Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {maintenanceItems.map((item) => (
              <Card key={item.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={getPriorityColor(item.priority)} className="text-xs">
                      {getPriorityIcon(item.priority)} {item.priority.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.daysUntil} days
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-sm mb-1">{item.equipment}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{item.task}</p>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{item.estimatedDuration}</span>
                  </div>
                  
                  <Progress 
                    value={Math.max(0, 100 - (item.daysUntil / 30) * 100)} 
                    className="mt-2 h-1"
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
