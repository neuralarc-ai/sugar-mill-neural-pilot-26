
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ZapIcon, 
  TrendingUpIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  GaugeIcon,
  ThermometerIcon
} from 'lucide-react';

export const SystemOverview = () => {
  const [efficiency, setEfficiency] = useState(87.2);
  const [production, setProduction] = useState(2840);
  const [uptime, setUptime] = useState(98.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiency(prev => prev + (Math.random() - 0.5) * 0.2);
      setProduction(prev => prev + (Math.random() - 0.5) * 10);
      setUptime(prev => Math.max(95, Math.min(99.9, prev + (Math.random() - 0.5) * 0.1)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'System Efficiency',
      value: `${efficiency.toFixed(1)}%`,
      icon: ZapIcon,
      trend: '+2.3%',
      color: 'yellow',
      bgClass: 'accent-card-yellow'
    },
    {
      label: 'Production Rate',
      value: `${production.toFixed(0)} T/h`,
      icon: GaugeIcon,
      trend: '+5.1%',
      color: 'green',
      bgClass: 'accent-card-green'
    },
    {
      label: 'System Uptime',
      value: `${uptime.toFixed(1)}%`,
      icon: ShieldCheckIcon,
      trend: '+0.2%',
      color: 'green',
      bgClass: 'modern-card'
    },
    {
      label: 'Avg Temperature',
      value: '94.2°C',
      icon: ThermometerIcon,
      trend: '-1.1°C',
      color: 'neutral',
      bgClass: 'modern-card'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="hero-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        
        <CardContent className="p-0 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Badge className="modern-badge bg-green-400/20 text-green-300 border-green-400/30">
                  <ShieldCheckIcon className="h-3 w-3 mr-1" />
                  All Systems Operational
                </Badge>
                <Badge className="modern-badge bg-yellow-400/20 text-yellow-300 border-yellow-400/30">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  Real-time Monitoring
                </Badge>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Sugar Mill Control Center
                </h2>
                <p className="text-slate-300 text-lg max-w-2xl">
                  Advanced AI-powered monitoring and optimization system for enhanced sugar production efficiency and predictive maintenance.
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-slate-400">Monitoring</div>
              </div>
              <div className="w-px h-12 bg-slate-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">AI</div>
                <div className="text-sm text-slate-400">Powered</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={metric.label} className={`${metric.bgClass} p-6 animate-float`} 
                style={{ animationDelay: `${index * 0.2}s` }}>
            <CardContent className="p-0">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <metric.icon className={`h-5 w-5 ${
                      metric.color === 'yellow' ? 'text-yellow-600' :
                      metric.color === 'green' ? 'text-green-600' : 'text-slate-600'
                    }`} />
                    <span className="text-sm font-medium text-slate-600">{metric.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <TrendingUpIcon className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-medium text-green-600">{metric.trend}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
