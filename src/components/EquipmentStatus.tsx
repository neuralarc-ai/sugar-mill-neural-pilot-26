import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusCard } from './StatusCard';
import { MonitorIcon } from 'lucide-react';

export interface EquipmentData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  threshold: { warning: number; critical: number };
  history: number[];
  icon: string;
  location: string;
}

export const EquipmentStatus = () => {
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>([
    {
      id: 'bearing-temp-1',
      name: 'Bearing Temperature #1',
      value: 85,
      unit: '°C',
      status: 'normal',
      threshold: { warning: 100, critical: 115 },
      history: [82, 84, 83, 85, 87, 85, 86, 85],
      icon: 'thermometer',
      location: 'Mill House A'
    },
    {
      id: 'vibration-crusher',
      name: 'Crusher Vibration',
      value: 2.3,
      unit: 'mm/s',
      status: 'normal',
      threshold: { warning: 4.0, critical: 5.0 },
      history: [2.1, 2.2, 2.4, 2.3, 2.5, 2.3, 2.2, 2.3],
      icon: 'gauge',
      location: 'Crushing Station'
    },
    {
      id: 'steam-pressure',
      name: 'Boiler Steam Pressure',
      value: 6.8,
      unit: 'bar',
      status: 'warning',
      threshold: { warning: 6.5, critical: 8.0 },
      history: [6.2, 6.4, 6.3, 6.5, 6.7, 6.8, 6.6, 6.8],
      icon: 'gauge',
      location: 'Boiler Room'
    },
    {
      id: 'centrifuge-rpm',
      name: 'Centrifuge Speed',
      value: 1650,
      unit: 'RPM',
      status: 'normal',
      threshold: { warning: 1750, critical: 1800 },
      history: [1620, 1640, 1630, 1650, 1670, 1650, 1660, 1650],
      icon: 'cog',
      location: 'Sugar House'
    },
    {
      id: 'evaporator-temp',
      name: 'Evaporator Temperature',
      value: 98,
      unit: '°C',
      status: 'normal',
      threshold: { warning: 105, critical: 110 },
      history: [95, 97, 96, 98, 99, 98, 97, 98],
      icon: 'thermometer',
      location: 'Evaporation Plant'
    },
    {
      id: 'clarifier-flow',
      name: 'Clarifier Flow Rate',
      value: 245,
      unit: 'm³/h',
      status: 'normal',
      threshold: { warning: 280, critical: 300 },
      history: [240, 242, 244, 245, 247, 245, 246, 245],
      icon: 'monitor',
      location: 'Clarification Plant'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipmentData(prevData => 
        prevData.map(equipment => {
          const baseValue = equipment.value;
          const variation = (Math.random() - 0.5) * 0.08;
          let newValue = baseValue + (baseValue * variation);
          
          // Keep values within realistic ranges
          if (equipment.id.includes('temp')) {
            newValue = Math.max(75, Math.min(120, newValue));
          } else if (equipment.id.includes('vibration')) {
            newValue = Math.max(0.1, Math.min(5.0, newValue));
          } else if (equipment.id.includes('pressure')) {
            newValue = Math.max(3, Math.min(8.5, newValue));
          } else if (equipment.id.includes('rpm')) {
            newValue = Math.max(1200, Math.min(1800, newValue));
          } else if (equipment.id.includes('flow')) {
            newValue = Math.max(200, Math.min(320, newValue));
          }

          let status: 'normal' | 'warning' | 'critical' = 'normal';
          if (newValue >= equipment.threshold.critical) {
            status = 'critical';
          } else if (newValue >= equipment.threshold.warning) {
            status = 'warning';
          }

          const newHistory = [...equipment.history.slice(1), newValue];

          return {
            ...equipment,
            value: Math.round(newValue * 100) / 100,
            status,
            history: newHistory
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="modern-card animate-fade-in">
      <CardHeader className="pb-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
            <div className="p-2 bg-slate-100 rounded-lg">
              <MonitorIcon className="h-5 w-5 text-slate-700" />
            </div>
            Equipment Status Monitor
          </CardTitle>
          <Badge className="modern-badge bg-slate-100 text-slate-700 border-slate-200">
            {equipmentData.length} Devices
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {equipmentData.map((equipment, index) => (
            <div key={equipment.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <StatusCard equipment={equipment} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
