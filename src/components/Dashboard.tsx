
import React, { useState } from 'react';
import { Header } from './Header';
import { SystemOverview } from './SystemOverview';
import { LiveStatistics } from './LiveStatistics';
import { LiveSensorDashboard } from './LiveSensorDashboard';
import { EquipmentHealthMonitor } from './EquipmentHealthMonitor';
import { ProcessParameterTracking } from './ProcessParameterTracking';
import { EnergyConsumptionMonitor } from './EnergyConsumptionMonitor';
import { AIChatbot } from './AIChatbot';
import { AlertNotificationCenter } from './AlertNotificationCenter';
import { PredictiveAnalytics } from './PredictiveAnalytics';
import { Footer } from './Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUpIcon, HomeIcon, CogIcon } from 'lucide-react';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 border border-slate-300 rounded-xl p-2 shadow-lg">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 px-6 py-3 text-slate-700 font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md rounded-lg transition-all duration-200 hover:bg-slate-50"
            >
              <HomeIcon className="h-5 w-5" />
              System Overview
            </TabsTrigger>
            <TabsTrigger 
              value="predictions" 
              className="flex items-center gap-2 px-6 py-3 text-slate-700 font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md rounded-lg transition-all duration-200 hover:bg-slate-50"
            >
              <TrendingUpIcon className="h-5 w-5" />
              AI Predictions
            </TabsTrigger>
            <TabsTrigger 
              value="equipment" 
              className="flex items-center gap-2 px-6 py-3 text-slate-700 font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md rounded-lg transition-all duration-200 hover:bg-slate-50"
            >
              <CogIcon className="h-5 w-5" />
              Equipment Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* System Overview Section */}
            <div className="animate-fade-in">
              <SystemOverview />
            </div>

            {/* Live Performance Statistics */}
            <div className="animate-slide-up">
              <LiveStatistics />
            </div>

            {/* Alert Notification Center */}
            <div className="animate-slide-up">
              <AlertNotificationCenter />
            </div>

            {/* Main Monitoring Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Live Sensor Data - Full width on small, 2 columns on large */}
              <div className="xl:col-span-2 space-y-8">
                <div className="animate-slide-up">
                  <LiveSensorDashboard />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <ProcessParameterTracking />
                </div>
              </div>
              
              {/* AI Chatbot - Right sidebar */}
              <div className="xl:col-span-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <AIChatbot />
              </div>
            </div>

            {/* Equipment Health and Energy Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <EquipmentHealthMonitor />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <EnergyConsumptionMonitor />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="animate-fade-in">
            <PredictiveAnalytics />
          </TabsContent>

          <TabsContent value="equipment" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EquipmentHealthMonitor />
              <EnergyConsumptionMonitor />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};
