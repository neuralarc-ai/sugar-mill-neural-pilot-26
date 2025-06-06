import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EquipmentData } from './EquipmentStatus';
import { SparklineChart } from './SparklineChart';
import { ThermometerIcon, GaugeIcon, MonitorIcon, CogIcon, CheckIcon, XIcon } from 'lucide-react';

interface StatusCardProps {
  equipment: EquipmentData;
}

export const StatusCard = ({ equipment }: StatusCardProps) => {
  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-4 w-4 text-gray-600" };
    switch (iconName) {
      case 'thermometer': return <ThermometerIcon {...iconProps} />;
      case 'gauge': return <GaugeIcon {...iconProps} />;
      case 'monitor': return <MonitorIcon {...iconProps} />;
      case 'cog': return <CogIcon {...iconProps} />;
      default: return <MonitorIcon {...iconProps} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckIcon className="h-3 w-3 text-gray-800" />;
      case 'critical': return <XIcon className="h-3 w-3 text-gray-800" />;
      default: return <span className="text-gray-600 text-xs">!</span>;
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

  const getCardStyle = (status: string) => {
    switch (status) {
      case 'normal': return 'modern-card border-l-4 border-l-green-400';
      case 'warning': return 'modern-card border-l-4 border-l-yellow-400';
      case 'critical': return 'modern-card border-l-4 border-l-red-400';
      default: return 'modern-card';
    }
  };

  return (
    <Card className={getCardStyle(equipment.status)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              equipment.status === 'normal' ? 'bg-green-50' :
              equipment.status === 'warning' ? 'bg-yellow-50' : 'bg-red-50'
            }`}>
              {getIcon(equipment.icon)}
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1">
                {equipment.name}
              </h3>
              <p className="text-xs text-slate-500">{equipment.location}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`status-indicator ${
              equipment.status === 'normal' ? 'status-normal' :
              equipment.status === 'warning' ? 'status-warning' : 'status-critical'
            } flex items-center justify-center animate-pulse-glow`}>
              {getStatusIcon(equipment.status)}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-slate-900">
              {equipment.value}
            </span>
            <span className="text-sm text-slate-500 font-medium">
              {equipment.unit}
            </span>
          </div>
          <Badge 
            className={`modern-badge ${
              equipment.status === 'normal' ? 'bg-green-100 text-green-700 border-green-200' :
              equipment.status === 'warning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
              'bg-red-100 text-red-700 border-red-200'
            }`}
          >
            {getStatusText(equipment.status)}
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-slate-600">Performance Trend</span>
            <span className="text-xs text-slate-500">
              {equipment.status === 'warning' && '⚠️ Monitor Required'}
              {equipment.status === 'critical' && '🔴 Action Required'}
              {equipment.status === 'normal' && '✅ Operating Normal'}
            </span>
          </div>
          <SparklineChart data={equipment.history} status={equipment.status} />
        </div>
      </CardContent>
    </Card>
  );
};
