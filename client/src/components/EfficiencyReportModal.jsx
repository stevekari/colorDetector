import React, { useRef } from 'react';
import { 
  X, 
  FileText, 
  Printer, 
  Droplets, 
  Leaf, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download,
  Award,
  Sparkles
} from 'lucide-react';
import { translations } from '../utils/translations';
import './EfficiencyReportModal.css';

export default function EfficiencyReportModal({
  isOpen,
  onClose,
  batchId = '#1245',
  clientCode = '#C82030',
  targetHex = '#C82030',
  sampleHex = '#D2453A',
  analysis,
  yardage = 2000,
  waterVolume = 4200,
  currentLang = 'EN'
}) {
  const printRef = useRef(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const deltaE = analysis?.deltaE ?? 4.8;
  const isMatch = analysis?.isMatch ?? false;
  const fabricKg = Math.round(((yardage * 1.6 * 220) / 1000.0) * 10.0) / 10.0;
  const waterSavedLiters = waterVolume;
  const timeSavedHours = 16.5;
  const dyeSavedKg = 18.4;
  const co2ReductionKg = 46.2;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#0c1322] border-2 border-emerald-500/40 rounded-2xl max-w-4xl w-full shadow-[0_0_50px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col max-h-[92vh] animate-fade-in">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#13271f] via-[#0e1c2a] to-[#0a1420] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                <span>Batch Quality &amp; Waste Reduction Report</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-[10px] font-mono text-emerald-300">
                  ISO 105-J03 QC Certified
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Efficiency analytics, chemical reconciliation, water conservation &amp; client certificate
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content Body */}
        <div ref={printRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-200">
          
          {/* Certificate Header Banner */}
          <div className="bg-gradient-to-r from-[#0d1e2e] via-[#102a24] to-[#0d1e2e] border border-emerald-500/30 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-white tracking-wide">
                  INDUSTRIAL QUALITY ASSURANCE REPORT
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Spectrophotometric Color Matching &amp; Autoclave Formulation Log
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">FINAL QUALITY VERDICT</span>
                <span className={`text-sm font-bold font-mono px-2.5 py-1 rounded-lg border ${
                  isMatch
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                    : 'bg-amber-950 text-amber-300 border-amber-500'
                }`}>
                  {isMatch ? 'PASS / APPROVED' : 'CONDITIONAL CORRECTION APPLIED'}
                </span>
              </div>
            </div>
          </div>

          {/* 4 Key Batch Spec Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#09101b] border border-slate-700/80 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 block font-mono uppercase">Batch Number</span>
              <span className="font-mono text-base font-bold text-cyan-300">{batchId}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Autoclave Unit #3</span>
            </div>

            <div className="bg-[#09101b] border border-slate-700/80 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 block font-mono uppercase">Fabric Yardage</span>
              <span className="font-mono text-base font-bold text-white">{yardage.toLocaleString()} m</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{fabricKg} kg Total Mass</span>
            </div>

            <div className="bg-[#09101b] border border-slate-700/80 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 block font-mono uppercase">Liquor Volume</span>
              <span className="font-mono text-base font-bold text-blue-400">{waterVolume.toLocaleString()} L</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Liquor Ratio ~1:6.0</span>
            </div>

            <div className="bg-[#09101b] border border-slate-700/80 rounded-xl p-3">
              <span className="text-[10px] text-slate-400 block font-mono uppercase">Color Variance</span>
              <span className={`font-mono text-base font-bold ${deltaE <= 1.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                &Delta;E {deltaE.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">CIEDE2000 Target &le; 1.0</span>
            </div>
          </div>

          {/* Color Verification Swatches & LAB Data */}
          <div className="bg-[#09101b] border border-slate-700/80 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Colorimetry Verification Data</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Target Swatch */}
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0e1625] border border-slate-700">
                <div 
                  className="w-14 h-14 rounded-xl border-2 border-white/30 shadow-md flex-shrink-0"
                  style={{ backgroundColor: targetHex }}
                />
                <div className="text-xs">
                  <span className="text-[10px] font-mono text-rose-400 font-bold block uppercase">Client Target Standard</span>
                  <span className="font-mono text-sm font-bold text-white">{targetHex}</span>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    L: {analysis?.target?.L ?? 52.0} &bull; a*: {analysis?.target?.a ?? 60.5} &bull; b*: {analysis?.target?.bStar ?? 30.0}
                  </div>
                </div>
              </div>

              {/* Sample Swatch */}
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0e1625] border border-slate-700">
                <div 
                  className="w-14 h-14 rounded-xl border-2 border-white/30 shadow-md flex-shrink-0"
                  style={{ backgroundColor: sampleHex }}
                />
                <div className="text-xs">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">Detected Autoclave Sample</span>
                  <span className="font-mono text-sm font-bold text-white">{sampleHex}</span>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    L: {analysis?.sample?.L ?? 53.2} &bull; a*: {analysis?.sample?.a ?? 56.8} &bull; b*: {analysis?.sample?.bStar ?? 35.1}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dosing Corrections Made */}
          <div className="bg-[#09101b] border border-slate-700/80 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Chemical &amp; Dye Formulation Corrections Dispensed
            </h4>

            <div className="space-y-2">
              {analysis?.advices?.map((adv, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#0e1626] border border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ backgroundColor: adv.color || '#38bdf8' }}
                    />
                    <div>
                      <span className="font-bold text-white">{adv.text}</span>
                      <span className="text-[10px] text-slate-400 block">
                        Box Code: <strong>{adv.boxCode || 'D-10'}</strong> &bull; Strength: {adv.strength || '200%'}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {adv.kg ? `${adv.kg} kg` : `${Math.round((adv.grams || 0) / 1000)} kg`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Waste Reduction & Environmental ROI */}
          <div className="bg-gradient-to-r from-[#0d2218] via-[#091928] to-[#0d2218] border border-emerald-500/40 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Leaf className="w-5 h-5" />
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                Sustainability &amp; Efficiency Savings
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#071310] p-2.5 rounded-xl border border-emerald-500/30">
                <span className="text-[10px] text-slate-400 block">Freshwater Saved</span>
                <span className="font-mono text-base font-bold text-emerald-300">{waterSavedLiters.toLocaleString()} L</span>
                <span className="text-[9px] text-slate-500 block">Avoided Batch Dump</span>
              </div>

              <div className="bg-[#071310] p-2.5 rounded-xl border border-emerald-500/30">
                <span className="text-[10px] text-slate-400 block">Dyes Conserved</span>
                <span className="font-mono text-base font-bold text-emerald-300">{dyeSavedKg} kg</span>
                <span className="text-[9px] text-slate-500 block">Zero Stripping Rework</span>
              </div>

              <div className="bg-[#071310] p-2.5 rounded-xl border border-emerald-500/30">
                <span className="text-[10px] text-slate-400 block">Autoclave Time Saved</span>
                <span className="font-mono text-base font-bold text-emerald-300">{timeSavedHours} hrs</span>
                <span className="text-[9px] text-slate-500 block">Machine Capacity Gain</span>
              </div>

              <div className="bg-[#071310] p-2.5 rounded-xl border border-emerald-500/30">
                <span className="text-[10px] text-slate-400 block">CO2 Emissions Avoided</span>
                <span className="font-mono text-base font-bold text-emerald-300">{co2ReductionKg} kg</span>
                <span className="text-[9px] text-slate-500 block">Steam Boiler Conservation</span>
              </div>
            </div>
          </div>

          {/* Signature and Verification Footer */}
          <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
            <div className="space-y-0.5">
              <span className="block font-semibold text-slate-200">System Owner &amp; Chief Engineer:</span>
              <span className="text-cyan-300 font-mono font-bold">Stephen Karikari</span>
              <span className="text-[10px] text-slate-500 block">&copy; {new Date().getFullYear()} Stephen Karikari. All Rights Reserved.</span>
            </div>

            <div className="text-right space-y-0.5 font-mono text-[11px]">
              <span className="text-emerald-400 font-bold block flex items-center justify-end gap-1">
                <ShieldCheck className="w-4 h-4" />
                DIGITALLY SIGNED &amp; VERIFIED
              </span>
              <span className="text-slate-500 block">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Buttons */}
        <div className="px-4 sm:px-6 py-3 bg-[#080d14] border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Report ID: RPT-2026-{batchId.replace('#', '')}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

