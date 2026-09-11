import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Droplet, 
  ShieldCheck, 
  Gauge, 
  ArrowUpRight, 
  Scale, 
  Layers, 
  Sparkles, 
  Compass, 
  ArrowRight,
  FileText,
  Printer
} from 'lucide-react';
import { translations } from '../utils/translations';

export default function LeftContainer({
  analysis,
  currentLang = 'EN',
  onStatusClick,
  onApplyAdjustment,
  onMatchPerfect,
  onOpenDosingReceipt
}) {
  const t = translations[currentLang] || translations.EN;
  const [unitMode, setUnitMode] = useState('KG'); // 'KG' | 'GRAMS' | 'GPL' | 'PERCENT'

  const { 
    deltaE = 4.8, 
    deltaL = 1.2, 
    deltaA = -3.7, 
    deltaB = 5.1, 
    toneBreakdown,
    isMatch = false, 
    status = 'ADJUST_NEEDED', 
    advices = [],
    fabricKg = 704.0,
    waterVolumeLiters = 4200
  } = analysis || {};

  const isPass = deltaE <= 1.0;
  const isWarning = deltaE > 1.0 && deltaE <= 2.2;

  // Calculate total dye kg across all recommended adjustments
  const totalDyeGrams = advices.reduce((acc, curr) => acc + (curr.grams || 0), 0);
  const totalDyeKg = (totalDyeGrams / 1000).toFixed(1);

  const formatQuantity = (adv) => {
    if (!adv) return '';
    if (unitMode === 'GRAMS') {
      const g = adv.grams ?? Math.round((adv.kg || 0) * 1000);
      return `${g.toLocaleString()} g`;
    }
    if (unitMode === 'GPL') {
      const gpl = adv.gramsPerLiter ?? (adv.grams ? (adv.grams / waterVolumeLiters).toFixed(2) : '0.00');
      return `${gpl} g/L`;
    }
    if (unitMode === 'PERCENT') {
      return `${adv.percentage || 0}% o.w.f.`;
    }
    const k = adv.kg ?? (adv.grams ? (adv.grams / 1000).toFixed(1) : 0);
    return `${k} kg`;
  };

  return (
    <div className="w-full lg:w-[320px] xl:w-[360px] flex flex-col panel-metallic rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl">
      
      {/* Panel Header */}
      <div className="px-4 sm:px-5 py-3 bg-gradient-to-r from-[#172338] to-[#111a2a] border-b border-slate-700/70 flex items-center justify-between">
        <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
          <Gauge className="w-4 h-4 text-cyan-400" />
          {t.colorAnalysis}
        </h2>
        <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700">
          CIEDE2000
        </span>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Section 1: Color Difference (ΔE) Card */}
        <div className="space-y-2.5">
          <div className="rounded-xl p-3.5 bg-gradient-to-b from-[#fcedc7] via-[#fae3ad] to-[#f4d793] text-slate-900 border-2 border-[#e5c06d] shadow-md">
            
            <div className="flex items-baseline justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                {t.difference}
              </span>
              <span className="font-mono text-2xl font-black text-slate-950">
                &Delta;E = {deltaE.toFixed(1)}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-[#e2be68]/60 flex items-center justify-between text-xs font-bold">
              {isPass ? (
                <div className="flex items-center space-x-1.5 text-emerald-800">
                  <CheckCircle className="w-4 h-4 fill-emerald-600 text-white" />
                  <span>{t.targetMatchPassed}</span>
                </div>
              ) : isWarning ? (
                <div className="flex items-center space-x-1.5 text-amber-900">
                  <AlertTriangle className="w-4 h-4 fill-amber-500 text-white" />
                  <span>{t.slightVariance}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 text-red-900">
                  <AlertTriangle className="w-4 h-4 fill-amber-500 text-amber-900" />
                  <span>{t.notAMatch}</span>
                </div>
              )}

              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-extrabold ${
                isPass ? 'bg-emerald-700 text-white' : isWarning ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
              }`}>
                {isPass ? t.pass : isWarning ? t.warning : t.fail}
              </span>
            </div>
          </div>

          {/* Tolerance Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>{t.tolerance} (&Delta;E &le; 1.0)</span>
              <span className={isPass ? 'text-emerald-400 font-bold' : isWarning ? 'text-amber-400' : 'text-red-400 font-bold'}>
                {isPass ? 'PERFECT MATCH' : 'CORRECTION REQUIRED'}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex border border-slate-700/80">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  isPass ? 'bg-emerald-500 shadow-glow-green' : isWarning ? 'bg-amber-400 shadow-glow-yellow' : 'bg-red-500 shadow-glow-red'
                }`}
                style={{ width: `${Math.min(100, (deltaE / 6.0) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Directional Deviation Matrix */}
        <div className="bg-[#0c1422] border border-slate-700/80 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
            <span className="flex items-center gap-1 text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
              <span>Optical Shift Diagnosis</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">Vector ΔLab</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
            
            {/* Lightness Shift */}
            <div className={`p-1.5 rounded-lg border ${
              Math.abs(deltaL) > 0.8 
                ? 'bg-slate-800/90 border-amber-500/40 text-amber-300' 
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400'
            }`}>
              <span className="block text-[9px] text-slate-400 uppercase font-sans">Lightness</span>
              <span className="font-bold block mt-0.5">
                {deltaL > 0.8 ? `Too Light (+${deltaL})` : deltaL < -0.8 ? `Too Dark (${deltaL})` : 'Optimal (ΔL 0.0)'}
              </span>
            </div>

            {/* Red / Green Shift */}
            <div className={`p-1.5 rounded-lg border ${
              Math.abs(deltaA) > 0.8 
                ? 'bg-slate-800/90 border-rose-500/40 text-rose-300' 
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400'
            }`}>
              <span className="block text-[9px] text-slate-400 uppercase font-sans">Red/Green</span>
              <span className="font-bold block mt-0.5">
                {deltaA > 0.8 ? `Too Red (+${deltaA})` : deltaA < -0.8 ? `Low Red (${deltaA})` : 'Optimal (Δa 0.0)'}
              </span>
            </div>

            {/* Yellow / Blue Shift */}
            <div className={`p-1.5 rounded-lg border ${
              Math.abs(deltaB) > 0.8 
                ? 'bg-slate-800/90 border-yellow-500/40 text-yellow-300' 
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400'
            }`}>
              <span className="block text-[9px] text-slate-400 uppercase font-sans">Yellow/Blue</span>
              <span className="font-bold block mt-0.5">
                {deltaB > 0.8 ? `Too Yellow (+${deltaB})` : deltaB < -0.8 ? `Too Blue (${deltaB})` : 'Optimal (Δb 0.0)'}
              </span>
            </div>

          </div>
        </div>

        {/* Section 3: Exact Color Quantities with Unit Switcher */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Suggested Additions:</span>
            </h3>

            {/* Unit Selector */}
            <div className="flex items-center bg-[#0a1019] rounded p-0.5 border border-slate-700 text-[9px] font-mono">
              {['KG', 'GRAMS', 'GPL', 'PERCENT'].map((u) => (
                <button
                  key={u}
                  onClick={() => setUnitMode(u)}
                  className={`px-1 py-0.2 rounded transition-colors cursor-pointer ${
                    unitMode === u ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {u === 'PERCENT' ? '%' : u === 'GRAMS' ? 'g' : u.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
            {isPass ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2.5 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Zero chemical additions needed. Color matches client standard perfectly. Ready for fixation.</span>
              </div>
            ) : (
              advices.map((advice, idx) => {
                const dyeHex = advice.hexColor || advice.color || '#ef4444';
                const trayNum = advice.tray || 1;

                return (
                  <div 
                    key={idx}
                    onClick={() => onApplyAdjustment && onApplyAdjustment(advice)}
                    className="p-2 sm:p-2.5 rounded-xl bg-[#0e1624] hover:bg-[#152033] border border-slate-700/80 shadow-md group cursor-pointer transition-all active:scale-[0.99] space-y-1"
                    title={`Click to apply ${advice.text}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0">
                        <div 
                          className="w-3.5 h-6 rounded border border-white/30 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: dyeHex }}
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate block">
                            {advice.dyeName || advice.text}
                          </span>
                          <span className="text-[9px] font-mono text-rose-400 font-bold">
                            {dyeHex}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 flex-shrink-0">
                        {advice.boxCode && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50 font-bold">
                            {advice.boxCode}
                          </span>
                        )}
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          Tray #{trayNum}
                        </span>
                      </div>
                    </div>

                    {/* Exact Measurement Readout */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80 font-mono">
                      <span className="text-slate-400 text-[10px] truncate">
                        {advice.strength ? `${advice.strength} strength` : 'Standard'}
                      </span>
                      <span className="text-cyan-300 font-extrabold text-xs flex items-center gap-1">
                        <span>{formatQuantity(advice)}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-300 transition-colors" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Section 4: Industrial Batch Summary */}
        <div className="p-2.5 rounded-lg bg-[#0a1019]/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Water Liquor Protected:</span>
            <span className="font-mono text-cyan-300 font-semibold">{waterVolumeLiters.toLocaleString()} Liters</span>
          </div>
          <div className="flex justify-between">
            <span>Rework Hours Saved:</span>
            <span className="font-mono text-emerald-400 font-semibold">~16.5 Hours</span>
          </div>
          <div className="flex justify-between">
            <span>Batch Fabric Mass:</span>
            <span className="font-mono text-slate-200">{fabricKg} kg</span>
          </div>
        </div>

        {/* Print Dosing Ticket Button */}
        <div className="space-y-2 pt-1">
          <button
            onClick={onOpenDosingReceipt}
            className="w-full py-2 px-3 rounded-lg bg-[#1a1728] hover:bg-[#261f3d] border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Open printable industrial recipe sheet for human weighing and manual dye dispensary"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Dosing Ticket (PDF)</span>
          </button>

          {/* Bottom Status Button */}
          <button
            onClick={onStatusClick}
            className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer ${
              isPass 
                ? 'btn-tactile-green shadow-glow-green/30'
                : 'btn-tactile-green hover:brightness-110 shadow-lg active:scale-[0.98]'
            }`}
          >
            {isPass ? t.statusMatchPassed : t.statusAdjustNeeded}
          </button>
        </div>

      </div>
    </div>
  );
}
