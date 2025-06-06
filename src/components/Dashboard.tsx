
import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { EquipmentStatus } from './EquipmentStatus';
import { AIChatbot } from './AIChatbot';
import { PredictiveAnalytics } from './PredictiveAnalytics';
import { ThemeProvider } from './ThemeProvider';

export const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
    </ThemeProvider>
  );
};
