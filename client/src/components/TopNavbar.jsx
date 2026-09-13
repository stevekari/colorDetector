import React, { useState, useRef, useEffect } from 'react';
import { 
  Sliders, 
  Settings, 
  Layers, 
  Droplets, 
  Camera, 
  Sparkles, 
  Activity,
  CheckCircle2, 
  Target, 
  Edit3, 
  Globe, 
  ChevronDown, 
  QrCode, 
  FileText, 
  Bookmark,
  Bot,
  Check
} from 'lucide-react';
import { RECIPE_DATABASE } from '../utils/recipeDatabase';
import { translations } from '../utils/translations';
import './TopNavbar.css';

export default function TopNavbar({ 
  batchId = '#1245', 
  clientCode = '#C82030', 
  yardage = '2,000 m',
  waterVolume = '4,200 L',
  selectedRecipeId = 'RCP-1245',
  onSelectRecipe,
  currentLang = 'EN',
  onSelectLang,
  onOpenAutoclave,
  onOpenPretreatment,
  onOpenOriginalColorModal,
  onOpenDyeInventory,
  onOpenEfficiencyReport,
  onOpenDosingReceipt,
  onOpenAiBot,
  isCalibrated = true,
  onToggleCalibration
}) {
  const [isRecipeMenuOpen, setIsRecipeMenuOpen] = useState(false);
  const recipeMenuRef = useRef(null);

  const t = translations[currentLang] || translations.EN;

  const languages = [
    { code: 'EN', name: 'English', shortName: 'EN', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', shortName: 'ES', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', shortName: 'FR', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', shortName: 'DE', flag: '🇩🇪' },
    { code: 'NL', name: 'Nederlands', shortName: 'NL', flag: '🇳🇱' },
    { code: 'PR', name: 'Português', shortName: 'PR', flag: '🇵🇹' },
    { code: 'Twi', name: 'Twi (Akan)', shortName: 'TWI', flag: '🇬🇭' },
  ];

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (recipeMenuRef.current && !recipeMenuRef.current.contains(event.target)) {
        setIsRecipeMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="top-navbar-header w-full max-w-full bg-[#111928]/85 border-b border-slate-700/70 shadow-2xl px-2 sm:px-4 py-2 select-none sticky top-0 z-50 backdrop-blur-md">
      <div className="w-full max-w-[1680px] mx-auto flex flex-col gap-2">
        
        {/* ROW 1: Brand Title + ALL LANGUAGES DIRECTLY VISIBLE (No scrolling needed!) + Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="relative w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 shadow-md flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 via-yellow-400 via-emerald-400 via-blue-500 to-purple-600 animate-spin-slow opacity-90"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xs sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1 font-sans leading-none">
                <span>{t.appTitle}</span>
              </h1>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-mono hidden sm:inline-block">
                {t.subtitle}
              </span>
            </div>
          </div>

          {/* =========================================================================
              DIRECT LANGUAGE SELECTOR BAR - ALL 7 LANGUAGES CLEARLY VISIBLE WITH ZERO SCROLL
             ========================================================================= */}
          <div className="flex items-center bg-[#070c16] p-1 rounded-xl border-2 border-slate-700 shadow-inner gap-1 flex-wrap justify-center">
            <div className="flex items-center space-x-1 px-1.5 text-[10px] font-mono font-bold text-cyan-400 uppercase hidden md:flex">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Lang:</span>
            </div>

            {languages.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => onSelectLang(lang.code)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-black border-2 border-white shadow-lg shadow-cyan-500/30 scale-105'
                      : 'bg-[#0f172a] hover:bg-[#1e293b] text-slate-200 border border-slate-700 hover:border-slate-500'
                  }`}
                  title={`Switch language to ${lang.name} (${lang.flag})`}
                >
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                    {lang.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Main Action Buttons: AI Bot & 14-Trays */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* AI Bot */}
            <button
              onClick={onOpenAiBot}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 border border-purple-400/60 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all active:scale-95 cursor-pointer"
              title="Textile AI Assistant Bot"
            >
              <Bot className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
              <span>AI Bot</span>
            </button>

            {/* 14-Tray Button */}
            <button
              onClick={onOpenAutoclave}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-900 to-cyan-900 hover:from-blue-800 hover:to-cyan-800 border border-cyan-500/60 text-cyan-200 text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              title="14-Tray Autoclave Controller"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>14-Trays</span>
            </button>
          </div>

        </div>

        {/* ROW 2: Batch Context Badges & Quick Tools */}
        <div className="w-full max-w-full overflow-x-auto no-scrollbar py-0.5 flex items-center gap-1.5 flex-nowrap min-w-0 border-t border-slate-800/80 pt-1.5">
          
          {/* Automatic Recipe Loader Dropdown */}
          <div className="relative flex-shrink-0" ref={recipeMenuRef}>
            <button
              onClick={() => setIsRecipeMenuOpen(!isRecipeMenuOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#090f18] hover:bg-[#142034] border border-cyan-500/50 text-xs transition-all cursor-pointer shadow-sm"
              title="Click to auto-load industrial dye recipe & target shades"
            >
              <Bookmark className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span className="text-slate-400 text-[10px] hidden sm:inline">Recipe:</span>
              <span className="font-mono font-bold text-cyan-300 text-xs">{selectedRecipeId}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
            </button>

            {isRecipeMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-[#0d1624] border-2 border-cyan-500/60 rounded-xl shadow-2xl py-1 z-50 animate-fade-in text-white">
                <div className="px-3 py-1.5 text-[10px] font-mono text-cyan-400 uppercase border-b border-slate-800 font-bold">
                  Auto-Load Industrial Recipe
                </div>
                {RECIPE_DATABASE.map((rcp) => (
                  <button
                    key={rcp.recipeId}
                    onClick={() => {
                      onSelectRecipe && onSelectRecipe(rcp);
                      setIsRecipeMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-[#18263e] transition-colors cursor-pointer ${
                      selectedRecipeId === rcp.recipeId ? 'bg-cyan-950/80 text-cyan-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <span 
                        className="w-3 h-3 rounded-full border border-white/30 flex-shrink-0"
                        style={{ backgroundColor: rcp.targetHex }}
                      />
                      <div className="truncate">
                        <div className="font-bold truncate text-[11px]">{rcp.clientColorName}</div>
                        <div className="text-[9px] text-slate-400 font-mono truncate">{rcp.clientName}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold flex-shrink-0 ml-1.5">{rcp.batchId}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Batch ID Badge */}
          <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#090f18] border border-slate-700/80 shadow-sm flex-shrink-0 text-xs font-mono">
            <span className="text-[10px] text-slate-400">{t.batch}</span>
            <span className="font-bold text-slate-100">{batchId}</span>
          </div>

          {/* Client Code / Original Target Color Badge */}
          <button 
            onClick={onOpenOriginalColorModal}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#090f18] hover:bg-[#152033] border border-rose-600/60 hover:border-rose-400 shadow-sm group transition-all cursor-pointer flex-shrink-0 active:scale-95 text-xs"
            title="Click to enter or change Original Client Color Code"
          >
            <Target className="w-3 h-3 text-rose-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            <div className="flex items-center space-x-1">
              <span 
                className="w-2.5 h-2.5 rounded-sm border border-white/30 shadow-sm flex-shrink-0"
                style={{ backgroundColor: clientCode }}
              />
              <span className="font-mono font-bold text-[#ea384c] group-hover:text-white transition-colors">{clientCode}</span>
            </div>
          </button>

          {/* Fabric Yardage Badge */}
          <div className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-[#0e1724]/90 border border-slate-700/60 text-xs flex-shrink-0">
            <span className="text-slate-400 text-[10px]">{t.yardage}</span>
            <span className="font-mono font-semibold text-cyan-400">{yardage}</span>
          </div>

          {/* Pre-treatment Bleached Base Status Badge */}
          <button 
            onClick={onOpenPretreatment}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 transition-all cursor-pointer group shadow-sm flex-shrink-0 active:scale-95 text-xs"
            title="Pre-treatment: Sosa Cáustica + Agua Oxigenada"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">{t.bleachedBase}</span>
          </button>

          {/* Industrial Dosing Sheet / Receipt Ticket Button */}
          <button
            onClick={onOpenDosingReceipt}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-950/70 hover:bg-amber-900/90 border border-amber-500/60 text-amber-300 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Open Printable Dye Dosing Ticket / PDF Sheet"
          >
            <FileText className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span className="whitespace-nowrap font-bold">Ticket</span>
          </button>

          {/* Quality & Efficiency Report Button */}
          <button
            onClick={onOpenEfficiencyReport}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Open Efficiency & Waste Reduction Report"
          >
            <FileText className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="whitespace-nowrap">Reports</span>
          </button>

          {/* Dye Inventory & QR Scanner */}
          <button
            onClick={onOpenDyeInventory}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/50 text-purple-300 text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Open Dye Box Inventory & QR Database"
          >
            <QrCode className="w-3 h-3 text-purple-400 flex-shrink-0" />
            <span className="whitespace-nowrap">Dye Boxes</span>
          </button>

          {/* Sensor Calibration Button */}
          <button 
            onClick={onToggleCalibration}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer flex-shrink-0 ${
              isCalibrated 
                ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-400 shadow-glow-green/20' 
                : 'bg-amber-950/70 border-amber-500/60 text-amber-400'
            }`}
            title={isCalibrated ? t.calibrated : t.recalibrate}
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
