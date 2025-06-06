
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SearchIcon } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your Neural Agent X AI Assistant. I can help you monitor equipment, analyze performance trends, and provide maintenance recommendations. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const exampleQueries = [
    'Check bearing status',
    'Optimize steam pressure', 
    'Maintenance schedule',
    'Performance analysis',
    'Equipment efficiency'
  ];

  const aiResponses = {
    'bearing': 'Bearing temperatures are currently within normal range (85°C). Bearing #1 shows stable operation with consistent lubrication levels. Next scheduled maintenance: 42 days. Recommend monitoring vibration patterns.',
    'steam': 'Steam pressure is at 6.8 bar with warning status. Optimal operating range is 5.5-6.5 bar. Recommend reducing pressure by 0.3 bar for improved efficiency and safety margins.',
    'maintenance': 'Upcoming scheduled maintenance: 1) Centrifuge bearing lubrication (3 days), 2) Evaporator cleaning cycle (7 days), 3) Clarifier inspection (12 days), 4) Boiler pressure valve check (18 days).',
    'vibration': 'Crusher vibration levels at 2.3 mm/s are well within acceptable limits (<4.0 mm/s). Trend analysis shows stable operation over past 24 hours.',
    'performance': 'Overall plant efficiency: 87%. Key metrics: Sugar recovery rate 89.2%, Energy consumption 15% below target, Equipment availability 94.5%. Recommend optimizing clarifier flow for 2% efficiency gain.',
    'efficiency': 'Current operational efficiency: Mill extraction 97.2%, Crystallization 91.8%, Centrifuge recovery 98.1%. Identified opportunity in evaporator optimization for 3% energy savings.',
    'default': 'Based on current operational data, all critical systems are functioning normally. Plant efficiency is at 87% with no immediate alerts. Would you like me to analyze a specific system or process?'
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    if (message.includes('bearing')) return aiResponses.bearing;
    if (message.includes('steam') || message.includes('pressure')) return aiResponses.steam;
    if (message.includes('maintenance') || message.includes('schedule')) return aiResponses.maintenance;
    if (message.includes('vibration')) return aiResponses.vibration;
    if (message.includes('performance') || message.includes('analyze')) return aiResponses.performance;
    if (message.includes('efficiency') || message.includes('optimize')) return aiResponses.efficiency;
    return aiResponses.default;
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(content),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-[700px] flex flex-col modern-card animate-fade-in">
      <CardHeader className="pb-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900">
            <div className="p-2 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg">
              <SearchIcon className="h-5 w-5 text-yellow-700" />
            </div>
            AI Assistant
          </CardTitle>
          <Badge className="modern-badge bg-green-100 text-green-700 border-green-200 animate-pulse-glow">
            Online
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {exampleQueries.slice(0, 3).map((query, index) => (
            <Badge
              key={index}
              className="modern-badge cursor-pointer hover:bg-slate-100 transition-colors text-xs border-slate-300 hover:border-slate-400"
              onClick={() => handleSendMessage(query)}
            >
              {query}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="text-sm leading-relaxed">{message.content}</div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about equipment status, maintenance, or optimization..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            disabled={isTyping}
            className="border-slate-300 rounded-xl bg-white/80 backdrop-blur-sm"
          />
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={isTyping || !inputValue.trim()}
            className="bg-slate-900 hover:bg-slate-800 rounded-xl px-6"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
