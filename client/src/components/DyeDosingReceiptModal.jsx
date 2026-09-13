import React, { useRef, useState } from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  Edit3,
  CheckCircle,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { translations } from '../utils/translations';
import { parseAnyColor, rgbToLab } from '../utils/colorEngine';
import './DyeDosingReceiptModal.css';

export default function DyeDosingReceiptModal({
  isOpen,
  onClose,
  batchId = '#1245',
  clientCode = '#C82030',
  targetHex = '#C82030',
  sampleHex = '#D2453A',
  targetColor,
  sampleColor,
  analysis,
  yardage = 2000,
  waterVolume = 4200,
  fabricGsm = 220,
  selectedRecipeId = '027.GROSSO03',
  currentLang = 'EN'
}) {
  const printRef = useRef(null);
  const [companyName, setCompanyName] = useState(() => localStorage.getItem('receipt_company_name') || 'Textile Dyeing Mills Ltd.');
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  const t = translations[currentLang] || translations.EN;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const fabricKg = Math.round(((yardage * 1.6 * fabricGsm) / 1000.0) * 10.0) / 10.0;
  const deltaE = analysis?.deltaE ?? 4.8;
  const isMatch = analysis?.isMatch ?? (deltaE <= 1.0);

  const targetParsed = parseAnyColor(targetHex) || { hex: '#C82030' };
  const sampleParsed = parseAnyColor(sampleHex) || { hex: '#D2453A' };

  const now = new Date();
  const dateStr = now.toLocaleDateString(currentLang === 'EN' ? 'en-US' : currentLang === 'ES' ? 'es-ES' : currentLang === 'FR' ? 'fr-FR' : currentLang === 'DE' ? 'de-DE' : currentLang === 'NL' ? 'nl-NL' : 'pt-PT');
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const receiptNo = batchId.replace('#', '') || '1245';

  // Dyes to weigh
  const dyeAdvices = analysis?.advices?.filter(a => a.type !== 'CYCLE' && a.type !== 'PASS') || [];

  // Standard base dyes
  const baseDyes = [
    { name: 'Yellow C-23C (Serilene 200%)', color: '#FBC02D', weight: '8.61 g', bin: 'Bin D-15', percent: '0.0073%' },
    { name: 'Red C-25E (Serilene 200%)', color: '#E53935', weight: '4.96 g', bin: 'Bin D-10', percent: '0.0042%' },
    { name: 'Blue C-21F (Tersetil 160%)', color: '#1565C0', weight: '2.48 g', bin: 'Bin D-12', percent: '0.0021%' }
  ];

  // Auxiliaries
  const auxiliaries = [
    { name: 'EUROGAL L25 (Levelling Agent)', amount: `${waterVolume} cc`, bin: 'AUX-01' },
    { name: "SULFATO SÓDICO (Glauber's Salt)", amount: `${waterVolume} g`, bin: 'AUX-02' },
    { name: 'ACIDO FORMICO / ACETICO 80%', amount: `${waterVolume} cc`, bin: 'AUX-03' }
  ];

  return (
    <div className="receipt-modal-backdrop">
      <div className="bg-slate-900 border-2 border-slate-600 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-slate-900">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="px-4 py-3 bg-[#111928] border-b border-slate-700 flex items-center justify-between text-white print:hidden">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{t.receiptTitle || 'Dye Weighing Ticket'}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 font-bold">
                  SCALE READY
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printTicketPdf || 'Print Ticket / PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Clean, Printable Industrial Weighing Ticket */}
        <div 
          ref={printRef}
          className="receipt-paper-document flex-1 p-6 sm:p-8 overflow-y-auto bg-white text-black font-sans print:p-0 print:m-0 print:text-black print:bg-white"
        >
          
          {/* Header: Company Name & Ticket Number */}
          <div className="border-b-4 border-black pb-3 flex justify-between items-start">
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
                    className="border-2 border-black px-2 py-1 text-sm font-bold rounded"
                    autoFocus
                    onBlur={() => setIsEditingCompany(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingCompany(false)}
                  />
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditingCompany(true)}
                  className="cursor-pointer group flex items-center gap-2"
                  title="Click to edit Company Name"
                >
                  <h1 className="font-black text-xl sm:text-2xl uppercase tracking-tight text-black group-hover:underline">
                    {companyName}
                  </h1>
                  <Edit3 className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity print:hidden" />
                </div>
              )}
              <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">
                {t.recipeLabel || 'RECIPE:'} {selectedRecipeId} &bull; BATCH #{receiptNo}
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="bg-black text-white px-3 py-1 text-lg font-black tracking-tight rounded">
                TICKET #{receiptNo}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">
                {dateStr} {timeStr}
              </div>
            </div>
          </div>

          {/* Core Batch Parameters */}
          <div className="grid grid-cols-3 gap-2 py-2 border-b-2 border-slate-300 text-xs font-mono font-bold text-slate-800">
            <div>Fabric: <span className="text-black font-black text-sm">{fabricKg} kg</span> ({yardage} m)</div>
            <div className="text-center">Water: <span className="text-black font-black text-sm">{waterVolume} L</span></div>
            <div className="text-right">&Delta;E Variance: <span className={`font-black text-sm ${isMatch ? 'text-emerald-700' : 'text-red-700'}`}>{deltaE.toFixed(1)}</span></div>
          </div>

          {/* Simple Visual Color Match Block */}
          <div className="my-3 p-3 bg-slate-100 border-2 border-black rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Original Color */}
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-md border-2 border-black shadow-sm flex-shrink-0"
                  style={{ backgroundColor: targetHex }}
                />
                <div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">Original (Target)</div>
                  <div className="font-black font-mono text-sm">{targetHex}</div>
                </div>
              </div>

              <div className="text-slate-400 font-bold text-lg">&rarr;</div>

              {/* Sample Measured Color */}
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-md border-2 border-black shadow-sm flex-shrink-0"
                  style={{ backgroundColor: sampleHex }}
                />
                <div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">Current Sample</div>
                  <div className="font-black font-mono text-sm">{sampleHex}</div>
                </div>
              </div>
            </div>

            {/* Staple Area */}
            <div className="border-2 border-dashed border-slate-400 w-12 h-12 rounded flex items-center justify-center text-[8px] font-bold text-center text-slate-500 bg-white">
              {t.stapleSwatch || 'GRAPA MUESTRA'}
            </div>
          </div>

          {/* =========================================================================
              PRIMARY WEIGHING TABLE: SIMPLE & CLEAR
             ========================================================================= */}
          <div className="mt-4">
            <div className="bg-black text-white px-3 py-1.5 font-black text-sm uppercase tracking-wider rounded-t-md flex items-center justify-between">
              <span>{t.dyesToEqualizeTitle || 'COLORANTS TO WEIGH ON BALANCE'}</span>
              <span className="text-xs font-mono font-normal">HIGH PRECISION SCALE</span>
            </div>

            <div className="border-2 border-black border-t-0 rounded-b-md divide-y-2 divide-slate-200 text-sm font-mono">
              
              {/* Table Column Headers */}
              <div className="grid grid-cols-12 gap-2 p-2 bg-slate-200 font-black text-xs text-slate-900 uppercase">
                <div className="col-span-1 text-center">CHECK</div>
                <div className="col-span-6">COLOR / DYE NAME</div>
                <div className="col-span-3 text-right">EXACT WEIGHT</div>
                <div className="col-span-2 text-right">BIN / LOCATION</div>
              </div>

              {/* 1. Base Dyes */}
              {baseDyes.map((dye, idx) => (
                <div key={`base-${idx}`} className="grid grid-cols-12 gap-2 p-3 items-center hover:bg-slate-50">
                  <div className="col-span-1 flex justify-center">
                    <div className="w-5 h-5 border-2 border-black rounded"></div>
                  </div>
                  <div className="col-span-6 flex items-center space-x-3 font-bold text-black text-sm">
                    <span 
                      className="w-5 h-5 rounded-full border-2 border-black flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: dye.color }}
                    />
                    <span className="truncate">{dye.name}</span>
                  </div>
                  <div className="col-span-3 text-right font-black text-black text-base">
                    {dye.weight}
                  </div>
                  <div className="col-span-2 text-right font-black text-cyan-900 text-sm">
                    {dye.bin}
                  </div>
                </div>
              ))}

              {/* 2. Color Match Correction Additions (If needed) */}
              {dyeAdvices.map((adv, idx) => {
                const dyeColor = adv.hexColor || adv.color || '#E53935';
                const weightText = adv.grams ? `${adv.grams.toLocaleString()} g` : `${adv.kg} kg`;
                return (
                  <div key={`adv-${idx}`} className="grid grid-cols-12 gap-2 p-3 items-center bg-amber-50/80 border-l-4 border-amber-500">
                    <div className="col-span-1 flex justify-center">
                      <div className="w-5 h-5 border-2 border-black rounded bg-white"></div>
                    </div>
                    <div className="col-span-6 flex items-center space-x-3 font-bold text-amber-950 text-sm">
                      <span 
                        className="w-5 h-5 rounded-full border-2 border-black flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: dyeColor }}
                      />
                      <span className="truncate">{adv.dyeName || adv.text}</span>
                    </div>
                    <div className="col-span-3 text-right font-black text-amber-950 text-base">
                      {weightText}
                    </div>
                    <div className="col-span-2 text-right font-black text-amber-900 text-sm">
                      {adv.boxCode || 'D-10'} (Tray #{adv.tray || 1})
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Simple Auxiliaries List */}
          <div className="mt-4">
            <div className="bg-slate-800 text-white px-3 py-1 font-black text-xs uppercase tracking-wider rounded-t-md">
              AUXILIARIES / CHEMICALS
            </div>
            <div className="border-2 border-slate-800 border-t-0 rounded-b-md divide-y divide-slate-200 text-xs font-mono">
              {auxiliaries.map((aux, idx) => (
                <div key={`aux-${idx}`} className="grid grid-cols-12 gap-2 p-2 items-center">
                  <div className="col-span-1 flex justify-center">
                    <div className="w-4 h-4 border-2 border-black rounded"></div>
                  </div>
                  <div className="col-span-7 font-bold text-black">{aux.name}</div>
                  <div className="col-span-2 text-right font-black text-black">{aux.amount}</div>
                  <div className="col-span-2 text-right font-bold text-slate-600">{aux.bin}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clear Operator Verification Sign-Off */}
          <div className="mt-5 pt-3 border-t-2 border-black grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="border-2 border-black p-3 rounded-lg flex flex-col justify-between h-20">
              <div className="flex items-center space-x-2 font-bold text-black">
                <div className="w-4 h-4 border-2 border-black rounded"></div>
                <span>WEIGHED ON BALANCE #2</span>
              </div>
              <div className="text-[11px] font-bold border-t border-dotted border-black pt-1">
                Operator Signature: _______________________
              </div>
            </div>

            <div className="border-2 border-black p-3 rounded-lg flex flex-col justify-between h-20 bg-slate-50">
              <div className="flex items-center space-x-2 font-bold text-black">
                <div className="w-4 h-4 border-2 border-black rounded"></div>
                <span>LAB / QC APPROVED</span>
              </div>
              <div className="text-[11px] font-bold border-t border-dotted border-black pt-1">
                QC Signature: ___________________________
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar (Hidden on print) */}
        <div className="px-4 py-3 bg-[#0c1422] border-t border-slate-700 flex items-center justify-between print:hidden">
          <span className="text-xs font-mono text-slate-400">
            Stephen Karikari Industrial Textile Automation System
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printTicketPdf || 'Print Simple Weighing Ticket (PDF)'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              {t.close || 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
