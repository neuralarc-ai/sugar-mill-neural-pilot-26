
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangleIcon, BellIcon, CheckIcon, XIcon } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: Date;
  source: string;
  acknowledged: boolean;
  escalated: boolean;
}

export const AlertNotificationCenter = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert-001',
      title: 'Steam Pressure Above Threshold',
      message: 'Boiler #2 steam pressure has exceeded 6.5 bar for 5 minutes',
      severity: 'warning',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      source: 'Boiler Room',
      acknowledged: false,
      escalated: false
    },
    {
      id: 'alert-002',
      title: 'Centrifuge Vibration Anomaly',
      message: 'Unusual vibration pattern detected in Centrifuge Unit #3',
      severity: 'critical',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      source: 'Sugar House',
      acknowledged: false,
      escalated: true
    },
    {
      id: 'alert-003',
      title: 'Maintenance Due',
      message: 'Scheduled maintenance for Clarifier Pump is due in 2 days',
      severity: 'info',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      source: 'Maintenance System',
      acknowledged: true,
      escalated: false
    }
  ]);

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance of new alert every 10 seconds
        const newAlert: Alert = {
          id: `alert-${Date.now()}`,
          title: 'Temperature Spike Detected',
          message: `Bearing temperature exceeded normal range in ${['Mill House A', 'Evaporation Plant', 'Crusher Station'][Math.floor(Math.random() * 3)]}`,
          severity: Math.random() < 0.3 ? 'critical' : 'warning',
          timestamp: new Date(),
          source: 'Temperature Monitoring',
          acknowledged: false,
          escalated: false
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 most recent
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'warning': return 'bg-yellow-400 text-black';
      default: return 'bg-blue-500 text-white';
    }
  };

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged).length;

  return (
    <Card className="modern-card">
      <CardHeader className="pb-6 border-b border-slate-100">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <div className="p-2 bg-slate-100 rounded-lg">
            <BellIcon className="h-5 w-5 text-slate-700" />
          </div>
          Alert Notification Center
          <div className="flex items-center space-x-2">
            {criticalCount > 0 && (
              <Badge className="bg-red-500 text-white animate-pulse">
                {criticalCount} Critical
              </Badge>
            )}
            {unacknowledgedCount > 0 && (
              <Badge className="bg-yellow-400 text-black">
                {unacknowledgedCount} Unread
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <BellIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert, index) => (
              <Card 
                key={alert.id} 
                className={`border-l-4 ${
                  alert.severity === 'critical' ? 'border-l-red-500' :
                  alert.severity === 'warning' ? 'border-l-yellow-400' : 'border-l-blue-500'
                } ${alert.acknowledged ? 'opacity-60' : ''} hover:shadow-md transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getSeverityColor(alert.severity)} text-xs font-medium`}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        {alert.escalated && (
                          <Badge className="bg-red-100 text-red-700 border-red-200">
                            ESCALATED
                          </Badge>
                        )}
                        {alert.acknowledged && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            ✓ ACKNOWLEDGED
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="font-medium text-slate-900 text-sm">{alert.title}</h4>
                        <p className="text-sm text-slate-600">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span>{alert.source}</span>
                          <span>{alert.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!alert.acknowledged && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="text-xs h-7"
                        >
                          <CheckIcon className="h-3 w-3 mr-1" />
                          ACK
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => dismissAlert(alert.id)}
                        className="text-xs h-7 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
