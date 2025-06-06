
import React from 'react';
import { Button } from '@/components/ui/button';
import { BellIcon, SettingsIcon } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 gradient-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-lg">N</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Neural Agent X</h1>
              <p className="text-sm text-gray-500 font-light">Sugar Mill AI Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="icon" className="relative border-gray-200 hover:bg-gray-50">
              <BellIcon className="h-4 w-4 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </Button>
            
            <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-50">
              <SettingsIcon className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
