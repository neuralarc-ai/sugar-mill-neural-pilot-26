
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SearchIcon, MessageSquareIcon } from 'lucide-react';

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
      content: 'Hello! I\'m your Neural Agent X AI Assistant. I can help you with equipment monitoring, process optimization, maintenance scheduling, troubleshooting, and historical data analysis. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const exampleQueries = [
    'Check bearing temperature trends',
    'Optimize Brix levels',
    'Schedule maintenance',
    'Analyze energy consumption',
    'Troubleshoot vibration issue',
    'Generate efficiency report'
  ];

  const aiResponses = {
    'bearing': 'Current bearing temperatures are within normal ranges. Bearing #1: 85.2°C (normal), Bearing #2: 87.1°C (slight increase noted). Recommend monitoring trend over next 4 hours. Historical data shows 12% efficiency improvement after last lubrication cycle.',
    'temperature': 'Temperature monitoring shows: Main bearings averaging 86°C, Evaporator at 98.5°C (optimal), Steam systems at 165°C. All within operational parameters. Trending analysis indicates stable thermal management.',
    'brix': 'Current Brix levels: Raw juice 16.8°Bx (target: 17.0°Bx), Syrup 65.2°Bx (optimal). Recommend minor adjustment to extraction pressure to achieve target raw juice Brix. Estimated 2.3% yield improvement possible.',
    'maintenance': 'Upcoming maintenance schedule: 1) Centrifuge Unit #2 bearing replacement (3 days - HIGH PRIORITY), 2) Steam boiler inspection (7 days), 3) Clarifier pump maintenance (15 days). RUL analysis suggests advancing centrifuge maintenance by 1 day.',
    'vibration': 'Vibration analysis complete. Current levels: Crusher 2.3 mm/s (normal), Centrifuge #1 3.1 mm/s (slight increase). Frequency analysis shows bearing wear signature in Centrifuge #1. Recommend oil analysis and bearing inspection within 48 hours.',
    'energy': 'Energy consumption analysis: Current total load 1.8 MW, Daily consumption 41.3 MWh, Cost $4,956. Efficiency opportunities identified: 1) Mill drive load optimization (8% savings), 2) Pump scheduling (5% savings). Projected monthly savings: $12,400.',
    'steam': 'Steam system status: Pressure 6.8 bar (warning - above optimal 6.5 bar), Temperature 165°C, Flow rate 45 t/h. Recommend reducing pressure by 0.3 bar for optimal efficiency and safety. Fuel consumption can be reduced by 6%.',
    'ph': 'pH monitoring: Clarified juice 7.2 pH (target: 7.0), slightly alkaline. Recommend 0.2 pH reduction using lime adjustment. This will improve downstream crystallization efficiency by approximately 3%.',
    'flow': 'Flow rate monitoring: Juice flow 245.8 m³/h (normal), Syrup flow 42.1 m³/h (optimal). No flow restrictions detected. Pump efficiency at 87%. Consider variable speed drive optimization for 4% energy savings.',
    'pressure': 'Pressure systems: Steam 6.8 bar (high), Vacuum -0.85 bar (optimal), Process lines 2.1-3.4 bar (normal). Steam pressure trending upward - recommend immediate operator attention to avoid safety system activation.',
    'optimize': 'Process optimization recommendations: 1) Reduce steam pressure 0.3 bar (6% fuel savings), 2) Adjust extraction speed +2% (yield improvement), 3) Fine-tune pH to 7.0 (crystallization efficiency), 4) Implement predictive pump scheduling (energy savings).',
    'efficiency': 'Overall plant efficiency: 89.2% (excellent). Key metrics: Mill extraction 97.1%, Clarification 94.8%, Evaporation 91.5%, Crystallization 88.7%. Top opportunity: Crystallization process optimization could increase overall efficiency to 91.5%.',
    'report': 'Generating comprehensive performance report... Key findings: 1) Equipment availability 96.2%, 2) Energy efficiency +8% vs baseline, 3) Maintenance compliance 98%, 4) Quality parameters within spec 99.1%. Full report available for download.',
    'troubleshoot': 'Troubleshooting assistant activated. Please describe the specific issue: equipment behavior, error codes, unusual sounds, parameter deviations, or performance concerns. I can provide step-by-step diagnostics and corrective actions.',
    'schedule': 'Maintenance scheduling optimized using predictive analytics: Critical path items prioritized, resource allocation balanced, minimal production impact. Next 30 days: 8 scheduled tasks, 2 condition-based interventions recommended.',
    'default': 'I can help you with: Equipment monitoring and diagnostics, Process parameter optimization, Predictive maintenance scheduling, Energy consumption analysis, Quality control guidance, Troubleshooting assistance, Historical data queries, and Performance reporting. What would you like to explore?'
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Multiple keyword matching for more sophisticated responses
    if (message.includes('bearing') || message.includes('lubrication')) return aiResponses.bearing;
    if (message.includes('temperature') || message.includes('temp') || message.includes('heat')) return aiResponses.temperature;
    if (message.includes('brix') || message.includes('concentration') || message.includes('sugar')) return aiResponses.brix;
    if (message.includes('maintenance') || message.includes('schedule') || message.includes('service')) return aiResponses.maintenance;
    if (message.includes('vibration') || message.includes('shake') || message.includes('oscillation')) return aiResponses.vibration;
    if (message.includes('energy') || message.includes('power') || message.includes('consumption') || message.includes('kw')) return aiResponses.energy;
    if (message.includes('steam') || message.includes('boiler') || message.includes('pressure')) return aiResponses.steam;
    if (message.includes('ph') || message.includes('acid') || message.includes('alkaline')) return aiResponses.ph;
    if (message.includes('flow') || message.includes('pump') || message.includes('rate')) return aiResponses.flow;
    if (message.includes('pressure') && !message.includes('steam')) return aiResponses.pressure;
    if (message.includes('optimize') || message.includes('improve') || message.includes('enhance')) return aiResponses.optimize;
    if (message.includes('efficiency') || message.includes('performance') || message.includes('productivity')) return aiResponses.efficiency;
    if (message.includes('report') || message.includes('analysis') || message.includes('data')) return aiResponses.report;
    if (message.includes('troubleshoot') || message.includes('problem') || message.includes('issue') || message.includes('fault')) return aiResponses.troubleshoot;
    if (message.includes('schedule') || message.includes('plan') || message.includes('timeline')) return aiResponses.schedule;
    
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
    }, 1500 + Math.random() * 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-[800px] flex flex-col modern-card">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <div className="p-2 bg-slate-100 rounded-lg">
            <MessageSquareIcon className="h-5 w-5 text-slate-700" />
          </div>
          AI Process Assistant
          <Badge className="bg-green-400 text-black border-green-400 animate-pulse">
            Online
          </Badge>
        </CardTitle>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {exampleQueries.slice(0, 4).map((query, index) => (
            <Badge
              key={index}
              className="modern-badge cursor-pointer hover:bg-slate-100 transition-colors text-xs border-slate-300 hover:border-slate-400 text-center justify-center"
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
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
            placeholder="Ask about equipment, processes, maintenance, or optimization..."
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
