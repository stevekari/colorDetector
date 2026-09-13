import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  Droplets, 
  Thermometer, 
  Clock, 
  Check, 
  Printer, 
  Sparkles,
  Scale,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Palette,
  Edit3,
  CheckSquare,
  Square,
  Plus,
  Minus,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  FileText,
  Tag
} from 'lucide-react';
import { translations } from '../utils/translations';
import { TRAY_CHEMICAL_PRESETS, DYE_BOX_DATABASE } from '../utils/dyeDatabase';
import './AutoclaveScreen.css';

export default function AutoclaveScreen({
  batchId = '#1245',
  clientCode = '#C82030',
  yardage = 2000,
  waterVolume = 4200,
  fabricGsm = 220,
  sampleColor = '#D2453A',
  targetColor = '#C82030',
  analysis,
  trays = [],
  currentLang = 'EN',
  onBackToDashboard,
  onApplyDyeRecipe,
  onUpdateTrays
}) {
  const t = translations[currentLang] || translations.EN;
  const [activeTab, setActiveTab] = useState('trays'); // 'trays' | 'cycle' | 'ticket'
  const [localTrays, setLocalTrays] = useState(() => {
    if (trays && trays.length > 0) return trays;
    return [
      { trayNumber: 1, dyeName: "Reactive Scarlet Red", hexColor: "#D32F2F", type: "DYE", currentConcentrationPercent: 2.4, currentDyeGrams: 1680.0, addedDyeGrams: 210.0, totalDyeGrams: 1890.0, status: "ACTIVE" },
      { trayNumber: 2, dyeName: "Reactive Crimson Ruby", hexColor: "#C82030", type: "DYE", currentConcentrationPercent: 3.1, currentDyeGrams: 2170.0, addedDyeGrams: 280.0, totalDyeGrams: 2450.0, status: "ACTIVE" },
      { trayNumber: 3, dyeName: "Reactive Royal Blue", hexColor: "#1565C0", type: "DYE", currentConcentrationPercent: 0.8, currentDyeGrams: 560.0, addedDyeGrams: 70.0, totalDyeGrams: 630.0, status: "ACTIVE" },
      { trayNumber: 4, dyeName: "Reactive Turquoise Blue", hexColor: "#00ACC1", type: "DYE", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
      { trayNumber: 5, dyeName: "Reactive Golden Yellow", hexColor: "#FBC02D", type: "DYE", currentConcentrationPercent: 1.2, currentDyeGrams: 840.0, addedDyeGrams: 105.0, totalDyeGrams: 945.0, status: "ACTIVE" },
      { trayNumber: 6, dyeName: "Reactive Lemon Yellow", hexColor: "#FFF176", type: "DYE", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
      { trayNumber: 7, dyeName: "Reactive Deep Jet Black", hexColor: "#18181B", type: "DYE", currentConcentrationPercent: 0.15, currentDyeGrams: 105.0, addedDyeGrams: 0.0, totalDyeGrams: 105.0, status: "ACTIVE" },
      { trayNumber: 8, dyeName: "Reactive Forest Green", hexColor: "#2E7D32", type: "DYE", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
      { trayNumber: 9, dyeName: "Reactive Bright Orange", hexColor: "#FB8C00", type: "DYE", currentConcentrationPercent: 0.4, currentDyeGrams: 280.0, addedDyeGrams: 35.0, totalDyeGrams: 315.0, status: "ACTIVE" },
      { trayNumber: 10, dyeName: "Reactive Violet / Purple", hexColor: "#7B1FA2", type: "DYE", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
      { trayNumber: 11, dyeName: "EUROTEX TB (Leveling)", hexColor: "#D97706", type: "AUXILIARY", currentConcentrationPercent: 1.5, currentDyeGrams: 6300.0, addedDyeGrams: 0.0, totalDyeGrams: 6300.0, status: "ACTIVE" },
      { trayNumber: 12, dyeName: "ADRAMOLL NL (Softener)", hexColor: "#BAE6FD", type: "AUXILIARY", currentConcentrationPercent: 1.0, currentDyeGrams: 4200.0, addedDyeGrams: 0.0, totalDyeGrams: 4200.0, status: "ACTIVE" },
      { trayNumber: 13, dyeName: "SOSA CÁUSTICA (Fitxa 210)", hexColor: "#94A3B8", type: "BLEACH", currentConcentrationPercent: 4.0, currentDyeGrams: 16800.0, addedDyeGrams: 0.0, totalDyeGrams: 16800.0, status: "ACTIVE" },
      { trayNumber: 14, dyeName: "A. OXIGENADA (Fitxa 416)", hexColor: "#E2E8F0", type: "BLEACH", currentConcentrationPercent: 3.0, currentDyeGrams: 12600.0, addedDyeGrams: 0.0, totalDyeGrams: 12600.0, status: "STANDBY" }
    ];
  });

  const [selectedTrayToEdit, setSelectedTrayToEdit] = useState(null);
  const [liquorVolume, setLiquorVolume] = useState(waterVolume);
  const [tempCelsius, setTempCelsius] = useState(98);
  const [cycleTimeMinutes, setCycleTimeMinutes] = useState(60);
  const [dispenseSuccess, setDispenseSuccess] = useState(false);
  const [circulationDirection, setCirculationDirection] = useState('INSIDE_OUT'); // 'INSIDE_OUT' | 'OUTSIDE_IN'
  const [companyName, setCompanyName] = useState(() => localStorage.getItem('receipt_company_name') || 'Textile Dyeing Mills Ltd.');
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  // Sync props trays if they change externally
  useEffect(() => {
    if (trays && trays.length > 0) {
      setLocalTrays(trays);
    }
  }, [trays]);

  // Notify parent on tray changes
  const notifyTrayUpdate = (updatedTrays) => {
    setLocalTrays(updatedTrays);
    if (onUpdateTrays) {
      onUpdateTrays(updatedTrays);
    }
  };

  // Update a single tray attribute
  const handleUpdateTray = (trayNumber, updates) => {
    const updated = localTrays.map(t => {
      if (t.trayNumber === trayNumber) {
        const next = { ...t, ...updates };
        if ('currentDyeGrams' in updates || 'addedDyeGrams' in updates) {
          next.totalDyeGrams = (next.currentDyeGrams || 0) + (next.addedDyeGrams || 0);
        }
        return next;
      }
      return t;
    });
    notifyTrayUpdate(updated);
  };

  // Change tray color directly
  const handleTrayColorChange = (trayNumber, hexColor) => {
    handleUpdateTray(trayNumber, { hexColor });
  };

  // Assign a preset chemical or dye to a tray
  const handleAssignPreset = (trayNumber, preset) => {
    handleUpdateTray(trayNumber, {
      dyeName: preset.name,
      hexColor: preset.hexColor,
      type: preset.type,
      status: preset.type === 'STANDBY' ? 'STANDBY' : 'ACTIVE'
    });
  };

  // Quick Preset Layouts for all 14 Trays
  const handleLoadPresetLayout = (layoutType) => {
    let newTrays = [...localTrays];
    if (layoutType === 'TRICOLOR') {
      newTrays = newTrays.map((t) => {
        if (t.trayNumber === 1) return { ...t, dyeName: 'Reactive Scarlet Red', hexColor: '#D32F2F', type: 'DYE', status: 'ACTIVE', currentConcentrationPercent: 2.4, currentDyeGrams: 1680.0, addedDyeGrams: 210.0, totalDyeGrams: 1890.0 };
        if (t.trayNumber === 2) return { ...t, dyeName: 'Reactive Crimson Ruby', hexColor: '#C82030', type: 'DYE', status: 'ACTIVE', currentConcentrationPercent: 3.1, currentDyeGrams: 2170.0, addedDyeGrams: 280.0, totalDyeGrams: 2450.0 };
        if (t.trayNumber === 3) return { ...t, dyeName: 'Reactive Royal Blue', hexColor: '#1565C0', type: 'DYE', status: 'ACTIVE', currentConcentrationPercent: 0.8, currentDyeGrams: 560.0, addedDyeGrams: 70.0, totalDyeGrams: 630.0 };
        if (t.trayNumber === 5) return { ...t, dyeName: 'Reactive Golden Yellow', hexColor: '#FBC02D', type: 'DYE', status: 'ACTIVE', currentConcentrationPercent: 1.2, currentDyeGrams: 840.0, addedDyeGrams: 105.0, totalDyeGrams: 945.0 };
        if (t.trayNumber === 11) return { ...t, dyeName: 'EUROTEX TB (Leveling)', hexColor: '#D97706', type: 'AUXILIARY', status: 'ACTIVE', currentConcentrationPercent: 1.5, currentDyeGrams: 6300.0, addedDyeGrams: 0.0, totalDyeGrams: 6300.0 };
        if (t.trayNumber === 12) return { ...t, dyeName: 'ADRAMOLL NL (Softener)', hexColor: '#BAE6FD', type: 'AUXILIARY', status: 'ACTIVE', currentConcentrationPercent: 1.0, currentDyeGrams: 4200.0, addedDyeGrams: 0.0, totalDyeGrams: 4200.0 };
        if (t.trayNumber === 13) return { ...t, dyeName: "Glauber's Salt (Electrolyte)", hexColor: '#CFD8DC', type: 'SALT', status: 'ACTIVE', currentConcentrationPercent: 40.0, currentDyeGrams: 168000.0, addedDyeGrams: 0.0, totalDyeGrams: 168000.0 };
        if (t.trayNumber === 14) return { ...t, dyeName: 'Soda Ash Fixative (Na2CO3)', hexColor: '#ECEFF1', type: 'FIXATIVE', status: 'STANDBY', currentConcentrationPercent: 20.0, currentDyeGrams: 84000.0, addedDyeGrams: 0.0, totalDyeGrams: 84000.0 };
        return { ...t, status: 'STANDBY', currentDyeGrams: 0, addedDyeGrams: 0, totalDyeGrams: 0 };
      });
    } else if (layoutType === 'PRE_TREATMENT') {
      newTrays = newTrays.map(t => {
        if (t.trayNumber === 1) return { ...t, dyeName: 'SOSA CÁUSTICA (Fitxa 210)', hexColor: '#94A3B8', type: 'BLEACH', status: 'ACTIVE', currentConcentrationPercent: 4.0, currentDyeGrams: 16800.0, addedDyeGrams: 0.0, totalDyeGrams: 16800.0 };
        if (t.trayNumber === 2) return { ...t, dyeName: 'A. OXIGENADA (Fitxa 416)', hexColor: '#E2E8F0', type: 'BLEACH', status: 'ACTIVE', currentConcentrationPercent: 3.0, currentDyeGrams: 12600.0, addedDyeGrams: 0.0, totalDyeGrams: 12600.0 };
        if (t.trayNumber === 3) return { ...t, dyeName: 'EUROTEX TB (Leveling)', hexColor: '#D97706', type: 'AUXILIARY', status: 'ACTIVE', currentConcentrationPercent: 1.5, currentDyeGrams: 6300.0, addedDyeGrams: 0.0, totalDyeGrams: 6300.0 };
        if (t.trayNumber === 4) return { ...t, dyeName: 'ADRAMOLL NL (Softener 4/5)', hexColor: '#BAE6FD', type: 'AUXILIARY', status: 'ACTIVE', currentConcentrationPercent: 2.0, currentDyeGrams: 8400.0, addedDyeGrams: 0.0, totalDyeGrams: 8400.0 };
        if (t.trayNumber === 5) return { ...t, dyeName: 'pH Buffer / Acetic Acid', hexColor: '#B0BEC5', type: 'BUFFER', status: 'ACTIVE', currentConcentrationPercent: 1.0, currentDyeGrams: 4200.0, addedDyeGrams: 0.0, totalDyeGrams: 4200.0 };
        return { ...t, status: 'STANDBY', currentDyeGrams: 0, addedDyeGrams: 0, totalDyeGrams: 0 };
      });
    } else if (layoutType === 'DARK_BLACK') {
      newTrays = newTrays.map(t => {
        if (t.trayNumber === 7) return { ...t, dyeName: 'Reactive Deep Jet Black', hexColor: '#18181B', type: 'DYE', status: 'ACTIVE', currentConcentrationPercent: 6.0, currentDyeGrams: 4200.0, addedDyeGrams: 500.0, totalDyeGrams: 4700.0 };
        if (t.trayNumber === 3) return { ...t, dyeName: 'Reactive Navy Midnight', hexColor: '#1E3A8A', type: 'DYE', status: 'ACTIVE', currentConcentrationPercent: 1.5, currentDyeGrams: 1050.0, addedDyeGrams: 100.0, totalDyeGrams: 1150.0 };
        if (t.trayNumber === 1) return { ...t, dyeName: 'Reactive Crimson Ruby', hexColor: '#C82030', type: 'DYE', status: 'ACTIVE', currentConcentrationPercent: 0.5, currentDyeGrams: 350.0, addedDyeGrams: 50.0, totalDyeGrams: 400.0 };
        if (t.trayNumber === 11) return { ...t, dyeName: 'EUROTEX TB (Leveling)', hexColor: '#D97706', type: 'AUXILIARY', status: 'ACTIVE', currentConcentrationPercent: 1.5, currentDyeGrams: 6300.0, addedDyeGrams: 0.0, totalDyeGrams: 6300.0 };
        if (t.trayNumber === 13) return { ...t, dyeName: "Glauber's Salt (Electrolyte)", hexColor: '#CFD8DC', type: 'SALT', status: 'ACTIVE', currentConcentrationPercent: 60.0, currentDyeGrams: 252000.0, addedDyeGrams: 0.0, totalDyeGrams: 252000.0 };
        if (t.trayNumber === 14) return { ...t, dyeName: 'Soda Ash Fixative (Na2CO3)', hexColor: '#ECEFF1', type: 'FIXATIVE', status: 'ACTIVE', currentConcentrationPercent: 20.0, currentDyeGrams: 84000.0, addedDyeGrams: 0.0, totalDyeGrams: 84000.0 };
        return { ...t, status: 'STANDBY', currentDyeGrams: 0, addedDyeGrams: 0, totalDyeGrams: 0 };
      });
    }
    notifyTrayUpdate(newTrays);
  };

  // Calculate total active dye & chemical mass
  const totalDyeGrams = localTrays.reduce((acc, curr) => acc + (curr.totalDyeGrams || 0), 0);
  const totalAddedGrams = localTrays.reduce((acc, curr) => acc + (curr.addedDyeGrams || 0), 0);
  const fabricKg = Math.round(((yardage * 1.6 * fabricGsm) / 1000.0) * 10.0) / 10.0;
  const liquorRatio = Math.round((liquorVolume / fabricKg) * 100.0) / 100.0;

  const handleDispense = () => {
    setDispenseSuccess(true);
    onApplyDyeRecipe && onApplyDyeRecipe();
    setTimeout(() => {
      setDispenseSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      
      {/* Top Header & Navigation Bar */}
      <header className="w-full bg-gradient-to-b from-[#1b273a] via-[#121c2c] to-[#0c1420] border-b border-slate-700/80 shadow-xl px-3 sm:px-6 py-2.5 sm:py-3 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
          
          <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-3">
            <button
              onClick={onBackToDashboard}
              className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>{currentLang === 'ES' ? '← Volver al Escáner' : currentLang === 'FR' ? '← Retour au Scanner' : currentLang === 'DE' ? '← Zurück zum Scanner' : currentLang === 'NL' ? '← Terug naar Scanner' : currentLang === 'PR' ? '← Voltar ao Scanner' : currentLang === 'Twi' ? '← Sane Kɔ Scanner No So' : '← Back to Color Scanner'}</span>
            </button>

            <div className="h-6 w-[1px] bg-slate-700 hidden sm:block"></div>

            <div className="flex items-center space-x-2">
              <div className="p-1 sm:p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex-shrink-0">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base md:text-lg font-black text-white tracking-wide flex items-center gap-1.5 font-sans">
                  Autoclave Unit #3 — 14-Tray Industrial Controller
                </h1>
                <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 hidden sm:block">
                  Dedicated Chemical Dosing &bull; Thermal Liquor Circulation &bull; Recipe Management
                </p>
              </div>
            </div>
          </div>

          {/* Quick Batch Metadata Badges */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 touch-pan-x">
            <div className="px-2.5 py-1 rounded bg-[#0a1019] border border-slate-700 text-xs flex-shrink-0">
              <span className="text-slate-400 text-[11px]">Batch: </span>
              <strong className="text-white font-mono text-xs">{batchId}</strong>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#0a1019] border border-slate-700 text-xs flex items-center space-x-1.5 flex-shrink-0">
              <span className="text-slate-400 text-[11px]">Target: </span>
              <span className="w-3 h-3 rounded-sm border border-white/20" style={{ backgroundColor: clientCode }} />
              <strong className="text-[#ea384c] font-mono text-xs">{clientCode}</strong>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#0a1019] border border-slate-700 text-xs flex-shrink-0">
              <span className="text-slate-400 text-[11px]">Yardage: </span>
              <strong className="text-cyan-400 font-mono text-xs">{yardage.toLocaleString()} m ({fabricKg} kg)</strong>
            </div>
            <div className="px-2.5 py-1 rounded bg-[#0a1019] border border-slate-700 text-xs flex-shrink-0">
              <span className="text-slate-400 text-[11px]">Liquor: </span>
              <strong className="text-blue-400 font-mono text-xs">{liquorVolume.toLocaleString()} L (1:{liquorRatio})</strong>
            </div>
          </div>

        </div>
      </header>

      {/* Main Screen Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        
        {/* Banner: Batch Status & Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          
          {/* Left: Quick Active Dosing Overview */}
          <div className="lg:col-span-8 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#142338] via-[#101b2c] to-[#0c1522] border border-cyan-600/40 shadow-xl flex flex-col justify-between space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Automated Chemical Formulation &bull; 14 Color Trays:
                </h3>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-slate-400 text-[11px]">Delta E:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-xs">
                  &Delta;E = {analysis?.deltaE?.toFixed(1) || '4.8'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Click any tray below to change its <strong>card color</strong>, assign <strong>authentic dyes or chemical auxiliaries</strong> (EUROTEX TB, ADRAMOLL NL, SOSA CÁUSTICA #210, A.OXIGENADA #416), or switch to <strong>Standby / No Color</strong>.
            </p>

            {/* Quick Active Dye / Auxiliary Swatch Strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {localTrays.filter(t => t.status === 'ACTIVE').map(t => (
                <div 
                  key={t.trayNumber}
                  onClick={() => setSelectedTrayToEdit(t)}
                  className="px-2 py-1 rounded-lg bg-[#0a121e] hover:bg-[#131f32] border border-slate-700/80 flex items-center space-x-1.5 flex-shrink-0 cursor-pointer text-xs transition-all hover:border-cyan-400 shadow-sm"
                  title={`Click to edit Tray ${t.trayNumber}`}
                >
                  <span 
                    className="w-3 h-3 rounded-full border border-white/30 flex-shrink-0 shadow-sm" 
                    style={{ backgroundColor: t.hexColor }} 
                  />
                  <span className="font-bold text-white text-[11px] truncate max-w-[110px]">{t.dyeName}</span>
                  <span className="font-mono text-cyan-300 text-[10px] font-bold">#T{t.trayNumber}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Thermal & Process Overview Card */}
          <div className="lg:col-span-4 p-3.5 sm:p-4 rounded-xl bg-[#0e1624] border border-slate-700/80 shadow-xl flex flex-col justify-between space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-red-400" />
              <span>Autoclave Process Summary</span>
            </h3>

            <div className="space-y-1.5 sm:space-y-2 text-xs font-mono">
              <div className="flex justify-between pb-1 border-b border-slate-800">
                <span className="text-slate-400 font-sans">Total Liquor Volume:</span>
                <span className="font-bold text-cyan-300">{liquorVolume.toLocaleString()} Liters</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-800">
                <span className="text-slate-400 font-sans">Fixation Temperature:</span>
                <span className="font-bold text-white">{tempCelsius} &deg;C</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-800">
                <span className="text-slate-400 font-sans">Total Dyes / Chemicals:</span>
                <span className="font-bold text-emerald-400">{(totalDyeGrams / 1000).toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Total Additional Dosing:</span>
                <span className="font-bold text-rose-400">+{(totalAddedGrams / 1000).toFixed(1)} kg</span>
              </div>
            </div>

            <button
              onClick={handleDispense}
              className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirm &amp; Dispense All 14 Trays</span>
            </button>
          </div>

        </div>

        {dispenseSuccess && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-2xl animate-fade-in">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="font-bold">Formulation successfully dispensed into Autoclave Unit #3 circulation loop!</span>
            </div>
            <button
              onClick={onBackToDashboard}
              className="px-3 py-1.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer flex-shrink-0 active:scale-95"
            >
              View Updated Color Scanner →
            </button>
          </div>
        )}

        {/* Section Tabs: 14-Tray Chemical Dosing | Thermal Cycle & Circulation | Batch Recipe Ticket (Printable) */}
        <div className="panel-metallic rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl">
          
          <div className="flex border-b border-slate-700/80 bg-[#090e17] px-3 sm:px-6 overflow-x-auto no-scrollbar touch-pan-x">
            <button
              onClick={() => setActiveTab('trays')}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'trays' 
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>14-Tray Chemical Dosing</span>
            </button>
            <button
              onClick={() => setActiveTab('cycle')}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'cycle' 
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>Thermal Cycle &amp; Circulation</span>
            </button>
            <button
              onClick={() => setActiveTab('ticket')}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                activeTab === 'ticket' 
                  ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Batch Recipe Ticket (Printable)</span>
            </button>
          </div>

          <div className="p-3.5 sm:p-6">
            
            {/* TAB 1: 14-Tray Chemical Dosing */}
            {activeTab === 'trays' && (
              <div className="space-y-4">
                
                {/* Action Bar & Quick Presets */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span>Click any tray card color swatch to change its shade, chemical name, or standby state.</span>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase mr-1">Load Presets:</span>
                    <button
                      onClick={() => handleLoadPresetLayout('TRICOLOR')}
                      className="px-2.5 py-1 rounded bg-[#132034] hover:bg-[#1a2c47] border border-cyan-500/40 text-cyan-300 text-xs font-semibold cursor-pointer active:scale-95"
                    >
                      Reactive Tricolor
                    </button>
                    <button
                      onClick={() => handleLoadPresetLayout('PRE_TREATMENT')}
                      className="px-2.5 py-1 rounded bg-[#122822] hover:bg-[#1a3830] border border-emerald-500/40 text-emerald-300 text-xs font-semibold cursor-pointer active:scale-95"
                    >
                      Pre-Treatment (Sosa + Oxigenada)
                    </button>
                    <button
                      onClick={() => handleLoadPresetLayout('DARK_BLACK')}
                      className="px-2.5 py-1 rounded bg-[#20152b] hover:bg-[#2d1e3d] border border-purple-500/40 text-purple-300 text-xs font-semibold cursor-pointer active:scale-95"
                    >
                      Deep Black Formulation
                    </button>
                  </div>
                </div>

                {/* 14 Individual Tray Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
                  {localTrays.map((t) => {
                    const isStandby = t.status === 'STANDBY';
                    const isChemical = t.type === 'AUXILIARY' || t.type === 'BLEACH' || t.type === 'SALT' || t.type === 'FIXATIVE' || t.type === 'BUFFER';
                    
                    return (
                      <div 
                        key={t.trayNumber}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 relative group overflow-hidden shadow-lg ${
                          isStandby 
                            ? 'bg-[#0a0f18]/90 border-slate-800 opacity-80 hover:opacity-100 hover:border-slate-700' 
                            : 'bg-[#0e1624] hover:border-cyan-400 shadow-md'
                        }`}
                        style={{
                          borderColor: !isStandby && t.hexColor ? `${t.hexColor}66` : undefined,
                          boxShadow: !isStandby && t.hexColor ? `0 4px 20px ${t.hexColor}15` : undefined
                        }}
                      >
                        {/* Top subtle color glow bar */}
                        {!isStandby && (
                          <div 
                            className="absolute top-0 left-0 right-0 h-1 opacity-90"
                            style={{ backgroundColor: t.hexColor }}
                          />
                        )}

                        <div className="flex items-start justify-between gap-2 pt-0.5">
                          
                          {/* Left: Swatch + Clickable Color Picker + Chemical Title */}
                          <div className="flex items-center space-x-3 min-w-0">
                            
                            {/* Color Swatch & Native Color Picker Trigger */}
                            <label 
                              className="relative w-10 h-10 rounded-xl border-2 border-white/20 shadow-md flex items-center justify-center font-mono text-sm font-black text-white shadow-inner cursor-pointer flex-shrink-0 group/swatch hover:scale-105 transition-transform overflow-hidden"
                              style={{ backgroundColor: t.hexColor || '#334155' }}
                              title="Click to pick a custom color for this tray card"
                            >
                              <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10">{t.trayNumber}</span>
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/swatch:opacity-100 flex items-center justify-center transition-opacity z-20">
                                <Palette className="w-4 h-4 text-white" />
                              </div>
                              <input 
                                type="color" 
                                value={t.hexColor || '#334155'}
                                onChange={(e) => handleTrayColorChange(t.trayNumber, e.target.value)}
                                className="absolute opacity-0 pointer-events-none"
                              />
                            </label>

                            <div className="min-w-0">
                              <div className="flex items-center space-x-1.5">
                                <span className="text-xs font-bold text-white truncate block">
                                  {t.dyeName}
                                </span>
                              </div>
                              
                              <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5 mt-0.5">
                                <span className="font-bold text-rose-400">{t.hexColor}</span>
                                <span>&bull;</span>
                                <span>{t.currentConcentrationPercent}% depth</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Status Pill & Edit Button */}
                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <button
                              onClick={() => setSelectedTrayToEdit(t)}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Edit Chemical, Color & Quantities"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleUpdateTray(t.trayNumber, { status: isStandby ? 'ACTIVE' : 'STANDBY' })}
                              className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold cursor-pointer transition-colors ${
                                !isStandby 
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
                              }`}
                            >
                              {t.status}
                            </button>
                          </div>
                        </div>

                        {/* Weight breakdown with quick adjustment steppers */}
                        <div className="p-2 rounded-lg bg-[#070b13] border border-slate-800 grid grid-cols-3 gap-1.5 text-center font-mono">
                          <div>
                            <div className="text-[9px] text-slate-400 uppercase">Current</div>
                            <div className="text-xs font-bold text-slate-200">{(t.currentDyeGrams || 0).toLocaleString()}g</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-cyan-400 uppercase">Addition</div>
                            <div className="text-xs font-black text-cyan-300">+{(t.addedDyeGrams || 0).toLocaleString()}g</div>
                          </div>
                          <div>
                            <div className="text-[9px] text-emerald-400 uppercase">Total</div>
                            <div className="text-xs font-black text-white">{(t.totalDyeGrams || 0).toLocaleString()}g</div>
                          </div>
                        </div>

                        {/* Quick Preset Selector Buttons for this tray */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[10px]">
                          <span className="text-slate-500 font-mono">Quick Assign:</span>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleAssignPreset(t.trayNumber, { name: 'EUROTEX TB', hexColor: '#D97706', type: 'AUXILIARY' })}
                              className="px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-600/40 text-amber-300 hover:bg-amber-900/60 cursor-pointer"
                              title="EUROTEX TB (Leveling Agent)"
                            >
                              Eurotex
                            </button>
                            <button
                              onClick={() => handleAssignPreset(t.trayNumber, { name: 'ADRAMOLL NL', hexColor: '#BAE6FD', type: 'AUXILIARY' })}
                              className="px-1.5 py-0.2 rounded bg-sky-950/60 border border-sky-600/40 text-sky-300 hover:bg-sky-900/60 cursor-pointer"
                              title="ADRAMOLL NL (Softener 4/5)"
                            >
                              Adramoll
                            </button>
                            <button
                              onClick={() => handleAssignPreset(t.trayNumber, { name: 'SOSA CÁUSTICA', hexColor: '#94A3B8', type: 'BLEACH' })}
                              className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer"
                              title="SOSA CAUSTICA (Fitxa Seguretat 210)"
                            >
                              Sosa
                            </button>
                            <button
                              onClick={() => setSelectedTrayToEdit(t)}
                              className="px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-600/40 text-cyan-300 hover:bg-cyan-900/60 cursor-pointer font-bold"
                            >
                              More...
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* TAB 2: Thermal Cycle & Circulation Profile */}
            {activeTab === 'cycle' && (
              <div className="space-y-6">
                
                {/* Thermal Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Thermometer className="w-4 h-4 text-red-400" />
                        <span>Target Temperature</span>
                      </div>
                      <span className="font-mono text-white text-xs">{tempCelsius}&deg;C</span>
                    </div>
                    <div className="text-2xl font-mono font-black text-white">{tempCelsius} &deg;C</div>
                    <input 
                      type="range"
                      min="40"
                      max="135"
                      value={tempCelsius}
                      onChange={(e) => setTempCelsius(parseInt(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400">Reactive dye fixation window: 95&deg;C - 98&deg;C (Cotton)</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>Autoclave Hold Time</span>
                      </div>
                      <span className="font-mono text-cyan-300 text-xs">{cycleTimeMinutes} min</span>
                    </div>
                    <div className="text-2xl font-mono font-black text-white">{cycleTimeMinutes} min</div>
                    <input 
                      type="range"
                      min="15"
                      max="120"
                      step="5"
                      value={cycleTimeMinutes}
                      onChange={(e) => setCycleTimeMinutes(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400">Uniform dye liquor penetration across 2,000m roll</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-blue-400" />
                        <span>Circulation Pump Flow</span>
                      </div>
                      <span className="font-mono text-emerald-400 text-xs font-bold">{circulationDirection}</span>
                    </div>
                    <div className="text-xl font-mono font-bold text-cyan-300 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Bi-directional Reversible</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setCirculationDirection('INSIDE_OUT')}
                        className={`flex-1 py-1 rounded text-[11px] font-mono font-bold cursor-pointer transition-all ${
                          circulationDirection === 'INSIDE_OUT' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Inside → Out
                      </button>
                      <button
                        onClick={() => setCirculationDirection('OUTSIDE_IN')}
                        className={`flex-1 py-1 rounded text-[11px] font-mono font-bold cursor-pointer transition-all ${
                          circulationDirection === 'OUTSIDE_IN' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Outside → In
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">Automatic reversal every 4 minutes prevents unlevelness</p>
                  </div>
                </div>

                {/* Sequence Timeline */}
                <div className="p-4 rounded-xl bg-[#090e17] border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Full Industrial Dye Cycle Timeline:
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/60 border border-slate-800">
                      <span>1. Pre-treatment Bleaching (Sosa Cáustica #210 + A.Oxigenada #416 at 98°C)</span>
                      <span className="text-emerald-400 font-bold">COMPLETED &check;</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/60 border border-slate-800">
                      <span>2. Neutralizing Rinse &amp; Leveling Auxiliary (EUROTEX TB at 50°C)</span>
                      <span className="text-emerald-400 font-bold">COMPLETED &check;</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-cyan-950/40 border border-cyan-700/50 text-cyan-200">
                      <span>3. 14-Tray Color Metering &amp; Glauber's Salt Addition ({tempCelsius}°C Hold)</span>
                      <span className="text-cyan-400 font-bold animate-pulse">ACTIVE DISPENSING</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/60 border border-slate-800 text-slate-400">
                      <span>4. Soda Ash Alkali Fixation (98°C High-Temp Hold, {cycleTimeMinutes} min)</span>
                      <span>QUEUED</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/60 border border-slate-800 text-slate-400">
                      <span>5. Final Softening &amp; Lubrication (ADRAMOLL NL 4/5)</span>
                      <span>QUEUED</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: Batch Recipe Ticket (Printable) */}
            {activeTab === 'ticket' && (
              <div className="space-y-4">
                <div className="flex justify-end print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t.printTicketPdf || 'Print Batch Sheet (PDF)'}</span>
                  </button>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-white text-black font-sans shadow-2xl border-2 border-black max-w-4xl mx-auto print:m-0 print:border-none print:shadow-none">
                  
                  {/* Header: ONLY Dye Receipt, Company Name & Receipt Number */}
                  <div className="border-b-2 border-black pb-3">
                    <div className="flex justify-between items-start">
                      
                      {/* Left: Dye Receipt Badge & Company Name */}
                      <div className="flex items-center space-x-3">
                        <div className="border-2 border-black px-3 py-1 font-black text-xl sm:text-2xl tracking-tight uppercase bg-black text-white">
                          {t.receiptTitle || 'Dye Receipt'}
                        </div>
                        <div>
                          {isEditingCompany ? (
                            <div className="flex items-center space-x-1 print:hidden">
                              <input 
                                type="text"
                                value={companyName}
                                onChange={(e) => {
                                  setCompanyName(e.target.value);
                                  localStorage.setItem('receipt_company_name', e.target.value);
                                }}
                                placeholder="Enter Company Name"
                                className="border border-black px-2 py-0.5 text-xs font-bold font-sans rounded"
                                autoFocus
                                onBlur={() => setIsEditingCompany(false)}
                                onKeyDown={(e) => e.key === 'Enter' && setIsEditingCompany(false)}
                              />
                            </div>
                          ) : (
                            <div 
                              onClick={() => setIsEditingCompany(true)}
                              className="cursor-pointer group flex items-center gap-1.5"
                              title="Click to edit Company Name"
                            >
                              <h2 className="font-black text-base sm:text-lg uppercase tracking-tight text-black group-hover:underline">
                                {companyName}
                              </h2>
                              <Edit3 className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity print:hidden" />
                            </div>
                          )}
                          <div className="text-[11px] font-mono text-slate-600 font-semibold">
                            {t.recipeLabel || 'RECIPE:'} 027.GROSSO03.GROSSO03
                          </div>
                        </div>
                      </div>

                      {/* Right: Receipt Number & Date */}
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-black">
                          {t.receiptNo || 'Receipt No.'} #{batchId.replace('#', '') || '187248'}
                        </div>
                        <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                          {t.dateTimeLabel ? t.dateTimeLabel.replace(':', '') : 'Fecha'}: {new Date().toLocaleDateString(currentLang === 'EN' ? 'en-US' : currentLang === 'ES' ? 'es-ES' : currentLang === 'FR' ? 'fr-FR' : currentLang === 'DE' ? 'de-DE' : 'nl-NL')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2 border-t border-slate-300 text-xs font-mono">
                      <div>
                        <span className="text-slate-600 block text-[10px]">{t.dateTimeLabel || 'FECHA / HORA:'}</span>
                        <span className="font-bold text-black">{new Date().toLocaleDateString(currentLang === 'EN' ? 'en-US' : 'es-ES')} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 block text-[10px]">{t.clientStandard || 'CLIENT TARGET:'}</span>
                        <span className="font-bold text-black">{clientCode}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 block text-[10px]">{t.metersWeightLabel || 'METROS / PESO:'}</span>
                        <span className="font-bold text-black">{yardage} m &bull; {fabricKg} kg</span>
                      </div>
                      <div>
                        <span className="text-slate-600 block text-[10px]">{t.volumeRatioLabel || 'VOLUMEN / REL. BAÑO:'}</span>
                        <span className="font-bold text-black">{liquorVolume} L &bull; 1:{liquorRatio}</span>
                      </div>
                    </div>
                  </div>

                  {/* 14-Tray Active Chemicals Table */}
                  <div className="mt-4">
                    <table className="w-full text-left border-collapse border border-black text-xs font-mono">
                      <thead>
                        <tr className="bg-slate-100 border-b border-black">
                          <th className="border-r border-black p-1.5 text-center w-12">{t.binCol || 'TRAY'}</th>
                          <th className="border-r border-black p-1.5">{t.productDyeCol || 'PRODUCTO / COLORANTE'}</th>
                          <th className="border-r border-black p-1.5 text-center w-20">COLOR</th>
                          <th className="border-r border-black p-1.5 text-right w-20">% CONC</th>
                          <th className="border-r border-black p-1.5 text-right w-24">GRAMS (gr)</th>
                          <th className="border-r border-black p-1.5 text-right w-20">KILOS (kg)</th>
                          <th className="p-1.5 text-center w-14">CHECK</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localTrays.filter(tray => tray.status === 'ACTIVE' && (tray.totalDyeGrams > 0 || tray.currentDyeGrams > 0)).map((tray, idx) => (
                          <tr key={tray.trayNumber} className={`border-b border-slate-300 ${idx % 2 === 1 ? 'bg-slate-50' : ''}`}>
                            <td className="border-r border-black p-1.5 text-center font-bold">#{tray.trayNumber}</td>
                            <td className="border-r border-black p-1.5 font-bold">
                              {tray.dyeName}
                              <span className="text-[10px] text-slate-500 font-normal block">Type: {tray.type || 'Standard'}</span>
                            </td>
                            <td className="border-r border-black p-1.5 text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <span className="w-3.5 h-3.5 rounded-sm border border-black" style={{ backgroundColor: tray.hexColor }} />
                                <span className="text-[10px] font-bold">{tray.hexColor}</span>
                              </div>
                            </td>
                            <td className="border-r border-black p-1.5 text-right font-bold">{tray.currentConcentrationPercent}%</td>
                            <td className="border-r border-black p-1.5 text-right font-bold">{(tray.totalDyeGrams || 0).toLocaleString()} gr</td>
                            <td className="border-r border-black p-1.5 text-right font-bold">{((tray.totalDyeGrams || 0) / 1000).toFixed(2)} kg</td>
                            <td className="p-1.5 text-center">
                              <div className="w-4 h-4 border-2 border-black rounded-sm mx-auto"></div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Sign-off boxes */}
                  <div className="mt-6 pt-4 border-t-2 border-black grid grid-cols-3 gap-4 text-xs font-mono">
                    <div className="border border-black p-2.5 rounded">
                      <span className="text-slate-600 block text-[10px]">{t.weighedByOperator || 'PESADO POR OPERARIO:'}</span>
                      <div className="h-10"></div>
                      <span className="text-[10px] text-slate-400 border-t border-slate-300 block pt-1">{t.operatorSign || 'Firma Operario'}</span>
                    </div>
                    <div className="border border-black p-2.5 rounded">
                      <span className="text-slate-600 block text-[10px]">{t.verifiedLabQc || 'VERIFICADO LABORATORIO:'}</span>
                      <div className="h-10"></div>
                      <span className="text-[10px] text-slate-400 border-t border-slate-300 block pt-1">{t.labSign || 'Control de Calidad (QC)'}</span>
                    </div>
                    <div className="border border-black p-2.5 rounded bg-slate-50">
                      <span className="text-slate-600 block text-[10px]">{t.qualityControl || 'CONTROL CALIDAD:'}</span>
                      <div className="text-[11px] font-bold mt-1 text-slate-900">{t.approvedBadge || 'LOTE APROBADO (OK)'}</div>
                      <span className="text-[9px] text-slate-500 block">{t.conformingLotIso || 'Inspección de Tintura • ISO 9001'}</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* Edit Tray Modal / Popup */}
      {selectedTrayToEdit && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-[#0f172a] border border-cyan-500/50 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 text-slate-200">
            
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center space-x-2.5">
                <span 
                  className="w-7 h-7 rounded-lg border border-white/30 shadow flex items-center justify-center font-mono font-bold text-white text-xs"
                  style={{ backgroundColor: selectedTrayToEdit.hexColor }}
                >
                  {selectedTrayToEdit.trayNumber}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Customize Tray #{selectedTrayToEdit.trayNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTrayToEdit(null)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Custom Chemical Name & Color Picker */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Chemical or Dye Name:
                </label>
                <input 
                  type="text"
                  value={selectedTrayToEdit.dyeName}
                  onChange={(e) => {
                    const updated = { ...selectedTrayToEdit, dyeName: e.target.value };
                    setSelectedTrayToEdit(updated);
                    handleUpdateTray(selectedTrayToEdit.trayNumber, { dyeName: e.target.value });
                  }}
                  className="w-full bg-[#0a1019] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Color Swatch & Color Picker */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a1019] border border-slate-800">
                <div className="flex items-center space-x-3">
                  <input 
                    type="color"
                    value={selectedTrayToEdit.hexColor || '#334155'}
                    onChange={(e) => {
                      const updated = { ...selectedTrayToEdit, hexColor: e.target.value };
                      setSelectedTrayToEdit(updated);
                      handleUpdateTray(selectedTrayToEdit.trayNumber, { hexColor: e.target.value });
                    }}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Card Color / Swatch</div>
                    <div className="text-[11px] font-mono text-rose-400">{selectedTrayToEdit.hexColor}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const updated = { ...selectedTrayToEdit, hexColor: '#334155', type: 'CLEAR' };
                      setSelectedTrayToEdit(updated);
                      handleUpdateTray(selectedTrayToEdit.trayNumber, { hexColor: '#334155', type: 'CLEAR' });
                    }}
                    className="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-slate-300 hover:text-white"
                  >
                    Clear / Fluid
                  </button>
                </div>
              </div>

              {/* Presets List */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Select Preset Chemical / Dye:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {TRAY_CHEMICAL_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const updated = {
                          ...selectedTrayToEdit,
                          dyeName: preset.name,
                          hexColor: preset.hexColor,
                          type: preset.type
                        };
                        setSelectedTrayToEdit(updated);
                        handleAssignPreset(selectedTrayToEdit.trayNumber, preset);
                      }}
                      className="p-1.5 rounded-lg bg-[#0a1019] hover:bg-[#162338] border border-slate-800 hover:border-cyan-500/50 flex items-center space-x-1.5 text-left text-[11px] transition-colors cursor-pointer"
                    >
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: preset.hexColor }} />
                      <span className="truncate text-slate-200">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantities */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Concentration (% depth):</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={selectedTrayToEdit.currentConcentrationPercent}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      const updated = { ...selectedTrayToEdit, currentConcentrationPercent: val };
                      setSelectedTrayToEdit(updated);
                      handleUpdateTray(selectedTrayToEdit.trayNumber, { currentConcentrationPercent: val });
                    }}
                    className="w-full bg-[#0a1019] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Total Grams (gr):</label>
                  <input 
                    type="number"
                    value={selectedTrayToEdit.currentDyeGrams}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      const updated = { ...selectedTrayToEdit, currentDyeGrams: val, totalDyeGrams: val + (selectedTrayToEdit.addedDyeGrams || 0) };
                      setSelectedTrayToEdit(updated);
                      handleUpdateTray(selectedTrayToEdit.trayNumber, { currentDyeGrams: val });
                    }}
                    className="w-full bg-[#0a1019] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                  />
                </div>
              </div>

            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedTrayToEdit(null)}
                className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md cursor-pointer active:scale-95"
              >
                Save &amp; Apply to Tray #{selectedTrayToEdit.trayNumber}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#05080e] border-t border-slate-800 px-4 py-2.5 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <button
          onClick={onBackToDashboard}
          className="text-cyan-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Live Color Scanner Dashboard</span>
        </button>

        <div className="flex flex-wrap items-center space-x-3 font-mono text-[11px] text-slate-500">
          <span>Autoclave Unit #3 &bull; 14 Color Trays &bull; 4,200L Liquor</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            &copy; {new Date().getFullYear()} <strong className="text-slate-200">Stephen Karikari</strong>. All Rights Reserved.
          </span>
        </div>
      </footer>

    </div>
  );
}
