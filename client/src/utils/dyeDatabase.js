// Master Dye Box Inventory & Safety Database
// Complete with Dye types, strengths, box codes, batch numbers, suppliers, and safety sheets

export const DYE_BOX_DATABASE = [
  {
    boxCode: 'D-10',
    dyeName: 'Reactive Crimson Red',
    dyeType: 'Reactive Dye',
    strength: '200%',
    strengthMultiplier: 2.0,
    batchNumber: 'LOT-2026-CR90',
    supplier: 'DyStar GmbH',
    tone: 'Red / Scarlet',
    hexColor: '#E53935',
    suggestedTray: 1,
    inStockKg: 350.0,
    safetySheet: {
      hazardLevel: 'MILD_IRRITANT',
      ghsCode: 'GHS07 (Exclamation Mark)',
      hazardStatements: ['H315: Causes skin irritation', 'H319: Causes serious eye irritation'],
      precautionaryStatements: ['P280: Wear protective gloves and eye protection', 'P264: Wash hands thoroughly after handling'],
      ppeRequired: ['Nitrile Gloves', 'Safety Goggles', 'Dust Mask (FFP2)'],
      storageTemp: '15°C - 25°C Dry Area',
      spillProtocol: 'Vacuum with HEPA filter or wipe with damp absorbent cloth. Do not flush into storm drains.'
    }
  },
  {
    boxCode: 'D-12',
    dyeName: 'Reactive Royal Blue',
    dyeType: 'Reactive Dye',
    strength: '200%',
    strengthMultiplier: 2.0,
    batchNumber: 'LOT-2026-RB45',
    supplier: 'Huntsman Textile Effects',
    tone: 'Royal Blue',
    hexColor: '#1565C0',
    suggestedTray: 3,
    inStockKg: 280.0,
    safetySheet: {
      hazardLevel: 'LOW_HAZARD',
      ghsCode: 'GHS07',
      hazardStatements: ['H319: Causes eye irritation', 'H335: May cause respiratory irritation if airborne'],
      precautionaryStatements: ['P261: Avoid breathing dust', 'P280: Wear eye protection'],
      ppeRequired: ['Safety Glasses', 'Nitrile Gloves'],
      storageTemp: '10°C - 30°C Sealed Container',
      spillProtocol: 'Collect mechanically. Neutralize minor residues with dilute brine.'
    }
  },
  {
    boxCode: 'D-15',
    dyeName: 'Reactive Golden Yellow',
    dyeType: 'Reactive Dye',
    strength: '450%',
    strengthMultiplier: 4.5,
    batchNumber: 'LOT-2026-GY88',
    supplier: 'Archroma Chemicals',
    tone: 'Golden Yellow',
    hexColor: '#FBC02D',
    suggestedTray: 5,
    inStockKg: 420.0,
    safetySheet: {
      hazardLevel: 'NON_HAZARDOUS',
      ghsCode: 'NON_REGULATED',
      hazardStatements: ['H303: May be harmful if swallowed in large quantities'],
      precautionaryStatements: ['P102: Keep out of reach of children', 'P262: Avoid contact with eyes'],
      ppeRequired: ['Standard Lab Coat', 'Gloves'],
      storageTemp: 'Room Temperature, Dry',
      spillProtocol: 'Sweep up and dispose of in accordance with local textile chemical regulations.'
    }
  },
  {
    boxCode: 'D-22',
    dyeName: 'Reactive Deep Jet Black',
    dyeType: 'Reactive Dye',
    strength: '450%',
    strengthMultiplier: 4.5,
    batchNumber: 'LOT-2026-JB01',
    supplier: 'DyStar GmbH',
    tone: 'Jet Black',
    hexColor: '#212121',
    suggestedTray: 7,
    inStockKg: 600.0,
    safetySheet: {
      hazardLevel: 'MILD_IRRITANT',
      ghsCode: 'GHS07',
      hazardStatements: ['H317: May cause an allergic skin reaction'],
      precautionaryStatements: ['P280: Wear protective gloves', 'P261: Avoid breathing dust'],
      ppeRequired: ['Protective Gloves', 'Dust Respirator', 'Safety Goggles'],
      storageTemp: 'Cool, Ventilated Dry Storage',
      spillProtocol: 'Avoid dusting. Dampen with light water mist before sweeping.'
    }
  },
  {
    boxCode: 'D-18',
    dyeName: 'Reactive Emerald Green',
    dyeType: 'Reactive Dye',
    strength: '200%',
    strengthMultiplier: 2.0,
    batchNumber: 'LOT-2026-EG34',
    supplier: 'BASF Colorants',
    tone: 'Emerald Green',
    hexColor: '#2E7D32',
    suggestedTray: 8,
    inStockKg: 190.0,
    safetySheet: {
      hazardLevel: 'LOW_HAZARD',
      ghsCode: 'GHS07',
      hazardStatements: ['H315: Causes skin irritation'],
      precautionaryStatements: ['P264: Wash skin thoroughly after handling'],
      ppeRequired: ['Nitrile Gloves', 'Goggles'],
      storageTemp: '15°C - 25°C',
      spillProtocol: 'Absorb or sweep up into labeled chemical disposal drum.'
    }
  },
  {
    boxCode: 'D-19',
    dyeName: 'Reactive Bright Orange',
    dyeType: 'Reactive Dye',
    strength: '200%',
    strengthMultiplier: 2.0,
    batchNumber: 'LOT-2026-BO77',
    supplier: 'Huntsman Textile Effects',
    tone: 'Bright Orange',
    hexColor: '#FB8C00',
    suggestedTray: 9,
    inStockKg: 210.0,
    safetySheet: {
      hazardLevel: 'LOW_HAZARD',
      ghsCode: 'GHS07',
      hazardStatements: ['H320: Causes eye irritation'],
      precautionaryStatements: ['P280: Wear eye protection'],
      ppeRequired: ['Safety Goggles', 'Gloves'],
      storageTemp: 'Dry Store',
      spillProtocol: 'Sweep into waste bin using damp mop.'
    }
  },
  {
    boxCode: 'D-24',
    dyeName: 'Reactive Magenta Pink',
    dyeType: 'Reactive Dye',
    strength: '250%',
    strengthMultiplier: 2.5,
    batchNumber: 'LOT-2026-MP24',
    supplier: 'Archroma Chemicals',
    tone: 'Magenta Pink / Fuchsia',
    hexColor: '#E91E63',
    suggestedTray: 2,
    inStockKg: 240.0,
    safetySheet: {
      hazardLevel: 'LOW_HAZARD',
      ghsCode: 'GHS07',
      hazardStatements: ['H315: Causes skin irritation'],
      precautionaryStatements: ['P280: Wear protective gloves'],
      ppeRequired: ['Nitrile Gloves', 'Safety Goggles'],
      storageTemp: '15°C - 25°C Dry Area',
      spillProtocol: 'Vacuum with HEPA filter or damp wipe.'
    }
  },
  {
    boxCode: 'D-28',
    dyeName: 'Reactive Deep Violet',
    dyeType: 'Reactive Dye',
    strength: '200%',
    strengthMultiplier: 2.0,
    batchNumber: 'LOT-2026-DV28',
    supplier: 'BASF Colorants',
    tone: 'Violet / Purple',
    hexColor: '#8E24AA',
    suggestedTray: 4,
    inStockKg: 180.0,
    safetySheet: {
      hazardLevel: 'LOW_HAZARD',
      ghsCode: 'GHS07',
      hazardStatements: ['H319: Causes eye irritation'],
      precautionaryStatements: ['P280: Wear eye protection'],
      ppeRequired: ['Safety Glasses', 'Gloves'],
      storageTemp: 'Cool Dry Store',
      spillProtocol: 'Collect mechanically, neutralize with dilute brine.'
    }
  },
  {
    boxCode: 'D-14',
    dyeName: 'Reactive Turquoise Cyan',
    dyeType: 'Reactive Dye',
    strength: '300%',
    strengthMultiplier: 3.0,
    batchNumber: 'LOT-2026-TC14',
    supplier: 'DyStar GmbH',
    tone: 'Turquoise / Cyan',
    hexColor: '#00BCD4',
    suggestedTray: 6,
    inStockKg: 310.0,
    safetySheet: {
      hazardLevel: 'MILD_IRRITANT',
      ghsCode: 'GHS07',
      hazardStatements: ['H317: May cause allergic skin reaction'],
      precautionaryStatements: ['P280: Wear protective gloves'],
      ppeRequired: ['Nitrile Gloves', 'Goggles'],
      storageTemp: '15°C - 30°C',
      spillProtocol: 'Damp wipe into chemical disposal container.'
    }
  },
  {
    boxCode: 'D-16',
    dyeName: 'Reactive Midnight Navy',
    dyeType: 'Reactive Dye',
    strength: '400%',
    strengthMultiplier: 4.0,
    batchNumber: 'LOT-2026-MN16',
    supplier: 'Huntsman Textile Effects',
    tone: 'Midnight Navy Blue',
    hexColor: '#0D47A1',
    suggestedTray: 10,
    inStockKg: 450.0,
    safetySheet: {
      hazardLevel: 'LOW_HAZARD',
      ghsCode: 'GHS07',
      hazardStatements: ['H319: Causes eye irritation'],
      precautionaryStatements: ['P280: Wear eye protection'],
      ppeRequired: ['Safety Goggles', 'Gloves'],
      storageTemp: 'Dry Store',
      spillProtocol: 'Sweep into waste bin using damp mop.'
    }
  },
  {
    boxCode: 'B-04',
    dyeName: 'Caustic Soda (NaOH 50%)',
    dyeType: 'Bleaching Chemical',
    strength: '50% Liquid',
    strengthMultiplier: 1.0,
    batchNumber: 'LOT-2026-CS50',
    supplier: 'Brenntag Chemical',
    tone: 'Pre-treatment / Bleach',
    hexColor: '#E2E8F0',
    suggestedTray: 12,
    inStockKg: 1250.0,
    safetySheet: {
      hazardLevel: 'DANGER_CORROSIVE',
      ghsCode: 'GHS05 (Corrosion)',
      hazardStatements: ['H314: Causes severe skin burns and serious eye damage', 'H290: May be corrosive to metals'],
      precautionaryStatements: ['P280: Wear chemical-resistant apron, face shield, and heavy neoprene gloves', 'P305+P351+P338: IF IN EYES rinse continuously with water for 15 minutes'],
      ppeRequired: ['Full Face Shield', 'Rubber Chemical Apron', 'Neoprene Gauntlet Gloves', 'Safety Boots'],
      storageTemp: 'Dedicated Bunded Area, > 15°C to prevent crystallization',
      spillProtocol: 'Dike spill immediately. Neutralize carefully with dilute acetic acid before rinsing.'
    }
  },
  {
    boxCode: 'B-05',
    dyeName: 'Hydrogen Peroxide (H2O2 50%)',
    dyeType: 'Bleaching Chemical',
    strength: '50% Technical',
    strengthMultiplier: 1.0,
    batchNumber: 'LOT-2026-HP50',
    supplier: 'Solvay Chemicals',
    tone: 'Bleaching Oxidizer',
    hexColor: '#F8FAFC',
    suggestedTray: 11,
    inStockKg: 950.0,
    safetySheet: {
      hazardLevel: 'DANGER_OXIDIZER',
      ghsCode: 'GHS03 (Flame over circle) + GHS05 (Corrosion)',
      hazardStatements: ['H272: May intensify fire; oxidizer', 'H302: Harmful if swallowed', 'H318: Causes serious eye damage'],
      precautionaryStatements: ['P220: Keep away from clothing and combustible materials', 'P280: Wear protective eye and face protection'],
      ppeRequired: ['Chemical Splash Goggles', 'Face Shield', 'PVC Gloves', 'Rubber Apron'],
      storageTemp: 'Cool, Ventilated Vented Drums (< 25°C), away from organic dust',
      spillProtocol: 'Dilute with large quantities of clean water. Do not absorb with sawdust or paper.'
    }
  },
  {
    boxCode: 'AUX-01',
    dyeName: 'Levelling Auxiliary Agent',
    dyeType: 'Auxiliary Surfactant',
    strength: '100% Active',
    strengthMultiplier: 1.0,
    batchNumber: 'LOT-2026-LV10',
    supplier: 'CHT Group',
    tone: 'Levelling / Dispersing',
    hexColor: '#90A4AE',
    suggestedTray: 11,
    inStockKg: 800.0,
    safetySheet: {
      hazardLevel: 'NON_HAZARDOUS',
      ghsCode: 'NON_REGULATED',
      hazardStatements: ['H316: Causes mild skin irritation'],
      precautionaryStatements: ['P264: Wash hands after handling'],
      ppeRequired: ['Standard Lab Gloves', 'Glasses'],
      storageTemp: '5°C - 35°C',
      spillProtocol: 'Wipe with water and detergent.'
    }
  },
  {
    boxCode: 'AUX-02',
    dyeName: "Glauber's Salt (Na2SO4)",
    dyeType: 'Electrolyte',
    strength: '99% Pure',
    strengthMultiplier: 1.0,
    batchNumber: 'LOT-2026-GS99',
    supplier: 'K+S Minerals',
    tone: 'Electrolyte Salt',
    hexColor: '#CFD8DC',
    suggestedTray: 13,
    inStockKg: 4500.0,
    safetySheet: {
      hazardLevel: 'NON_HAZARDOUS',
      ghsCode: 'NON_REGULATED',
      hazardStatements: ['Non-hazardous mineral salt'],
      precautionaryStatements: ['P102: Store in dry location'],
      ppeRequired: ['Dust Mask if scooping bulk powder', 'Gloves'],
      storageTemp: 'Dry Pallets',
      spillProtocol: 'Dry sweep into recycling bins.'
    }
  },
  {
    boxCode: 'AUX-03',
    dyeName: 'Soda Ash Fixative (Na2CO3)',
    dyeType: 'Fixative Alkali',
    strength: '99.5%',
    strengthMultiplier: 1.0,
    batchNumber: 'LOT-2026-SA99',
    supplier: 'Tata Chemicals',
    tone: 'Fixation Alkali',
    hexColor: '#ECEFF1',
    suggestedTray: 14,
    inStockKg: 3200.0,
    safetySheet: {
      hazardLevel: 'MILD_IRRITANT',
      ghsCode: 'GHS07',
      hazardStatements: ['H319: Causes serious eye irritation'],
      precautionaryStatements: ['P280: Wear eye protection', 'P264: Wash skin after handling'],
      ppeRequired: ['Safety Goggles', 'Gloves', 'Dust Mask'],
      storageTemp: 'Dry Area (absorbs atmospheric moisture)',
      spillProtocol: 'Sweep into disposal drum.'
    }
  },
  {
    boxCode: 'AUX-ETB',
    dyeName: 'EUROTEX TB',
    dyeType: 'Textile Auxiliary Agent',
    strength: 'Concentrated',
    strengthMultiplier: 1.0,
    batchNumber: '952607199',
    codeRef: '2MG3-50E2-300F-M0WM',
    supplier: 'Colorantes Industriales (Barcelona - Spain)',
    tone: 'Leveling & Penetration (Amber)',
    hexColor: '#D97706',
    suggestedTray: 11,
    inStockKg: 120.0,
    safetySheet: {
      hazardLevel: 'MILD_IRRITANT',
      ghsCode: 'GHS07 (Exclamation Mark)',
      hazardStatements: ['H315: Causes skin irritation', 'H319: Causes serious eye irritation'],
      precautionaryStatements: ['P280: Wear protective gloves and eye protection', 'P264: Wash hands thoroughly'],
      ppeRequired: ['Nitrile Gloves', 'Safety Goggles', 'Protective Apron'],
      storageTemp: '5°C - 35°C Sealed Drum',
      spillProtocol: 'Absorb with sand or vermiculite. Flush residue with excess water.'
    }
  },
  {
    boxCode: 'AUX-ANL',
    dyeName: 'ADRAMOLL NL',
    dyeType: 'Textile Softener & Lubricant',
    strength: '4/5 Industrial Grade',
    strengthMultiplier: 1.0,
    batchNumber: 'P606-ZD 260609-1250',
    supplier: 'ADRASA (Barcelona - Spain)',
    tone: 'Cationic Softener (Milky White)',
    hexColor: '#BAE6FD',
    suggestedTray: 12,
    inStockKg: 120.0,
    safetySheet: {
      hazardLevel: 'MILD_HAZARD',
      ghsCode: 'GHS07 / GHS05',
      hazardStatements: ['H318: Causes serious eye damage', 'H315: Causes skin irritation'],
      precautionaryStatements: ['P280: Wear protective gloves and eye protection', 'P305+P351+P338: In eyes rinse with water'],
      ppeRequired: ['Safety Glasses', 'Nitrile Gloves', 'Rubber Apron'],
      storageTemp: '10°C - 30°C Sealed Barrel',
      spillProtocol: 'Contain spill, pump into salvage container, wash floor thoroughly (slippery surface).'
    }
  },
  {
    boxCode: 'B-210',
    dyeName: 'SOSA CÁUSTICA (NaOH)',
    dyeType: 'Bleaching & Scouring Base',
    strength: 'Fitxa Seguretat: 210 (Lit. 612)',
    strengthMultiplier: 1.0,
    batchNumber: 'FS-210-L612',
    supplier: 'Industrial Chemical Corp (Spain)',
    tone: 'Caustic Soda Pre-treatment',
    hexColor: '#94A3B8',
    suggestedTray: 13,
    inStockKg: 1500.0,
    safetySheet: {
      hazardLevel: 'DANGER_CORROSIVE',
      ghsCode: 'GHS05 (Corrosion) Fitxa 210',
      hazardStatements: ['H314: Causes severe skin burns and serious eye damage'],
      precautionaryStatements: ['P280: Wear heavy chemical gloves, face shield, and apron'],
      ppeRequired: ['Face Shield', 'Heavy Neoprene Gloves', 'Rubber Boots', 'Chemical Apron'],
      storageTemp: 'Dedicated Bunded Tank / Cool Area',
      spillProtocol: 'Neutralize with dilute acid, collect in corrosive waste drum.'
    }
  },
  {
    boxCode: 'B-416',
    dyeName: 'A. OXIGENADA (H2O2)',
    dyeType: 'Bleaching Oxidizer',
    strength: 'Fitxa Seguretat: 416 (Lit. 605)',
    strengthMultiplier: 1.0,
    batchNumber: 'FS-416-L605',
    supplier: 'Industrial Chemical Corp (Spain)',
    tone: 'Hydrogen Peroxide Bleach Base',
    hexColor: '#E2E8F0',
    suggestedTray: 14,
    inStockKg: 1200.0,
    safetySheet: {
      hazardLevel: 'DANGER_OXIDIZER',
      ghsCode: 'GHS03 (Oxidizer) + GHS05 (Corrosion) Fitxa 416',
      hazardStatements: ['H272: May intensify fire; oxidizer', 'H314: Causes severe burns'],
      precautionaryStatements: ['P220: Keep away from organic materials and grease'],
      ppeRequired: ['Splash Goggles', 'Face Shield', 'PVC Gloves', 'Rubber Apron'],
      storageTemp: 'Vented Drums in Cool Ventilated Area',
      spillProtocol: 'Flush with copious amounts of clean cold water.'
    }
  }
];

// Presets for Autoclave 14-Tray assignments
export const TRAY_CHEMICAL_PRESETS = [
  { name: 'Reactive Scarlet Red', hexColor: '#D32F2F', type: 'DYE', category: 'Red' },
  { name: 'Reactive Crimson Ruby', hexColor: '#C82030', type: 'DYE', category: 'Red' },
  { name: 'Reactive Royal Blue', hexColor: '#1565C0', type: 'DYE', category: 'Blue' },
  { name: 'Reactive Turquoise Blue', hexColor: '#00ACC1', type: 'DYE', category: 'Blue' },
  { name: 'Reactive Golden Yellow', hexColor: '#FBC02D', type: 'DYE', category: 'Yellow' },
  { name: 'Reactive Lemon Yellow', hexColor: '#FFF176', type: 'DYE', category: 'Yellow' },
  { name: 'Reactive Deep Jet Black', hexColor: '#18181B', type: 'DYE', category: 'Black' },
  { name: 'Reactive Forest Green', hexColor: '#2E7D32', type: 'DYE', category: 'Green' },
  { name: 'Reactive Bright Orange', hexColor: '#FB8C00', type: 'DYE', category: 'Orange' },
  { name: 'Reactive Violet / Purple', hexColor: '#7B1FA2', type: 'DYE', category: 'Purple' },
  { name: 'Reactive Magenta Rose', hexColor: '#BE185D', type: 'DYE', category: 'Red' },
  { name: 'Reactive Navy Midnight', hexColor: '#1E3A8A', type: 'DYE', category: 'Blue' },
  { name: 'EUROTEX TB (Leveling)', hexColor: '#D97706', type: 'AUXILIARY', category: 'Chemical' },
  { name: 'ADRAMOLL NL (Softener 4/5)', hexColor: '#BAE6FD', type: 'AUXILIARY', category: 'Chemical' },
  { name: 'SOSA CÁUSTICA (Fitxa 210)', hexColor: '#94A3B8', type: 'BLEACH', category: 'Chemical' },
  { name: 'A. OXIGENADA (Fitxa 416)', hexColor: '#E2E8F0', type: 'BLEACH', category: 'Chemical' },
  { name: "Glauber's Salt (Electrolyte)", hexColor: '#CFD8DC', type: 'SALT', category: 'Chemical' },
  { name: 'Soda Ash Fixative (Na2CO3)', hexColor: '#ECEFF1', type: 'FIXATIVE', category: 'Chemical' },
  { name: 'pH Buffer / Acetic Acid', hexColor: '#B0BEC5', type: 'BUFFER', category: 'Chemical' },
  { name: 'Clear Chemical / No Color', hexColor: '#475569', type: 'CLEAR', category: 'Chemical' },
  { name: 'Empty / Standby Tray', hexColor: '#1E293B', type: 'STANDBY', category: 'Standby' }
];

export function findDyeByBoxCode(code) {
  if (!code) return null;
  const clean = code.trim().toUpperCase();
  return DYE_BOX_DATABASE.find(d => d.boxCode.toUpperCase() === clean || d.boxCode.toUpperCase().replace('-', '') === clean.replace('-', '')) || null;
}

export function findDyeByNameOrTone(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();
  return DYE_BOX_DATABASE.find(d => 
    d.dyeName.toLowerCase().includes(q) || 
    d.boxCode.toLowerCase().includes(q) ||
    d.tone.toLowerCase().includes(q)
  ) || null;
}

