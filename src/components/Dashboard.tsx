
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

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
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
          </div>
        );
      case 'predictions':
        return (
          <div className="animate-fade-in">
            <PredictiveAnalytics />
          </div>
        );
      case 'equipment':
        return (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EquipmentHealthMonitor />
              <EnergyConsumptionMonitor />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};
