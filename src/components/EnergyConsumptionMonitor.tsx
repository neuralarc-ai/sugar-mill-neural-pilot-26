
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ZapIcon, DollarSignIcon, TrendingDownIcon } from 'lucide-react';

interface EnergyData {
  id: string;
  name: string;
  currentPower: number; // kW
  peakPower: number; // kW
  dailyConsumption: number; // kWh
  efficiency: number; // percentage
  cost: number; // daily cost
  savings: number; // percentage savings vs baseline
  status: 'optimal' | 'high' | 'peak';
  location: string;
}

export const EnergyConsumptionMonitor = () => {
  const [energyData, setEnergyData] = useState<EnergyData[]>([
    {
      id: 'en-001',
      name: 'Mill Drive Motors',
      currentPower: 850,
      peakPower: 1200,
      dailyConsumption: 18500,
      efficiency: 87,
      cost: 2220,
      savings: 12,
      status: 'optimal',
      location: 'Mill House'
    },
    {
      id: 'en-002',
      name: 'Boiler System',
      currentPower: 450,
      peakPower: 650,
      dailyConsumption: 9800,
      efficiency: 92,
      cost: 1176,
      savings: 8,
      status: 'optimal',
      location: 'Boiler Room'
    },
    {
      id: 'en-003',
      name: 'Centrifuge Units',
      currentPower: 320,
      peakPower: 400,
      dailyConsumption: 6800,
      efficiency: 78,
      cost: 816,
      savings: -5,
      status: 'high',
      location: 'Sugar House'
    },
    {
      id: 'en-004',
      name: 'Pumping Systems',
      currentPower: 180,
      peakPower: 280,
      dailyConsumption: 4200,
      efficiency: 85,
      cost: 504,
      savings: 15,
      status: 'optimal',
      location: 'Process Plant'
    }
  ]);

  const [totalStats, setTotalStats] = useState({
    totalPower: 0,
    totalDailyCost: 0,
    averageEfficiency: 0,
    totalSavings: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(prevData => 
        prevData.map(energy => {
          const powerVariation = (Math.random() - 0.5) * 0.1;
          let newPower = energy.currentPower + (energy.currentPower * powerVariation);
          newPower = Math.max(0, Math.min(energy.peakPower, newPower));
          
          // Determine status based on power usage
          let status: 'optimal' | 'high' | 'peak' = 'optimal';
          if (newPower > energy.peakPower * 0.9) status = 'peak';
          else if (newPower > energy.peakPower * 0.7) status = 'high';

          // Update daily consumption proportionally
          const consumptionRatio = newPower / energy.currentPower;
          const newDailyConsumption = energy.dailyConsumption * consumptionRatio;
          const newCost = newDailyConsumption * 0.12; // $0.12 per kWh

          return {
            ...energy,
            currentPower: Math.round(newPower),
            dailyConsumption: Math.round(newDailyConsumption),
            cost: Math.round(newCost * 100) / 100,
            status
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update total stats whenever energyData changes
  useEffect(() => {
    const totalPower = energyData.reduce((sum, energy) => sum + energy.currentPower, 0);
    const totalDailyCost = energyData.reduce((sum, energy) => sum + energy.cost, 0);
    const averageEfficiency = energyData.reduce((sum, energy) => sum + energy.efficiency, 0) / energyData.length;
    const totalSavings = energyData.reduce((sum, energy) => sum + energy.savings, 0) / energyData.length;

    setTotalStats({
      totalPower,
      totalDailyCost: Math.round(totalDailyCost * 100) / 100,
      averageEfficiency: Math.round(averageEfficiency),
      totalSavings: Math.round(totalSavings)
    });
  }, [energyData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'peak': return 'bg-red-500 text-white';
      case 'high': return 'bg-yellow-400 text-black';
      default: return 'bg-green-400 text-black';
    }
  };

  return (
    <Card className="modern-card">
      <CardHeader className="pb-6 border-b border-slate-100">
        <CardTitle className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <div className="p-2 bg-slate-100 rounded-lg">
            <ZapIcon className="h-5 w-5 text-slate-700" />
          </div>
          Energy Consumption Monitor
          <Badge className="bg-green-400 text-black border-green-400">
            {totalStats.totalSavings > 0 ? '+' : ''}{totalStats.totalSavings}% Savings
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Total Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{totalStats.totalPower}</div>
            <div className="text-xs text-slate-500">Total kW</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">${totalStats.totalDailyCost}</div>
            <div className="text-xs text-slate-500">Daily Cost</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{totalStats.averageEfficiency}%</div>
            <div className="text-xs text-slate-500">Avg Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalStats.totalSavings}%</div>
            <div className="text-xs text-slate-500">Savings</div>
          </div>
        </div>

        {/* Individual Energy Systems */}
        <div className="space-y-4">
          {energyData.map((energy, index) => (
            <Card 
              key={energy.id} 
              className="bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-slate-900">{energy.name}</h4>
                    <p className="text-xs text-slate-500">{energy.location}</p>
                  </div>
                  <Badge className={`${getStatusColor(energy.status)} text-xs font-medium`}>
                    {energy.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Current Power</span>
                      <span className="font-bold text-slate-900">{energy.currentPower} kW</span>
                    </div>
                    <Progress 
                      value={(energy.currentPower / energy.peakPower) * 100} 
                      className="h-2" 
                    />
                    <div className="text-xs text-slate-500">Peak: {energy.peakPower} kW</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Efficiency</span>
                      <span className="font-bold text-slate-900">{energy.efficiency}%</span>
                    </div>
                    <Progress value={energy.efficiency} className="h-2" />
                    <div className="text-xs text-slate-500">Daily: ${energy.cost}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-1 text-slate-500">
                    <DollarSignIcon className="h-3 w-3" />
                    <span>Daily Consumption: {energy.dailyConsumption.toLocaleString()} kWh</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${energy.savings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingDownIcon className="h-3 w-3" />
                    <span>{energy.savings > 0 ? '+' : ''}{energy.savings}%</span>
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
