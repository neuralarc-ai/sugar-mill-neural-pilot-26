
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BellIcon, SettingsIcon, ActivityIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const [notifications, setNotifications] = useState(6);
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: `You have ${notifications} active alerts. Check the Alert Center below for details.`,
      duration: 3000,
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "System configuration panel would open here.",
      duration: 3000,
    });
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Neural Agent X</h1>
                <p className="text-sm text-slate-500 font-medium">AI Sugar Mill Intelligence</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Badge className="modern-badge bg-white text-slate-700 border-slate-200">
                <ActivityIcon className="h-3 w-3 mr-1" />
                System Online
              </Badge>
              <Badge className="modern-badge bg-yellow-400 text-black border-yellow-400 animate-pulse">
                {notifications} Alerts
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="relative border-slate-200 hover:bg-slate-50 transition-all duration-200"
              onClick={handleNotificationClick}
            >
              <BellIcon className="h-4 w-4 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="border-slate-200 hover:bg-slate-50 transition-all duration-200"
              onClick={handleSettingsClick}
            >
              <SettingsIcon className="h-4 w-4 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
