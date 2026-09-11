import React, { useRef, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  CheckSquare, 
  Scale, 
  QrCode, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Calendar, 
  Clock, 
  Tag,
  Edit3
} from 'lucide-react';
import { translations } from '../utils/translations';

export default function DyeDosingReceiptModal({
  isOpen,
  onClose,
  batchId = '#1245',
  clientCode = '#C82030',
  targetHex = '#C82030',
  sampleHex = '#D2453A',
  analysis,
  yardage = 2000,
  waterVolume = 4200,
  fabricGsm = 220,
  selectedRecipeId = '027.GROSSO03.GROSSO03',
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
  const liquorRatio = Math.round((waterVolume / fabricKg) * 100.0) / 100.0;
  const deltaE = analysis?.deltaE ?? 4.8;
  const isMatch = analysis?.isMatch ?? false;

  // Format date according to locale
  const now = new Date();
  const dateStr = now.toLocaleDateString(currentLang === 'EN' ? 'en-US' : currentLang === 'ES' ? 'es-ES' : currentLang === 'FR' ? 'fr-FR' : currentLang === 'DE' ? 'de-DE' : currentLang === 'NL' ? 'nl-NL' : 'pt-PT');
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const deliveryDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(currentLang === 'EN' ? 'en-US' : 'es-ES');
  const receiptNo = batchId.replace('#', '') || '187248';

  // Dyes and auxiliaries from analysis or standard formulation
  const dyeAdvices = analysis?.advices?.filter(a => a.type !== 'CYCLE' && a.type !== 'PASS') || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-slate-900 border-2 border-slate-600 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-fade-in text-slate-900">
        
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="px-4 sm:px-6 py-3 bg-[#111928] border-b border-slate-700 flex items-center justify-between text-white print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{t.receiptTitle || 'Dye Receipt'}</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500/50 text-[10px] font-mono text-amber-300 font-bold">
                  {t.manualDispensing || 'MANUAL DISPENSING'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {t.officialTicketSub || 'Official batch recipe ticket for manual scale weighing & human dye-house additions'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printTicketPdf || 'Print Ticket / PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Industrial Sheet (White Paper Background) */}
        <div 
          ref={printRef}
          className="flex-1 p-5 sm:p-8 overflow-y-auto bg-white text-black font-sans print:p-0 print:m-0 print:text-black print:bg-white selection:bg-cyan-200"
          style={{ minHeight: '600px' }}
        >
          
          {/* Sheet Top Border and Header: ONLY Dye Receipt, Company Name & Receipt Number */}
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
                    {t.recipeLabel || 'RECIPE:'} {selectedRecipeId}
                  </div>
                </div>
              </div>

              {/* Right: Receipt Number & Date */}
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-black">
                  {t.receiptNo || 'Receipt No.'} #{receiptNo}
                </div>
                <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                  {t.dateTimeLabel ? t.dateTimeLabel.replace(':', '') : 'Fecha'}: {dateStr} {timeStr}
                </div>
              </div>

            </div>
          </div>

          {/* Date & Core Parameters Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2 border-t border-slate-300 text-xs font-mono">
            <div>
              <span className="text-slate-600 block text-[10px]">{t.dateTimeLabel || 'FECHA / HORA:'}</span>
              <span className="font-bold text-black">{dateStr} {timeStr}</span>
              <span className="text-slate-500 block text-[10px]">{deliveryDate}</span>
            </div>
            <div>
              <span className="text-slate-600 block text-[10px]">{t.recipeLabel || 'RECETA:'}</span>
              <span className="font-bold text-black truncate block">{selectedRecipeId}</span>
            </div>
            <div>
              <span className="text-slate-600 block text-[10px]">{t.metersWeightLabel || 'METROS / PESO:'}</span>
              <span className="font-bold text-black">{yardage} m &bull; {fabricKg} kg</span>
            </div>
            <div>
              <span className="text-slate-600 block text-[10px]">{t.volumeRatioLabel || 'VOLUMEN / REL. BAÑO:'}</span>
              <span className="font-bold text-black">{waterVolume} L &bull; {liquorRatio}</span>
            </div>
          </div>

          {/* Comments & Physical Swatch Box */}
          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-800 font-mono">{t.commentsLabel || 'Coment.:'}</span>
            <div className="border border-black rounded p-2 h-14 flex items-center justify-between text-xs font-mono bg-slate-50">
              <div className="space-y-0.5">
                <div><strong>{t.standardTarget || 'Standard Target:'}</strong> {targetHex} &nbsp;|&nbsp; <strong>{t.sampleDetected || 'Sample Detected:'}</strong> {sampleHex} &nbsp;|&nbsp; <strong>&Delta;E:</strong> {deltaE.toFixed(1)}</div>
                <div className="text-[10px] text-slate-600">{t.commentsText || 'Weigh dyes using high precision analytical balance. Dissolve in warm water at 60°C before adding to dispensing tank.'}</div>
              </div>
              
              {/* Visual Swatch Boxes for Stapling */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="border border-dashed border-slate-400 w-10 h-10 rounded flex items-center justify-center text-[8px] text-center text-slate-400">
                  {t.stapleSwatch || 'Grapa Muestra'}
                </div>
                <div 
                  className="w-8 h-8 rounded border border-black shadow-sm"
                  style={{ backgroundColor: targetHex }}
                  title="Target Color Swatch"
                />
                <div 
                  className="w-8 h-8 rounded border border-black shadow-sm"
                  style={{ backgroundColor: sampleHex }}
                  title="Sample Color Swatch"
                />
              </div>
            </div>
          </div>

          {/* DYE DOSING RECIPE TABLE */}
          <div className="mt-3 font-mono text-xs">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-1 py-1.5 border-b-2 border-black font-black text-[11px] text-slate-900 uppercase">
              <div className="col-span-2">{t.concentrationCol || 'Concentración'}</div>
              <div className="col-span-4">{t.processDescCol || 'Descripción Proceso'}</div>
              <div className="col-span-4">{t.productDyeCol || 'Descripción (Producto / Colorante)'}</div>
              <div className="col-span-1 text-right">{t.quantityCol || 'Cantidad'}</div>
              <div className="col-span-1 text-right">{t.binCol || 'Bidón'}</div>
            </div>

            {/* SECTION 1: DYEING CYCLE (027.GROSSO03) */}
            <div className="bg-slate-200 px-2 py-0.5 font-bold text-[11px] border-b border-black flex justify-between mt-1">
              <span>027.GROSSO03 &bull; 027.GROSSO03.GROSSO03</span>
              <span>{t.cycleHighTemp || 'Ciclo: TINTURA ALTA Tª (100°C)'}</span>
            </div>

            <div className="divide-y divide-slate-300 text-[11px]">
              
              {/* Process Step 1 Highlight */}
              <div className="grid grid-cols-12 gap-1 py-1 items-center bg-amber-100/60 font-bold text-amber-900">
                <div className="col-span-2 text-[10px]">100°C 20MINUTS</div>
                <div className="col-span-10 text-[10px] uppercase">{t.rampDown90 || 'BAIXAR A 90°C 10 MINUTS (Curva de Agotamiento)'}</div>
              </div>

              {/* Dye Line 1: Yellow */}
              <div className="grid grid-cols-12 gap-1 py-1.5 items-center">
                <div className="col-span-2 font-bold">0.00730 %</div>
                <div className="col-span-4 text-slate-600 text-[10px]">{t.yellowDyeBase || 'Base Yellow Dye'}</div>
                <div className="col-span-4 font-bold flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: '#FBC02D' }} />
                  <span>{t.yellowDyeBase || 'Yellow Dye'} C-23C (Serilene R4L 200%)</span>
                </div>
                <div className="col-span-1 text-right font-black text-black">8.61 gr</div>
                <div className="col-span-1 text-right font-bold text-cyan-800">D-15</div>
              </div>

              {/* Dye Line 2: Red */}
              <div className="grid grid-cols-12 gap-1 py-1.5 items-center">
                <div className="col-span-2 font-bold">0.00420 %</div>
                <div className="col-span-4 text-slate-600 text-[10px]">{t.redDyeBase || 'Base Red Dye'}</div>
                <div className="col-span-4 font-bold flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: '#E53935' }} />
                  <span>{t.redDyeBase || 'Red Dye'} C-25E (Serilene 2BL 200%)</span>
                </div>
                <div className="col-span-1 text-right font-black text-black">4.96 gr</div>
                <div className="col-span-1 text-right font-bold text-rose-800">D-10</div>
              </div>

              {/* Dye Line 3: Blue */}
              <div className="grid grid-cols-12 gap-1 py-1.5 items-center">
                <div className="col-span-2 font-bold">0.00210 %</div>
                <div className="col-span-4 text-slate-600 text-[10px]">{t.blueDyeBase || 'Base Blue Dye'}</div>
                <div className="col-span-4 font-bold flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: '#1565C0' }} />
                  <span>{t.blueDyeBase || 'Blue Dye'} C-21F (Tersetil RBL 160%)</span>
                </div>
                <div className="col-span-1 text-right font-black text-black">2.48 gr</div>
                <div className="col-span-1 text-right font-bold text-blue-800">D-12</div>
              </div>

              {/* Dynamic Suggested Dosing Adjustments from Active Color Match Engine */}
              {dyeAdvices.map((adv, idx) => {
                const dyeHex = adv.hexColor || adv.color || '#E53935';
                const gramsVal = adv.grams ? `${adv.grams.toLocaleString()} gr` : `${adv.kg} kg`;
                const percentVal = adv.percentage ? `${adv.percentage.toFixed(4)} %` : '0.00500 %';

                return (
                  <div key={idx} className="grid grid-cols-12 gap-1 py-1.5 items-center bg-cyan-50/70 font-semibold border-l-2 border-cyan-600">
                    <div className="col-span-2 font-bold text-cyan-900">{percentVal}</div>
                    <div className="col-span-4 text-cyan-800 text-[10px]">{t.spectroAdjustment || 'Ajuste Espectrofotométrico ΔE'}</div>
                    <div className="col-span-4 font-bold flex items-center space-x-1.5 text-black">
                      <span className="w-2.5 h-2.5 rounded-full border border-black" style={{ backgroundColor: dyeHex }} />
                      <span>{adv.dyeName} ({adv.strength || '200%'})</span>
                    </div>
                    <div className="col-span-1 text-right font-black text-cyan-950">{gramsVal}</div>
                    <div className="col-span-1 text-right font-bold text-cyan-800">{adv.boxCode || 'D-10'}</div>
                  </div>
                );
              })}

              {/* Auxiliaries */}
              <div className="grid grid-cols-12 gap-1 py-1.5 items-center text-slate-700">
                <div className="col-span-2">1.00000 cc/l</div>
                <div className="col-span-4 text-[10px]">{t.levellingDesc || 'Agente Igualador / Dispersante'}</div>
                <div className="col-span-4 font-semibold text-black">{t.levellingAgent || 'EUROGAL L25 (Levelling Agent)'}</div>
                <div className="col-span-1 text-right font-bold text-black">{waterVolume}.00 cc</div>
                <div className="col-span-1 text-right font-mono">AUX-01</div>
              </div>

              <div className="grid grid-cols-12 gap-1 py-1.5 items-center text-slate-700">
                <div className="col-span-2">1.00000 gr/l</div>
                <div className="col-span-4 text-[10px]">{t.glauberDesc || 'Electrolito Sales Neutras'}</div>
                <div className="col-span-4 font-semibold text-black">{t.glauberSalt || "SULFATO SODICO (Glauber's Salt)"}</div>
                <div className="col-span-1 text-right font-bold text-black">{waterVolume}.00 gr</div>
                <div className="col-span-1 text-right font-mono">AUX-02</div>
              </div>

              {/* Intermediate QC Step */}
              <div className="grid grid-cols-12 gap-1 py-1 items-center bg-amber-100/80 font-bold text-amber-950">
                <div className="col-span-2 text-[10px]">QC CHECK</div>
                <div className="col-span-10 text-[10px] uppercase">{t.checkShadeRinse || 'ACLARAR 40°C 15 MINUTS (Comprobación de Tono en Húmedo)'}</div>
              </div>

              <div className="grid grid-cols-12 gap-1 py-1.5 items-center text-slate-700">
                <div className="col-span-2">0.50000 cc/l</div>
                <div className="col-span-4 text-[10px]">{t.soapingDesc || 'Lavado Reductor / Jabonado'}</div>
                <div className="col-span-4 font-semibold text-black">{t.soapingAgent || 'ASUTOL BF (Detergente Lavado)'}</div>
                <div className="col-span-1 text-right font-bold text-black">{Math.round(waterVolume * 0.5)}.00 cc</div>
                <div className="col-span-1 text-right font-mono">AUX-04</div>
              </div>

              <div className="grid grid-cols-12 gap-1 py-1.5 items-center text-slate-700">
                <div className="col-span-2">1.00000 cc/l</div>
                <div className="col-span-4 text-[10px]">{t.formicDesc || 'Neutralizado pH 5.5'}</div>
                <div className="col-span-4 font-semibold text-black">{t.formicAcid || 'ACIDO FORMICO / ACETICO 80%'}</div>
                <div className="col-span-1 text-right font-bold text-black">{waterVolume}.00 cc</div>
                <div className="col-span-1 text-right font-mono">AUX-03</div>
              </div>

            </div>

            {/* SECTION 2: SOFTENING & FINISHING (062.SPE50) */}
            <div className="bg-slate-200 px-2 py-0.5 font-bold text-[11px] border-y border-black flex justify-between mt-3">
              <span>062.SPE50</span>
              <span>{t.softeningCycle || 'SUAVIZADO 4% • Ciclo: 4010 • 40°C DESCARGAR SIN ACLARAR'}</span>
            </div>

            <div className="divide-y divide-slate-300 text-[11px]">
              <div className="grid grid-cols-12 gap-1 py-1.5 items-center">
                <div className="col-span-2 font-bold">4.00000 %</div>
                <div className="col-span-4 text-slate-600 text-[10px]">{t.softenerDesc || 'Suavizante Catiónico Tacto Seda'}</div>
                <div className="col-span-4 font-bold text-black">{t.softenerProduct || 'EUROTOUCH - RF'}</div>
                <div className="col-span-1 text-right font-black text-black">{(fabricKg * 40).toFixed(2)} gr</div>
                <div className="col-span-1 text-right font-mono">AUX-05</div>
              </div>

              <div className="grid grid-cols-12 gap-1 py-1.5 items-center">
                <div className="col-span-2 font-bold">0.50000 cc/l</div>
                <div className="col-span-4 text-slate-600 text-[10px]">{t.phRegulatorDesc || 'Regulador pH Final'}</div>
                <div className="col-span-4 font-bold text-black">{t.phRegulator || 'ACIDO ACETICO 80%'}</div>
                <div className="col-span-1 text-right font-black text-black">{(waterVolume * 0.5).toFixed(2)} cc</div>
                <div className="col-span-1 text-right font-mono">AUX-03</div>
              </div>
            </div>

          </div>

          {/* HUMAN WEIGHING & OPERATOR VERIFICATION SIGN-OFF */}
          <div className="mt-4 pt-3 border-t-2 border-black grid grid-cols-3 gap-3 text-[11px] font-mono">
            
            <div className="border border-black p-2 rounded flex flex-col justify-between h-20">
              <span className="font-bold block text-slate-700">{t.weighedByOperator || '1. PESADO POR OPERARIO:'}</span>
              <div className="flex items-center space-x-1.5 text-slate-500">
                <div className="w-3.5 h-3.5 border border-black rounded-sm"></div>
                <span className="text-[10px]">{t.balanceGramsOk || 'Balanza #2 (Grams OK)'}</span>
              </div>
              <span className="text-[10px] text-slate-600 border-t border-dotted border-slate-400 pt-0.5">{t.operatorSign || 'Firma Operario: ________________'}</span>
            </div>

            <div className="border border-black p-2 rounded flex flex-col justify-between h-20">
              <span className="font-bold block text-slate-700">{t.verifiedLabQc || '2. VERIFICADO LABORATORIO:'}</span>
              <div className="flex items-center space-x-1.5 text-slate-500">
                <div className="w-3.5 h-3.5 border border-black rounded-sm"></div>
                <span className="text-[10px]">{t.spectroCiede2000 || 'Espectrofotómetro CIEDE2000'}</span>
              </div>
              <span className="text-[10px] text-slate-600 border-t border-dotted border-slate-400 pt-0.5">{t.labSign || 'Firma Lab QC: ________________'}</span>
            </div>

            <div className="border border-black p-2 rounded flex flex-col justify-between h-20 bg-slate-50">
              <div className="flex justify-between items-start">
                <span className="font-bold block text-slate-700">{t.qualityControl || '3. CONTROL CALIDAD:'}</span>
                <span className="text-[8px] font-bold px-1 bg-black text-white rounded">{t.approvedBadge || 'APROBADO'}</span>
              </div>
              <div className="text-[9px] text-slate-700 font-bold">
                {t.conformingLotIso || 'Lote Conforme • ISO 9001'}
              </div>
              <span className="text-[9px] text-slate-500">{t.finalQcInspection || 'Inspección Final de Tintura (QC)'}</span>
            </div>

          </div>

          {/* Barcode representation at bottom */}
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-300 pt-2">
            <span>Ticket ID: TCK-{batchId.replace('#', '')}-{dateStr.replaceAll('/', '')}</span>
            <span className="font-bold tracking-widest text-black">||| | |||| | ||| |||| | |||||| | ||| |</span>
            <span>{t.machineJet || 'Máquina: JET22 • Autoclave Unit #3'}</span>
          </div>

        </div>

        {/* Modal Bottom Action Bar (Hidden on print) */}
        <div className="px-4 sm:px-6 py-3 bg-[#0c1422] border-t border-slate-700 flex items-center justify-between print:hidden">
          <span className="text-xs font-mono text-slate-400">
            Stephen Karikari Industrial Textile Automation System
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printTicketPdf || 'Print Industrial Dosing Receipt'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              {t.close || 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

