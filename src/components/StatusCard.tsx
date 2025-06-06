
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EquipmentData } from './EquipmentStatus';
import { SparklineChart } from './SparklineChart';

interface StatusCardProps {
  equipment: EquipmentData;
}

export const StatusCard = ({ equipment }: StatusCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'warning': return 'Warning';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">
              {equipment.name}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {equipment.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {equipment.unit}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`status-indicator ${
              equipment.status === 'normal' ? 'status-normal' :
              equipment.status === 'warning' ? 'status-warning' : 'status-critical'
            }`} />
            <Badge variant={equipment.status === 'normal' ? 'default' : 'destructive'} className="text-xs">
              {getStatusText(equipment.status)}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Trend (8 samples)</span>
            <span className="text-xs text-muted-foreground">
              {equipment.status === 'warning' && '⚠️ Monitor'}
              {equipment.status === 'critical' && '🚨 Alert'}
              {equipment.status === 'normal' && '✅ OK'}
            </span>
          </div>
          <SparklineChart data={equipment.history} status={equipment.status} />
        </div>
      </CardContent>
    </Card>
  );
};
