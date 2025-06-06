
import React from 'react';
import { Button } from '@/components/ui/button';
import { BellIcon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const Header = ({ isDarkMode, setIsDarkMode }: HeaderProps) => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sugar Mill AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Neural Agent X Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden sm:flex"
            >
              {isDarkMode ? '☀️' : '🌙'} Theme
            </Button>
            
            <Button variant="outline" size="icon" className="relative">
              <BellIcon className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
