import React, { useState } from 'react';
import { 
  X, 
  FlaskConical, 
  Sparkles, 
  Droplets, 
  Thermometer, 
  Clock, 
  ShieldCheck, 
  Check, 
  RefreshCw 
} from 'lucide-react';

export default function PretreatmentModal({
  isOpen,
  onClose,
  yardage = 2000,
  waterVolume = 4200,
  onConfirmPretreatment
}) {
  const [currentYardage, setCurrentYardage] = useState(yardage);
  const [waterLiters, setWaterLiters] = useState(waterVolume);
  const [fabricGsm, setFabricGsm] = useState(220); // grams / m^2
  const [fabricWidth, setFabricWidth] = useState(1.6); // meters

  if (!isOpen) return null;

  // Pre-treatment Chemistry Calculations
  const totalFabricWeightKg = ((currentYardage * fabricWidth * fabricGsm) / 1000);
  const liquorRatio = (waterLiters / totalFabricWeightKg).toFixed(1);

  // Sosa Cáustica (NaOH) 30 g/L
  const causticSodaKg = ((waterLiters * 30.0) / 1000).toFixed(1);
  // Agua Oxigenada (H2O2 50%) 25 mL/L
  const peroxideLiters = ((waterLiters * 25.0) / 1000).toFixed(1);
  // Peroxide Stabilizer 2.0 g/L
  const stabilizerKg = ((waterLiters * 2.0) / 1000).toFixed(1);
  // Wetting Agent 1.5 g/L
  const wettingAgentKg = ((waterLiters * 1.5) / 1000).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e1624] border border-slate-700 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-in">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#142338] via-[#0f1d30] to-[#0c1422] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
              <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Pre-Treatment: Bleaching Base
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Primary Preparation: <strong className="text-emerald-300">Sosa Cáustica</strong> + <strong className="text-cyan-300">Agua Oxigenada</strong>
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

        {/* Body Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
          
          {/* Explanation Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-600/30 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center space-x-2 font-bold text-emerald-300 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Step 1 of Textile Production: Preparing the Pure White Base</span>
            </div>
            <p>
              Before transferring fabric to the 14-tray autoclave for dyeing, raw greige cotton/material is thoroughly bleached to a uniform white base using <em>Sosa Cáustica</em> ($NaOH$) and <em>Agua Oxigenada</em> ($H_2O_2$). This eliminates natural yellow impurities and ensures accurate color absorption.
            </p>
          </div>

          {/* Interactive Parameters Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                Fabric Yardage
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={currentYardage}
                  onChange={(e) => setCurrentYardage(Number(e.target.value))}
                  className="w-full bg-[#0a1019] border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs text-slate-400">meters</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                Autoclave Water
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  step="100"
                  min="3000"
                  max="5000"
                  value={waterLiters}
                  onChange={(e) => setWaterLiters(Number(e.target.value))}
                  className="w-full bg-[#0a1019] border border-slate-700 rounded-lg px-2.5 py-1.5 text-cyan-300 font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs text-slate-400">Liters</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                Fabric Weight (GSM)
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={fabricGsm}
                  onChange={(e) => setFabricGsm(Number(e.target.value))}
                  className="w-full bg-[#0a1019] border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs text-slate-400">g/m&sup2;</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <label className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                Total Mass / Ratio
              </label>
              <div className="text-sm font-mono font-bold text-white pt-1">
                {totalFabricWeightKg.toFixed(1)} kg <span className="text-xs text-cyan-400 font-normal">(1:{liquorRatio})</span>
              </div>
            </div>
          </div>

          {/* Chemical Formulation Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Automated Chemical Bleaching Recipe:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sosa Caustica Card */}
              <div className="p-4 rounded-xl bg-[#111d2e] border border-emerald-600/40 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-glow-green"></div>
                    <h5 className="text-sm font-bold text-white">Sosa Cáustica (NaOH 50%)</h5>
                  </div>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    30 g / L
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1 border-t border-slate-700/60">
                  <span className="text-xs text-slate-400">Total Required Mass:</span>
                  <span className="text-xl font-mono font-extrabold text-emerald-300">{causticSodaKg} kg</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Breaks down natural pectin, cotton waxes, and sizing impurities.
                </p>
              </div>

              {/* Agua Oxigenada Card */}
              <div className="p-4 rounded-xl bg-[#111d2e] border border-cyan-600/40 shadow-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-glow-blue"></div>
                    <h5 className="text-sm font-bold text-white">Agua Oxigenada (H₂O₂ 50%)</h5>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                    25 mL / L
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-1 border-t border-slate-700/60">
                  <span className="text-xs text-slate-400">Total Required Volume:</span>
                  <span className="text-xl font-mono font-extrabold text-cyan-300">{peroxideLiters} Liters</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Oxidizes color chromophores to generate a high whiteness index (&gt; 78 Berger).
                </p>
              </div>

              {/* Stabilizer */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-200">Peroxide Stabilizer (Organic)</div>
                  <div className="text-[11px] text-slate-400">2.0 g/L &bull; Prevents catalytic fiber damage</div>
                </div>
                <div className="text-base font-mono font-bold text-slate-100">{stabilizerKg} kg</div>
              </div>

              {/* Wetting Agent */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-200">Non-Ionic Wetting &amp; Scouring Agent</div>
                  <div className="text-[11px] text-slate-400">1.5 g/L &bull; Ensures rapid chemical penetration</div>
                </div>
                <div className="text-base font-mono font-bold text-slate-100">{wettingAgentKg} kg</div>
              </div>
            </div>
          </div>

          {/* Thermal Cycle Specs */}
          <div className="p-4 rounded-xl bg-[#0a1019] border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-red-400" />
              <span>Bleach Cycle Temp: <strong className="text-white">98&deg;C</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Duration: <strong className="text-white">45 minutes</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>Hot &amp; Cold Rinse Water: <strong className="text-cyan-300">3,000 - 5,000 L</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Whiteness Berger: 78.5 (Pass)</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#0a1019] border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 pb-safe">
          <span className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
            Phase 1 Complete &rarr; Ready for 14-Tray Autoclave Dyeing
          </span>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer active:scale-95 text-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                onConfirmPretreatment && onConfirmPretreatment();
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Validate &amp; Transfer</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
