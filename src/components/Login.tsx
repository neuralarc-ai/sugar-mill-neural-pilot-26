
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [pin, setPin] = useState('');
  const { toast } = useToast();

  const handlePinComplete = (value: string) => {
    setPin(value);
    if (value === '1234') {
      toast({
        title: "Access Granted",
        description: "Welcome to Neural Agent X Dashboard",
        duration: 2000,
      });
      setTimeout(() => {
        onLogin();
      }, 500);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-8 space-y-8 bg-white shadow-2xl border border-slate-200 rounded-2xl">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Neural Agent X</h1>
          <p className="text-slate-600 text-sm">AI Sugar Mill Intelligence</p>
        </div>
        
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <label className="text-sm font-medium text-slate-700 block">
              Enter Security PIN
            </label>
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={(value) => {
                setPin(value);
                if (value.length === 4) {
                  handlePinComplete(value);
                }
              }}
              className="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-14 h-14 text-xl font-semibold border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
                <InputOTPSlot index={1} className="w-14 h-14 text-xl font-semibold border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
                <InputOTPSlot index={2} className="w-14 h-14 text-xl font-semibold border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
                <InputOTPSlot index={3} className="w-14 h-14 text-xl font-semibold border-2 border-slate-300 rounded-lg focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="text-center text-xs text-slate-500">
            Demo PIN: 1234
          </div>
        </div>
      </Card>
      
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-4">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-slate-600">
            Copyright 2025. Neural Arc Inc.
          </p>
        </div>
      </footer>
    </div>
  );
};
