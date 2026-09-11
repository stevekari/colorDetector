import React, { useState } from 'react';
import { X, Check, Target, Pipette, Sparkles, Copy } from 'lucide-react';
import { parseAnyColor } from '../utils/colorEngine';
import { translations } from '../utils/translations';

export default function OriginalColorModal({
  isOpen,
  onClose,
  currentColor = '#C82030',
  currentLang = 'EN',
  onSaveOriginalColor
}) {
  const t = translations[currentLang] || translations.EN;
  const [inputText, setInputText] = useState(currentColor);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen) return null;

  const parsed = parseAnyColor(inputText);
  const currentHex = parsed ? parsed.hex : currentColor;

  const clientPalette = [
    { name: 'Crimson Scarlet', hex: '#C82030' },
    { name: 'Navy Royal Blue', hex: '#1E3A8A' },
    { name: 'Deep Emerald Green', hex: '#065F46' },
    { name: 'Golden Saffron', hex: '#D97706' },
    { name: 'Jet Carbon Black', hex: '#18181B' },
    { name: 'Imperial Violet', hex: '#581C87' },
    { name: 'Burgundy Wine', hex: '#831843' },
    { name: 'Terracotta Rust', hex: '#9A3412' }
  ];

  const handleSave = () => {
    if (!parsed) {
      setErrorMsg('Please enter a valid HEX (#C82030), RGB (200, 32, 48), or RGBA code.');
      return;
    }
    onSaveOriginalColor(parsed.hex);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0e1624] border border-slate-700 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-in">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#1b263b] to-[#101928] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400">
              <Target className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">{t.enterOriginalColor}</h3>
              <p className="text-[11px] sm:text-xs text-slate-400">{t.clientRefStandard}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
          
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#090e17] border border-slate-800 flex items-center space-x-3 sm:space-x-4">
            <label className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl shadow-lg border-2 border-white/20 overflow-hidden flex-shrink-0 cursor-pointer group">
              <div 
                className="w-full h-full"
                style={{ backgroundColor: currentHex }}
              >
                <div className="absolute inset-0 fabric-texture opacity-50 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/20"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                  <Pipette className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
              <input 
                type="color" 
                value={currentHex}
                onChange={(e) => setInputText(e.target.value)}
                className="absolute opacity-0 pointer-events-none"
              />
            </label>

            <div className="flex-1 space-y-1.5 sm:space-y-2">
              <label className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {t.originalColorCode}
              </label>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="#C82030 or rgb(200, 32, 48) or 200, 32, 48"
                className="w-full bg-[#0e1624] border border-slate-700 focus:border-rose-500 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-white font-mono font-bold text-sm sm:text-base focus:outline-none"
                autoFocus
              />
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                {t.acceptsHexRgbRgba}
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/80 border border-red-500 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider block">
              {t.orChooseStandard}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {clientPalette.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(item.hex)}
                  className={`flex items-center space-x-2 p-2 rounded-lg border text-left transition-all cursor-pointer active:scale-95 ${
                    currentHex.toUpperCase() === item.hex.toUpperCase()
                      ? 'bg-rose-950/50 border-rose-500 text-white shadow-sm'
                      : 'bg-[#111a28] hover:bg-[#162235] border-slate-800 text-slate-300'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-md border border-white/20 flex-shrink-0"
                    style={{ backgroundColor: item.hex }}
                  />
                  <div className="truncate">
                    <div className="text-[10px] sm:text-[11px] font-semibold text-slate-100 truncate">{item.name}</div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-slate-400">{item.hex}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0a1019] border-t border-slate-700/80 flex items-center justify-between pb-safe">
          <button
            onClick={onClose}
            className="px-3.5 sm:px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer active:scale-95"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSave}
            className="px-4 sm:px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-rose-600/30 active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{t.setAsOriginalTarget}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
