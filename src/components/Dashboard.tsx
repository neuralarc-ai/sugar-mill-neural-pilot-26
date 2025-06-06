
import React from 'react';
import { Header } from './Header';
import { EquipmentStatus } from './EquipmentStatus';
import { AIChatbot } from './AIChatbot';
import { PredictiveAnalytics } from './PredictiveAnalytics';
import { SystemOverview } from './SystemOverview';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* System Overview Section */}
        <div className="animate-fade-in">
          <SystemOverview />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Equipment Status - Takes up 2.5 columns */}
          <div className="xl:col-span-3 animate-slide-up">
            <EquipmentStatus />
          </div>
          
          {/* AI Chatbot - Takes up 1.5 columns */}
          <div className="xl:col-span-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <AIChatbot />
          </div>
        </div>
        
        {/* Predictive Analytics - Full width */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <PredictiveAnalytics />
        </div>
      </main>
    </div>
  );
};
