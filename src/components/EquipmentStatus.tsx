import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusCard } from './StatusCard';

export interface EquipmentData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  threshold: { warning: number; critical: number };
  history: number[];
}

export const EquipmentStatus = () => {
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>([
    {
      id: 'bearing-temp',
      name: 'Bearing Temperature',
      value: 85,
      unit: '°C',
      status: 'normal',
      threshold: { warning: 100, critical: 115 },
      history: [82, 84, 83, 85, 87, 85, 86, 85]
    },
    {
      id: 'vibration',
      name: 'Vibration Levels',
      value: 2.3,
      unit: 'mm/s',
      status: 'normal',
      threshold: { warning: 4.0, critical: 5.0 },
      history: [2.1, 2.2, 2.4, 2.3, 2.5, 2.3, 2.2, 2.3]
    },
    {
      id: 'steam-pressure',
      name: 'Steam Pressure',
      value: 6.5,
      unit: 'bar',
      status: 'warning',
      threshold: { warning: 7.0, critical: 8.0 },
      history: [6.2, 6.4, 6.3, 6.5, 6.7, 6.5, 6.6, 6.5]
    },
    {
      id: 'centrifuge-rpm',
      name: 'Centrifuge RPM',
      value: 1650,
      unit: 'RPM',
      status: 'normal',
      threshold: { warning: 1750, critical: 1800 },
      history: [1620, 1640, 1630, 1650, 1670, 1650, 1660, 1650]
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEquipmentData(prevData => 
        prevData.map(equipment => {
          // Simulate realistic data fluctuations
          const baseValue = equipment.value;
          const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
          let newValue = baseValue + (baseValue * variation);
          
          // Ensure values stay within realistic ranges
          if (equipment.id === 'bearing-temp') {
            newValue = Math.max(80, Math.min(120, newValue));
          } else if (equipment.id === 'vibration') {
            newValue = Math.max(0.1, Math.min(5.0, newValue));
          } else if (equipment.id === 'steam-pressure') {
            newValue = Math.max(3, Math.min(8, newValue));
          } else if (equipment.id === 'centrifuge-rpm') {
            newValue = Math.max(1200, Math.min(1800, newValue));
          }

          // Determine status based on thresholds
          let status: 'normal' | 'warning' | 'critical' = 'normal';
          if (newValue >= equipment.threshold.critical) {
            status = 'critical';
          } else if (newValue >= equipment.threshold.warning) {
            status = 'warning';
          }

          // Update history (keep last 8 values)
          const newHistory = [...equipment.history.slice(1), newValue];

          return {
            ...equipment,
            value: Math.round(newValue * 100) / 100,
            status,
            history: newHistory
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-4 h-4 gradient-blue rounded"></div>
          Equipment Status Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipmentData.map(equipment => (
            <StatusCard key={equipment.id} equipment={equipment} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
