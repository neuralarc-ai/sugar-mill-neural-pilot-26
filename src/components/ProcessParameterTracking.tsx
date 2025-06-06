
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BeakerIcon, DropletIcon, GaugeIcon } from 'lucide-react';

interface ProcessParameter {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  tolerance: number;
  status: 'optimal' | 'acceptable' | 'deviation';
  trend: 'up' | 'down' | 'stable';
  location: string;
}

export const ProcessParameterTracking = () => {
  const [parameters, setParameters] = useState<ProcessParameter[]>([
    {
      id: 'brix-001',
      name: 'Brix Level - Raw Juice',
      value: 16.8,
      unit: '°Bx',
      target: 17.0,
      tolerance: 0.5,
      status: 'optimal',
      trend: 'stable',
      location: 'Extraction Plant'
    },
    {
      id: 'ph-001',
      name: 'pH Level - Clarified Juice',
      value: 7.2,
      unit: 'pH',
      target: 7.0,
      tolerance: 0.3,
      status: 'acceptable',
      trend: 'up',
      location: 'Clarification Plant'
    },
    {
      id: 'steam-001',
      name: 'Steam Pressure - Main',
      value: 6.8,
      unit: 'bar',
      target: 6.5,
      tolerance: 0.2,
      status: 'deviation',
      trend: 'up',
      location: 'Boiler House'
    },
    {
      id: 'brix-002',
      name: 'Brix Level - Syrup',
      value: 65.2,
      unit: '°Bx',
      target: 65.0,
      tolerance: 1.0,
      status: 'optimal',
      trend: 'stable',
      location: 'Evaporation Plant'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParameters(prevParams => 
        prevParams.map(param => {
          const variation = (Math.random() - 0.5) * 0.02;
          let newValue = param.value + (param.value * variation);
          
          // Determine status based on target and tolerance
          const deviation = Math.abs(newValue - param.target);
          let status: 'optimal' | 'acceptable' | 'deviation' = 'optimal';
          
          if (deviation > param.tolerance) {
            status = 'deviation';
          } else if (deviation > param.tolerance * 0.7) {
            status = 'acceptable';
          }

          // Determine trend
          const change = newValue - param.value;
          let trend: 'up' | 'down' | 'stable' = 'stable';
          if (Math.abs(change) > 0.01) {
            trend = change > 0 ? 'up' : 'down';
          }

          return {
            ...param,
            value: Math.round(newValue * 100) / 100,
            status,
            trend
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deviation': return 'bg-yellow-400 text-black';
      case 'acceptable': return 'bg-slate-200 text-slate-700';
      default: return 'bg-green-400 text-black';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <Card className="modern-card">
      <CardHeader className="pb-6 border-b border-slate-100">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <div className="p-2 bg-slate-100 rounded-lg">
            <BeakerIcon className="h-5 w-5 text-slate-700" />
          </div>
          Process Parameter Tracking
          <Badge className="bg-slate-100 text-slate-700 border-slate-200">
            {parameters.length} Parameters
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parameters.map((param, index) => (
            <Card 
              key={param.id} 
              className="bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={`${getStatusColor(param.status)} text-xs font-medium`}>
                    {param.status.toUpperCase()}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-slate-500">
                    <span>{getTrendIcon(param.trend)}</span>
                    <span className="text-xs">{param.trend}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 text-sm">{param.name}</h4>
                  <p className="text-xs text-slate-500">{param.location}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-xl font-bold text-slate-900">{param.value}</span>
                      <span className="text-sm text-slate-500">{param.unit}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Target: {param.target} {param.unit}
                    </div>
                  </div>
                  
                  {/* Progress bar showing deviation from target */}
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        param.status === 'deviation' ? 'bg-yellow-400' :
                        param.status === 'acceptable' ? 'bg-slate-400' : 'bg-green-400'
                      }`}
                      style={{ 
                        width: `${Math.max(10, Math.min(100, 100 - (Math.abs(param.value - param.target) / param.tolerance) * 50))}%` 
                      }}
                    />
                  </div>
                  
                  <div className="text-xs text-slate-500">
                    Tolerance: ±{param.tolerance} {param.unit}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
