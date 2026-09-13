import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Layers, 
  RotateCcw, 
  CheckCircle, 
  Sparkles, 
  Edit3, 
  Pipette, 
  Copy, 
  Check, 
  QrCode, 
  ArrowRight,
  Scale,
  Droplet,
  Equal,
  FileText,
  Printer
} from 'lucide-react';
import { parseAnyColor } from '../utils/colorEngine';
import { translations } from '../utils/translations';
import './RightContainer.css';

export default function RightContainer({
  targetColor,
  sampleColor,
  analysis,
  currentLang = 'EN',
  onTargetColorChange,
  onSampleColorChange,
  onApplyAdjustmentAction,
  onMatchPerfect,
  onOpenAutoclave,
  onOpenDyeInventory,
  onOpenDosingReceipt,
  onResetToDefault
}) {
  const t = translations[currentLang] || translations.EN;

  const [realFormat, setRealFormat] = useState('HEX');
  const [targetFormat, setTargetFormat] = useState('HEX');

  // Dosage measurement unit selector: 'KG' | 'GRAMS' | 'GPL' | 'PERCENT'
  const [measureUnit, setMeasureUnit] = useState('KG');

  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [isEditingSample, setIsEditingSample] = useState(false);
  const [targetInputText, setTargetInputText] = useState(targetColor?.hex || '#C82030');
  const [sampleInputText, setSampleInputText] = useState(sampleColor?.hex || '#D2453A');

  const [copiedField, setCopiedField] = useState(null);

  const targetL = targetColor?.L ?? 52.0;
  const targetA = targetColor?.a ?? 60.5;
  const targetB = targetColor?.bStar ?? targetColor?.b ?? 30.0;

  const sampleL = sampleColor?.L ?? 53.2;
  const sampleA = sampleColor?.a ?? 56.8;
  const sampleB = sampleColor?.bStar ?? sampleColor?.b ?? 35.1;

  const deltaL = sampleL - targetL;
  const deltaA = sampleA - targetA;
  const deltaB = sampleB - targetB;

  const advices = analysis?.advices ?? [
    { text: 'Add 5% Reactive Crimson Red (42 kg)', instruction: 'Add 5% Reactive Crimson Red (42 kg)', boxCode: 'D-10', dyeName: 'Reactive Crimson Red', strength: '200%', type: 'RED', percentage: 5.0, grams: 42000, kg: 42.0, gramsPerLiter: 10.0, hexColor: '#E53935', rgbStr: 'rgb(229, 57, 53)', color: '#ef4444', tray: 1 },
    { text: 'Add 1% Reactive Royal Blue (7 kg)', instruction: 'Add 1% Reactive Royal Blue (7 kg)', boxCode: 'D-12', dyeName: 'Reactive Royal Blue', strength: '200%', type: 'BLUE', percentage: 1.0, grams: 7000, kg: 7.0, gramsPerLiter: 1.67, hexColor: '#1565C0', rgbStr: 'rgb(21, 101, 192)', color: '#3b82f6', tray: 3 },
    { text: 'Increase Yellow Tone (11 kg)', instruction: 'Increase Yellow Tone (11 kg)', boxCode: 'D-15', dyeName: 'Reactive Golden Yellow', strength: '450%', type: 'YELLOW', percentage: 1.5, grams: 11000, kg: 11.0, gramsPerLiter: 2.62, hexColor: '#FBC02D', rgbStr: 'rgb(251, 192, 45)', color: '#facc15', tray: 5 }
  ];

  const getFormattedColor = (colorObj, format) => {
    if (!colorObj) return '';
    if (format === 'HEX') return colorObj.hex;
    if (format === 'RGB') return `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`;
    if (format === 'RGBA') return `rgba(${colorObj.r}, ${colorObj.g}, ${colorObj.b}, 1.0)`;
    if (format === 'CMYK' && colorObj.cmyk) return `C:${colorObj.cmyk.c}% M:${colorObj.cmyk.m}% Y:${colorObj.cmyk.y}% K:${colorObj.cmyk.k}%`;
    return colorObj.hex;
  };

  const formatMeasure = (adv) => {
    if (!adv) return '';
    if (measureUnit === 'GRAMS') {
      const g = adv.grams ?? Math.round((adv.kg || 0) * 1000);
      return `${g.toLocaleString()} g`;
    }
    if (measureUnit === 'GPL') {
      const gpl = adv.gramsPerLiter ?? (adv.grams ? (adv.grams / 4200).toFixed(2) : '0.00');
      return `${gpl} g/L`;
    }
    if (measureUnit === 'PERCENT') {
      return `${adv.percentage || 0}% o.w.f.`;
    }
    // Default KG
    const k = adv.kg ?? (adv.grams ? (adv.grams / 1000).toFixed(1) : 0);
    return `${k} kg`;
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const handleTargetSubmit = (e) => {
    e?.preventDefault();
    const parsed = parseAnyColor(targetInputText);
    if (parsed) {
      onTargetColorChange(parsed.hex);
      setIsEditingTarget(false);
    } else {
      alert("Invalid color format. Please enter HEX (#C82030) or RGB (200, 32, 48)");
    }
  };

  const handleSampleSubmit = (e) => {
    e?.preventDefault();
    const parsed = parseAnyColor(sampleInputText);
    if (parsed) {
      onSampleColorChange(parsed.hex);
      setIsEditingSample(false);
    } else {
      alert("Invalid color format. Please enter HEX (#D2453A) or RGB (210, 69, 58)");
    }
  };

  return (
    <div className="w-full max-w-full flex-1 flex flex-col panel-metallic rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl">
      
      {/* Panel Header */}
      <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#172338] to-[#111a2a] border-b border-slate-700/70 flex items-center justify-between">
        <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          {t.metricColorData}
        </h2>
        <span className="text-[11px] font-mono text-cyan-300">
          CIELAB (D65)
        </span>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          
          {/* Section 1: Real Detected Color */}
          <div className="panel-sub-card rounded-xl p-3 border border-slate-700/70 shadow-md">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span>{t.realColor}</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                  {t.detected}
                </span>
              </div>

              {/* Format Switcher */}
              <div className="flex items-center bg-[#0a1019] rounded p-0.5 border border-slate-800 text-[10px] font-mono">
                {['HEX', 'RGB', 'CMYK'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setRealFormat(fmt)}
                    className={`px-1.5 py-0.2 rounded transition-colors cursor-pointer ${
                      realFormat === fmt ? 'bg-cyan-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <label className="relative w-14 h-14 rounded-xl shadow-inner border border-white/20 overflow-hidden flex-shrink-0 cursor-pointer group" title="Click to pick/fine-tune sample color">
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: sampleColor?.hex || '#D2453A' }}
                >
                  <div className="absolute inset-0 fabric-texture opacity-40 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <Pipette className="w-4 h-4 text-white drop-shadow" />
                  </div>
                </div>
                <input 
                  type="color" 
                  value={sampleColor?.hex || '#D2453A'}
                  onChange={(e) => onSampleColorChange(e.target.value)}
                  className="absolute opacity-0 pointer-events-none"
                />
              </label>

              <div className="flex-1 space-y-0.5 min-w-0">
                {isEditingSample ? (
                  <form onSubmit={handleSampleSubmit} className="flex items-center space-x-1">
                    <input 
                      type="text"
                      value={sampleInputText}
                      onChange={(e) => setSampleInputText(e.target.value)}
                      placeholder="#HEX or R,G,B"
                      className="w-full bg-[#0a1019] border border-cyan-500 rounded px-2 py-0.5 text-xs font-mono text-white focus:outline-none"
                      autoFocus
                    />
                    <button type="submit" className="p-1 rounded bg-cyan-600 text-white text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between group">
                    <div 
                      onClick={() => copyToClipboard(getFormattedColor(sampleColor, realFormat), 'sample')}
                      className="text-sm sm:text-base font-mono font-black text-white tracking-wide hover:text-cyan-300 cursor-pointer flex items-center gap-1.5 transition-colors truncate"
                      title="Click to copy color code"
                    >
                      <span className="truncate">{getFormattedColor(sampleColor, realFormat)}</span>
                      {copiedField === 'sample' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setSampleInputText(sampleColor?.hex || '#D2453A');
                        setIsEditingSample(true);
                      }}
                      className="p-1 text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Enter custom sample color code"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                
                <div className="text-[11px] font-mono text-slate-300">
                  R: {sampleColor?.r} G: {sampleColor?.g} B: {sampleColor?.b}
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  L: {sampleL.toFixed(1)} a*: {sampleA.toFixed(1)} b*: {sampleB.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Target Standard Color */}
          <div className="panel-sub-card rounded-xl p-3 border border-slate-700/70 shadow-md">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span>{t.targetColor}</span>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-800/40">
                  {t.clientStandard}
                </span>
              </div>

              <div className="flex items-center bg-[#0a1019] rounded p-0.5 border border-slate-800 text-[10px] font-mono">
                {['HEX', 'RGB', 'CMYK'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setTargetFormat(fmt)}
                    className={`px-1.5 py-0.2 rounded transition-colors cursor-pointer ${
                      targetFormat === fmt ? 'bg-rose-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <label className="relative w-14 h-14 rounded-xl shadow-inner border border-white/20 overflow-hidden flex-shrink-0 cursor-pointer group" title="Click to pick/change client target standard">
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: targetColor?.hex || '#C82030' }}
                >
                  <div className="absolute inset-0 fabric-texture opacity-40 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                    <Pipette className="w-4 h-4 text-white drop-shadow" />
                  </div>
                </div>
                <input 
                  type="color" 
                  value={targetColor?.hex || '#C82030'}
                  onChange={(e) => onTargetColorChange(e.target.value)}
                  className="absolute opacity-0 pointer-events-none"
                />
              </label>

              <div className="flex-1 space-y-0.5 min-w-0">
                {isEditingTarget ? (
                  <form onSubmit={handleTargetSubmit} className="flex items-center space-x-1">
                    <input 
                      type="text"
                      value={targetInputText}
                      onChange={(e) => setTargetInputText(e.target.value)}
                      placeholder="#HEX or R,G,B"
                      className="w-full bg-[#0a1019] border border-rose-500 rounded px-2 py-0.5 text-xs font-mono text-white focus:outline-none"
                      autoFocus
                    />
                    <button type="submit" className="p-1 rounded bg-rose-600 text-white text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between group">
                    <div 
                      onClick={() => copyToClipboard(getFormattedColor(targetColor, targetFormat), 'target')}
                      className="text-sm sm:text-base font-mono font-black text-[#ea384c] tracking-wide hover:text-rose-300 cursor-pointer flex items-center gap-1.5 transition-colors truncate"
                      title="Click to copy target code"
                    >
                      <span className="truncate">{getFormattedColor(targetColor, targetFormat)}</span>
                      {copiedField === 'target' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      )}
                    </div>
                    <button 
                      onClick={() => {
                        setTargetInputText(targetColor?.hex || '#C82030');
                        setIsEditingTarget(true);
                      }}
                      className="p-1 text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Enter custom client color code"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                
                <div className="text-[11px] font-mono text-slate-300">
                  R: {targetColor?.r} G: {targetColor?.g} B: {targetColor?.b}
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  L: {targetL.toFixed(1)} a*: {targetA.toFixed(1)} b*: {targetB.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* Optical Difference Shifts Readout */}
          <div className="p-2.5 rounded-lg bg-[#0a1019]/90 border border-slate-800 text-xs space-y-1 font-mono">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{t.lightnessShift}</span>
              <span className={deltaL >= 0 ? 'text-amber-400' : 'text-blue-400'}>
                {deltaL >= 0 ? '+' : ''}{deltaL.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{t.redGreenShift}</span>
              <span className={deltaA >= 0 ? 'text-red-400' : 'text-emerald-400'}>
                {deltaA >= 0 ? '+' : ''}{deltaA.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{t.yellowBlueShift}</span>
              <span className={deltaB >= 0 ? 'text-yellow-400' : 'text-blue-400'}>
                {deltaB >= 0 ? '+' : ''}{deltaB.toFixed(1)}
              </span>
            </div>
          </div>

        </div>

        {/* Section 3: Suggested Adjustments with Color Codes & Measurements */}
        <div className="space-y-2.5 pt-1">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs font-bold text-slate-200 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Suggested Adjustment</span>
            </div>

            {/* Measurement Unit Switcher: KG | GRAMS | G/L | % */}
            <div className="flex items-center bg-[#0a1019] rounded-md p-0.5 border border-slate-700 text-[10px] font-mono">
              {[
                { id: 'KG', label: 'kg' },
                { id: 'GRAMS', label: 'grams' },
                { id: 'GPL', label: 'g/L' },
                { id: 'PERCENT', label: '%' }
              ].map(u => (
                <button
                  key={u.id}
                  onClick={() => setMeasureUnit(u.id)}
                  className={`px-1.5 py-0.2 rounded transition-all cursor-pointer ${
                    measureUnit === u.id 
                      ? 'bg-cyan-600 text-white font-bold shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`Display dosage in ${u.label}`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Detailed Adjustment Cards with Color Codes & Gram Measurements */}
          <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-0.5">
            {advices.map((adv, idx) => {
              const dyeHex = adv.hexColor || adv.color || '#E53935';
              const trayNum = adv.tray || 1;

              return (
                <div
                  key={idx}
                  onClick={() => onApplyAdjustmentAction && onApplyAdjustmentAction(adv.type)}
                  className="p-2 rounded-xl bg-[#0c1422] hover:bg-[#131f33] border border-slate-700/80 flex items-center justify-between gap-2 transition-all cursor-pointer active:scale-[0.99] group shadow-sm"
                  title={`Click to add ${adv.dyeName} (${formatMeasure(adv)})`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div 
                      className="w-5 h-7 rounded-md border border-white/30 shadow-md flex-shrink-0 relative overflow-hidden"
                      style={{ backgroundColor: dyeHex }}
                    >
                      <div className="absolute inset-0 fabric-texture opacity-40 mix-blend-overlay"></div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors truncate">
                          {adv.dyeName || adv.text}
                        </span>
                        {adv.boxCode && (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/40 font-bold">
                            {adv.boxCode}
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-2 mt-0.5">
                        <span className="text-rose-400 font-bold">{dyeHex}</span>
                        <span>&bull;</span>
                        <span>Tray #{trayNum}</span>
                        {adv.strength && <span>&bull; {adv.strength}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-xs font-black text-cyan-300 block">
                      {formatMeasure(adv)}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">
                      Add
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Multi-Color Dosing Palette (Full Spectrum) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span className="flex items-center space-x-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.quickAddColors || 'Quick Color Dosing:'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Add Tone</span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {[
                { type: 'RED', label: t.colorRed || 'Red', hex: '#E53935' },
                { type: 'YELLOW', label: t.colorYellow || 'Yellow', hex: '#FBC02D' },
                { type: 'BLUE', label: t.colorBlue || 'Blue', hex: '#1565C0' },
                { type: 'GREEN', label: t.colorGreen || 'Green', hex: '#2E7D32' },
                { type: 'BLACK', label: t.colorBlack || 'Black', hex: '#1A1A1A' },
                { type: 'PINK', label: t.colorPink || 'Pink', hex: '#EC407A' },
                { type: 'ORANGE', label: t.colorOrange || 'Orange', hex: '#FB8C00' },
                { type: 'PURPLE', label: t.colorPurple || 'Purple', hex: '#7B1FA2' },
                { type: 'CYAN', label: t.colorCyan || 'Cyan', hex: '#00ACC1' },
                { type: 'WHITE', label: t.colorWhite || 'White', hex: '#F5F5F5' },
              ].map((c) => (
                <button
                  key={c.type}
                  onClick={() => onApplyAdjustmentAction && onApplyAdjustmentAction(c.type)}
                  className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-[#0c1422] hover:bg-[#162238] border border-slate-700/80 hover:border-slate-500 transition-all active:scale-95 group cursor-pointer shadow-sm"
                  title={`Add ${c.label} dye`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full shadow-sm flex-shrink-0 border border-black/40 group-hover:scale-110 transition-transform" 
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[9px] font-medium text-slate-300 group-hover:text-cyan-300 mt-1 truncate max-w-full">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Equalize Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={onMatchPerfect}
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 cursor-pointer border border-emerald-400/40"
              title="Dispense exact color formulation to make sample 100% equal to original target"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 animate-spin-slow" />
              <span>Equalize Color (Match 100% Perfect)</span>
            </button>
          </div>

          {/* Quick Links: Autoclave, Dye Box Inventory & Dosing Sheet */}
          <div className="grid grid-cols-3 gap-1.5 pt-0.5">
            <button
              onClick={onOpenDosingReceipt}
              className="py-1.5 px-1.5 rounded-lg bg-[#201912] hover:bg-[#2d2218] border border-amber-500/50 text-amber-300 text-[10px] font-semibold flex items-center justify-center space-x-1 transition-colors cursor-pointer truncate"
              title="Print Color Match Correction Ticket (PDF)"
            >
              <Printer className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="truncate">Print Recipe</span>
            </button>

            <button
              onClick={onOpenAutoclave}
              className="py-1.5 px-1.5 rounded-lg bg-[#142033] hover:bg-[#1c2c45] border border-cyan-500/40 text-cyan-300 text-[10px] font-semibold flex items-center justify-center space-x-1 transition-colors cursor-pointer truncate"
              title="14-Tray Industrial Dyeing Controller"
            >
              <Layers className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span className="truncate">14-Trays</span>
            </button>

            <button
              onClick={onOpenDyeInventory}
              className="py-1.5 px-1.5 rounded-lg bg-[#191533] hover:bg-[#251e4a] border border-purple-500/40 text-purple-300 text-[10px] font-semibold flex items-center justify-center space-x-1 transition-colors cursor-pointer truncate"
              title="Dye Box Inventory & QR"
            >
              <QrCode className="w-3 h-3 text-purple-400 flex-shrink-0" />
              <span className="truncate">Dye Boxes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
