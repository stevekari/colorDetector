import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Droplets, 
  Thermometer, 
  Clock, 
  Check, 
  Plus, 
  Printer, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function AutoclaveModal({
  isOpen,
  onClose,
  batchId = '#1245',
  clientCode = '#C82030',
  yardage = 2000,
  waterVolume = 4200,
  trays = [],
  onApplyTrayDosing
}) {
  const [activeTab, setActiveTab] = useState('trays'); // 'trays' | 'cycle' | 'ticket'
  const [liquorVolume, setLiquorVolume] = useState(waterVolume);
  const [tempCelsius, setTempCelsius] = useState(98);
  const [cycleTimeMinutes, setCycleTimeMinutes] = useState(60);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0e1624] border border-slate-700 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-in">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#172338] to-[#101928] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Autoclave Unit #3 — 14 Trays
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                Batch: {batchId} &bull; Target: {clientCode} &bull; {yardage.toLocaleString()} m &bull; {liquorVolume.toLocaleString()} L
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-700/80 bg-[#0a1019] px-3 sm:px-6 overflow-x-auto no-scrollbar touch-pan-x">
          <button
            onClick={() => setActiveTab('trays')}
            className={`py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex-shrink-0 ${
              activeTab === 'trays' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            14-Tray Dosing Table
          </button>
          <button
            onClick={() => setActiveTab('cycle')}
            className={`py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex-shrink-0 ${
              activeTab === 'cycle' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Thermal &amp; Liquor Profile
          </button>
          <button
            onClick={() => setActiveTab('ticket')}
            className={`py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex-shrink-0 ${
              activeTab === 'ticket' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Batch Production Ticket
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {activeTab === 'trays' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div className="flex items-center space-x-2 text-slate-300">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>Total Water Volume: <strong>{liquorVolume} Liters</strong></span>
                </div>
                <div className="flex items-center space-x-2 text-slate-300">
                  <span>Liquor Ratio: <strong>1 : {(liquorVolume / (yardage * 0.352)).toFixed(1)}</strong></span>
                </div>
                <div className="text-emerald-400 font-medium">
                  &check; Bleached Base Ready
                </div>
              </div>

              {/* 14 Trays Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {trays.map((t) => (
                  <div 
                    key={t.trayNumber}
                    className="p-3 rounded-xl bg-[#111c2c] border shadow-md flex items-center justify-between transition-all hover:border-cyan-400"
                    style={{
                      borderColor: t.hexColor ? `${t.hexColor}66` : '#334155',
                      boxShadow: t.hexColor ? `0 2px 12px ${t.hexColor}15` : undefined
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Clickable color swatch & direct picker */}
                      <label 
                        className="relative w-9 h-9 rounded-lg border-2 border-white/20 shadow flex items-center justify-center font-mono text-xs font-bold text-white cursor-pointer group hover:scale-105 transition-transform overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: t.hexColor }}
                        title="Click to pick/change color for this tray card"
                      >
                        <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{t.trayNumber}</span>
                        <input 
                          type="color" 
                          value={t.hexColor || '#334155'}
                          onChange={(e) => {
                            t.hexColor = e.target.value;
                          }}
                          className="absolute opacity-0 pointer-events-none"
                        />
                      </label>

                      <div>
                        <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          {t.dyeName}
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            t.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          Current: {(t.currentDyeGrams || 0).toLocaleString()}g &bull; Add: <span className="text-cyan-300 font-bold">+{(t.addedDyeGrams || 0).toLocaleString()}g</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white">
                        {(t.totalDyeGrams || 0).toLocaleString()} g
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {t.currentConcentrationPercent}% depth
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cycle' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-red-400" />
                    Target Temperature
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">{tempCelsius} &deg;C</div>
                  <p className="text-[11px] text-slate-400 mt-1">Reactive dye fixation window: 95&deg;C - 98&deg;C</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Autoclave Hold Time
                  </div>
                  <div className="text-2xl font-mono font-bold text-white">{cycleTimeMinutes} min</div>
                  <p className="text-[11px] text-slate-400 mt-1">Uniform exhaustion across 2,000m roll</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    Liquor Circulation
                  </div>
                  <div className="text-2xl font-mono font-bold text-cyan-300">Bi-directional</div>
                  <p className="text-[11px] text-slate-400 mt-1">Pump flow: In-to-Out / Out-to-In cycle (4 min)</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090e17] border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase">Process Sequence:</h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                    <span>1. Pre-treatment Bleaching (Sosa Cáustica + Agua Oxigenada at 98°C)</span>
                    <span className="text-emerald-400 font-mono font-bold">DONE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800">
                    <span>2. Hot Rinse &amp; Acetic Acid Neutralization (pH 6.5 - 7.0)</span>
                    <span className="text-emerald-400 font-mono font-bold">DONE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-cyan-950/40 border border-cyan-700/50 text-cyan-200">
                    <span>3. 14-Tray Color Metering &amp; Glauber's Salt Salt-out</span>
                    <span className="text-cyan-400 font-mono font-bold">READY</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900/50 border border-slate-800 text-slate-400">
                    <span>4. Soda Ash Alkali Fixation &amp; High-Temp Hold</span>
                    <span className="font-mono">QUEUED</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ticket' && (
            <div className="p-6 rounded-xl bg-white text-slate-950 font-mono space-y-4 shadow-xl border border-slate-300">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
                <div>
                  <h2 className="text-lg font-black tracking-wider">TEXTILE AUTOCLAVE DYEING RECIPE TICKET</h2>
                  <p className="text-xs text-slate-600">Generated by Smart Industrial Color Detector QC System</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">BATCH {batchId}</div>
                  <div className="text-xs text-slate-600">Date: {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs py-2 border-b border-slate-300">
                <div>
                  <p><strong>Client:</strong> Alpine Industrial Textiles</p>
                  <p><strong>Target Shade:</strong> Crimson Scarlet ({clientCode})</p>
                  <p><strong>Fabric Yardage:</strong> {yardage.toLocaleString()} m (100% Bleached Cotton)</p>
                </div>
                <div>
                  <p><strong>Vessel:</strong> Autoclave #3 (14-Tray System)</p>
                  <p><strong>Liquor Volume:</strong> {liquorVolume.toLocaleString()} Liters</p>
                  <p><strong>Pre-treatment:</strong> Sosa Cáustica / Agua Oxigenada Verified</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase">14-Tray Dosing Dispense Schedule:</p>
                <div className="text-[11px] grid grid-cols-2 gap-x-6 gap-y-1">
                  {trays.filter(t => t.totalDyeGrams > 0).map(t => (
                    <div key={t.trayNumber} className="flex justify-between border-b border-slate-200 py-0.5">
                      <span>Tray {t.trayNumber}: {t.dyeName}</span>
                      <strong>{t.totalDyeGrams} g</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center text-xs">
                <div>
                  <p>Operator Signature: _______________________</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-900 text-white font-sans text-xs cursor-pointer hover:bg-slate-800"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Ticket</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#0a1019] border-t border-slate-700/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Vessel Liquor Integrity: &Delta;E &le; 1.0 Target Tolerance
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onApplyTrayDosing && onApplyTrayDosing();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-lg shadow-cyan-600/30"
            >
              <Check className="w-4 h-4" />
              <span>Confirm &amp; Dispense to Autoclave</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
