
import React from 'react';
import { Header } from './Header';
import { EquipmentStatus } from './EquipmentStatus';
import { AIChatbot } from './AIChatbot';
import { PredictiveAnalytics } from './PredictiveAnalytics';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Status - Full width on mobile, 2 columns on desktop */}
          <div className="lg:col-span-2">
            <EquipmentStatus />
          </div>
          
          {/* AI Chatbot - Full width on mobile, 1 column on desktop */}
          <div className="lg:col-span-1">
            <AIChatbot />
          </div>
          
          {/* Predictive Analytics - Full width */}
          <div className="lg:col-span-3">
            <PredictiveAnalytics />
          </div>
        </div>
      </main>
    </div>
  );
};
