# Industrial Color-Matching Quality Control System

A high-precision industrial computer-vision color detection and formulation engine designed for large-scale textile preparation (**Sosa Cáustica + Agua Oxigenada** bleaching) and autoclave dyeing (**14 color trays**, 3,000–5,000 L water liquor ratio, 2,000 m production runs).

---

## Architecture Overview

### 1. Backend (`/server`) — Java 17 & Spring Boot 3
- **CIELAB & CIEDE2000 Color Engine:** Standard D65 2° observer sRGB $\leftrightarrow$ CIEXYZ $\leftrightarrow$ CIELAB $L^*a^*b^*$ conversions with full $\Delta E_{00}$ (lightness, chroma, hue weighting, and rotation term).
- **14-Tray Autoclave Formulation Engine:** Automated dosage calculations (grams, concentration %) across 14 individual color and auxiliary trays (Reactive Scarlet Red, Crimson, Royal Blue, Turquoise, Golden Yellow, Lemon Yellow, Jet Black, Forest Green, Bright Orange, Violet, Levelling Agent, pH Buffer, Glauber's Salt, Soda Ash).
- **Pre-Treatment Bleaching Engine:** Formulates **Sosa Cáustica** ($NaOH$) and **Agua Oxigenada** ($H_2O_2$) bleaching recipes for raw greige cotton to produce a pure white base ($WI > 78$ Berger) prior to autoclave dyeing.
- **Batch Management & ROI Calculations:** Tracks protected water volume (3,000–5,000 L) and prevented batch reworks.

### 2. Frontend (`/client`) — React 18 & Tailwind CSS
- **`topNavbar`:** Batch ID (`#1245`), Client Code (`#C82030`), Yardage (`2,000 m`), Autoclave vessel, Bleached Base status, and sensor calibration.
- **`leftContainer`:** Real-time evaluation panel with $\Delta E$ score banner, tolerance status (`⚠️ Not a Match!` / `✅ Target Match!`), dynamic dye adjustment drop list (`Add 3% Red`, `Add 1% Blue`, `Increase Yellow Tone`), and tactile green `Status: Adjust Needed` button.
- **`middleContainer`:** Industrial Camera Sensor chamber with top optical hood, glowing red sensor lens, dual spotlight LEDs, live webcam stream, fabric roll viewport with realistic woven texture, optical laser reticle, and D65/TL84/A/UV illuminant switcher.
- **`rightContainer`:** Real Color (Sample: `#D2453A`, RGB, LAB) vs. Target Color (Client: `#C82030`, RGB, LAB), $\Delta L^*, \Delta a^*, \Delta b^*$ component breakdown, and tactile action buttons (`Add RED`, `Add BLUE`, `Add YELLOW`).
- **Autoclave 14-Tray Mixer Modal:** Comprehensive tray dosing table, thermal ramping profile (98°C hold, bi-directional circulation), and printable production ticket.
- **Pre-Treatment Modal:** Chemical recipe calculator for Sosa Cáustica and Agua Oxigenada bleaching.

---

## Quick Start

### Prerequisites
- **Java 17+** (OpenJDK)
- **Node.js 18+** & **npm**
- **Maven 3.8+**

### Launching the System

You can run the full system using the included startup script:

```bash
./start.sh
```

Or run the backend and frontend separately:

#### 1. Java Spring Boot Backend
```bash
cd server
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

#### 2. React Frontend
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## API Endpoints

- `POST /api/color/analyze`: Evaluates target vs. sample colors and returns $\Delta E_{00}$, $\Delta E_{76}$, $\Delta L, \Delta a, \Delta b$, and dye adjustment recipes.
- `GET /api/batches/current`: Retrieves active batch metadata (`#1245`, 2,000 m, 4,200 L, 14 trays).
- `POST /api/pretreatment/calculate`: Computes Sosa Cáustica and Agua Oxigenada masses for raw fabric bleaching.

---

## Industrial ROI & Impact

- **Water Conservation:** Prevents multi-cycle dumping of 3,000 to 5,000 liters of hot/cold liquor per batch.
- **Chemical Waste Elimination:** Eliminates trial-and-error dye additions across 14 autoclave trays.
- **Production Lead-Time:** Avoids multi-week rework delays across 2,000-meter fabric batches.
