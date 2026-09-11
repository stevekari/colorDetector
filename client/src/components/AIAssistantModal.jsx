import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  Search, 
  HelpCircle, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Droplets, 
  Copy, 
  Check, 
  Trash2, 
  ChevronRight, 
  Flame, 
  ShieldCheck, 
  Layers, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { 
  queryTextileAi, 
  generateBatchDiagnosisAnswer, 
  AI_SUGGESTED_PROMPTS, 
  TEXTILE_KNOWLEDGE_BASE 
} from '../utils/textileAiEngine';
import { translations } from '../utils/translations';

export default function AIAssistantModal({
  isOpen,
  onClose,
  batchId = '#1245',
  clientCode = '#C82030',
  targetHex = '#C82030',
  sampleHex = '#D2453A',
  analysis,
  yardage = 2000,
  waterVolume = 4200,
  currentLang = 'EN',
  onApplyAdjustmentAction,
  onMatchPerfect
}) {
  const t = translations[currentLang] || translations.EN;
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const contextData = {
    batchId,
    clientCode,
    targetHex,
    sampleHex,
    analysis,
    yardage,
    waterVolume
  };

  // Initial welcome message with auto batch context
  const [messages, setMessages] = useState(() => [
    {
      id: 'msg_welcome',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      data: generateBatchDiagnosisAnswer(contextData, currentLang)
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen) return null;

  const handleSendQuestion = (questionText) => {
    const q = (questionText || inputQuery).trim();
    if (!q) return;

    const userMsg = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const aiResponse = queryTextileAi(q, contextData, currentLang);
      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        data: aiResponse
      };
      setMessages(prev => [...prev, botMsg]);
      setIsThinking(false);
    }, 400);
  };

  const handleCopyText = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg_${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        data: generateBatchDiagnosisAnswer(contextData, currentLang)
      }
    ]);
  };

  const deltaE = analysis?.deltaE ?? 4.8;
  const isMatch = deltaE <= 1.0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in select-none">
      <div className="bg-[#0b121e] border-2 border-slate-700/80 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col h-[90vh] text-slate-100">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#172338] via-[#1b253b] to-[#121b2a] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-[2px] shadow-lg shadow-purple-600/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#090e17] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
                  Textile AI Assistant &amp; Search Bot
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-purple-950 border border-purple-500/50 text-[10px] font-mono text-purple-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>CIEDE2000 AI</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ask any question on color matching, dye recipes, ΔE formulas, 14-tray autoclave dosing &amp; safety
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearChat}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Clear chat and restart batch diagnosis"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Close AI Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Batch Summary Pill Bar */}
        <div className="px-4 sm:px-6 py-2 bg-[#080d15] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <span className="text-slate-400">
              Active Batch: <strong className="text-cyan-300">{batchId}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">Target:</span>
              <span className="w-3 h-3 rounded border border-white/40 shadow-sm" style={{ backgroundColor: targetHex }} />
              <span className="text-rose-400 font-bold">{targetHex}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">Sample:</span>
              <span className="w-3 h-3 rounded border border-white/40 shadow-sm" style={{ backgroundColor: sampleHex }} />
              <span className="text-cyan-400 font-bold">{sampleHex}</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className={`font-black ${isMatch ? 'text-emerald-400' : 'text-amber-400'}`}>
              ΔE = {deltaE.toFixed(1)}
            </span>
          </div>

          <button
            onClick={() => handleSendQuestion('🔬 Diagnose current batch color difference & dosing')}
            className="px-2.5 py-1 rounded bg-purple-950 hover:bg-purple-900 border border-purple-500/50 text-purple-300 text-[11px] font-bold flex items-center space-x-1 cursor-pointer transition-all active:scale-95"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Diagnose Batch Now</span>
          </button>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-sans bg-[#070b12]">
          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-md">
                    <p className="text-sm font-medium">{msg.text}</p>
                    <span className="text-[10px] text-purple-200 block text-right mt-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            }

            const data = msg.data;
            const fullTextToCopy = `${data.title}\n\n${data.summary}\n\n${data.details}`;

            return (
              <div key={msg.id} className="flex items-start space-x-3 max-w-3xl">
                <div className="w-8 h-8 rounded-lg bg-[#141e30] border border-purple-500/40 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>

                <div className="flex-1 bg-[#0f1726] border border-slate-700/80 rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-xl space-y-3">
                  
                  {/* Card Header: Category & Source */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                        {data.category || 'AI ASSISTANT'}
                      </span>
                      {data.confidence && (
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          Confidence {data.confidence}%
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleCopyText(fullTextToCopy, msg.id)}
                        className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                        title="Copy answer to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className="text-[10px] font-mono text-slate-500">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>{data.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-200 mt-1 font-medium bg-cyan-950/30 p-2 rounded-lg border border-cyan-800/30">
                      {data.summary}
                    </p>
                  </div>

                  {/* Detailed Explanation */}
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-mono bg-[#090e17] p-3 rounded-xl border border-slate-800">
                    {data.details}
                  </div>

                  {/* Action Steps Checklist */}
                  {data.actionSteps && data.actionSteps.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Recommended Operator Action Steps:</span>
                      </span>
                      <div className="space-y-1">
                        {data.actionSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                            <span className="font-mono text-cyan-400 font-bold">{idx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Action Button if batch diagnosis */}
                  {data.category === 'LIVE_BATCH_DIAGNOSIS' && !isMatch && (
                    <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          onMatchPerfect && onMatchPerfect();
                          onClose();
                        }}
                        className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md cursor-pointer transition-all active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Dispense AI Formulation &amp; Equalize (100% Match)</span>
                      </button>
                    </div>
                  )}

                  {/* Related Topics Pill suggestions */}
                  {data.relatedTopics && data.relatedTopics.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono text-slate-500">Related:</span>
                      {data.relatedTopics.map((topic, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendQuestion(topic.title)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-[10px] font-medium border border-slate-700 transition-colors cursor-pointer"
                        >
                          {topic.title}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex items-start space-x-3 max-w-md">
              <div className="w-8 h-8 rounded-lg bg-[#141e30] border border-purple-500/40 flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot className="w-4 h-4 text-purple-400 animate-spin" />
              </div>
              <div className="bg-[#0f1726] border border-slate-700 rounded-2xl rounded-tl-sm p-3.5 text-xs text-purple-300 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></div>
                <span>Analyzing textile knowledge base &amp; CIEDE2000 colorimetry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Carousel */}
        <div className="px-4 sm:px-6 py-2 bg-[#090e17] border-t border-slate-800 overflow-x-auto flex items-center space-x-1.5 scrollbar-thin">
          <span className="text-[10px] font-mono text-slate-500 flex-shrink-0 uppercase">Suggested:</span>
          {AI_SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuestion(prompt)}
              className="px-2.5 py-1 rounded-full bg-[#121c2c] hover:bg-[#1a283e] border border-slate-700 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer flex-shrink-0 active:scale-95 shadow-sm"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#0c1320] border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion();
            }}
            className="flex items-center space-x-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about color delta, reactive/disperse dye curves, liquor ratio, autoclave trays..."
                className="w-full bg-[#080d15] border border-slate-700 focus:border-purple-500 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-lg shadow-purple-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

