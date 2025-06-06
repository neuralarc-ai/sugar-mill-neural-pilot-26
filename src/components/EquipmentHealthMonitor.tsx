
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CogIcon, CalendarIcon, AlertTriangleIcon } from 'lucide-react';

interface EquipmentHealth {
  id: string;
  name: string;
  healthScore: number;
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  remainingUsefulLife: number; // in days
  lastMaintenance: string;
  nextMaintenance: string;
  anomalyCount: number;
  location: string;
}

export const EquipmentHealthMonitor = () => {
  const [equipment, setEquipment] = useState<EquipmentHealth[]>([
    {
      id: 'eq-001',
      name: 'Centrifuge Unit #1',
      healthScore: 87,
      status: 'good',
      remainingUsefulLife: 45,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-20',
      anomalyCount: 0,
      location: 'Sugar House'
    },
    {
      id: 'eq-002',
      name: 'Main Drive Motor',
      healthScore: 92,
      status: 'excellent',
      remainingUsefulLife: 120,
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-03-10',
      anomalyCount: 1,
      location: 'Mill House A'
    },
    {
      id: 'eq-003',
      name: 'Steam Boiler #2',
      healthScore: 74,
      status: 'fair',
      remainingUsefulLife: 15,
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05',
      anomalyCount: 3,
      location: 'Boiler Room'
    },
    {
      id: 'eq-004',
      name: 'Clarifier Pump',
      healthScore: 95,
      status: 'excellent',
      remainingUsefulLife: 180,
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      anomalyCount: 0,
      location: 'Clarification Plant'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipment(prevEquipment => 
        prevEquipment.map(eq => {
          const scoreVariation = (Math.random() - 0.5) * 2;
          let newScore = eq.healthScore + scoreVariation;
          newScore = Math.max(0, Math.min(100, newScore));
          
          // Determine status based on health score
          let status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical' = 'excellent';
          if (newScore < 50) status = 'critical';
          else if (newScore < 60) status = 'poor';
          else if (newScore < 75) status = 'fair';
          else if (newScore < 90) status = 'good';

          return {
            ...eq,
            healthScore: Math.round(newScore),
            status
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500 text-white';
      case 'poor': return 'bg-red-400 text-white';
      case 'fair': return 'bg-yellow-400 text-black';
      case 'good': return 'bg-slate-200 text-slate-700';
      default: return 'bg-green-400 text-black';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-green-400';
    if (score >= 60) return 'bg-yellow-400';
    if (score >= 50) return 'bg-red-400';
    return 'bg-red-500';
  };

  return (
    <Card className="modern-card">
      <CardHeader className="pb-6 border-b border-slate-100">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <div className="p-2 bg-slate-100 rounded-lg">
            <CogIcon className="h-5 w-5 text-slate-700" />
          </div>
          Equipment Health Monitor
          <Badge className="bg-slate-100 text-slate-700 border-slate-200">
            {equipment.length} Units
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {equipment.map((eq, index) => (
            <Card 
              key={eq.id} 
              className="bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-slate-900">{eq.name}</h4>
                    <p className="text-xs text-slate-500">{eq.location}</p>
                  </div>
                  <Badge className={`${getStatusColor(eq.status)} text-xs font-medium`}>
                    {eq.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Health Score</span>
                    <span className="text-lg font-bold text-slate-900">{eq.healthScore}%</span>
                  </div>
                  <Progress value={eq.healthScore} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-slate-500">
                      <CalendarIcon className="h-3 w-3" />
                      <span>RUL</span>
                    </div>
                    <div className="font-medium text-slate-700">{eq.remainingUsefulLife} days</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1 text-slate-500">
                      <AlertTriangleIcon className="h-3 w-3" />
                      <span>Anomalies</span>
                    </div>
                    <div className="font-medium text-slate-700">{eq.anomalyCount}</div>
                  </div>
                </div>
                
                <div className="text-xs text-slate-500 border-t border-slate-100 pt-2">
                  Next Maintenance: {new Date(eq.nextMaintenance).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
