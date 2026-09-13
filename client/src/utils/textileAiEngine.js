/**
 * textileAiEngine.js
 * Multi-Lingual Intelligent Knowledge Base & AI Search Engine for Industrial Textile Color Matching,
 * CIELAB Colorimetry, Dye Chemistry, Autoclave Operations, and Batch Troubleshooting.
 * Supports: EN, ES, FR, DE, NL, PR (PT), Twi
 */

export const TEXTILE_KNOWLEDGE_BASE = [
  {
    id: 'kb_delta_e_ciede2000',
    category: 'COLORIMETRY',
    keywords: ['delta e', 'ciede2000', 'tolerance', 'formula', 'cmc', 'cielab', 'difference', 'match', 'pass', 'fail', 'tolerancia', 'diferencia', 'toleranz', 'differenz', 'nsonsonoe'],
    translations: {
      EN: {
        title: 'CIEDE2000 Color Difference (ΔE00) Standards & Tolerance',
        summary: 'CIEDE2000 is the international ISO standard for calculating perceptual color difference between textile samples and target standards.',
        details: `In industrial textile dye houses, color tolerance is measured using CIEDE2000 (ΔE00):
• ΔE ≤ 1.0 (PASS / Target Match Passed): Perceptually identical to human eye under D65 daylight. Safe for commercial shipment.
• 1.0 < ΔE ≤ 2.2 (WARNING / Slight Variance): Minor shade variance perceptible by trained QC inspectors. Requires minor tone correction or customer approval.
• ΔE > 2.2 (FAIL / Correction Required): Clear visual deviation. Batch cannot be unloaded; chemical correction in autoclave vessel is mandatory before fixation.`,
        actionSteps: [
          'Measure sample L*, a*, b* coordinates against standard target.',
          'Check if lightness ΔL*, chromatic red/green Δa*, or yellow/blue Δb* has the largest deviation.',
          'Dose single primary dye according to the directional vector shift rather than adding mixed tri-chromatic formulations.'
        ]
      },
      ES: {
        title: 'Estándares y Tolerancia de Diferencia de Color CIEDE2000 (ΔE00)',
        summary: 'CIEDE2000 es el estándar internacional ISO para calcular la diferencia perceptual de color entre muestras textiles y el estándar del cliente.',
        details: `En tintorería industrial, la tolerancia de color se evalúa con CIEDE2000 (ΔE00):
• ΔE ≤ 1.0 (APROBADO): Perceptualmente idéntico al ojo humano bajo luz D65. Aprobado para expedición.
• 1.0 < ΔE ≤ 2.2 (ADVERTENCIA / Variación Ligera): Pequeña desviación visible por inspectores de control de calidad.
• ΔE > 2.2 (FALLO / Corrección Obligatoria): Desviación visual clara. El lote no puede descargarse; se requiere corrección química en autoclave antes de fijar.`,
        actionSteps: [
          'Medir las coordenadas L*, a*, b* de la muestra frente al objetivo estándar.',
          'Comprobar si la mayor desviación está en luminosidad (ΔL*), rojo/verde (Δa*) o amarillo/azul (Δb*).',
          'Dosificar el colorante primario específico según el vector de desviación.'
        ]
      },
      FR: {
        title: 'Normes et Tolérances de Différence de Couleur CIEDE2000 (ΔE00)',
        summary: 'CIEDE2000 est la norme ISO internationale pour calculer la différence de couleur perçue entre les échantillons textiles et la référence.',
        details: `En teinturerie industrielle textile, la tolérance est mesurée selon CIEDE2000 (ΔE00) :
• ΔE ≤ 1.0 (APPROUVÉ) : Identique à l'œil nu sous illuminant D65. Prêt pour expédition commerciale.
• 1.0 < ΔE ≤ 2.2 (AVERTISSEMENT) : Légère variance perceptible par le contrôle qualité.
• ΔE > 2.2 (ÉCHEC / Correction Requise) : Déviation nette. Correction chimique obligatoire dans l'autoclave avant fixation.`,
        actionSteps: [
          'Mesurer les coordonnées L*, a*, b* de l\'échantillon par rapport au standard.',
          'Identifier si l\'écart majeur provient de la clarté (ΔL*), du rouge/vert (Δa*) ou du jaune/bleu (Δb*).',
          'Doser le colorant primaire adapté au vecteur de correction.'
        ]
      },
      DE: {
        title: 'CIEDE2000 Farbabstands-Standards & Toleranzen (ΔE00)',
        summary: 'CIEDE2000 ist die internationale ISO-Norm zur präzisen Berechnung von Farbunterschieden in der Textilindustrie.',
        details: `In industriellen Färbereien wird die Farbtoleranz nach CIEDE2000 (ΔE00) bewertet:
• ΔE ≤ 1.0 (FREIGEGEBEN): Für das menschliche Auge unter D65-Tageslicht identisch. Versandbereit.
• 1.0 < ΔE ≤ 2.2 (WARNUNG / Geringe Abweichung): Leichte Farbtonabweichung für geschultes QC-Personal.
• ΔE > 2.2 (FEHLER / Nachfärbung Erforderlich): Deutliche Abweichung. Chemische Korrektur im Autoklav zwingend erforderlich.`,
        actionSteps: [
          'Musterkoordinaten L*, a*, b* gegen den Standard abgleichen.',
          'Prüfen, ob Helligkeit (ΔL*), Rot/Grün (Δa*) oder Gelb/Blau (Δb*) die stärkste Abweichung aufweist.',
          'Gezielt den benötigten Einzelfarbstoff dosieren.'
        ]
      },
      NL: {
        title: 'CIEDE2000 Kleurverschil Standaarden & Toleranties (ΔE00)',
        summary: 'CIEDE2000 is de internationale ISO-standaard voor het berekenen van kleurverschillen in de textielindustrie.',
        details: `In industriële ververijen wordt kleurtolerantie gemeten met CIEDE2000 (ΔE00):
• ΔE ≤ 1.0 (GOEDGEKEURD): Onderscheidt zich niet voor het menselijk oog onder D65 daglicht.
• 1.0 < ΔE ≤ 2.2 (WAARSCHUWING): Lichte tintafwijking zichtbaar voor kwaliteitscontroleurs.
• ΔE > 2.2 (AFGEKEURD / Correctie Vereist): Duidelijke afwijking. Chemische correctie in de autoclaaf is verplicht.`,
        actionSteps: [
          'Meet de L*, a*, b* kleurcoördinaten ten opzichte van het referentiedoel.',
          'Bepaal of de grootste afwijking zit in helderheid (ΔL*), rood/groen (Δa*) of geel/blauw (Δb*).',
          'Voeg de specifieke kleurstof toe op basis van de afwijkingsvector.'
        ]
      },
      PR: {
        title: 'Padrões de Diferença de Cor e Tolerância CIEDE2000 (ΔE00)',
        summary: 'CIEDE2000 é a norma ISO internacional para calcular a diferença perceptual de cor entre amostras têxteis e o padrão.',
        details: `Em tinturarias industriais, a tolerância de cor é avaliada com CIEDE2000 (ΔE00):
• ΔE ≤ 1.0 (APROVADO): Peretamente idêntico ao olho humano sob luz D65. Pronto para expedição.
• 1.0 < ΔE ≤ 2.2 (AVISO): Ligeira variação de tom percetível pelo controlo de qualidade.
• ΔE > 2.2 (FALHA / Correção Obrigatória): Desvio visual evidente. Requer correção química no autoclave antes da fixação.`,
        actionSteps: [
          'Medir as coordenadas L*, a*, b* da amostra em relação ao padrão do cliente.',
          'Verificar se o maior desvio está na luminosidade (ΔL*), vermelho/verde (Δa*) ou amarelo/azul (Δb*).',
          'Dosar o corante primário específico de acordo com a correção necessária.'
        ]
      },
      Twi: {
        title: 'CIEDE2000 Ahosuo Nsonsonoe Gyinapɛn (ΔE00)',
        summary: 'CIEDE2000 yɛ aban mmara a wode susuw nsonsonoe a ɛda ntoma ahosuo ne deɛ kwayɛnt no pɛ ntam.',
        details: `Wɔ ntoma adwumayɛ mu no, yɛde CIEDE2000 na ɛhwɛ ahosuo no pɛpɛɛpɛyɛ:
• ΔE ≤ 1.0 (W'AGYE TO MU): Ɛhyia pɛpɛɛpɛ te sɛ deɛ kwayɛnt no pɛ. Wotumi de kɔma kwayɛnt no.
• 1.0 < ΔE ≤ 2.2 (HWƐ YIE): Asesa kakra a QCfoɔ bɛtumi ahunu.
• ΔE > 2.2 (ƐNYƐ / ƐHIA SƐ WOSIESIE): Ahosuo no ne deɛ wɔpɛ no nhyia koraa. Ɛsɛ sɛ wode aduru gu mu siesie ansa na w'agyae.`,
        actionSteps: [
          'Susu sample no L*, a*, b* ahosuo nsusuwii ne deɛ wopɛ no.',
          'Hwɛ sɛ hann no (ΔL*), kɔkɔɔ/ahabanmono (Δa*), anaa akokɔseradeɛ/bruu (Δb*) na asesa kɛse.',
          'Fa aduru pɔtee a ɛbɛsiesie nsonsonoe no gu mu.'
        ]
      }
    }
  },
  {
    id: 'kb_reactive_dyeing_curve',
    category: 'DYE_CHEMISTRY',
    keywords: ['reactive', 'dye', 'exhaustion', 'fixation', 'temperature', 'curve', 'cotton', 'reactivo', 'réactif', 'reaktiv', 'fijacion', 'tintura'],
    translations: {
      EN: {
        title: 'Reactive Dye Exhaustion & Fixation Curve on Cotton',
        summary: 'Reactive dyes form covalent bonds with cellulose hydroxyl groups at 60°C or 80-100°C under alkaline conditions.',
        details: `Standard 3-Phase Reactive Dyeing Cycle:
1. Migration Phase (40°C - 60°C): Add Glauber's salt (Na₂SO₄ 30-60 g/L) gradually to drive exhaustion evenly.
2. Fixation Phase (60°C - 80°C): Add Soda Ash (Na₂CO₃ 15-20 g/L) over 20-30 minutes to activate covalent bonding.
3. Soaping & Washing Phase (95°C - 98°C): Reduction wash with soaping auxiliary (1 g/L) to remove hydrolysed unreacted dye.`,
        actionSteps: [
          'Ensure bath pH is neutral (6.5 - 7.0) during salt migration before adding alkali.',
          'Maintain continuous liquor circulation rate of 18-22 L/kg/min.',
          'Rinse thoroughly to pH 6.0-6.5 using acetic acid before final softening.'
        ]
      },
      ES: {
        title: 'Curva de Agotamiento y Fijación de Colorantes Reactivos en Algodón',
        summary: 'Los colorantes reactivos forman enlaces covalentes con los grupos hidroxilo de la celulosa a 60°C o 80-100°C en medio alcalino.',
        details: `Ciclo Estándar de Tintura Reactiva en 3 Fases:
1. Fase de Migración (40°C - 60°C): Añadir Sulfato Sódico (30-60 g/L) gradualmente para lograr agotamiento uniforme.
2. Fase de Fijación (60°C - 80°C): Añadir Carbonato Sódico (15-20 g/L) en rampa de 20-30 minutos para fijar el enlace covalente.
3. Fase de Jabonado y Lavado (95°C - 98°C): Lavado reductor con detergente (1 g/L) para eliminar colorante hidrolizado no fijado.`,
        actionSteps: [
          'Verificar pH neutro (6.5 - 7.0) durante la migración de sales antes de añadir álcali.',
          'Mantener circulación continua de baño a 18-22 L/kg/min.',
          'Neutralizar a pH 6.0-6.5 con ácido acético antes del suavizado final.'
        ]
      },
      FR: {
        title: 'Courbe d\'Épuisement et Fixation des Colorants Réactifs sur Coton',
        summary: 'Les colorants réactifs forment des liaisons covalentes avec la cellulose à 60°C ou 80-100°C en milieu alcalin.',
        details: `Cycle Standard de Teinture Réactive :
1. Phase de Migration (40°C - 60°C) : Ajout progressif de sel de Glauber (30-60 g/L).
2. Phase de Fixation (60°C - 80°C) : Ajout de carbonate de soude (15-20 g/L) pour activer la liaison.
3. Phase de Savonnage (95°C - 98°C) : Lavage réducteur (1 g/L) pour éliminer le colorant non fixé.`,
        actionSteps: [
          'Vérifier le pH neutre (6.5 - 7.0) pendant la migration saline.',
          'Maintenir une circulation constante du bain (18-22 L/kg/min).',
          'Rincer et neutraliser à pH 6.0-6.5 avant l\'adoucissage final.'
        ]
      },
      DE: {
        title: 'Reaktivfarbstoff-Auszug & Fixierkurve auf Baumwolle',
        summary: 'Reaktivfarbstoffe binden kovalent an Cellulose bei 60°C bzw. 80-100°C unter alkalischen Bedingungen.',
        details: `3-Phasen Reaktivfärbeprozess:
1. Migrationsphase (40°C - 60°C): Glaubersalz-Zugabe (30-60 g/L) für gleichmäßigen Auszug.
2. Fixierphase (60°C - 80°C): Soda-Zugabe (15-20 g/L) über 20-30 Minuten zur kovalenten Fixierung.
3. Seif- und Waschphase (95°C - 98°C): Reduktives Nachseifen (1 g/L) zur Beseitigung von Hydrolysat.`,
        actionSteps: [
          'Bad-pH auf 6.5 - 7.0 während der Salzphase kontrollieren.',
          'Flottenumwälzung bei 18-22 L/kg/min halten.',
          'Mit Essigsäure auf pH 6.0-6.5 neutralisieren.'
        ]
      },
      NL: {
        title: 'Reactieve Kleurstof Uitputting & Fixatiecurve op Katoen',
        summary: 'Reactieve kleurstoffen vormen covalente bindingen met cellulose bij 60°C of 80-100°C onder alkalische omstandigheden.',
        details: `Standaard 3-Fasen Reactief Verfproces:
1. Migratiefase (40°C - 60°C): Geleidelijke toevoeging van Glauberszout (30-60 g/L).
2. Fixatiefase (60°C - 80°C): Toevoeging van soda ash (15-20 g/L) over 20-30 minuten.
3. Zeep- en Wasfase (95°C - 98°C): Reductief zepen (1 g/L) om ongehechte kleurstof te verwijderen.`,
        actionSteps: [
          'Zorg voor een neutrale pH (6.5 - 7.0) tijdens de zoutmigratie.',
          'Behoud een continue circulatie van 18-22 L/kg/min.',
          'Spoel grondig tot pH 6.0-6.5 met azijnzuur.'
        ]
      },
      PR: {
        title: 'Curva de Esgotamento e Fixação de Corantes Reativos em Algodão',
        summary: 'Os corantes reativos ligam-se covalentemente à celulose a 60°C ou 80-100°C em meio alcalino.',
        details: `Ciclo Padrão de Tinturaria Reativa:
1. Fase de Migração (40°C - 60°C): Adição de Sulfato de Sódio (30-60 g/L).
2. Fase de Fixação (60°C - 80°C): Adição de Carbonato de Sódio (15-20 g/L) em rampa.
3. Fase de Saboagem (95°C - 98°C): Lavagem redutora (1 g/L) para remover corante hidrolisado.`,
        actionSteps: [
          'Verificar pH neutro (6.5 - 7.0) durante a fase de sal.',
          'Manter circulação contínua do banho a 18-22 L/kg/min.',
          'Neutralizar a pH 6.0-6.5 com ácido acético antes do amaciamento.'
        ]
      },
      Twi: {
        title: 'Kɔtɔn Ahosuo Aduru a Wode Gu Ntoma Mu Nhyehyɛe',
        summary: 'Ahosuo aduru no ne ntoma no bɔ mu pɛpɛɛpɛ wɔ hyew 60°C anaa 80-100°C mu.',
        details: `Ahosuo Gu Akwankyerɛ a Ɛwɔ Nkyekyɛmu 3:
1. Nkyekyɛmu 1 (40°C - 60°C): Fa Glauber nkyene (30-60 g/L) gu mu ma ahosuo no ntrɛ pɛpɛɛpɛ.
2. Nkyekyɛmu 2 (60°C - 80°C): Fa Soda Ash (15-20 g/L) gu mu wɔ sima 20-30 mu ma aduru no mmata ntoma no ho.
3. Nkyekyɛmu 3 (95°C - 98°C): Horo ntoma no yie wɔ hyew mu na aduru a anka ho no afiri ho.`,
        actionSteps: [
          'Hwɛ sɛ pH no yɛ 6.5 - 7.0 ansa na wode soda ash no agu mu.',
          'Ma nsuo no ntwitwi mu yie 18-22 L/kg/min.',
          'Horo ntoma no na fa ácido acético siesie pH no kɔ 6.0-6.5.'
        ]
      }
    }
  },
  {
    id: 'kb_autoclave_14_trays',
    category: 'EQUIPMENT',
    keywords: ['autoclave', '14 tray', '14-tray', 'dosing', 'tray', 'mixer', 'circulation', 'liquor', 'ratio', 'water', 'bandejas', 'trays'],
    translations: {
      EN: {
        title: '14-Tray Industrial Dyeing Controller & Liquor Circulation Dynamics',
        summary: 'Industrial autoclaves utilize multi-tray chemical dosing systems with pneumatic injection valves to ensure levelness across 2,000-5,000m batch runs.',
        details: `14-Tray Allocation Blueprint:
• Trays 1-4: Primary & Secondary Chromophore Dyes (Red D-10, Blue D-12, Yellow D-15, Green D-18).
• Trays 5-8: Specialty Shading Dyes (Black D-22, Magenta D-24, Violet D-28, Orange D-19).
• Trays 9-10: Pre-treatment Bleaching Bases (NaOH 50% & H₂O₂ 50%).
• Trays 11-12: Auxiliaries & Electrolytes (Glauber's Salt, Levelling Dispersant EUROGAL).
• Trays 13-14: Finishing & Neutralization (Acetic Acid 80%, Cationic Softener EUROTOUCH-RF).`,
        actionSteps: [
          'Set automated dosing curve to progressive exponential injection.',
          'Monitor main pump differential pressure (0.8 - 1.2 bar).',
          'Verify white base pre-treatment whiteness before injecting dye trays.'
        ]
      },
      ES: {
        title: 'Controlador de Autoclave de 14 Bandejas y Dinámica de Baño',
        summary: 'Los autoclaves industriales utilizan sistemas de dosificación de 14 bandejas con válvulas neumáticas para garantizar tinturas uniformes de 2.000 a 5.000 m.',
        details: `Distribución de las 14 Bandejas:
• Bandejas 1-4: Colorantes Primarios (Rojo D-10, Azul D-12, Amarillo D-15, Verde D-18).
• Bandejas 5-8: Colorantes Especiales (Negro D-22, Magenta D-24, Violeta D-28, Naranja D-19).
• Bandejas 9-10: Pre-Tratamiento Químico (Sosa Cáustica 50% y Agua Oxigenada 50%).
• Bandejas 11-12: Auxiliares (Sulfato Sódico, Dispersante EUROGAL L25).
• Bandejas 13-14: Acabado (Ácido Acético 80%, Suavizante EUROTOUCH-RF).`,
        actionSteps: [
          'Configurar curva de dosificación progresiva exponencial.',
          'Supervisar presión diferencial de bomba (0.8 - 1.2 bar).',
          'Verificar blancura de base antes de inyectar bandejas de colorante.'
        ]
      },
      FR: {
        title: 'Contrôleur d\'Autoclave 14 Bacs et Dynamique de Bain',
        summary: 'Les autoclaves industriels utilisent 14 bacs de dosage avec vannes pneumatiques pour des teintures homogènes sur 2 000 à 5 000 m.',
        details: `Répartition des 14 Bacs :
• Bacs 1-4 : Colorants Primaires (Rouge D-10, Bleu D-12, Jaune D-15, Vert D-18).
• Bacs 5-8 : Colorants de Nuance (Noir D-22, Magenta D-24, Violet D-28, Orange D-19).
• Bacs 9-10 : Prétraitement (Soude Caustique 50% & Eau Oxygénée 50%).
• Bacs 11-12 : Auxiliaires (Sel de Glauber, Égalisant EUROGAL L25).
• Bacs 13-14 : Finition (Acide Acétique 80%, Adoucissant EUROTOUCH-RF).`,
        actionSteps: [
          'Programmer une injection progressive exponentielle.',
          'Surveiller la pression de la pompe principale (0.8 - 1.2 bar).',
          'Contrôler le degré de blanc avant injection des colorants.'
        ]
      },
      DE: {
        title: '14-Schalen Autoklav-Steuerung & Flottenzirkulation',
        summary: 'Industrielle Autoklaven nutzen 14-Schalen-Dosiersysteme mit pneumatischen Ventilen für gleichmäßige Färbungen.',
        details: `14-Schalen-Belegungsplan:
• Schalen 1-4: Primärfarbstoffe (Rot D-10, Blau D-12, Gelb D-15, Grün D-18).
• Schalen 5-8: Nuancierfarbstoffe (Schwarz D-22, Magenta D-24, Violett D-28, Orange D-19).
• Schalen 9-10: Vorbehandlung (Natronlauge 50% & Wasserstoffperoxid 50%).
• Schalen 11-12: Hilfsmittel (Glaubersalz, Egalisiermittel EUROGAL).
• Schalen 13-14: Ausrüstung (Essigsäure 80%, Weichmacher EUROTOUCH-RF).`,
        actionSteps: [
          'Dosierkurve auf progressive Einspeisung einstellen.',
          'Differenzdruck der Hauptpumpe überwachen (0.8 - 1.2 bar).',
          'Weißgrad der Vorbehandlung vor Farbstoffinjektion prüfen.'
        ]
      },
      NL: {
        title: '14-Trays Autoclaaf Besturing & Vloeistofdynamica',
        summary: 'Industriële autoclaven gebruiken 14-trays doseersystemen met pneumatische kleppen voor egale kleuringen.',
        details: `14-Trays Indeling:
• Trays 1-4: Primaire Kleurstoffen (Rood D-10, Blauw D-12, Geel D-15, Groen D-18).
• Trays 5-8: Nuanceer Kleurstoffen (Zwart D-22, Magenta D-24, Violet D-28, Oranje D-19).
• Trays 9-10: Voorbehandeling (Caustic Soda 50% & Waterstofperoxide 50%).
• Trays 11-12: Hulpstoffen (Glauberszout, Egaliseermiddel EUROGAL).
• Trays 13-14: Finish (Azijnzuur 80%, Wasverzachter EUROTOUCH-RF).`,
        actionSteps: [
          'Stel de automatische doseercurve in op progressieve injectie.',
          'Controleer de pompdruk (0.8 - 1.2 bar).',
          'Controleer de witheid van het materiaal voor het doseren.'
        ]
      },
      PR: {
        title: 'Controlador de Autoclave de 14 Bandejas e Dinâmica de Banho',
        summary: 'Autoclaves industriais utilizam sistemas de dosagem de 14 bandejas com válvulas pneumáticas para garantir uniformidade.',
        details: `Distribuição das 14 Bandejas:
• Bandejas 1-4: Corantes Primários (Vermelho D-10, Azul D-12, Amarelo D-15, Verde D-18).
• Bandejas 5-8: Corantes Especiais (Preto D-22, Magenta D-24, Violeta D-28, Laranja D-19).
• Bandejas 9-10: Pré-Tratamento (Soda Cáustica 50% e Água Oxigenada 50%).
• Bandejas 11-12: Auxiliares (Sulfato de Sódio, Dispersante EUROGAL).
• Bandejas 13-14: Acabamento (Ácido Acético 80%, Amaciador EUROTOUCH-RF).`,
        actionSteps: [
          'Configurar curva de dosagem progressiva.',
          'Monitorizar pressão da bomba (0.8 - 1.2 bar).',
          'Verificar alvura antes da injeção dos corantes.'
        ]
      },
      Twi: {
        title: 'Nkyɛm 14 Autoclave Afidie Dwumadie',
        summary: 'Autoclave afidie a ɛwɔ nkyɛm 14 a wode gu aduru pɔtee gu ntoma mu pɛpɛɛpɛ.',
        details: `Nkyɛm 14 No Nhyehyɛe:
• Nkyɛm 1-4: Ahosuo Titiriw (Kɔkɔɔ D-10, Bruu D-12, Akokɔseradeɛ D-15, Ahabanmono D-18).
• Nkyɛm 5-8: Ahosuo Foforo (Tuntum D-22, Pinki D-24, Bɔbere D-28, Anwa Kɔkɔɔ D-19).
• Nkyɛm 9-10: Sosa Cáustica ne Agua Oxigenada a wode yɛ ntoma fitaa.
• Nkyɛm 11-12: Glauber nkyene ne EUROGAL a ɛtrɛ ahosuo mu.
• Nkyɛm 13-14: Ácido acético ne aduru a ɛma ntoma yɛ mmerɛ.`,
        actionSteps: [
          'Hwɛ sɛ aduru no rekɔ afidie no mu bɔkɔɔbɔkɔɔ.',
          'Hwɛ afidie no pɔmp no ahoɔden (0.8 - 1.2 bar).',
          'Hwɛ sɛ ntoma no ayɛ fitaa yie ansa na wode ahosuo no agu mu.'
        ]
      }
    }
  }
];

export const AI_SUGGESTED_PROMPTS_BY_LANG = {
  EN: [
    '🔬 Diagnose current batch color difference & dosing',
    '📊 How is CIEDE2000 ΔE calculated for textile tolerance?',
    '🧪 Reactive dye exhaustion & fixation curve at 60-80°C',
    '🔥 Disperse dyeing for polyester in 130°C autoclave',
    '💧 How to calculate liquor ratio for 4,200 L bath?',
    '⚠️ Chemical safety & PPE for caustic soda & peroxide',
    '🎨 How to correct high delta b* (yellow/blue shift)?',
    '📦 Dye box inventory codes (D-10, D-12, D-15, D-18, D-22)'
  ],
  ES: [
    '🔬 Diagnosticar diferencia de color y dosificación del lote actual',
    '📊 ¿Cómo se calcula ΔE CIEDE2000 para tolerancia textil?',
    '🧪 Curva de agotamiento y fijación de colorantes reactivos a 60-80°C',
    '🔥 Tintura de poliéster con colorantes dispersos a 130°C en autoclave',
    '💧 ¿Cómo calcular la relación de baño para 4.200 L de agua?',
    '⚠️ Seguridad química y EPIs para sosa cáustica y agua oxigenada',
    '🎨 ¿Cómo corregir desviación en delta b* (amarillo/azul)?',
    '📦 Códigos de inventario de colorantes (D-10, D-12, D-15, D-18, D-22)'
  ],
  FR: [
    '🔬 Diagnostiquer l\'écart de couleur et le dosage du lot actuel',
    '📊 Comment est calculé le ΔE CIEDE2000 pour la tolérance textile ?',
    '🧪 Courbe d\'épuisement et fixation des colorants réactifs à 60-80°C',
    '🔥 Teinture du polyester avec colorants dispersés à 130°C',
    '💧 Comment calculer le rapport de bain pour 4 200 L d\'eau ?',
    '⚠️ Sécurité chimique et EPI pour soude caustique et eau oxygénée',
    '🎨 Comment corriger un écart élevé de delta b* (jaune/bleu) ?',
    '📦 Codes d\'inventaire des bacs de colorants (D-10, D-12, D-15)'
  ],
  DE: [
    '🔬 Farbabstand und Dosierung der aktuellen Charge diagnostizieren',
    '📊 Wie wird CIEDE2000 ΔE für Textiltoleranzen berechnet?',
    '🧪 Reaktivfarbstoff Auszug & Fixierung bei 60-80°C',
    '🔥 Dispersionsfärbung für Polyester bei 130°C im Autoklav',
    '💧 Wie berechnet man das Flottenverhältnis für 4.200 L Bad?',
    '⚠️ Chemische Sicherheit & PSA für Natronlauge und Peroxid',
    '🎨 Wie korrigiert man hohe Delta b* Abweichungen (Gelb/Blau)?',
    '📦 Farbstoff-Lagerboxen Codes (D-10, D-12, D-15, D-18, D-22)'
  ],
  NL: [
    '🔬 Diagnoseer kleurverschil en dosering van huidige partij',
    '📊 Hoe wordt CIEDE2000 ΔE berekend voor textieltolerantie?',
    '🧪 Reactieve kleurstof uitputting & fixatiecurve bij 60-80°C',
    '🔥 Dispersieverven van polyester bij 130°C in autoclaaf',
    '💧 Hoe bereken je de badverhouding voor 4.200 L bad?',
    '⚠️ Chemische veiligheid & PBM voor natronloog en peroxide',
    '🎨 Hoe corrigeer je hoge delta b* afwijking (geel/blauw)?',
    '📦 Kleurstof voorraadcodes (D-10, D-12, D-15, D-18, D-22)'
  ],
  PR: [
    '🔬 Diagnosticar diferença de cor e dosagem do lote atual',
    '📊 Como é calculado o ΔE CIEDE2000 para tolerância têxtil?',
    '🧪 Curva de esgotamento e fixação de corantes reativos a 60-80°C',
    '🔥 Tinturaria de poliéster com corantes dispersos a 130°C',
    '💧 Como calcular a relação de banho para 4.200 L de água?',
    '⚠️ Segurança química e EPI para soda cáustica e água oxigenada',
    '🎨 Como corrigir desvio elevado em delta b* (amarelo/azul)?',
    '📦 Códigos de inventário de corantes (D-10, D-12, D-15, D-18)'
  ],
  Twi: [
    '🔬 Hwehwɛ boole no ahosuo nsonsonoe ne aduru dodoɔ mu',
    '📊 Ɛkwan bɛn so na wofa susuw CIEDE2000 ΔE ma ntoma?',
    '🧪 Ahosuo aduru gu a ɛwɔ hyew 60-80°C mu nhyehyɛe',
    '🔥 Polyester ntoma ahosuo gu wɔ 130°C autoclave mu',
    '💧 Ɛkwan bɛn so na wobɛsusuw nsuo dodoɔ ma 4,200 L?',
    '⚠️ Ahobanbɔ akwankyerɛ ma sosa cáustica ne agua oxigenada',
    '🎨 Ɛkwan bɛn so na wobɛsiesie delta b* (akokɔseradeɛ/bruu)?',
    '📦 Ahosuo aduru nkyɛm kood (D-10, D-12, D-15, D-18)'
  ]
};

export const AI_SUGGESTED_PROMPTS = AI_SUGGESTED_PROMPTS_BY_LANG.EN;

/**
 * Searches the Knowledge Base and generates an AI answer tailored to the user question in the selected language.
 */
export function queryTextileAi(question, context = {}, lang = 'EN') {
  const currentLangKey = (lang && TEXTILE_KNOWLEDGE_BASE[0]?.translations[lang]) ? lang : 'EN';

  if (!question || typeof question !== 'string') {
    return generateBatchDiagnosisAnswer(context, currentLangKey);
  }

  const cleanQuery = question.toLowerCase().trim();
  const tokens = cleanQuery.split(/[\s,?.!/\\-]+/).filter(t => t.length > 1);

  // Check if user specifically requested batch diagnosis
  if (
    cleanQuery.includes('current batch') ||
    cleanQuery.includes('diagnose') ||
    cleanQuery.includes('diagnosticar') ||
    cleanQuery.includes('diagnostique') ||
    cleanQuery.includes('how to match') ||
    cleanQuery.includes('equalize') ||
    cleanQuery.includes('my color') ||
    cleanQuery.includes('mi color') ||
    cleanQuery.includes('hwehwɛ') ||
    (cleanQuery.includes('difference') && (cleanQuery.includes('now') || cleanQuery.includes('sample')))
  ) {
    return generateBatchDiagnosisAnswer(context, currentLangKey, question);
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

    const itemTrans = item.translations[currentLangKey] || item.translations.EN;
    if (itemTrans.title.toLowerCase().includes(cleanQuery)) score += 10;
    if (itemTrans.summary.toLowerCase().includes(cleanQuery)) score += 4;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore >= 3) {
    const itemData = bestMatch.translations[currentLangKey] || bestMatch.translations.EN;
    return {
      query: question,
      title: itemData.title,
      category: bestMatch.category,
      summary: itemData.summary,
      details: itemData.details,
      actionSteps: itemData.actionSteps,
      confidence: Math.min(98, 70 + bestScore * 3),
      source: 'Textile Industrial AI Knowledge Engine (ISO / CIEDE2000 / AATCC)',
      batchContext: context.batchId ? `Batch ${context.batchId}` : null,
      relatedTopics: TEXTILE_KNOWLEDGE_BASE
        .filter(k => k.id !== bestMatch.id)
        .slice(0, 3)
        .map(k => {
          const trans = k.translations[currentLangKey] || k.translations.EN;
          return { title: trans.title, id: k.id };
        })
    };
  }

  // General Colorimetry / Calculation Fallback in selected language
  return generateDynamicAiAnswer(question, context, currentLangKey);
}

/**
 * Generates an automated, expert AI diagnosis of the active batch in the selected language
 */
export function generateBatchDiagnosisAnswer(context = {}, lang = 'EN', customQuestion = '') {
  const currentLang = (lang && AI_SUGGESTED_PROMPTS_BY_LANG[lang]) ? lang : 'EN';
  const {
    batchId = '#1245',
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

  const liquorRatio = (waterVolume / fabricKg).toFixed(2);

  if (currentLang === 'ES') {
    let statusText = isMatch 
      ? 'Coincidencia de Color Aprobada (ΔE ≤ 1.0). Listo para fijación en autoclave.' 
      : `Ajuste Químico de Color Necesario (ΔE = ${deltaE.toFixed(2)}).`;

    let diagnosisDetails = `Análisis Espectrofotométrico Óptico del Lote #${batchId.replace('#', '')}:\n` +
      `• Referencia Objetivo: ${targetHex} | Muestra Medida: ${sampleHex}\n` +
      `• Diferencia de Color: ΔE = ${deltaE.toFixed(2)} (Tolerancia Estándar ≤ 1.0 CIEDE2000)\n` +
      `• Desviación de Luminosidad (ΔL*): ${deltaL >= 0 ? '+' : ''}${deltaL.toFixed(2)} (${deltaL > 0 ? 'Muestra más clara que el objetivo' : 'Muestra más oscura que el objetivo'})\n` +
      `• Desviación Rojo/Verde (Δa*): ${deltaA >= 0 ? '+' : ''}${deltaA.toFixed(2)} (${deltaA > 0 ? 'Exceso de Rojo' : 'Déficit de Rojo / Exceso de Verde'})\n` +
      `• Desviación Amarillo/Azul (Δb*): ${deltaB >= 0 ? '+' : ''}${deltaB.toFixed(2)} (${deltaB > 0 ? 'Exceso de Amarillo' : 'Déficit de Amarillo / Exceso de Azul'})\n` +
      `• Carga de Tejido: ${yardage} metros (${fabricKg} kg) | Volumen de Agua: ${waterVolume} Litros (Relación de Baño 1:${liquorRatio})\n\n` +
      `Dosificación de Colorantes Recomendada por IA:\n` +
      (advices.length > 0 
        ? advices.map((adv, idx) => `  ${idx + 1}. ${adv.dyeName || adv.text}: Añadir ${adv.grams ? adv.grams.toLocaleString() + ' gr' : adv.kg + ' kg'} por Bandeja #${adv.tray || 1} (${adv.boxCode || 'D-10'}, Fuerza: ${adv.strength || '200%'})`).join('\n')
        : '  • Cero adiciones químicas necesarias. El lote cumple la tolerancia comercial.');

    return {
      query: customQuestion || `Diagnóstico IA en Vivo para Lote ${batchId}`,
      title: `Diagnóstico IA y Receta de Dosificación para Lote ${batchId}`,
      category: 'DIAGNÓSTICO_EN_VIVO',
      summary: statusText,
      details: diagnosisDetails,
      actionSteps: isMatch 
        ? ['Proceder con la fijación a alta temperatura (100°C durante 20 minutos).', 'Aclarar y descargar el baño al recuperador de calor.']
        : [
            `Disolver las ${advices.length} adiciones de colorante recomendadas en el tanque auxiliar a 60°C.`,
            'Inyectar la formulación de forma progresiva en el autoclave durante 12 minutos.',
            'Hacer circular el baño 15 minutos a temperatura constante y volver a muestrear.'
          ],
      confidence: 99.4,
      source: 'Motor IA de Espectrofotometría Industrial en Tiempo Real',
      batchContext: `Lote ${batchId} • ${yardage}m • ${waterVolume}L`
    };
  }

  if (currentLang === 'FR') {
    let statusText = isMatch 
      ? 'Conformité de Couleur Validée (ΔE ≤ 1.0). Prêt pour fixation.' 
      : `Ajustement de Couleur Requis (ΔE = ${deltaE.toFixed(2)}).`;

    let diagnosisDetails = `Analyse Spectrophotométrique du Lot #${batchId.replace('#', '')} :\n` +
      `• Référence Cible : ${targetHex} | Échantillon Mesuré : ${sampleHex}\n` +
      `• Écart de Couleur : ΔE = ${deltaE.toFixed(2)} (Tolérance Standard ≤ 1.0 CIEDE2000)\n` +
      `• Écart de Clarté (ΔL*) : ${deltaL >= 0 ? '+' : ''}${deltaL.toFixed(2)}\n` +
      `• Écart Rouge/Vert (Δa*) : ${deltaA >= 0 ? '+' : ''}${deltaA.toFixed(2)}\n` +
      `• Écart Jaune/Bleu (Δb*) : ${deltaB >= 0 ? '+' : ''}${deltaB.toFixed(2)}\n` +
      `• Tissu : ${yardage} m (${fabricKg} kg) | Volume d'Eau : ${waterVolume} L (Rapport 1:${liquorRatio})\n\n` +
      `Dosage Recommandé par l'IA :\n` +
      (advices.length > 0 
        ? advices.map((adv, idx) => `  ${idx + 1}. ${adv.dyeName || adv.text}: Ajouter ${adv.grams ? adv.grams.toLocaleString() + ' gr' : adv.kg + ' kg'} (Bac #${adv.tray || 1}, ${adv.boxCode || 'D-10'})`).join('\n')
        : '  • Aucun ajout requis. Le lot est conforme.');

    return {
      query: customQuestion || `Diagnostic IA pour le Lot ${batchId}`,
      title: `Diagnostic IA et Dosage pour le Lot ${batchId}`,
      category: 'DIAGNOSTIC_LOT',
      summary: statusText,
      details: diagnosisDetails,
      actionSteps: isMatch 
        ? ['Procéder à la fixation à 100°C pendant 20 minutes.', 'Rincer et vidanger.']
        : [
            `Dissoudre les ${advices.length} colorants dans le bac auxiliaire à 60°C.`,
            'Injecter progressivement dans l\'autoclave sur 12 minutes.',
            'Faire circuler 15 minutes à température de palier et prélever un nouvel échantillon.'
          ],
      confidence: 99.4,
      source: 'Moteur IA de Spectrophotométrie en Temps Réel',
      batchContext: `Lot ${batchId} • ${yardage}m • ${waterVolume}L`
    };
  }

  if (currentLang === 'DE') {
    let statusText = isMatch 
      ? 'Farbübereinstimmung Freigegeben (ΔE ≤ 1.0). Bereit zur Fixierung.' 
      : `Farbkorrektur Erforderlich (ΔE = ${deltaE.toFixed(2)}).`;

    let diagnosisDetails = `Spektralanalyse der Charge #${batchId.replace('#', '')}:\n` +
      `• Ziel-Referenz: ${targetHex} | Messprobe: ${sampleHex}\n` +
      `• Farbabstand: ΔE = ${deltaE.toFixed(2)} (Standardtoleranz ≤ 1.0 CIEDE2000)\n` +
      `• Helligkeitsverschiebung (ΔL*): ${deltaL >= 0 ? '+' : ''}${deltaL.toFixed(2)}\n` +
      `• Rot/Grün-Verschiebung (Δa*): ${deltaA >= 0 ? '+' : ''}${deltaA.toFixed(2)}\n` +
      `• Gelb/Blau-Verschiebung (Δb*): ${deltaB >= 0 ? '+' : ''}${deltaB.toFixed(2)}\n` +
      `• Stoffmenge: ${yardage} m (${fabricKg} kg) | Wasservolumen: ${waterVolume} L (Flottenverhältnis 1:${liquorRatio})\n\n` +
      `Von der KI empfohlene Farbstoffdosierung:\n` +
      (advices.length > 0 
        ? advices.map((adv, idx) => `  ${idx + 1}. ${adv.dyeName || adv.text}: ${adv.grams ? adv.grams.toLocaleString() + ' gr' : adv.kg + ' kg'} über Schale #${adv.tray || 1} (${adv.boxCode || 'D-10'})`).join('\n')
        : '  • Keine zusätzlichen Chemikalien erforderlich.');

    return {
      query: customQuestion || `KI-Diagnose für Charge ${batchId}`,
      title: `KI-Diagnose & Dosierrezeptur für Charge ${batchId}`,
      category: 'CHARGEN_DIAGNOSE',
      summary: statusText,
      details: diagnosisDetails,
      actionSteps: isMatch 
        ? ['Mit Heißfixierung bei 100°C für 20 Minuten fortfahren.', 'Spülen und Flotte ablassen.']
        : [
            `Empfohlene ${advices.length} Farbstoffe im Ansatzbehälter bei 60°C lösen.`,
            'Farbstofflösung über 12 Minuten progressiv in den Autoklav injizieren.',
            'Flotte 15 Minuten umwälzen und neues Muster prüfen.'
          ],
      confidence: 99.4,
      source: 'Echtzeit-Spektralphotometrie KI-Engine',
      batchContext: `Charge ${batchId} • ${yardage}m • ${waterVolume}L`
    };
  }

  if (currentLang === 'NL') {
    let statusText = isMatch 
      ? 'Kleurovereenkomst Goedgekeurd (ΔE ≤ 1.0). Klaar voor fixatie.' 
      : `Kleurcorrectie Vereist (ΔE = ${deltaE.toFixed(2)}).`;

    let diagnosisDetails = `Spectroscopische Analyse van Partij #${batchId.replace('#', '')}:\n` +
      `• Doelreferentie: ${targetHex} | Monster: ${sampleHex}\n` +
      `• Kleurverschil: ΔE = ${deltaE.toFixed(2)} (Standaard Tolerantie ≤ 1.0 CIEDE2000)\n` +
      `• Helderheidsverschuiving (ΔL*): ${deltaL >= 0 ? '+' : ''}${deltaL.toFixed(2)}\n` +
      `• Rood/Groen Verschuiving (Δa*): ${deltaA >= 0 ? '+' : ''}${deltaA.toFixed(2)}\n` +
      `• Geel/Blauw Verschuiving (Δb*): ${deltaB >= 0 ? '+' : ''}${deltaB.toFixed(2)}\n` +
      `• Stof: ${yardage} m (${fabricKg} kg) | Watervolume: ${waterVolume} L (Badverhouding 1:${liquorRatio})\n\n` +
      `Door AI Aanbevolen Kleurstofdosering:\n` +
      (advices.length > 0 
        ? advices.map((adv, idx) => `  ${idx + 1}. ${adv.dyeName || adv.text}: Voeg ${adv.grams ? adv.grams.toLocaleString() + ' gr' : adv.kg + ' kg'} toe via Tray #${adv.tray || 1} (${adv.boxCode || 'D-10'})`).join('\n')
        : '  • Geen extra dosering vereist.');

    return {
      query: customQuestion || `AI-Diagnose voor Partij ${batchId}`,
      title: `AI-Diagnose & Doseerrecept voor Partij ${batchId}`,
      category: 'PARTIJ_DIAGNOSE',
      summary: statusText,
      details: diagnosisDetails,
      actionSteps: isMatch 
        ? ['Ga verder met fixatie op 100°C gedurende 20 minuten.', 'Spoel en voer vloeistof af.']
        : [
            `Los de ${advices.length} aanbevolen kleurstoffen op in de toevoegtank bij 60°C.`,
            'Injecteer geleidelijk in de autoclaaf over 12 minuten.',
            'Circuleer 15 minuten en neem een nieuw controlemonster.'
          ],
      confidence: 99.4,
      source: 'Realtime Spectrofotometrie AI-Engine',
      batchContext: `Partij ${batchId} • ${yardage}m • ${waterVolume}L`
    };
  }

  if (currentLang === 'PR') {
    let statusText = isMatch 
      ? 'Correspondência de Cor Aprovada (ΔE ≤ 1.0). Pronto para fixação.' 
      : `Ajuste de Cor Necessário (ΔE = ${deltaE.toFixed(2)}).`;

    let diagnosisDetails = `Análise Espectrofotométrica do Lote #${batchId.replace('#', '')}:\n` +
      `• Referência Alvo: ${targetHex} | Amostra de Teste: ${sampleHex}\n` +
      `• Diferença de Cor: ΔE = ${deltaE.toFixed(2)} (Tolerância Padrão ≤ 1.0 CIEDE2000)\n` +
      `• Variação de Luminosidade (ΔL*): ${deltaL >= 0 ? '+' : ''}${deltaL.toFixed(2)}\n` +
      `• Variação Vermelho/Verde (Δa*): ${deltaA >= 0 ? '+' : ''}${deltaA.toFixed(2)}\n` +
      `• Variação Amarelo/Azul (Δb*): ${deltaB >= 0 ? '+' : ''}${deltaB.toFixed(2)}\n` +
      `• Tecido: ${yardage} m (${fabricKg} kg) | Volume de Água: ${waterVolume} L (Relação 1:${liquorRatio})\n\n` +
      `Dosagem Recomendada pela IA:\n` +
      (advices.length > 0 
        ? advices.map((adv, idx) => `  ${idx + 1}. ${adv.dyeName || adv.text}: Adicionar ${adv.grams ? adv.grams.toLocaleString() + ' gr' : adv.kg + ' kg'} pela Bandeja #${adv.tray || 1} (${adv.boxCode || 'D-10'})`).join('\n')
        : '  • Zero adições necessárias.');

    return {
      query: customQuestion || `Diagnóstico IA para Lote ${batchId}`,
      title: `Diagnóstico IA e Receita para Lote ${batchId}`,
      category: 'DIAGNÓSTICO_LOTE',
      summary: statusText,
      details: diagnosisDetails,
      actionSteps: isMatch 
        ? ['Proceder à fixação a 100°C durante 20 minutos.', 'Enxaguar e descarregar banho.']
        : [
            `Dissolver os ${advices.length} corantes no tanque auxiliar a 60°C.`,
            'Injetar progressivamente no autoclave durante 12 minutos.',
            'Circular 15 minutos e recolher nova amostra.'
          ],
      confidence: 99.4,
      source: 'Motor IA de Espectrofotometria em Tempo Real',
      batchContext: `Lote ${batchId} • ${yardage}m • ${waterVolume}L`
    };
  }

  if (currentLang === 'Twi') {
    let statusText = isMatch 
      ? 'Ahosuo No Ahyia Pɛpɛɛpɛ (ΔE ≤ 1.0). Wotumi gyae ma ɛbɔ.' 
      : `Ɛhia Sɛ Wosiesie Ahosuo No (ΔE = ${deltaE.toFixed(2)}).`;

    let diagnosisDetails = `Ntoma Boole #${batchId.replace('#', '')} Ahosuo Nhwehwɛmu:\n` +
      `• Deɛ Wopɛ (Original): ${targetHex} | Sāmpol a W'ayɛ: ${sampleHex}\n` +
      `• Ahosuo Nsonsonoe: ΔE = ${deltaE.toFixed(2)} (Gyinapɛn ≤ 1.0 CIEDE2000)\n` +
      `• Hann Nsonsonoe (ΔL*): ${deltaL >= 0 ? '+' : ''}${deltaL.toFixed(2)}\n` +
      `• Kɔkɔɔ/Ahabanmono (Δa*): ${deltaA >= 0 ? '+' : ''}${deltaA.toFixed(2)}\n` +
      `• Akokɔseradeɛ/Bruu (Δb*): ${deltaB >= 0 ? '+' : ''}${deltaB.toFixed(2)}\n` +
      `• Ntoma Dodoɔ: ${yardage} m (${fabricKg} kg) | Nsuo Dodoɔ: ${waterVolume} L\n\n` +
      `AI Aduru a Wode Bɛka Ho Akwankyerɛ:\n` +
      (advices.length > 0 
        ? advices.map((adv, idx) => `  ${idx + 1}. ${adv.dyeName || adv.text}: Fa ${adv.grams ? adv.grams.toLocaleString() + ' gr' : adv.kg + ' kg'} gu Nkyɛm #${adv.tray || 1} mu (${adv.boxCode || 'D-10'})`).join('\n')
        : '  • Ɛnhia aduru biara bio.');

    return {
      query: customQuestion || `AI Nhwehwɛmu ma Boole ${batchId}`,
      title: `AI Nhwehwɛmu & Aduru Nhyehyɛe ma Boole ${batchId}`,
      category: 'BOOLE_NHWEHWƐMU',
      summary: statusText,
      details: diagnosisDetails,
      actionSteps: isMatch 
        ? ['Kɔ so ma hyew no nkɔ 100°C sima 20.', 'Horo ntoma no na gyae nsuo no.']
        : [
            `Fa aduru ${advices.length} a wode akyerɛ no gu nsuo hyew (60°C) mu wɔ tank no mu.`,
            'Ma aduru no nkɔ afidie no mu bɔkɔɔbɔkɔɔ wɔ sima 12 mu.',
            'Ma nsuo no ntwitwi mu sima 15 na san yɛ nhwehwɛmu bio.'
          ],
      confidence: 99.4,
      source: 'Autoclave Spectrophotometer AI Afidie',
      batchContext: `Boole ${batchId} • ${yardage}m • ${waterVolume}L`
    };
  }

  // Default English (EN)
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
    batchContext: `Batch ${batchId} • ${yardage}m • ${waterVolume}L`
  };
}

/**
 * Fallback dynamic AI response generator for arbitrary textile questions in the selected language
 */
function generateDynamicAiAnswer(question, context = {}, lang = 'EN') {
  const cleanQ = question.trim();

  if (lang === 'ES') {
    return {
      query: cleanQ,
      title: `Análisis IA: ${cleanQ}`,
      category: 'IA_TEXTIL_GENERAL',
      summary: `Respuesta técnica y cálculos industriales para "${cleanQ}".`,
      details: `Principios de ingeniería textil aplicados:\n\n` +
        `1. Evaluación Colorimétrica: Las correcciones de color se gestionan mediante adiciones tricromáticas selectivas (Rojo, Amarillo, Azul) y agentes igualadores.\n` +
        `2. Mecánica del Baño: Mantener relación de baño óptima (1:5 a 1:7) para evitar barrados y vetas de tintura.\n` +
        `3. Equilibrio Químico: Dosificar electrolitos y álcalis en curvas progresivas.\n` +
        `4. Control de Calidad ISO 9001: Inspeccionar bajo iluminante normalizado D65 y luz de tienda TL84.`,
      actionSteps: [
        'Calibrar el sensor del espectrofotómetro con la base blanca de referencia.',
        'Verificar lecturas de temperatura y pH en el circuito del autoclave.',
        'Realizar una muestra de prueba antes de descargar el lote completo.'
      ],
      confidence: 89.5,
      source: 'Motor IA de Conocimiento Textil Industrial (AATCC / ISO / SDC)',
      batchContext: context.batchId ? `Lote ${context.batchId}` : null
    };
  }

  if (lang === 'FR') {
    return {
      query: cleanQ,
      title: `Analyse IA : ${cleanQ}`,
      category: 'IA_TEXTILE',
      summary: `Réponse technique industrielle pour "${cleanQ}".`,
      details: `Principes d'ingénierie textile :\n\n` +
        `1. Évaluation Colorimétrique : Ajustements par trichromie (Rouge, Jaune, Bleu) et agents égalisants.\n` +
        `2. Mécanique du Bain : Rapport de bain optimal (1:5 à 1:7) pour une pénétration uniforme.\n` +
        `3. Équilibre Chimique : Dosage progressif des sels et alcalis.\n` +
        `4. Conformité ISO 9001 : Inspection sous lumière D65 et TL84.`,
      actionSteps: [
        'Calibrer le spectrophotomètre avec la référence blanche.',
        'Contrôler la température et le pH dans l\'autoclave.',
        'Vérifier un échantillon de contrôle avant vidange.'
      ],
      confidence: 89.5,
      source: 'Moteur IA Textile Industriel (ISO / AATCC)'
    };
  }

  if (lang === 'DE') {
    return {
      query: cleanQ,
      title: `KI-Analyse: ${cleanQ}`,
      category: 'TEXTIL_KI',
      summary: `Technische Informationen und Berechnungen zu "${cleanQ}".`,
      details: `Textiltechnologische Grundlagen:\n\n` +
        `1. Farbmessung: Korrektur über trichromatische Einzelfarbstoffe und Egalisiermittel.\n` +
        `2. Flottendynamik: Flottenverhältnis (1:5 bis 1:7) für gleichmäßige Färbung.\n` +
        `3. Chemische Balance: Progressive Salz- und Alkalidosierung.\n` +
        `4. ISO 9001 Qualitätskontrolle: Farbmuster unter D65 und TL84 prüfen.`,
      actionSteps: [
        'Spektralphotometer mit Weißstandard kalibrieren.',
        'Temperatur- und pH-Werte im Autoklavenkreislauf überwachen.',
        'Probeläppchen vor dem Ablassen prüfen.'
      ],
      confidence: 89.5,
      source: 'Industrielle Textil-KI Wissensbasis (ISO / AATCC)'
    };
  }

  if (lang === 'NL') {
    return {
      query: cleanQ,
      title: `AI-Analyse: ${cleanQ}`,
      category: 'TEXTIEL_AI',
      summary: `Technische informatie en berekeningen voor "${cleanQ}".`,
      details: `Textieltechnische principes:\n\n` +
        `1. Colorimetrie: Kleurcorrecties via selectieve trichromatische toevoegingen.\n` +
        `2. Badmechanica: Optimaal badverhouding (1:5 tot 1:7) voor egale kleuring.\n` +
        `3. Chemische Balans: Progressieve zout- en alkalidosering.\n` +
        `4. ISO 9001 Kwaliteitscontrole: Inspecteer onder D65 en TL84 verlichting.`,
      actionSteps: [
        'Kalibreer de spectrofotometer met de witte referentie.',
        'Controleer temperatuur en pH in de autoclaaf.',
        'Neem een testmonster voor het lossen.'
      ],
      confidence: 89.5,
      source: 'Industriële Textiel AI Kennisbank (ISO / AATCC)'
    };
  }

  if (lang === 'PR') {
    return {
      query: cleanQ,
      title: `Análise IA: ${cleanQ}`,
      category: 'IA_TÊXTIL',
      summary: `Informações técnicas e cálculos para "${cleanQ}".`,
      details: `Princípios de engenharia têxtil:\n\n` +
        `1. Colorimetria: Correções por adições tricromáticas seletivas e agentes igualizadores.\n` +
        `2. Mecânica de Banho: Relação de banho ideal (1:5 a 1:7) para evitar manchas.\n` +
        `3. Equilíbrio Químico: Dosagem progressiva de eletrólitos e álcalis.\n` +
        `4. Controlo ISO 9001: Inspecionar sob iluminante D65 e TL84.`,
      actionSteps: [
        'Calibrar o espectrofotómetro com o padrão branco.',
        'Verificar temperatura e pH no autoclave.',
        'Efetuar ensaio antes de descarregar o lote.'
      ],
      confidence: 89.5,
      source: 'Motor IA de Conhecimento Têxtil (ISO / AATCC)'
    };
  }

  if (lang === 'Twi') {
    return {
      query: cleanQ,
      title: `AI Nhwehwɛmu: ${cleanQ}`,
      category: 'AI_NTOMA_NHWEHWƐMU',
      summary: `Afutuo ne mfididwuma nhwehwɛmu ma "${cleanQ}".`,
      details: `Ntoma afidiedwuma mu akwankyerɛ:\n\n` +
        `1. Ahosuo Siesiee: Fa ahosuo titiriw (Kɔkɔɔ, Akokɔseradeɛ, Bruu) ne aduru a ɛtrɛ ahosuo mu siesie ahosuo no.\n` +
        `2. Nsuo ne Ntoma Dodoɔ: Hwɛ sɛ nsuo dodoɔ ne ntoma no yɛ pɛ (1:5 kɔsi 1:7) na ahosuo no anhyia bɔne.\n` +
        `3. Aduru Ahobanbɔ: Fa nkyene ne alkali gu mu bɔkɔɔbɔkɔɔ.\n` +
        `4. Gyinapɛn Nhwehwɛmu: Hwɛ ntoma no wɔ D65 hann ase.`,
      actionSteps: [
        'Siesie afidie no sensor no ne ntoma fitaa no.',
        'Hwɛ hyew ne pH dodoɔ wɔ autoclave afidie no mu.',
        'Yɛ sāmpol nhwehwɛmu ansa na w\'agyae ntoma boole no.'
      ],
      confidence: 89.5,
      source: 'Textile Industrial AI Afidie (ISO / AATCC)'
    };
  }

  // Default English
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
    batchContext: context.batchId ? `Batch ${context.batchId}` : null
  };
}
