import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Search, 
  ShieldAlert, 
  Package, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  FlaskConical, 
  Info,
  ExternalLink,
  Layers
} from 'lucide-react';
import { DYE_BOX_DATABASE, findDyeByBoxCode } from '../utils/dyeDatabase';
import { translations } from '../utils/translations';

export default function DyeInventoryModal({
  isOpen,
  onClose,
  onSelectDyeBox,
  currentLang = 'EN'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBox, setSelectedBox] = useState(DYE_BOX_DATABASE[0]);
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'REACTIVE' | 'BLEACH' | 'AUX'

  if (!isOpen) return null;

  const filteredDyes = DYE_BOX_DATABASE.filter(dye => {
    const matchesSearch = 
      dye.dyeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dye.boxCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dye.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dye.tone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dye.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === 'REACTIVE') return dye.dyeType.includes('Reactive');
    if (activeTab === 'BLEACH') return dye.dyeType.includes('Bleach');
    if (activeTab === 'AUX') return dye.dyeType.includes('Auxiliary') || dye.dyeType.includes('Electrolyte') || dye.dyeType.includes('Alkali');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#0b121e] border-2 border-cyan-500/40 rounded-2xl max-w-5xl w-full shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-[90vh] animate-fade-in">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-[#162338] via-[#101928] to-[#0d1420] border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                <span>Dye Box Inventory &amp; Safety Database</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-900/60 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
                  QR Verified
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Box codes, dye strengths (200%, 450%), batch numbers, suppliers &amp; GHS safety sheets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (2 Columns on MD+) */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Search & Box List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search box (D-10, D-12), dye name, LOT#..."
                className="w-full bg-[#080d15] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[11px]">
              {[
                { id: 'ALL', label: 'All Dyes' },
                { id: 'REACTIVE', label: 'Reactive Dyes' },
                { id: 'BLEACH', label: 'Bleaching' },
                { id: 'AUX', label: 'Auxiliaries' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-cyan-600 text-white font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Dye List */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredDyes.map((dye) => {
                const isSelected = selectedBox?.boxCode === dye.boxCode;
                return (
                  <div
                    key={dye.boxCode}
                    onClick={() => setSelectedBox(dye)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#15233c] border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                        : 'bg-[#0f1726]/80 hover:bg-[#131d2e] border-slate-700/70'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div 
                        className="w-4 h-8 rounded-md border border-white/20 flex-shrink-0"
                        style={{ backgroundColor: dye.hexColor }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono font-bold text-xs text-cyan-300">
                            {dye.boxCode}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                            {dye.strength}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white truncate">
                          {dye.dyeName}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {dye.batchNumber} &bull; {dye.supplier}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 block">
                        {dye.inStockKg} kg
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase">Stock</span>
                    </div>
                  </div>
                );
              })}

              {filteredDyes.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No dye boxes matching "{searchTerm}"
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Detailed Box Card, QR Code & Safety Sheet (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {selectedBox ? (
              <div className="bg-[#0e1625] border border-slate-700 rounded-2xl p-4 sm:p-5 flex flex-col space-y-4 shadow-inner">
                
                {/* Box Top Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-700/80 pb-3.5">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-xl border-2 border-white/30 shadow-lg flex items-center justify-center font-bold text-white text-xs font-mono"
                      style={{ backgroundColor: selectedBox.hexColor }}
                    >
                      {selectedBox.boxCode}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {selectedBox.dyeName}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300">
                          {selectedBox.strength} Strength
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center space-x-2">
                        <span>{selectedBox.dyeType}</span>
                        <span>&bull;</span>
                        <span className="font-mono text-cyan-400">{selectedBox.batchNumber}</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated QR Code Icon & Badge */}
                  <div className="flex items-center space-x-2 bg-[#080d15] p-2 rounded-xl border border-slate-700">
                    <div className="w-10 h-10 bg-white rounded p-1 flex flex-col items-center justify-center">
                      <div className="w-full h-full border border-black grid grid-cols-3 gap-0.5 p-0.5 bg-black">
                        <div className="bg-white"></div>
                        <div className="bg-black"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                        <div className="bg-black"></div>
                        <div className="bg-black"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono">
                      <span className="text-slate-400 block">QR Payload:</span>
                      <span className="text-cyan-300 font-bold">{selectedBox.boxCode}:{selectedBox.batchNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-[#090f18] p-2.5 rounded-xl border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">Supplier</span>
                    <span className="font-semibold text-white truncate block">{selectedBox.supplier}</span>
                  </div>
                  <div className="bg-[#090f18] p-2.5 rounded-xl border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">Color Tone</span>
                    <span className="font-semibold text-cyan-300">{selectedBox.tone}</span>
                  </div>
                  <div className="bg-[#090f18] p-2.5 rounded-xl border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">Suggested Tray</span>
                    <span className="font-mono font-bold text-amber-400">Tray #{selectedBox.suggestedTray}</span>
                  </div>
                  <div className="bg-[#090f18] p-2.5 rounded-xl border border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block">Available Stock</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedBox.inStockKg} kg</span>
                  </div>
                </div>

                {/* Safety Information & MSDS Sheet */}
                <div className="bg-[#080d16] border border-amber-500/30 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Safety Sheet &amp; GHS Hazard Info</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[10px] font-mono text-amber-300">
                      {selectedBox.safetySheet.ghsCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block">Hazard Statements:</span>
                      {selectedBox.safetySheet.hazardStatements.map((h, i) => (
                        <div key={i} className="text-rose-300 text-[10px] flex items-start gap-1">
                          <span className="text-rose-500 font-bold">&bull;</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold block">Mandatory PPE:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedBox.safetySheet.ppeRequired.map((ppe, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300 border border-slate-700">
                            {ppe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-2 text-[10px] text-slate-400">
                    <strong className="text-slate-300">Spill Protocol:</strong> {selectedBox.safetySheet.spillProtocol}
                  </div>
                </div>

                {/* Actions: Use in recipe / Load into Autoclave */}
                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => {
                      onSelectDyeBox && onSelectDyeBox(selectedBox);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-cyan-600/30 cursor-pointer active:scale-95 transition-all"
                  >
                    <FlaskConical className="w-4 h-4" />
                    <span>Load {selectedBox.boxCode} ({selectedBox.dyeName}) into Batch</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-center py-16 text-slate-500 text-sm">
                Select a dye box from the inventory list on the left to view details and safety sheets.
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#080d14] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Stephen Karikari Industrial Textile Automation System</span>
          <span>Database Version 2026.4.2</span>
        </div>

      </div>
    </div>
  );
}

