import React, { useState, useEffect, useCallback } from 'react';
import { Camera, Gauge, SlidersHorizontal, LayoutGrid, Layers, Sparkles, QrCode, FileText } from 'lucide-react';
import TopNavbar from './components/TopNavbar';
import LeftContainer from './components/LeftContainer';
import MiddleContainer from './components/MiddleContainer';
import RightContainer from './components/RightContainer';
import AutoclaveModal from './components/AutoclaveModal';
import AutoclaveScreen from './components/AutoclaveScreen';
import PretreatmentModal from './components/PretreatmentModal';
import OriginalColorModal from './components/OriginalColorModal';
import DyeInventoryModal from './components/DyeInventoryModal';
import EfficiencyReportModal from './components/EfficiencyReportModal';
import DyeDosingReceiptModal from './components/DyeDosingReceiptModal';
import AIAssistantModal from './components/AIAssistantModal';
import { analyzeColorMatch, hexToRgb, rgbToHex } from './utils/colorEngine';
import { RECIPE_DATABASE, getRecipeById } from './utils/recipeDatabase';
import { translations } from './utils/translations';
import './App.css';

export default function App() {
  // Screen Navigation State: 'DASHBOARD' | 'AUTOCLAVE'
  const [activeScreen, setActiveScreen] = useState('DASHBOARD');

  // Mobile View Switcher State: 'CAMERA' | 'ANALYSIS' | 'METRIC' | 'ALL'
  const [mobileTab, setMobileTab] = useState('CAMERA');

  // Language Selection State: 'EN' | 'ES' | 'FR' | 'DE' | 'NL' | 'PR' | 'Twi'
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('app_language') || 'EN';
  });

  const handleSelectLang = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('app_language', langCode);
  };

  const t = translations[currentLang] || translations.EN;

  // Recipe & Batch Context State
  const [selectedRecipeId, setSelectedRecipeId] = useState('RCP-1245');
  const [batchId, setBatchId] = useState('#1245');
  const [clientCode, setClientCode] = useState('#C82030');
  const [yardage, setYardage] = useState(2000);
  const [waterVolume, setWaterVolume] = useState(4200);

  // Optical Colors State (Target vs Detected Sample)
  const [targetHex, setTargetHex] = useState('#C82030');
  const [sampleHex, setSampleHex] = useState('#D2453A');
  const [initialSampleHex, setInitialSampleHex] = useState('#D2453A');
  const [isScanning, setIsScanning] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(true);

  // Analysis State
  const [analysis, setAnalysis] = useState(() => analyzeColorMatch(targetHex, sampleHex, yardage, waterVolume));

  // Modals
  const [isAutoclaveModalOpen, setIsAutoclaveModalOpen] = useState(false);
  const [isPretreatmentModalOpen, setIsPretreatmentModalOpen] = useState(false);
  const [isOriginalColorModalOpen, setIsOriginalColorModalOpen] = useState(false);
  const [isDyeInventoryModalOpen, setIsDyeInventoryModalOpen] = useState(false);
  const [isEfficiencyReportModalOpen, setIsEfficiencyReportModalOpen] = useState(false);
  const [isDyeDosingReceiptOpen, setIsDyeDosingReceiptOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // 14 Autoclave Trays State
  const [trays, setTrays] = useState([
    { trayNumber: 1, dyeName: "Reactive Scarlet Red", hexColor: "#D32F2F", currentConcentrationPercent: 2.4, currentDyeGrams: 1680.0, addedDyeGrams: 210.0, totalDyeGrams: 1890.0, status: "ACTIVE" },
    { trayNumber: 2, dyeName: "Reactive Crimson Ruby", hexColor: "#C82030", currentConcentrationPercent: 3.1, currentDyeGrams: 2170.0, addedDyeGrams: 280.0, totalDyeGrams: 2450.0, status: "ACTIVE" },
    { trayNumber: 3, dyeName: "Reactive Royal Blue", hexColor: "#1565C0", currentConcentrationPercent: 0.8, currentDyeGrams: 560.0, addedDyeGrams: 70.0, totalDyeGrams: 630.0, status: "ACTIVE" },
    { trayNumber: 4, dyeName: "Reactive Turquoise Blue", hexColor: "#00ACC1", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
    { trayNumber: 5, dyeName: "Reactive Golden Yellow", hexColor: "#FBC02D", currentConcentrationPercent: 1.2, currentDyeGrams: 840.0, addedDyeGrams: 105.0, totalDyeGrams: 945.0, status: "ACTIVE" },
    { trayNumber: 6, dyeName: "Reactive Lemon Yellow", hexColor: "#FFF176", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
    { trayNumber: 7, dyeName: "Reactive Deep Jet Black", hexColor: "#212121", currentConcentrationPercent: 0.15, currentDyeGrams: 105.0, addedDyeGrams: 0.0, totalDyeGrams: 105.0, status: "ACTIVE" },
    { trayNumber: 8, dyeName: "Reactive Forest Green", hexColor: "#2E7D32", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
    { trayNumber: 9, dyeName: "Reactive Bright Orange", hexColor: "#FB8C00", currentConcentrationPercent: 0.4, currentDyeGrams: 280.0, addedDyeGrams: 35.0, totalDyeGrams: 315.0, status: "ACTIVE" },
    { trayNumber: 10, dyeName: "Reactive Violet / Purple", hexColor: "#7B1FA2", currentConcentrationPercent: 0.0, currentDyeGrams: 0.0, addedDyeGrams: 0.0, totalDyeGrams: 0.0, status: "STANDBY" },
    { trayNumber: 11, dyeName: "Levelling Auxiliary Agent", hexColor: "#90A4AE", currentConcentrationPercent: 1.5, currentDyeGrams: 6300.0, addedDyeGrams: 0.0, totalDyeGrams: 6300.0, status: "ACTIVE" },
    { trayNumber: 12, dyeName: "pH Buffer / Acetic Acid", hexColor: "#B0BEC5", currentConcentrationPercent: 1.0, currentDyeGrams: 4200.0, addedDyeGrams: 0.0, totalDyeGrams: 4200.0, status: "ACTIVE" },
    { trayNumber: 13, dyeName: "Glauber's Salt (Electrolyte)", hexColor: "#CFD8DC", currentConcentrationPercent: 40.0, currentDyeGrams: 168000.0, addedDyeGrams: 0.0, totalDyeGrams: 168000.0, status: "ACTIVE" },
    { trayNumber: 14, dyeName: "Soda Ash Fixative (Na2CO3)", hexColor: "#ECEFF1", currentConcentrationPercent: 20.0, currentDyeGrams: 84000.0, addedDyeGrams: 0.0, totalDyeGrams: 84000.0, status: "STANDBY" }
  ]);

  // Handle Recipe Selection
  const handleSelectRecipe = (recipe) => {
    if (!recipe) return;
    setSelectedRecipeId(recipe.recipeId);
    setBatchId(recipe.batchId);
    setClientCode(recipe.clientCode);
    setTargetHex(recipe.targetHex);
    setSampleHex(recipe.sampleHex);
    setInitialSampleHex(recipe.sampleHex);
    setYardage(recipe.yardageMeters);
    setWaterVolume(recipe.waterVolumeLiters);
    setAnalysis(analyzeColorMatch(recipe.targetHex, recipe.sampleHex, recipe.yardageMeters, recipe.waterVolumeLiters));
  };

  // Synchronize with backend API or fallback to colorEngine
  const fetchBackendAnalysis = useCallback(async (target, sample) => {
    try {
      const response = await fetch('/api/color/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetHex: target,
          sampleHex: sample,
          yardageMeters: yardage,
          waterVolumeLiters: waterVolume
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAnalysis(prev => ({
          ...prev,
          target: {
            hex: target.toUpperCase(),
            r: data.targetColor?.r ?? prev.target.r,
            g: data.targetColor?.g ?? prev.target.g,
            b: data.targetColor?.b ?? prev.target.b,
            L: data.targetColor?.L ?? prev.target.L,
            a: data.targetColor?.a ?? prev.target.a,
            bStar: data.targetColor?.bStar ?? prev.target.bStar
          },
          sample: {
            hex: sample.toUpperCase(),
            r: data.sampleColor?.r ?? prev.sample.r,
            g: data.sampleColor?.g ?? prev.sample.g,
            b: data.sampleColor?.b ?? prev.sample.b,
            L: data.sampleColor?.L ?? prev.sample.L,
            a: data.sampleColor?.a ?? prev.sample.a,
            bStar: data.sampleColor?.bStar ?? prev.sample.bStar
          },
          deltaE: data.deltaE,
          deltaL: data.deltaL,
          deltaA: data.deltaA,
          deltaB: data.deltaB,
          status: data.matchStatus,
          statusText: data.statusMessage,
          isMatch: data.match,
          advices: data.adjustments?.map(a => ({
            text: a.instruction,
            instruction: a.instruction,
            dyeName: a.dyeName,
            type: a.colorType,
            grams: a.estimatedGrams,
            kg: a.estimatedKg || (a.estimatedGrams / 1000.0),
            boxCode: a.boxCode,
            strength: a.dyeStrength,
            tray: a.suggestedTray,
            color: a.iconColor
          })) || prev.advices
        }));
      } else {
        setAnalysis(analyzeColorMatch(target, sample, yardage, waterVolume));
      }
    } catch {
      // Offline fallback
      setAnalysis(analyzeColorMatch(target, sample, yardage, waterVolume));
    }
  }, [yardage, waterVolume]);

  useEffect(() => {
    fetchBackendAnalysis(targetHex, sampleHex);
  }, [targetHex, sampleHex, fetchBackendAnalysis]);

  // Handle color sampled from Camera / Viewport / Preset for Sample
  const handleColorSampled = (newSampleHex) => {
    setIsScanning(true);
    setTimeout(() => {
      setSampleHex(newSampleHex);
      setIsScanning(false);
    }, 150);
  };

  // Handle color sampled from Camera / Viewport for Target (Original)
  const handleTargetSampled = (newTargetHex) => {
    setIsScanning(true);
    setTimeout(() => {
      setTargetHex(newTargetHex);
      setClientCode(newTargetHex);
      setIsScanning(false);
    }, 150);
  };

  // Handle Target color change
  const handleTargetColorChange = (newTargetHex) => {
    setTargetHex(newTargetHex);
    setClientCode(newTargetHex);
  };

  // Handle Sample color change
  const handleSampleColorChange = (newSampleHex) => {
    setSampleHex(newSampleHex);
  };

  // Handle Dye Box Scanned from QR code
  const handleDyeBoxScanned = (dyeBox) => {
    if (!dyeBox) return;
    // Highlight tray or update formulation
    if (dyeBox.suggestedTray) {
      setTrays(prev => prev.map(t => {
        if (t.trayNumber === dyeBox.suggestedTray) {
          return { ...t, status: 'ACTIVE', dyeName: dyeBox.dyeName, hexColor: dyeBox.hexColor };
        }
        return t;
      }));
    }
  };

  // Handle Chemical Dye Adjustment Action (Full Spectrum: Red, Blue, Yellow, Green, Black, Pink, Orange, Purple, Cyan, White)
  const handleApplyAdjustmentAction = (actionType) => {
    setIsScanning(true);

    const sRgb = hexToRgb(sampleHex);
    const tRgb = hexToRgb(targetHex);

    let nextR = sRgb.r;
    let nextG = sRgb.g;
    let nextB = sRgb.b;

    if (actionType === 'RED') {
      nextR = Math.min(255, Math.round(sRgb.r + (tRgb.r - sRgb.r) * 0.6 + 8));
      nextG = Math.max(0, Math.round(sRgb.g * 0.88));
      nextB = Math.max(0, Math.round(sRgb.b * 0.88));
    } else if (actionType === 'BLUE') {
      nextB = Math.min(255, Math.round(sRgb.b + (tRgb.b - sRgb.b) * 0.6 + 8));
      nextG = Math.max(0, Math.round(sRgb.g * 0.88));
      nextR = Math.max(0, Math.round(sRgb.r * 0.88));
    } else if (actionType === 'YELLOW') {
      nextR = Math.min(255, Math.round(sRgb.r + 12));
      nextG = Math.min(255, Math.round(sRgb.g + 12));
      nextB = Math.max(0, Math.round(sRgb.b * 0.82));
    } else if (actionType === 'GREEN') {
      nextG = Math.min(255, Math.round(sRgb.g + (tRgb.g - sRgb.g) * 0.6 + 10));
      nextR = Math.max(0, Math.round(sRgb.r * 0.85));
      nextB = Math.max(0, Math.round(sRgb.b * 0.88));
    } else if (actionType === 'BLACK') {
      nextR = Math.max(0, Math.round(sRgb.r * 0.75));
      nextG = Math.max(0, Math.round(sRgb.g * 0.75));
      nextB = Math.max(0, Math.round(sRgb.b * 0.75));
    } else if (actionType === 'PINK' || actionType === 'MAGENTA') {
      nextR = Math.min(255, Math.round(sRgb.r + 18));
      nextG = Math.max(0, Math.round(sRgb.g * 0.85));
      nextB = Math.min(255, Math.round(sRgb.b + 12));
    } else if (actionType === 'ORANGE') {
      nextR = Math.min(255, Math.round(sRgb.r + 18));
      nextG = Math.min(255, Math.round(sRgb.g + 10));
      nextB = Math.max(0, Math.round(sRgb.b * 0.8));
    } else if (actionType === 'PURPLE' || actionType === 'VIOLET') {
      nextR = Math.min(255, Math.round(sRgb.r + 10));
      nextG = Math.max(0, Math.round(sRgb.g * 0.82));
      nextB = Math.min(255, Math.round(sRgb.b + 18));
    } else if (actionType === 'CYAN' || actionType === 'TURQUOISE') {
      nextR = Math.max(0, Math.round(sRgb.r * 0.82));
      nextG = Math.min(255, Math.round(sRgb.g + 14));
      nextB = Math.min(255, Math.round(sRgb.b + 16));
    } else if (actionType === 'WHITE') {
      nextR = Math.min(255, Math.round(sRgb.r + (255 - sRgb.r) * 0.25));
      nextG = Math.min(255, Math.round(sRgb.g + (255 - sRgb.g) * 0.25));
      nextB = Math.min(255, Math.round(sRgb.b + (255 - sRgb.b) * 0.25));
    } else if (typeof actionType === 'object' && actionType !== null) {
      if (actionType.hexColor) {
        const dyeRgb = hexToRgb(actionType.hexColor);
        nextR = Math.round(sRgb.r * 0.85 + dyeRgb.r * 0.15);
        nextG = Math.round(sRgb.g * 0.85 + dyeRgb.g * 0.15);
        nextB = Math.round(sRgb.b * 0.85 + dyeRgb.b * 0.15);
      }
    }

    if (Math.abs(nextR - tRgb.r) < 6 && Math.abs(nextG - tRgb.g) < 6 && Math.abs(nextB - tRgb.b) < 6) {
      nextR = tRgb.r;
      nextG = tRgb.g;
      nextB = tRgb.b;
    }

    const updatedHex = rgbToHex(nextR, nextG, nextB);

    setTimeout(() => {
      setSampleHex(updatedHex);
      setIsScanning(false);
    }, 200);
  };

  // Handle "Match Perfect"
  const handleMatchPerfect = () => {
    setIsScanning(true);
    setTimeout(() => {
      setSampleHex(targetHex);
      setIsScanning(false);
    }, 300);
  };

  const handleResetToDefault = () => {
    setSampleHex(initialSampleHex);
  };

  // Screen Navigation handlers
  const handleOpenAutoclaveScreen = () => {
    setActiveScreen('AUTOCLAVE');
  };

  const handleBackToDashboard = () => {
    setActiveScreen('DASHBOARD');
  };

  // If active screen is AUTOCLAVE, render the dedicated 14-Tray Controller screen
  if (activeScreen === 'AUTOCLAVE') {
    return (
      <AutoclaveScreen
        batchId={batchId}
        clientCode={clientCode}
        yardage={yardage}
        waterVolume={waterVolume}
        sampleColor={sampleHex}
        targetColor={targetHex}
        analysis={analysis}
        trays={trays}
        currentLang={currentLang}
        onBackToDashboard={handleBackToDashboard}
        onApplyDyeRecipe={() => {
          handleMatchPerfect();
        }}
        onUpdateTrays={setTrays}
      />
    );
  }

  return (
    <div className="app-root-container min-h-screen w-full max-w-full overflow-x-clip bg-[#070b12] text-slate-100 flex flex-col justify-between">
      
      {/* Top Navigation Bar with Language Switcher, Recipe Loader & Tools */}
      <TopNavbar 
        batchId={batchId}
        clientCode={clientCode}
        yardage={`${yardage.toLocaleString()} m`}
        waterVolume={`${waterVolume.toLocaleString()} L`}
        selectedRecipeId={selectedRecipeId}
        onSelectRecipe={handleSelectRecipe}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        onOpenAutoclave={handleOpenAutoclaveScreen}
        onOpenPretreatment={() => setIsPretreatmentModalOpen(true)}
        onOpenOriginalColorModal={() => setIsOriginalColorModalOpen(true)}
        onOpenDyeInventory={() => setIsDyeInventoryModalOpen(true)}
        onOpenEfficiencyReport={() => setIsEfficiencyReportModalOpen(true)}
        onOpenDosingReceipt={() => setIsDyeDosingReceiptOpen(true)}
        onOpenAiBot={() => setIsAiAssistantOpen(true)}
        isCalibrated={isCalibrated}
        onToggleCalibration={() => setIsCalibrated(!isCalibrated)}
      />

      {/* Mobile Ergonomic View Switcher (Visible on screens < lg) */}
      <div className="lg:hidden w-full max-w-[1600px] mx-auto px-2 sm:px-3 pt-2">
        <div className="bg-[#0e1624] border border-slate-700/80 rounded-xl p-0.5 sm:p-1 grid grid-cols-4 gap-1 shadow-lg text-center">
          <button
            onClick={() => setMobileTab('CAMERA')}
            className={`py-1.5 sm:py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 transition-all cursor-pointer ${
              mobileTab === 'CAMERA' 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs">Scanner</span>
          </button>

          <button
            onClick={() => setMobileTab('ANALYSIS')}
            className={`py-1.5 sm:py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 transition-all cursor-pointer relative ${
              mobileTab === 'ANALYSIS' 
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs">Analysis</span>
          </button>

          <button
            onClick={() => setMobileTab('METRIC')}
            className={`py-1.5 sm:py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 transition-all cursor-pointer ${
              mobileTab === 'METRIC' 
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs">Dosing</span>
          </button>

          <button
            onClick={() => setMobileTab('ALL')}
            className={`py-1.5 sm:py-2 px-1 rounded-lg text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1 transition-all cursor-pointer ${
              mobileTab === 'ALL' 
                ? 'bg-slate-700 text-white shadow-md border border-slate-600' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs">Overview</span>
          </button>
        </div>
      </div>

      {/* Main 3-Panel Industrial Dashboard Cockpit */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-2 sm:p-4 lg:p-6 flex flex-col justify-start overflow-x-hidden">
        
        {/* The 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 xl:gap-6 items-start w-full max-w-full">
          
          {/* Left Panel: Real-Time Evaluation / Color Analysis */}
          <div className={`lg:col-span-3 w-full ${
            mobileTab === 'ANALYSIS' || mobileTab === 'ALL' ? 'flex' : 'hidden lg:flex'
          }`}>
            <LeftContainer 
              analysis={analysis}
              currentLang={currentLang}
              onStatusClick={handleOpenAutoclaveScreen}
              onApplyAdjustment={(adv) => handleApplyAdjustmentAction(adv.type)}
              onMatchPerfect={handleMatchPerfect}
              onOpenDosingReceipt={() => setIsDyeDosingReceiptOpen(true)}
            />
          </div>

          {/* Middle Panel: Live Sample Scan / Camera Sensor / QR Dye Box Scanner */}
          <div className={`lg:col-span-6 w-full ${
            mobileTab === 'CAMERA' || mobileTab === 'ALL' ? 'flex' : 'hidden lg:flex'
          }`}>
            <MiddleContainer 
              sampleColor={sampleHex}
              targetColor={targetHex}
              currentLang={currentLang}
              onColorSampled={handleColorSampled}
              onTargetSampled={handleTargetSampled}
              onOpenOriginalColorModal={() => setIsOriginalColorModalOpen(true)}
              onDyeBoxScanned={handleDyeBoxScanned}
              onOpenAiBot={() => setIsAiAssistantOpen(true)}
              onMatchPerfect={handleMatchPerfect}
              analysis={analysis}
              isScanning={isScanning}
            />
          </div>

          {/* Right Panel: Metric & Color Data & Suggested Corrections */}
          <div className={`lg:col-span-3 w-full ${
            mobileTab === 'METRIC' || mobileTab === 'ALL' ? 'flex' : 'hidden lg:flex'
          }`}>
            <RightContainer 
              targetColor={analysis.target}
              sampleColor={analysis.sample}
              analysis={analysis}
              currentLang={currentLang}
              onTargetColorChange={handleTargetColorChange}
              onSampleColorChange={handleSampleColorChange}
              onApplyAdjustmentAction={handleApplyAdjustmentAction}
              onMatchPerfect={handleMatchPerfect}
              onOpenAutoclave={handleOpenAutoclaveScreen}
              onOpenDyeInventory={() => setIsDyeInventoryModalOpen(true)}
              onOpenDosingReceipt={() => setIsDyeDosingReceiptOpen(true)}
              onResetToDefault={handleResetToDefault}
            />
          </div>

        </div>

      </main>

      {/* Bottom Status Ticker & Copyright Footer */}
      <footer className="w-full max-w-full overflow-x-hidden bg-[#05080e] border-t border-slate-800/80 px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-mono text-slate-500 flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Autoclave Optical Chamber: <strong>ONLINE</strong></span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              Liquor Ratio: ~1:6 (4,200L Hot/Cold)
            </span>
          </div>

          <div className="flex flex-wrap items-center space-x-3">
            <button 
              onClick={() => setIsAiAssistantOpen(true)}
              className="text-purple-400 hover:underline cursor-pointer flex items-center gap-1 font-bold"
              title="Open Textile AI Assistant Bot & Search Engine"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Ask AI Bot</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => setIsDyeDosingReceiptOpen(true)}
              className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1 font-bold"
              title="Open Printable Dosing Sheet / PDF"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>Dosing Ticket (PDF)</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => setIsEfficiencyReportModalOpen(true)}
              className="text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              <span>Waste &amp; Quality Report</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => setIsDyeInventoryModalOpen(true)}
              className="text-purple-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <QrCode className="w-3 h-3" />
              <span>Dye Boxes &amp; Safety</span>
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => setIsPretreatmentModalOpen(true)}
              className="text-teal-400 hover:underline cursor-pointer"
            >
              Pre-treatment Chemistry
            </button>
            <span className="text-slate-600">|</span>
            <button 
              onClick={handleOpenAutoclaveScreen}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              14 Color Trays Config
            </button>
          </div>
        </div>

        {/* Copyright & Property Rights */}
        <div className="border-t border-slate-800/60 pt-1.5 flex flex-wrap items-center justify-between text-[10px] text-slate-500">
          <span className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Textile Industrial Color Match &amp; QC System</span>
          </span>
          <span className="text-slate-400">
            &copy; {new Date().getFullYear()} <strong className="text-slate-200">Stephen Karikari</strong>. All Rights Reserved.
          </span>
        </div>
      </footer>

      {/* Textile AI Assistant Bot & Search Modal */}
      <AIAssistantModal 
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        batchId={batchId}
        clientCode={clientCode}
        targetHex={targetHex}
        sampleHex={sampleHex}
        analysis={analysis}
        yardage={yardage}
        waterVolume={waterVolume}
        currentLang={currentLang}
        onApplyAdjustmentAction={handleApplyAdjustmentAction}
        onMatchPerfect={handleMatchPerfect}
      />

      {/* Industrial Dye Dosing Sheet / Receipt (PDF Printable) Modal */}
      <DyeDosingReceiptModal
        isOpen={isDyeDosingReceiptOpen}
        onClose={() => setIsDyeDosingReceiptOpen(false)}
        batchId={batchId}
        clientCode={clientCode}
        targetHex={targetHex}
        sampleHex={sampleHex}
        targetColor={analysis?.target}
        sampleColor={analysis?.sample}
        analysis={analysis}
        yardage={yardage}
        waterVolume={waterVolume}
        selectedRecipeId={selectedRecipeId}
        currentLang={currentLang}
      />

      {/* Dye Box Inventory & Safety Database Modal */}
      <DyeInventoryModal
        isOpen={isDyeInventoryModalOpen}
        onClose={() => setIsDyeInventoryModalOpen(false)}
        onSelectDyeBox={handleDyeBoxScanned}
        currentLang={currentLang}
      />

      {/* Efficiency & Waste Reduction Report Modal */}
      <EfficiencyReportModal
        isOpen={isEfficiencyReportModalOpen}
        onClose={() => setIsEfficiencyReportModalOpen(false)}
        batchId={batchId}
        clientCode={clientCode}
        targetHex={targetHex}
        sampleHex={sampleHex}
        analysis={analysis}
        yardage={yardage}
        waterVolume={waterVolume}
        currentLang={currentLang}
      />

      {/* Original Color Input Modal */}
      <OriginalColorModal 
        isOpen={isOriginalColorModalOpen}
        onClose={() => setIsOriginalColorModalOpen(false)}
        currentColor={targetHex}
        currentLang={currentLang}
        onSaveOriginalColor={handleTargetColorChange}
      />

      {/* 14-Tray Autoclave Mixer Modal */}
      <AutoclaveModal 
        isOpen={isAutoclaveModalOpen}
        onClose={() => setIsAutoclaveModalOpen(false)}
        batchId={batchId}
        clientCode={clientCode}
        yardage={yardage}
        waterVolume={waterVolume}
        trays={trays}
        onApplyTrayDosing={() => {
          handleMatchPerfect();
        }}
      />

      {/* Pretreatment Bleaching Modal */}
      <PretreatmentModal 
        isOpen={isPretreatmentModalOpen}
        onClose={() => setIsPretreatmentModalOpen(false)}
        yardage={yardage}
        waterVolume={waterVolume}
        onConfirmPretreatment={() => {
          setIsCalibrated(true);
        }}
      />

    </div>
  );
}
