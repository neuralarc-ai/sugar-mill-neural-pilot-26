import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThermometerIcon, GaugeIcon, ActivityIcon, DropletIcon } from 'lucide-react';

interface SensorData {
  id: string;
  name: string;
  type: 'temperature' | 'pressure' | 'vibration' | 'flow';
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  location: string;
  threshold: { min: number; max: number; warning: number; critical: number };
}

export const LiveSensorDashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([
    {
      id: 'temp-001',
      name: 'Main Bearing Temperature',
      type: 'temperature',
      value: 85.2,
      unit: '°C',
      status: 'normal',
      location: 'Mill House A',
      threshold: { min: 20, max: 120, warning: 100, critical: 115 }
    },
    {
      id: 'press-001',
      name: 'Steam Pressure',
      type: 'pressure',
      value: 6.8,
      unit: 'bar',
      status: 'warning',
      location: 'Boiler Room',
      threshold: { min: 0, max: 10, warning: 6.5, critical: 8.5 }
    },
    {
      id: 'vib-001',
      name: 'Crusher Vibration',
      type: 'vibration',
      value: 2.3,
      unit: 'mm/s',
      status: 'normal',
      location: 'Crushing Station',
      threshold: { min: 0, max: 10, warning: 4.0, critical: 6.0 }
    },
    {
      id: 'flow-001',
      name: 'Juice Flow Rate',
      type: 'flow',
      value: 245.8,
      unit: 'm³/h',
      status: 'normal',
      location: 'Process Line 1',
      threshold: { min: 0, max: 400, warning: 300, critical: 350 }
    },
    {
      id: 'temp-002',
      name: 'Evaporator Temperature',
      type: 'temperature',
      value: 98.5,
      unit: '°C',
      status: 'normal',
      location: 'Evaporation Plant',
      threshold: { min: 20, max: 120, warning: 105, critical: 115 }
    },
    {
      id: 'press-002',
      name: 'Vacuum Pressure',
      type: 'pressure',
      value: -0.85,
      unit: 'bar',
      status: 'normal',
      location: 'Vacuum System',
      threshold: { min: -1.2, max: 0, warning: -0.9, critical: -1.1 }
    }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prevData => 
        prevData.map(sensor => {
          const variation = (Math.random() - 0.5) * 0.1;
          let newValue = sensor.value + (sensor.value * variation);
          
          // Keep values within realistic ranges based on sensor type
          switch (sensor.type) {
            case 'temperature':
              newValue = Math.max(20, Math.min(120, newValue));
              break;
            case 'pressure':
              if (sensor.id === 'press-002') {
                newValue = Math.max(-1.2, Math.min(0, newValue));
              } else {
                newValue = Math.max(0, Math.min(10, newValue));
              }
              break;
            case 'vibration':
              newValue = Math.max(0, Math.min(10, newValue));
              break;
            case 'flow':
              newValue = Math.max(0, Math.min(400, newValue));
              break;
          }

          // Determine status based on thresholds
          let status: 'normal' | 'warning' | 'critical' = 'normal';
          if (sensor.type === 'pressure' && sensor.id === 'press-002') {
            // Vacuum pressure - lower is better
            if (newValue <= sensor.threshold.critical) status = 'critical';
            else if (newValue <= sensor.threshold.warning) status = 'warning';
          } else {
            if (newValue >= sensor.threshold.critical) status = 'critical';
            else if (newValue >= sensor.threshold.warning) status = 'warning';
          }

          return {
            ...sensor,
            value: Math.round(newValue * 100) / 100,
            status
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-400 text-black';
      default: return 'bg-green-400 text-black';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'temperature': return ThermometerIcon;
      case 'pressure': return GaugeIcon;
      case 'vibration': return ActivityIcon;
      case 'flow': return DropletIcon;
      default: return GaugeIcon;
    }
  };

  return (
    <Card className="modern-card">
      <CardHeader className="pb-6 border-b border-slate-100">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <div className="p-2 bg-slate-100 rounded-lg">
            <ActivityIcon className="h-5 w-5 text-slate-700" />
          </div>
          Live Sensor Data
          <Badge className="bg-green-400 text-black border-green-400 animate-pulse">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sensorData.map((sensor, index) => {
            const IconComponent = getIcon(sensor.type);
            return (
              <Card 
                key={sensor.id} 
                className="bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-5 w-5 text-slate-600" />
                    <Badge className={`${getStatusColor(sensor.status)} text-xs font-medium`}>
                      {sensor.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-medium text-slate-900 text-sm">{sensor.name}</h4>
                    <p className="text-xs text-slate-500">{sensor.location}</p>
                  </div>
                  
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-slate-900">{sensor.value}</span>
                    <span className="text-sm text-slate-500">{sensor.unit}</span>
                  </div>
                  
                  {/* Progress bar showing value relative to threshold */}
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        sensor.status === 'critical' ? 'bg-red-500' :
                        sensor.status === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ 
                        width: `${Math.min(100, (Math.abs(sensor.value) / Math.abs(sensor.threshold.max)) * 100)}%` 
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
