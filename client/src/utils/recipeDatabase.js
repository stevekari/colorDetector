// Master Industrial Textile Recipes Database
// Allows 1-click loading of client batches, target colors, autoclave volumes, and dye formulations

export const RECIPE_DATABASE = [
  {
    recipeId: 'RCP-1245',
    batchId: '#1245',
    clientName: 'Alpine Textiles AG',
    clientColorName: 'Crimson Scarlet Ruby',
    clientCode: '#C82030',
    targetHex: '#C82030',
    sampleHex: '#D2453A',
    yardageMeters: 2000,
    fabricGsm: 220,
    fabricWidthMeters: 1.6,
    fabricKg: 704.0,
    waterVolumeLiters: 4200,
    bathRatio: '1:6.0',
    cycleTempCelsius: 60.0,
    cycleDurationMinutes: 75,
    dyes: [
      { boxCode: 'D-10', dyeName: 'Reactive Crimson Red', strength: '200%', basePercent: 3.1, kg: 21.82, tray: 2 },
      { boxCode: 'D-12', dyeName: 'Reactive Royal Blue', strength: '200%', basePercent: 0.8, kg: 5.63, tray: 3 },
      { boxCode: 'D-15', dyeName: 'Reactive Golden Yellow', strength: '450%', basePercent: 1.2, kg: 3.75, tray: 5 }
    ],
    pretreatment: {
      bleachingAgent: "Sosa Cáustica (NaOH 50%) + Agua Oxigenada (H2O2 50%)",
      causticKg: 126.0,
      peroxideLiters: 105.0,
      targetWhiteness: 78.5
    },
    notes: 'Premium sport knitwear fabric standard. Critical shade tolerance ΔE ≤ 1.0.'
  },
  {
    recipeId: 'RCP-1246',
    batchId: '#1246',
    clientName: 'Nordic Denim Mills',
    clientColorName: 'Deep Navy Indigo',
    clientCode: '#1A2F50',
    targetHex: '#1A2F50',
    sampleHex: '#223B63',
    yardageMeters: 2500,
    fabricGsm: 240,
    fabricWidthMeters: 1.6,
    fabricKg: 960.0,
    waterVolumeLiters: 4800,
    bathRatio: '1:5.0',
    cycleTempCelsius: 60.0,
    cycleDurationMinutes: 90,
    dyes: [
      { boxCode: 'D-12', dyeName: 'Reactive Royal Blue', strength: '200%', basePercent: 4.2, kg: 40.32, tray: 3 },
      { boxCode: 'D-22', dyeName: 'Reactive Deep Jet Black', strength: '450%', basePercent: 1.5, kg: 6.40, tray: 7 },
      { boxCode: 'D-10', dyeName: 'Reactive Crimson Red', strength: '200%', basePercent: 0.5, kg: 4.80, tray: 1 }
    ],
    pretreatment: {
      bleachingAgent: "Light Caustic Scour (NaOH 50%)",
      causticKg: 95.0,
      peroxideLiters: 60.0,
      targetWhiteness: 72.0
    },
    notes: 'Heavy twill weave. Requires high fixation time for wash fastness level 4-5.'
  },
  {
    recipeId: 'RCP-1247',
    batchId: '#1247',
    clientName: 'Celtic Apparel Co.',
    clientColorName: 'Forest Emerald Green',
    clientCode: '#1B4D3E',
    targetHex: '#1B4D3E',
    sampleHex: '#255E4C',
    yardageMeters: 1800,
    fabricGsm: 200,
    fabricWidthMeters: 1.6,
    fabricKg: 576.0,
    waterVolumeLiters: 3600,
    bathRatio: '1:6.25',
    cycleTempCelsius: 60.0,
    cycleDurationMinutes: 70,
    dyes: [
      { boxCode: 'D-18', dyeName: 'Reactive Emerald Green', strength: '200%', basePercent: 3.5, kg: 20.16, tray: 8 },
      { boxCode: 'D-15', dyeName: 'Reactive Golden Yellow', strength: '450%', basePercent: 1.8, kg: 4.61, tray: 5 },
      { boxCode: 'D-12', dyeName: 'Reactive Royal Blue', strength: '200%', basePercent: 0.7, kg: 4.03, tray: 3 }
    ],
    pretreatment: {
      bleachingAgent: "Full Peroxide Bleach + Optical Brightener",
      causticKg: 108.0,
      peroxideLiters: 90.0,
      targetWhiteness: 81.0
    },
    notes: 'High organic cotton jersey. Leveling agent dosage critical to avoid streaking.'
  },
  {
    recipeId: 'RCP-1248',
    batchId: '#1248',
    clientName: 'Sahara Sun Activewear',
    clientColorName: 'Golden Amber Sunset',
    clientCode: '#E69138',
    targetHex: '#E69138',
    sampleHex: '#D9822B',
    yardageMeters: 2200,
    fabricGsm: 210,
    fabricWidthMeters: 1.6,
    fabricKg: 739.2,
    waterVolumeLiters: 4500,
    bathRatio: '1:6.1',
    cycleTempCelsius: 60.0,
    cycleDurationMinutes: 65,
    dyes: [
      { boxCode: 'D-15', dyeName: 'Reactive Golden Yellow', strength: '450%', basePercent: 3.8, kg: 12.48, tray: 5 },
      { boxCode: 'D-19', dyeName: 'Reactive Bright Orange', strength: '200%', basePercent: 2.1, kg: 15.52, tray: 9 },
      { boxCode: 'D-10', dyeName: 'Reactive Crimson Red', strength: '200%', basePercent: 0.4, kg: 2.96, tray: 1 }
    ],
    pretreatment: {
      bleachingAgent: "Standard Bleach Base (NaOH + H2O2)",
      causticKg: 135.0,
      peroxideLiters: 112.5,
      targetWhiteness: 79.0
    },
    notes: 'Bright fashion shade. Sensitive to bath pH drift during fixation.'
  },
  {
    recipeId: 'RCP-1249',
    batchId: '#1249',
    clientName: 'Onyx Technical Fabrics',
    clientColorName: 'Jet Black Heavy Shade',
    clientCode: '#18181B',
    targetHex: '#18181B',
    sampleHex: '#27272A',
    yardageMeters: 3000,
    fabricGsm: 260,
    fabricWidthMeters: 1.6,
    fabricKg: 1248.0,
    waterVolumeLiters: 5000,
    bathRatio: '1:4.0',
    cycleTempCelsius: 60.0,
    cycleDurationMinutes: 95,
    dyes: [
      { boxCode: 'D-22', dyeName: 'Reactive Deep Jet Black', strength: '450%', basePercent: 6.0, kg: 33.28, tray: 7 },
      { boxCode: 'D-12', dyeName: 'Reactive Royal Blue', strength: '200%', basePercent: 1.2, kg: 14.98, tray: 3 },
      { boxCode: 'D-10', dyeName: 'Reactive Crimson Red', strength: '200%', basePercent: 0.8, kg: 9.98, tray: 1 }
    ],
    pretreatment: {
      bleachingAgent: "Standard Scouring Process",
      causticKg: 150.0,
      peroxideLiters: 125.0,
      targetWhiteness: 68.0
    },
    notes: 'Extra deep black shade. Requires thorough 8-stage overflow rinsing to eliminate unfixed hydrolysed dye.'
  }
];

export function getRecipeById(recipeId) {
  if (!recipeId) return null;
  return RECIPE_DATABASE.find(r => r.recipeId === recipeId || r.batchId === recipeId) || null;
}

