import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  Upload, 
  Crosshair, 
  Video, 
  VideoOff, 
  Layers, 
  Check, 
  Target, 
  FlaskConical, 
  ScanLine, 
  AlertTriangle,
  HelpCircle,
  Sparkles,
  RotateCcw,
  QrCode,
  Box,
  ShieldAlert,
  Info,
  ArrowRight,
  Edit3,
  Scale,
  Equal,
  Bot
} from 'lucide-react';
import { rgbToHex, hexToRgb, rgbToLab, rgbToCmyk, rgbToHsl } from '../utils/colorEngine';
import { DYE_BOX_DATABASE, findDyeByBoxCode } from '../utils/dyeDatabase';
import { translations } from '../utils/translations';

export default function MiddleContainer({
  sampleColor = '#D2453A',
  targetColor = '#C82030',
  currentLang = 'EN',
  onColorSampled,
  onTargetSampled,
  onOpenOriginalColorModal,
  onOpenDyeBoxScanned,
  onDyeBoxScanned,
  onOpenAiBot,
  onMatchPerfect,
  analysis,
  isScanning = false
}) {
  const t = translations[currentLang] || translations.EN;

  // Sensor Scanner Mode: 'COLOR_SENSOR' | 'QR_SCANNER'
  const [scannerMode, setScannerMode] = useState('COLOR_SENSOR');

  const [mode, setMode] = useState('simulation'); // 'simulation' | 'webcam' | 'image'
  const [lighting, setLighting] = useState('D65'); // 'D65' | 'TL84' | 'A' | 'UV'
  const [crosshairPos, setCrosshairPos] = useState({ x: 50, y: 50 });
  const [isLiveScanning, setIsLiveScanning] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' (back) | 'user' (front)
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [capturedSnapshot, setCapturedSnapshot] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [captureFeedbackMsg, setCaptureFeedbackMsg] = useState('');

  // QR Scanning State
  const [scannedDyeBox, setScannedDyeBox] = useState(null);
  const [qrScanSuccessMsg, setQrScanSuccessMsg] = useState('');

  // Scan Destination selection: 'SAMPLE' | 'TARGET' | 'ASK'
  const [scanDestination, setScanDestination] = useState('SAMPLE');
  const [pendingCaptureColor, setPendingCaptureColor] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const chamberRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Discover connected camera devices
  useEffect(() => {
    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          const videoInputs = devices.filter((d) => d.kind === 'videoinput');
          setCameraDevices(videoInputs);
          if (videoInputs.length > 0 && !selectedDeviceId) {
            setSelectedDeviceId(videoInputs[0].deviceId);
          }
        })
        .catch((err) => console.warn('Device enumeration error:', err));
    }
  }, [selectedDeviceId]);

  // Start / Stop Webcam Stream
  const startCamera = useCallback(async (deviceId, currentFacing = facingMode) => {
    setCameraError(null);
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }

      const constraints = {
        video: deviceId 
          ? { deviceId: { exact: deviceId } } 
          : { facingMode: currentFacing, width: { ideal: 1280 }, height: { ideal: 720 } }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsWebcamActive(true);
      setMode('webcam');
      setCapturedSnapshot(null);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(err.message || 'Camera permission denied or camera not found.');
      setIsWebcamActive(false);
      setMode('simulation');
    }
  }, [facingMode]);

  const toggleCameraFacing = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    setSelectedDeviceId('');
    if (mode === 'webcam') {
      startCamera('', nextFacing);
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsWebcamActive(false);
    setIsLiveScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (mode === 'webcam') {
      startCamera(selectedDeviceId, facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [mode, selectedDeviceId, facingMode, startCamera, stopCamera]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setCapturedSnapshot(null);
        setMode('image');
      };
      reader.readAsDataURL(file);
    }
  };

  // High-precision pixel sampling with 5x5 spatial averaging filter
  const extractColorFromVideoOrImage = useCallback((xPercent, yPercent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    let source = null;
    let sw = 0, sh = 0;

    if (mode === 'webcam' && videoRef.current && videoRef.current.readyState >= 2) {
      source = videoRef.current;
      sw = videoRef.current.videoWidth || 640;
      sh = videoRef.current.videoHeight || 480;
    } else if (mode === 'image' && uploadedImage) {
      const imgEl = chamberRef.current?.querySelector('img');
      if (imgEl && imgEl.complete) {
        source = imgEl;
        sw = imgEl.naturalWidth || 640;
        sh = imgEl.naturalHeight || 480;
      }
    }

    if (!source || sw === 0 || sh === 0) return null;

    if (canvas.width !== sw || canvas.height !== sh) {
      canvas.width = sw;
      canvas.height = sh;
    }

    ctx.drawImage(source, 0, 0, sw, sh);

    const centerX = Math.floor((xPercent / 100) * sw);
    const centerY = Math.floor((yPercent / 100) * sh);

    const radius = 2;
    let rSum = 0, gSum = 0, bSum = 0, count = 0;

    const startX = Math.max(0, centerX - radius);
    const endX = Math.min(sw - 1, centerX + radius);
    const startY = Math.max(0, centerY - radius);
    const endY = Math.min(sh - 1, centerY + radius);
    const boxW = endX - startX + 1;
    const boxH = endY - startY + 1;

    try {
      const imgData = ctx.getImageData(startX, startY, boxW, boxH).data;
      for (let i = 0; i < imgData.length; i += 4) {
        rSum += imgData[i];
        gSum += imgData[i + 1];
        bSum += imgData[i + 2];
        count++;
      }

      if (count > 0) {
        const avgR = Math.round(rSum / count);
        const avgG = Math.round(gSum / count);
        const avgB = Math.round(bSum / count);
        return rgbToHex(avgR, avgG, avgB);
      }
    } catch (e) {
      console.warn("Pixel sampling exception:", e);
    }
    return null;
  }, [mode, uploadedImage]);

  // Capture color handler (Automatically turns camera off after capture)
  const handleCaptureSample = (forcedDestination = null) => {
    let capturedHex = null;
    const wasWebcam = mode === 'webcam';

    if (mode === 'webcam' || mode === 'image') {
      capturedHex = extractColorFromVideoOrImage(crosshairPos.x, crosshairPos.y);
      if (mode === 'webcam' && videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = videoRef.current.videoWidth || 640;
          canvas.height = videoRef.current.videoHeight || 480;
          ctx.drawImage(videoRef.current, 0, 0);
          setCapturedSnapshot(canvas.toDataURL('image/jpeg'));
        }
      }
    } else {
      capturedHex = sampleColor;
    }

    if (!capturedHex) return;

    const dest = forcedDestination || scanDestination;

    if (dest === 'ASK') {
      setPendingCaptureColor(capturedHex);
    } else if (dest === 'TARGET') {
      onTargetSampled && onTargetSampled(capturedHex);
      setCaptureFeedbackMsg(`Original Color Set: ${capturedHex} (Camera OFF)`);
      setTimeout(() => setCaptureFeedbackMsg(''), 3500);
      if (wasWebcam) {
        stopCamera();
        setMode('simulation');
      }
    } else {
      onColorSampled && onColorSampled(capturedHex);
      setCaptureFeedbackMsg(`Sample Color Set: ${capturedHex} (Camera OFF)`);
      setTimeout(() => setCaptureFeedbackMsg(''), 3500);
      if (wasWebcam) {
        stopCamera();
        setMode('simulation');
      }
    }
  };

  // Launch Camera with specific target destination
  const handleStartScanningDestination = (destination) => {
    setScanDestination(destination);
    setScannerMode('COLOR_SENSOR');
    if (mode !== 'webcam') {
      setMode('webcam');
    }
  };

  // Continuous live scan
  useEffect(() => {
    if (isLiveScanning && (mode === 'webcam' || mode === 'image')) {
      scanIntervalRef.current = setInterval(() => {
        const sampled = extractColorFromVideoOrImage(crosshairPos.x, crosshairPos.y);
        if (sampled) {
          if (scanDestination === 'TARGET') {
            onTargetSampled && onTargetSampled(sampled);
          } else {
            onColorSampled && onColorSampled(sampled);
          }
        }
      }, 300);
    } else {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }
    }

    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [isLiveScanning, mode, crosshairPos, scanDestination, extractColorFromVideoOrImage, onColorSampled, onTargetSampled]);

  // Handle position update
  const handlePositionUpdate = (clientX, clientY) => {
    if (!chamberRef.current) return;
    const rect = chamberRef.current.getBoundingClientRect();
    const xPercent = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const yPercent = Math.max(15, Math.min(85, ((clientY - rect.top) / rect.height) * 100));
    setCrosshairPos({ x: xPercent, y: yPercent });

    if (mode === 'simulation') {
      const base = hexToRgb(sampleColor);
      const noise = (Math.random() - 0.5) * 6;
      const sampledHex = rgbToHex(base.r + noise, base.g + noise * 0.5, base.b + noise * 0.5);
      if (scanDestination === 'TARGET') {
        onTargetSampled && onTargetSampled(sampledHex);
      } else {
        onColorSampled && onColorSampled(sampledHex);
      }
    } else {
      const sampled = extractColorFromVideoOrImage(xPercent, yPercent);
      if (sampled) {
        if (scanDestination === 'TARGET') {
          onTargetSampled && onTargetSampled(sampled);
        } else {
          onColorSampled && onColorSampled(sampled);
        }
      }
    }
  };

  const handleChamberClick = (e) => {
    handlePositionUpdate(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handlePositionUpdate(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Quick QR Dye Box Scanner simulation / triggers
  const handleTriggerQrBoxScan = (boxCode) => {
    const foundDye = findDyeByBoxCode(boxCode);
    if (foundDye) {
      setScannedDyeBox(foundDye);
      setQrScanSuccessMsg(`Scanned: ${foundDye.boxCode} — ${foundDye.dyeName} (${foundDye.strength})`);
      onDyeBoxScanned && onDyeBoxScanned(foundDye);
      setTimeout(() => setQrScanSuccessMsg(''), 4000);
    }
  };

  const presetSamples = [
    { label: 'Mockup Batch Sample', hex: '#D2453A' },
    { label: 'Deep Crimson', hex: '#A01524' },
    { label: 'Orange Cast', hex: '#E05530' },
    { label: 'Under-dyed Pink', hex: '#E8606B' },
    { label: 'Target Perfect Match', hex: '#C82030' },
  ];

  const deltaE = analysis?.deltaE ?? 4.8;
  const isMatch = analysis?.isMatch ?? false;

  return (
    <div className="w-full flex-1 flex flex-col panel-metallic rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl min-h-[440px] sm:min-h-[490px]">
      
      {/* Panel Header */}
      <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#172338] via-[#141f32] to-[#111a2a] border-b border-slate-700/70 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          
          {/* Toggle between Color Sensor and QR Scanner */}
          <div className="flex items-center bg-[#090f18] p-0.5 rounded-lg border border-slate-700 text-xs">
            <button
              onClick={() => setScannerMode('COLOR_SENSOR')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                scannerMode === 'COLOR_SENSOR'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className={`w-3.5 h-3.5 ${isWebcamActive ? 'text-emerald-300 animate-pulse' : ''}`} />
              <span>Color Sensor</span>
            </button>

            <button
              onClick={() => setScannerMode('QR_SCANNER')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                scannerMode === 'QR_SCANNER'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-purple-300" />
              <span>Dye Box QR</span>
            </button>
          </div>

          {isWebcamActive && (
            <span className="hidden sm:flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[10px] font-mono text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LIVE CAMERA ACTIVE</span>
            </span>
          )}
        </div>

        {/* Scan Mode Destination: Target vs Sample (Only in Color Sensor Mode) */}
        {scannerMode === 'COLOR_SENSOR' && (
          <div className="flex items-center bg-[#090e17] rounded-lg p-1 border border-slate-700 space-x-1">
            <span className="text-[10px] text-slate-400 font-medium px-1 hidden md:inline">{t.captureAs}</span>
            
            <button
              onClick={() => setScanDestination('TARGET')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                scanDestination === 'TARGET'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Captured scan will be set as Original Target Color"
            >
              <Target className="w-3 h-3" />
              <span>{t.originalTarget}</span>
            </button>

            <button
              onClick={() => setScanDestination('SAMPLE')}
              className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                scanDestination === 'SAMPLE'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Captured scan will be set as Autoclave Test Sample Color"
            >
              <FlaskConical className="w-3 h-3" />
              <span>{t.sampleTest}</span>
            </button>

            <button
              onClick={onOpenAiBot}
              className="flex items-center space-x-1.5 px-2 py-1 rounded text-[10px] sm:text-[11px] font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30 transition-all cursor-pointer active:scale-95 border border-purple-400/40 group"
              title="Open Textile AI Assistant Bot & Search Engine for Answers"
            >
              <Bot className="w-3.5 h-3.5 text-purple-200 animate-pulse group-hover:rotate-12 transition-transform" />
              <span>{t.aiBot || 'Ask AI Bot'}</span>
            </button>
          </div>
        )}

        {/* Lighting Mode Selector & Mode Switchers */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {cameraDevices.length > 1 && (
            <select
              value={selectedDeviceId}
              onChange={(e) => {
                setSelectedDeviceId(e.target.value);
                if (mode === 'webcam') startCamera(e.target.value, facingMode);
              }}
              className="bg-[#0a1019] border border-slate-700 text-slate-300 text-xs rounded px-2 py-1 focus:outline-none"
            >
              {cameraDevices.map((d, i) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Camera ${i + 1}`}
                </option>
              ))}
            </select>
          )}

          {/* Lighting Mode Selector */}
          <div className="flex items-center bg-[#0a1019] rounded-lg p-0.5 border border-slate-700 text-xs">
            {['D65', 'TL84', 'A', 'UV'].map((light) => (
              <button
                key={light}
                onClick={() => setLighting(light)}
                className={`px-1.5 sm:px-2 py-0.5 rounded font-mono text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${
                  lighting === light 
                    ? 'bg-cyan-600 text-white shadow-sm font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Illuminant: ${light}`}
              >
                {light}
              </button>
            ))}
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                setCapturedSnapshot(null);
                setMode('simulation');
              }}
              className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
                mode === 'simulation' ? 'bg-slate-700 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Optical Simulation Stage"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => {
                if (mode === 'webcam') {
                  setMode('simulation');
                } else {
                  setMode('webcam');
                }
              }}
              className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
                mode === 'webcam' ? 'bg-emerald-900/80 border-emerald-400 text-emerald-300 shadow-glow-green/30' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={mode === 'webcam' ? t.closeCamera : t.openLiveCamera}
            >
              <Video className="w-3.5 h-3.5" />
            </button>

            {mode === 'webcam' && (
              <button
                onClick={toggleCameraFacing}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 hover:text-white text-xs cursor-pointer transition-colors active:rotate-180 duration-300"
                title={`Flip Camera (Currently: ${facingMode === 'environment' ? 'Rear' : 'Front'})`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            <label className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white text-xs cursor-pointer transition-colors" title="Upload Swatch Photo">
              <Upload className="w-3.5 h-3.5" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Main Optical Chamber Enclosure */}
      <div className="relative flex-1 bg-gradient-to-b from-[#080d15] via-[#0d1422] to-[#080d15] p-3 sm:p-4 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Top Chamber Bezel with Camera Housing */}
        <div className="relative w-full max-w-xl z-20 flex flex-col items-center">
          <div className="w-40 sm:w-56 h-7 sm:h-8 bg-gradient-to-b from-[#2a3a50] via-[#1a2536] to-[#0c1420] rounded-t-lg border-t-2 border-x border-slate-500 shadow-xl flex items-center justify-center relative">
            <div className="absolute left-3 top-2 flex items-center space-x-1">
              <div className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${isWebcamActive ? 'bg-cyan-200 shadow-[0_0_14px_#00e5ff]' : 'bg-white shadow-[0_0_12px_#ffffff]'} animate-pulse`}></div>
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-200"></div>
            </div>
            
            <div className="absolute right-3 top-2 flex items-center space-x-1">
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-cyan-200"></div>
              <div className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${isWebcamActive ? 'bg-cyan-200 shadow-[0_0_14px_#00e5ff]' : 'bg-white shadow-[0_0_12px_#ffffff]'} animate-pulse`}></div>
            </div>

            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-slate-600 shadow-2xl flex items-center justify-center -mb-4 relative">
              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border shadow-[0_0_10px_#ef4444] flex items-center justify-center transition-all ${
                isWebcamActive 
                  ? 'bg-gradient-to-br from-emerald-500 via-emerald-700 to-black border-emerald-400 shadow-glow-green' 
                  : 'bg-gradient-to-br from-red-600 via-red-800 to-black border-red-500/80'
              }`}>
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isWebcamActive ? 'bg-emerald-200 animate-ping' : 'bg-red-400'} shadow-[0_0_6px_#ffffff]`}></div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md h-8 sm:h-12 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none -mt-1"></div>
        </div>

        {/* Central Fabric / QR Viewport */}
        <div 
          ref={chamberRef}
          onClick={handleChamberClick}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          className="relative w-full max-w-xl h-52 sm:h-64 md:h-72 bg-[#05080e] rounded-lg border-2 border-[#1f2d40] shadow-[inset_0_10px_30px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-end cursor-crosshair group select-none touch-none"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1320_1px,transparent_1px),linear-gradient(to_bottom,#0c1320_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:24px_24px] opacity-40 pointer-events-none"></div>

          {/* On-Camera Target Guide HUD */}
          {mode === 'webcam' && (
            <div className="absolute inset-x-3 top-3 z-40 p-2 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/60 text-white text-xs flex items-center justify-between shadow-2xl animate-fade-in">
              <div className="flex items-center space-x-2">
                {scanDestination === 'TARGET' ? (
                  <Target className="w-4 h-4 text-rose-400 animate-pulse" />
                ) : (
                  <FlaskConical className="w-4 h-4 text-cyan-400 animate-pulse" />
                )}
                <span className="font-semibold text-[11px] sm:text-xs">
                  {scanDestination === 'TARGET' 
                    ? 'Position Original Standard fabric -> Click Capture to lock code' 
                    : 'Position Dye-bath Sample fabric -> Click Capture to measure ΔE'}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                scanDestination === 'TARGET' ? 'bg-rose-600 text-white' : 'bg-cyan-600 text-white'
              }`}>
                {scanDestination === 'TARGET' ? 'ORIGINAL' : 'SAMPLE'}
              </span>
            </div>
          )}

          {cameraError && (
            <div className="absolute inset-x-3 top-3 z-40 p-2.5 sm:p-3 rounded-lg bg-red-950/90 border border-red-500/80 text-red-200 text-xs flex items-center space-x-2 shadow-xl">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Capture Success Toast */}
          {captureFeedbackMsg && (
            <div className="absolute inset-x-3 top-3 z-40 p-2.5 sm:p-3 rounded-lg bg-emerald-950/95 border border-emerald-500 text-emerald-200 text-xs flex items-center space-x-2 shadow-2xl animate-fade-in">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-mono font-bold">{captureFeedbackMsg}</span>
            </div>
          )}

          {/* QR Scanner Success Toast */}
          {qrScanSuccessMsg && (
            <div className="absolute inset-x-3 top-3 z-40 p-2.5 sm:p-3 rounded-lg bg-purple-950/95 border border-purple-500 text-purple-200 text-xs flex items-center space-x-2 shadow-2xl animate-fade-in">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="font-mono font-bold">{qrScanSuccessMsg}</span>
            </div>
          )}

          {/* Render Mode: Live Video / Snapshot / Uploaded Image / Simulation */}
          {mode === 'webcam' ? (
            capturedSnapshot ? (
              <img 
                src={capturedSnapshot} 
                alt="Captured Snapshot" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            )
          ) : mode === 'image' && uploadedImage ? (
            <img 
              src={uploadedImage} 
              alt="Uploaded Swatch" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : scannerMode === 'QR_SCANNER' ? (
            /* QR Box Scanning Simulation Stage */
            <div className="relative w-full h-40 sm:h-48 md:h-52 flex items-center justify-center p-4">
              <div className="w-full max-w-sm bg-[#121c2e] border border-slate-700 rounded-xl p-3 shadow-2xl flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-lg p-1.5 flex flex-col items-center justify-center shadow-md flex-shrink-0">
                  <div className="w-full h-full border-2 border-black grid grid-cols-4 gap-0.5 p-0.5 bg-black">
                    <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
                    <div className="bg-white"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
                    <div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div><div className="bg-black"></div>
                    <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
                  </div>
                </div>
                <div className="text-xs space-y-1 min-w-0">
                  <span className="px-1.5 py-0.2 rounded bg-purple-950 border border-purple-500/50 text-[10px] font-mono text-purple-300 font-bold">
                    Dye Box QR Scanner
                  </span>
                  <div className="font-bold text-white truncate">Box D-10 &bull; Crimson Red</div>
                  <div className="text-[10px] text-slate-400 font-mono">LOT-2026-CR90 &bull; 200%</div>
                  <button
                    onClick={() => handleTriggerQrBoxScan('D-10')}
                    className="mt-1 px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                  >
                    <QrCode className="w-3 h-3" />
                    <span>Scan Sample QR Box</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-36 sm:h-44 md:h-48 flex items-center justify-center px-4 sm:px-6">
              <div 
                className="w-full h-full rounded-t-sm shadow-2xl relative overflow-hidden transition-colors duration-500 border-t border-x border-white/20"
                style={{ 
                  backgroundColor: sampleColor,
                  filter: lighting === 'TL84' ? 'sepia(0.15) brightness(1.05)' : lighting === 'A' ? 'sepia(0.4) saturate(1.2)' : lighting === 'UV' ? 'brightness(1.2) hue-rotate(-20deg)' : 'none'
                }}
              >
                <div className="absolute inset-0 fabric-texture opacity-60 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent via-white/15 via-transparent to-black/40 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/30 pointer-events-none"></div>

                {(isScanning || isLiveScanning) && (
                  <div className="absolute inset-0 scanline-anim pointer-events-none"></div>
                )}
              </div>
            </div>
          )}

          {/* Lower Stage White Reference Bar */}
          <div className="relative w-full h-8 sm:h-10 bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] border-t-2 border-white/80 shadow-lg flex items-center justify-between px-3 sm:px-4 z-10">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-800 tracking-wider flex items-center gap-1 sm:gap-1.5">
              <span>{scannerMode === 'QR_SCANNER' ? 'QR INVENTORY SCANNER' : `${t.opticalStage} • ${mode === 'webcam' ? t.liveCamera : t.whiteBaseRef}`}</span>
              {scannerMode === 'COLOR_SENSOR' && (
                <span className={`px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold ${
                  scanDestination === 'TARGET' ? 'bg-rose-600 text-white' : 'bg-cyan-700 text-white'
                }`}>
                  {scanDestination === 'TARGET' ? t.originalTarget : t.sampleTest}
                </span>
              )}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-700 font-bold">
              {t.illuminant} {lighting}
            </span>
          </div>

          {/* Laser Crosshairs Reticle */}
          {scannerMode === 'COLOR_SENSOR' && (
            <div 
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-75"
              style={{ left: `${crosshairPos.x}%`, top: `${crosshairPos.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 shadow-lg animate-pulse ${
                  scanDestination === 'TARGET' 
                    ? 'border-rose-400 shadow-[0_0_12px_#f43f5e]' 
                    : 'border-cyan-400 shadow-[0_0_12px_#00e5ff]'
                }`}></div>
                <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                  scanDestination === 'TARGET' ? 'bg-rose-300' : 'bg-cyan-300'
                } shadow-[0_0_8px_#ffffff]`}></div>
                <div className={`absolute w-12 sm:w-16 h-[1px] ${
                  scanDestination === 'TARGET' ? 'bg-rose-400/70' : 'bg-cyan-400/70'
                }`}></div>
                <div className={`absolute h-12 sm:h-16 w-[1px] ${
                  scanDestination === 'TARGET' ? 'bg-rose-400/70' : 'bg-cyan-400/70'
                }`}></div>
                
                <div className="absolute -top-6 sm:-top-7 flex items-center space-x-1 px-1.5 py-0.5 rounded bg-black/90 border border-slate-700 shadow-lg">
                  <span 
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-white/40"
                    style={{ backgroundColor: sampleColor }}
                  />
                  <span className={`text-[8px] sm:text-[9px] font-mono font-bold ${
                    scanDestination === 'TARGET' ? 'text-rose-400' : 'text-cyan-300'
                  }`}>
                    {sampleColor}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Modal if "Ask" was selected */}
          {pendingCaptureColor && (
            <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="p-4 rounded-xl bg-[#0f172a] border border-slate-700 shadow-2xl text-center space-y-3 max-w-xs w-full animate-fade-in">
                <div className="flex items-center justify-center space-x-2">
                  <span 
                    className="w-6 h-6 rounded-md border border-white/30 shadow"
                    style={{ backgroundColor: pendingCaptureColor }}
                  />
                  <span className="font-mono text-sm font-bold text-white">{pendingCaptureColor}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  {t.assignCapturedAs}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onTargetSampled && onTargetSampled(pendingCaptureColor);
                      setPendingCaptureColor(null);
                      stopCamera();
                      setMode('simulation');
                    }}
                    className="p-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 cursor-pointer shadow-md active:scale-95"
                  >
                    <Target className="w-4 h-4" />
                    <span>{t.originalTarget}</span>
                  </button>
                  <button
                    onClick={() => {
                      onColorSampled && onColorSampled(pendingCaptureColor);
                      setPendingCaptureColor(null);
                      stopCamera();
                      setMode('simulation');
                    }}
                    className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 cursor-pointer shadow-md active:scale-95"
                  >
                    <FlaskConical className="w-4 h-4" />
                    <span>{t.sampleTest}</span>
                  </button>
                </div>
                <button
                  onClick={() => setPendingCaptureColor(null)}
                  className="text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer pt-1"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Action Controls Toolbar & Equalize Card */}
        <div className="w-full max-w-xl mt-3 flex flex-col gap-2.5 px-1">
          
          {/* Workflow Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            {/* 1. Scan Original */}
            <button
              onClick={() => handleStartScanningDestination('TARGET')}
              className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer active:scale-95 ${
                mode === 'webcam' && scanDestination === 'TARGET'
                  ? 'bg-rose-950 border-rose-400 text-white shadow-lg ring-1 ring-rose-400'
                  : 'bg-[#111a28] hover:bg-[#162235] border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Target className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[9px] font-mono text-rose-300 font-bold uppercase">Step 1</span>
              </div>
              <div className="mt-1">
                <div className="text-xs font-bold truncate">Scan Original</div>
                <div className="text-[10px] text-slate-400 truncate">{targetColor}</div>
              </div>
            </button>

            {/* 2. Enter Original Code */}
            <button
              onClick={onOpenOriginalColorModal}
              className="p-2 rounded-xl bg-[#111a28] hover:bg-[#162235] border border-slate-700 text-left flex flex-col justify-between transition-all cursor-pointer active:scale-95 text-slate-200"
            >
              <div className="flex items-center justify-between w-full">
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[9px] font-mono text-amber-300 font-bold uppercase">Code</span>
              </div>
              <div className="mt-1">
                <div className="text-xs font-bold truncate">Enter Code</div>
                <div className="text-[10px] text-slate-400 truncate">HEX / RGB</div>
              </div>
            </button>

            {/* 3. Scan Sample */}
            <button
              onClick={() => handleStartScanningDestination('SAMPLE')}
              className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer active:scale-95 ${
                mode === 'webcam' && scanDestination === 'SAMPLE'
                  ? 'bg-cyan-950 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                  : 'bg-[#111a28] hover:bg-[#162235] border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[9px] font-mono text-cyan-300 font-bold uppercase">Step 2</span>
              </div>
              <div className="mt-1">
                <div className="text-xs font-bold truncate">Scan Sample</div>
                <div className="text-[10px] text-slate-400 truncate">{sampleColor}</div>
              </div>
            </button>

            {/* 4. Equalize Button */}
            <button
              onClick={onMatchPerfect}
              className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer active:scale-95 ${
                isMatch
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-glow-green/30'
                  : 'bg-gradient-to-br from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 border-emerald-400/50 text-white shadow-md'
              }`}
              title="Apply exact chemical recipe additions to make sample equal to original"
            >
              <div className="flex items-center justify-between w-full">
                <Equal className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-[9px] font-mono font-bold uppercase text-emerald-200">
                  {isMatch ? 'MATCHED' : 'EQUAL'}
                </span>
              </div>
              <div className="mt-1">
                <div className="text-xs font-black truncate">Equalize Color</div>
                <div className="text-[10px] opacity-90 truncate">&Delta;E {deltaE.toFixed(1)} &rarr; 0.0</div>
              </div>
            </button>

          </div>

          {/* When Camera is active: Capture Bar */}
          {mode === 'webcam' && (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#09101b] border border-cyan-500/40 animate-fade-in">
              {scanDestination === 'TARGET' ? (
                <button
                  onClick={() => handleCaptureSample('TARGET')}
                  className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <Target className="w-4 h-4" />
                  <span>Capture Original Standard &amp; Turn Off Camera</span>
                </button>
              ) : (
                <button
                  onClick={() => handleCaptureSample('SAMPLE')}
                  className="flex-1 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <FlaskConical className="w-4 h-4" />
                  <span>Capture Sample Swatch &amp; Turn Off Camera</span>
                </button>
              )}

              <button
                onClick={() => {
                  stopCamera();
                  setMode('simulation');
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-600 cursor-pointer"
              >
                {t.closeCamera}
              </button>
            </div>
          )}

          {/* Test Swatch Pills (Swipeable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 touch-pan-x">
            <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 hidden sm:inline">Presets:</span>
            {presetSamples.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCapturedSnapshot(null);
                  if (scanDestination === 'TARGET') {
                    onTargetSampled && onTargetSampled(p.hex);
                  } else {
                    onColorSampled(p.hex);
                  }
                }}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs border transition-all cursor-pointer flex-shrink-0 active:scale-95 ${
                  sampleColor.toUpperCase() === p.hex.toUpperCase()
                    ? 'bg-slate-700 border-cyan-400 text-white shadow-sm'
                    : 'bg-[#0f172a]/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
                title={`Set ${p.label} to ${scanDestination}`}
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                  style={{ backgroundColor: p.hex }}
                />
                <span className="font-mono text-[10px]">{p.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
