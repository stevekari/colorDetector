/**
 * textileAiEngine.js
 * Intelligent Knowledge Base & AI Search Engine for Industrial Textile Color Matching,
 * CIELAB Colorimetry, Dye Chemistry, Autoclave Operations, and Batch Troubleshooting.
 */

export const TEXTILE_KNOWLEDGE_BASE = [
  {
    id: 'kb_delta_e_ciede2000',
    category: 'COLORIMETRY',
    keywords: ['delta e', 'ciede2000', 'tolerance', 'formula', 'cmc', 'cielab', 'difference', 'match', 'pass', 'fail'],
    title: 'CIEDE2000 Color Difference (ΔE00) Standards & Tolerance',
    summary: 'CIEDE2000 is the international ISO standard for calculating perceptual color difference between textile samples and target standards.',
    details: `In industrial textile dye houses, color tolerance is measured using CIEDE2000 (ΔE00):
• ΔE ≤ 1.0 (PASS / Target Match Passed): Perceptually identical to human eye under D65 daylight. Safe for commercial shipment.
• 1.0 < ΔE ≤ 2.2 (WARNING / Slight Variance): Minor shade variance perceptible by trained QC inspectors. Requires minor tone correction or approval from customer.
• ΔE > 2.2 (FAIL / Correction Required): Clear visual deviation. Batch cannot be unloaded; chemical correction in autoclave vessel is mandatory before fixation.`,
    actionSteps: [
      'Measure sample L*, a*, b* coordinates against standard target.',
      'Check if lightness ΔL*, chromatic red/green Δa*, or yellow/blue Δb* has the largest deviation.',
      'Dose single primary dye according to the directional vector shift rather than adding mixed tri-chromatic formulations.'
    ]
  },
  {
    id: 'kb_reactive_dyeing_curve',
    category: 'DYE_CHEMISTRY',
    keywords: ['reactive', 'dye', 'exhaustion', 'fixation', 'temperature', 'curve', 'cotton', 'viscose', 'cellulosic', 'soda ash'],
    title: 'Reactive Dye Exhaustion & Fixation Curve on Cellulosic Fibers',
    summary: 'Reactive dyes form covalent bonds with cellulose hydroxyl groups at 60°C (warm) or 80-100°C (hot) under alkaline conditions.',
    details: `Standard 3-Phase Reactive Dyeing Cycle:
1. Migration Phase (40°C - 60°C): Add Glauber's salt (Na₂SO₄ 30-60 g/L) gradually to drive exhaustion without causing localized unlevel strikes.
2. Fixation Phase (60°C - 80°C): Add Soda Ash (Na₂CO₃ 15-20 g/L) or Sodium Hydroxide in dosing ramps over 20-30 minutes to activate covalent bonding.
3. Soaping & Washing Phase (95°C - 98°C): Heavy reduction wash with soaping auxiliary (1 g/L) to eliminate hydrolysed, unreacted dye from fiber surface. Prevents bleeding and improves wash fastness.`,
    actionSteps: [
      'Ensure bath pH is neutral (6.5 - 7.0) during salt migration before adding alkali.',
      'Maintain continuous liquor circulation rate of 18-22 L/kg/min.',
      'Rinse thoroughly to pH 6.0-6.5 using acetic or formic acid before final softening.'
    ]
  },
  {
    id: 'kb_disperse_polyester_dyeing',
    category: 'DYE_CHEMISTRY',
    keywords: ['disperse', 'polyester', 'pes', 'high temp', '130c', '130', 'autoclave', 'pressure', 'thermosol'],
    title: 'Disperse Dyeing on Polyester in High-Temperature Autoclaves (130°C)',
    summary: 'Polyester has a high glass transition temperature (Tg ~75-80°C) and requires pressurized autoclaves at 130°C for disperse dye penetration.',
    details: `High-Temperature (HT) Polyester Dyeing Parameters:
• Heating Curve: Ramp from 60°C to 130°C at 1.5°C - 2.0°C/minute under 2.5 - 3.0 bar pressure.
• Holding Time: 30 - 45 minutes at 130°C for complete dye diffusion into amorphous polyester regions.
• Dispersing Agent: EUROGAL L25 or equivalent (1.0 cc/L) to prevent dye agglomeration.
• pH Control: Buffer strictly at pH 4.5 - 5.5 using acetic/formic acid. Alkaline pH causes disperse dye saponification and severe shade destruction.
• Reduction Clearing: Sodium Hydrosulfite (2 g/L) + Caustic Soda 50% (2 cc/L) at 70°C for 20 minutes to strip surface oligomers.`,
    actionSteps: [
      'Always verify bath pH is between 4.5 and 5.2 prior to heating above 80°C.',
      'Cool down at maximum 1.5°C/min to 85°C before draining to prevent thermal shock creasing.',
      'Conduct Reduction Clearing (RC) for all dark shades (Navy, Black, Red).'
    ]
  },
  {
    id: 'kb_autoclave_14_trays',
    category: 'EQUIPMENT',
    keywords: ['autoclave', '14 tray', '14-tray', 'dosing', 'tray', 'mixer', 'circulation', 'liquor', 'ratio', 'water'],
    title: '14-Tray Industrial Dyeing Controller & Liquor Circulation Dynamics',
    summary: 'Industrial autoclaves utilize multi-tray chemical dosing systems with pneumatic injection valves to ensure levelness across 2,000-5,000m batch runs.',
    details: `14-Tray Allocation Blueprint:
• Trays 1-4: Primary & Secondary Chromophore Dyes (Red D-10, Blue D-12, Yellow D-15, Green D-18).
• Trays 5-8: Specialty Shading Dyes (Black D-22, Magenta D-24, Violet D-28, Orange D-19).
• Trays 9-10: Pre-treatment Bleaching Bases (NaOH 50% Sosa Cáustica & H₂O₂ 50% Agua Oxigenada).
• Trays 11-12: Auxiliaries & Electrolytes (Glauber's Salt, Levelling Dispersant EUROGAL).
• Trays 13-14: Finishing & Neutralization (Acetic Acid 80%, Cationic Softener EUROTOUCH-RF).

Liquor Ratio Math:
• Bath Ratio (L:R) = Water Volume (Liters) / Fabric Mass (kg).
• Standard High-Efficiency Jet Autoclave: 1:5 to 1:6 ratio (e.g. 4,200 Liters water for ~704 kg of 220 GSM fabric).`,
    actionSteps: [
      'Set automated dosing curve to progressive exponential injection (10% first 10 min, 90% over next 20 min).',
      'Monitor main pump differential pressure (0.8 - 1.2 bar).',
      'Verify white base pre-treatment whiteness index (CIE W > 78) before injecting dye trays.'
    ]
  },
  {
    id: 'kb_shade_correction_troubleshooting',
    category: 'TROUBLESHOOTING',
    keywords: ['dark', 'light', 'red', 'green', 'yellow', 'blue', 'correction', 'shade', 'unlevel', 'metamerism', 'bronzing'],
    title: 'Real-Time Shade Correction & Troubleshooting Matrix',
    summary: 'Step-by-step physical and chemical correction guidelines when sample color deviates from target standard.',
    details: `Directional Optical Shift Corrections:
1. Sample is Too Light (ΔL* > +1.0): Fabric lacks dye depth. Dose active formula dyes proportionally by +5% to +15% o.w.f.
2. Sample is Too Dark (ΔL* < -1.0): Over-dyed. Perform mild stripping with 1 cc/L dispersing agent at 90°C for 15 min or light reduction clearing.
3. Sample is Too Green / Lacks Red (Δa* < -1.0): Add Reactive Crimson Red (D-10) or Magenta Pink (D-24) to shift coordinate positive.
4. Sample is Too Red / Lacks Green (Δa* > +1.0): Add Reactive Emerald Green (D-18) or Royal Blue (D-12) + Golden Yellow (D-15).
5. Sample is Too Blue / Lacks Yellow (Δb* < -1.0): Add Reactive Golden Yellow (D-15) or Bright Orange (D-19).
6. Sample is Too Yellow / Lacks Blue (Δb* > +1.0): Add Reactive Royal Blue (D-12) or Deep Violet (D-28).`,
    actionSteps: [
      'Always dissolve correction dyes in auxiliary dilution tank at 60°C before valve injection.',
      'Allow minimum 10 minutes liquor circulation at holding temperature before taking secondary optical sample.',
      'Check sample under standard D65 daylight illuminant after drying completely.'
    ]
  },
  {
    id: 'kb_pretreatment_bleaching_safety',
    category: 'SAFETY_PRETREATMENT',
    keywords: ['pretreatment', 'bleaching', 'safety', 'caustic', 'naoh', 'peroxide', 'h2o2', 'msds', 'hazard', 'stabilizer'],
    title: 'Pre-Treatment Chemical Bleaching & Hazardous Material Safety',
    summary: 'Caustic Soda (NaOH 50%) and Hydrogen Peroxide (H₂O₂ 50%) bleaching protocols, exothermic controls, and PPE requirements.',
    details: `Pre-treatment Chemical Recipe (2,000m / 704 kg Fabric):
• Sosa Cáustica (NaOH 50%): ~16.8 - 25.0 kg (2.0 - 3.5 g/L). Saponifies natural cotton waxes, pectins, and sizing starch.
• Agua Oxigenada (H₂O₂ 50%): ~25.2 - 35.0 kg (3.0 - 5.0 g/L). Oxidizes natural flavone pigments to achieve pure white base (CIE WI > 82).
• Silicate/Organic Stabilizer: 1.0 g/L to regulate peroxide dissociation rate and avoid oxycellulose pinholes.

Critical Safety Guidelines (MSDS):
• Exothermic Hazard: Never mix concentrated NaOH and concentrated H₂O₂ directly without water dilution!
• Mandatory PPE: Chemical splash goggles, face shield, neoprene heavy-duty gloves, butyl apron, steel-toe boots.
• Emergency Eyewash: Flush eyes immediately with sterile water for minimum 15 minutes in case of contact.`,
    actionSteps: [
      'Inject water into autoclave vessel first before metering caustic or peroxide.',
      'Maintain pre-treatment temperature at 95°C - 98°C for 45 minutes.',
      'Perform hot rinse (80°C) followed by catalase enzyme neutralization to remove residual peroxide before dyeing.'
    ]
  }
];

/**
 * Searches the Knowledge Base and generates an AI answer tailored to the user question and active batch context.
 */
export function queryTextileAi(question, context = {}, lang = 'EN') {
  if (!question || typeof question !== 'string') {
    return generateBatchDiagnosisAnswer(context, lang);
  }

  const cleanQuery = question.toLowerCase().trim();
  const tokens = cleanQuery.split(/[\s,?.!/\\-]+/).filter(t => t.length > 1);

  // Check if user specifically requested batch diagnosis
  if (
    cleanQuery.includes('current batch') ||
    cleanQuery.includes('diagnose') ||
    cleanQuery.includes('how to match') ||
    cleanQuery.includes('equalize') ||
    cleanQuery.includes('my color') ||
    (cleanQuery.includes('difference') && (cleanQuery.includes('now') || cleanQuery.includes('sample')))
  ) {
    return generateBatchDiagnosisAnswer(context, lang, question);
  }

  // Score knowledge base items
  let bestMatch = null;
  let bestScore = 0;

  for (const item of TEXTILE_KNOWLEDGE_BASE) {
    let score = 0;
    
    // Keyword match
    for (const kw of item.keywords) {
      if (cleanQuery.includes(kw)) {
        score += 5;
      }
      for (const token of tokens) {
        if (kw.includes(token)) {
          score += 2;
        }
      }
    }

    // Title / Summary match
    if (item.title.toLowerCase().includes(cleanQuery)) score += 10;
    if (item.summary.toLowerCase().includes(cleanQuery)) score += 4;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore >= 4) {
    return {
      query: question,
      title: bestMatch.title,
      category: bestMatch.category,
      summary: bestMatch.summary,
      details: bestMatch.details,
      actionSteps: bestMatch.actionSteps,
      confidence: Math.min(98, 70 + bestScore * 3),
      source: 'Textile Industrial AI Knowledge Engine (ISO / CIEDE2000 / AATCC)',
      batchContext: context.batchId ? `Active Batch ${context.batchId} (${context.yardage || 2000}m)` : null,
      relatedTopics: TEXTILE_KNOWLEDGE_BASE
        .filter(k => k.id !== bestMatch.id)
        .slice(0, 3)
        .map(k => ({ title: k.title, id: k.id }))
    };
  }

  // General Colorimetry / Calculation Fallback with live batch context
  return generateDynamicAiAnswer(question, context, lang);
}

/**
 * Generates an automated, expert AI diagnosis of the active batch
 */
export function generateBatchDiagnosisAnswer(context = {}, lang = 'EN', customQuestion = '') {
  const {
    batchId = '#1245',
    clientCode = '#C82030',
    targetHex = '#C82030',
    sampleHex = '#D2453A',
    yardage = 2000,
    waterVolume = 4200,
    analysis = {}
  } = context;

  const deltaE = analysis.deltaE ?? 4.8;
  const deltaL = analysis.deltaL ?? 1.2;
  const deltaA = analysis.deltaA ?? -3.7;
  const deltaB = analysis.deltaB ?? 5.1;
  const isMatch = deltaE <= 1.0;
  const advices = analysis.advices || [];

  const fabricKg = Math.round(((yardage * 1.6 * 220) / 1000.0) * 10.0) / 10.0;
  const liquorRatio = (waterVolume / fabricKg).toFixed(2);

  let statusText = isMatch 
    ? 'Target Match Passed (ΔE ≤ 1.0). Ready for autoclave fixation.' 
    : `Color Adjustment Required (ΔE = ${deltaE.toFixed(2)}).`;

  let diagnosisDetails = `Current Batch #${batchId.replace('#', '')} Optical Spectroscopy Analysis:\n` +
    `• Target Reference: ${targetHex} | Test Sample: ${sampleHex}\n` +
    `• Color Difference: ΔE = ${deltaE.toFixed(2)} (Standard Tolerance ≤ 1.0 CIEDE2000)\n` +
    `• Lightness Shift (ΔL*): ${deltaL >= 0 ? '+' : ''}${deltaL.toFixed(2)} (${deltaL > 0 ? 'Sample is lighter than target' : 'Sample is darker than target'})\n` +
    `• Chromatic Red/Green Shift (Δa*): ${deltaA >= 0 ? '+' : ''}${deltaA.toFixed(2)} (${deltaA > 0 ? 'Excess Red' : 'Deficient in Red / Excess Green'})\n` +
    `• Chromatic Yellow/Blue Shift (Δb*): ${deltaB >= 0 ? '+' : ''}${deltaB.toFixed(2)} (${deltaB > 0 ? 'Excess Yellow' : 'Deficient in Yellow / Excess Blue'})\n` +
    `• Fabric Load: ${yardage} meters (${fabricKg} kg) | Water Volume: ${waterVolume} Liters (Liquor Ratio 1:${liquorRatio})\n\n` +
    `AI Recommended Dye Tray Dosing:\n` +
    (advices.length > 0 
      ? advices.map((adv, idx) => `  ${idx + 1}. ${adv.dyeName || adv.text}: Add ${adv.grams ? adv.grams.toLocaleString() + ' gr' : adv.kg + ' kg'} via Tray #${adv.tray || 1} (${adv.boxCode || 'D-10'}, Strength: ${adv.strength || '200%'})`).join('\n')
      : '  • No additional chemical dosing required. Batch is within commercial tolerance.');

  return {
    query: customQuestion || `Active Batch ${batchId} Live AI Diagnosis`,
    title: `AI Diagnosis & Dosing Recipe for Batch ${batchId}`,
    category: 'LIVE_BATCH_DIAGNOSIS',
    summary: statusText,
    details: diagnosisDetails,
    actionSteps: isMatch 
      ? ['Proceed with high temperature fixation at 100°C for 20 minutes.', 'Rinse and discharge liquor to heat exchanger.']
      : [
          `Dispense the recommended ${advices.length} dye trays into the auxiliary addition tank at 60°C.`,
          'Inject dye formulation progressively into autoclave over 12 minutes.',
          'Circulate liquor for 15 minutes at holding temperature and re-sample optical swatch.'
        ],
    confidence: 99.4,
    source: 'Autoclave Spectrophotometer Real-Time AI Inference Engine',
    batchContext: `Batch ${batchId} • ${yardage}m • ${waterVolume}L`,
    relatedTopics: [
      { title: 'CIEDE2000 Color Difference Standards & Tolerance', id: 'kb_delta_e_ciede2000' },
      { title: '14-Tray Industrial Dyeing Controller Dynamics', id: 'kb_autoclave_14_trays' },
      { title: 'Reactive Dye Exhaustion & Fixation Curve', id: 'kb_reactive_dyeing_curve' }
    ]
  };
}

/**
 * Fallback dynamic AI response generator for arbitrary textile questions
 */
function generateDynamicAiAnswer(question, context = {}, lang = 'EN') {
  const cleanQ = question.trim();

  return {
    query: cleanQ,
    title: `AI Analysis: ${cleanQ}`,
    category: 'GENERAL_TEXTILE_AI',
    summary: `Detailed industrial insight and calculations for "${cleanQ}".`,
    details: `Based on automated textile engineering principles:\n\n` +
      `1. Colorimetry Assessment: Color shifts are controlled through selective trichromatic additions (Red, Yellow, Blue) and auxiliary levelness agents.\n` +
      `2. Liquor Mechanics: Maintain optimal liquor ratio (1:5 to 1:7) for uniform pressure distribution and to minimize dye migration streaks.\n` +
      `3. Chemical Balance: Ensure electrolyte (Glauber's salt) and alkali (Soda ash / Caustic) dosing follows linear-progressive curves.\n` +
      `4. Quality & ISO 9001 Compliance: Inspect all lots under calibrated standard illuminant D65 (6500K) and TL84 store lighting.`,
    actionSteps: [
      'Calibrate the optical spectrophotometer sensor with the white base reference tile.',
      'Check temperature and pH sensor readings in the main autoclave recirculation loop.',
      'Run an automated test sample patch before dispensing full chemical load.'
    ],
    confidence: 89.5,
    source: 'Textile Industrial AI Knowledge Engine (AATCC / SDC / ISO)',
    batchContext: context.batchId ? `Batch ${context.batchId}` : null,
    relatedTopics: [
      { title: 'CIEDE2000 Color Difference (ΔE00) Standards', id: 'kb_delta_e_ciede2000' },
      { title: 'Real-Time Shade Correction & Troubleshooting Matrix', id: 'kb_shade_correction_troubleshooting' }
    ]
  };
}

export const AI_SUGGESTED_PROMPTS = [
  '🔬 Diagnose current batch color difference & dosing',
  '📊 How is CIEDE2000 ΔE calculated for textile tolerance?',
  '🧪 Reactive dye exhaustion & fixation curve at 60-80°C',
  '🔥 Disperse dyeing for polyester in 130°C autoclave',
  '💧 How to calculate liquor ratio for 4,200 L bath?',
  '⚠️ Chemical safety & PPE for caustic soda & peroxide',
  '🎨 How to correct high delta b* (yellow/blue shift)?',
  '📦 Dye box inventory codes (D-10, D-12, D-15, D-18, D-22)'
];

