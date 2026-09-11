import React, { useState } from 'react';
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
  Bot
} from 'lucide-react';
import { RECIPE_DATABASE } from '../utils/recipeDatabase';
import { translations } from '../utils/translations';

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
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isRecipeMenuOpen, setIsRecipeMenuOpen] = useState(false);
  const t = translations[currentLang] || translations.EN;

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'NL', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'PR', name: 'Português', flag: '🇵🇹' },
    { code: 'Twi', name: 'Twi (Akan)', flag: '🇬🇭' },
  ];

  return (
    <header className="w-full bg-gradient-to-b from-[#182333] via-[#111927] to-[#090f19] border-b border-slate-700/70 shadow-xl px-2.5 sm:px-4 py-1.5 sm:py-2 select-none sticky top-0 z-40">
      <div className="max-w-[1680px] mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-2 sm:gap-2.5">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 flex-shrink-0">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-amber-400 to-cyan-400 shadow-md flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-red-500 via-yellow-400 via-emerald-400 via-blue-500 to-purple-600 animate-spin-slow opacity-90"></div>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5 drop-shadow-sm font-sans leading-none">
              <span>{t.appTitle}</span>
            </h1>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-mono mt-0.5 hidden xs:inline-block">
              {t.subtitle}
            </span>
          </div>
        </div>

        {/* Center: Industrial Metadata Badges & Recipe Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1 justify-start lg:justify-center min-w-0">
          
          {/* Automatic Recipe Loader Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsRecipeMenuOpen(!isRecipeMenuOpen)}
              className="flex items-center space-x-1 px-2 py-1 rounded-md bg-[#090f18] hover:bg-[#142034] border border-cyan-500/40 text-xs transition-all cursor-pointer shadow-sm"
              title="Click to auto-load industrial dye recipe & target shades"
            >
              <Bookmark className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span className="text-slate-400 text-[10px] hidden md:inline">Recipe:</span>
              <span className="font-mono font-bold text-cyan-300 text-[11px]">{selectedRecipeId}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
            </button>

            {isRecipeMenuOpen && (
              <div className="absolute left-0 mt-1.5 w-64 bg-[#0d1624] border border-cyan-500/40 rounded-xl shadow-2xl py-1 z-50 animate-fade-in">
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
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#18263e] transition-colors cursor-pointer ${
                      selectedRecipeId === rcp.recipeId ? 'bg-cyan-950/70 text-cyan-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2 min-w-0">
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-white/30 flex-shrink-0"
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
          <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-[#090f18] border border-slate-700/80 shadow-sm flex-shrink-0 text-xs font-mono">
            <span className="text-[10px] text-slate-400">{t.batch}</span>
            <span className="font-bold text-slate-100 text-[11px]">{batchId}</span>
          </div>

          {/* Client Code / Original Target Color Badge */}
          <button 
            onClick={onOpenOriginalColorModal}
            className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-[#090f18] hover:bg-[#152033] border border-rose-600/50 hover:border-rose-400 shadow-sm group transition-all cursor-pointer flex-shrink-0 active:scale-95 text-xs"
            title="Click to enter or change Original Client Color Code"
          >
            <Target className="w-3 h-3 text-rose-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="text-[10px] text-slate-300 hidden sm:inline">{t.originalCode}</span>
            <div className="flex items-center space-x-1">
              <span 
                className="w-2.5 h-2.5 rounded-sm border border-white/30 shadow-sm flex-shrink-0"
                style={{ backgroundColor: clientCode }}
              />
              <span className="font-mono font-bold text-[#ea384c] text-[11px] group-hover:text-white transition-colors">{clientCode}</span>
              <Edit3 className="w-2.5 h-2.5 text-slate-500 group-hover:text-rose-300 transition-colors flex-shrink-0" />
            </div>
          </button>

          {/* Fabric Yardage Badge */}
          <div className="flex items-center space-x-1 px-2 py-1 rounded-md bg-[#0e1724]/90 border border-slate-700/60 text-xs flex-shrink-0">
            <span className="text-slate-400 text-[10px]">{t.yardage}</span>
            <span className="font-mono font-semibold text-cyan-400 text-[11px]">{yardage}</span>
          </div>

          {/* Pre-treatment Bleached Base Status Badge */}
          <button 
            onClick={onOpenPretreatment}
            className="flex items-center space-x-1 px-2 py-1 rounded-md bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 transition-all cursor-pointer group shadow-sm flex-shrink-0 active:scale-95 text-[11px]"
            title="Pre-treatment: Sosa Cáustica + Agua Oxigenada"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="font-medium text-[10px] sm:text-[11px]">{t.bleachedBase}</span>
          </button>
        </div>

        {/* Right: Action Controls & Navigation (All Visible & Compact) */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end flex-shrink-0">
          
          {/* AI Assistant Bot Button */}
          <button
            onClick={onOpenAiBot}
            className="flex items-center space-x-1 px-2 py-1 rounded-md bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 border border-purple-400/60 text-white text-[11px] font-bold shadow-md shadow-purple-600/20 transition-all active:scale-95 cursor-pointer group flex-shrink-0"
            title="Open Textile AI Assistant Bot & Search Engine"
          >
            <Bot className="w-3 h-3 text-purple-200 animate-pulse group-hover:rotate-12 transition-transform flex-shrink-0" />
            <span>AI Bot</span>
          </button>

          {/* Industrial Dosing Sheet / Receipt Ticket Button */}
          <button
            onClick={onOpenDosingReceipt}
            className="flex items-center space-x-1 px-2 py-1 rounded-md bg-amber-950/70 hover:bg-amber-900/90 border border-amber-500/50 text-amber-300 text-[11px] font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Open Printable Dye Dosing Ticket / PDF Sheet"
          >
            <FileText className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span>Ticket</span>
          </button>

          {/* Quality & Efficiency Report Button */}
          <button
            onClick={onOpenEfficiencyReport}
            className="flex items-center space-x-1 px-2 py-1 rounded-md bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/50 text-emerald-300 text-[11px] font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Open Efficiency & Waste Reduction Report"
          >
            <FileText className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span>Reports</span>
          </button>

          {/* Dye Inventory & QR Scanner */}
          <button
            onClick={onOpenDyeInventory}
            className="flex items-center space-x-1 px-2 py-1 rounded-md bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/50 text-purple-300 text-[11px] font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="Open Dye Box Inventory & QR Database"
          >
            <QrCode className="w-3 h-3 text-purple-400 flex-shrink-0" />
            <span>Dye Boxes</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-1 px-2 py-1 rounded-md bg-[#0e1626] hover:bg-[#162238] border border-slate-700 text-[11px] text-slate-200 font-bold shadow-sm transition-all cursor-pointer"
              title="Select Language (EN, ES, FR, DE, NL, PR, Twi)"
            >
              <Globe className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span>{t.flag}</span>
              <span className="font-mono uppercase text-[10px]">{currentLang}</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400 flex-shrink-0" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-[#0d1624] border border-slate-700 rounded-xl shadow-2xl py-1 z-50 animate-fade-in">
                <div className="px-3 py-1 text-[10px] font-mono text-slate-400 uppercase border-b border-slate-800">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onSelectLang(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#1e293b] transition-colors cursor-pointer ${
                      currentLang === lang.code ? 'bg-cyan-950/60 text-cyan-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span className="text-[11px]">{lang.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Autoclave 14-Tray Button */}
          <button
            onClick={onOpenAutoclave}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-900/80 to-cyan-900/80 hover:from-blue-800 hover:to-cyan-800 border border-cyan-500/50 text-cyan-200 text-[11px] font-bold shadow-md transition-all active:scale-95 cursor-pointer flex-shrink-0"
            title="14-Tray Autoclave Controller"
          >
            <Layers className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span>14-Trays</span>
          </button>

          {/* Calibration toggle */}
          <button 
            onClick={onToggleCalibration}
            className={`p-1 rounded-md border transition-all cursor-pointer flex-shrink-0 ${
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
