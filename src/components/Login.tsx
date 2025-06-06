
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === '1234' && password === '1234') {
      toast({
        title: "Login Successful",
        description: "Welcome to Neural Agent X Dashboard",
        duration: 2000,
      });
      onLogin();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Use 1234 for both username and password.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl border border-slate-200">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Neural Agent X</h1>
          <p className="text-slate-600">AI Sugar Mill Intelligence</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-slate-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (1234)"
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (1234)"
              className="w-full"
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white">
            Login
          </Button>
        </form>
        
        <div className="text-center text-sm text-slate-500">
          Demo credentials: Username: 1234, Password: 1234
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
