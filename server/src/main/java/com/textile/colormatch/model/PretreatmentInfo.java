package com.textile.colormatch.model;

public class PretreatmentInfo {
    private String stageName; // e.g. "Bleached White Base (Sosa Cáustica + Agua Oxigenada)"
    private double fabricYardageMeters; // e.g. 2000 m
    private double fabricGsm; // e.g. 210 g/m^2
    private double fabricWidthMeters; // e.g. 1.6 m
    private double totalFabricWeightKg; // yardage * width * gsm / 1000
    private double liquorRatio; // 1:10 or 1:8
    private double totalWaterLiters; // 3000 to 5000 L
    
    // Chemical concentrations in grams per liter (g/L)
    private double causticSodaConcentrationGpl; // Sosa Cáustica (NaOH 50% / 100%), e.g., 30.0 g/L
    private double causticSodaTotalKg;
    private double hydrogenPeroxideConcentrationGpl; // Agua Oxigenada (H2O2 50%), e.g., 25.0 g/L
    private double hydrogenPeroxideTotalLiters;
    private double stabilizerGpl; // Peroxide stabilizer, e.g., 2.0 g/L
    private double stabilizerTotalKg;
    private double wettingAgentGpl; // e.g., 1.5 g/L
    private double wettingAgentTotalKg;

    // Process parameters
    private double temperatureCelsius; // 98°C
    private int cycleDurationMinutes; // 45 min
    private double achievedWhitenessIndexBerger; // e.g. 78.5 (Target > 75)
    private String status; // "READY_FOR_DYEING", "IN_BLEACH_CYCLE", "PENDING"

    public PretreatmentInfo() {}

    public String getStageName() { return stageName; }
    public void setStageName(String stageName) { this.stageName = stageName; }

    public double getFabricYardageMeters() { return fabricYardageMeters; }
    public void setFabricYardageMeters(double fabricYardageMeters) { this.fabricYardageMeters = fabricYardageMeters; }

    public double getFabricGsm() { return fabricGsm; }
    public void setFabricGsm(double fabricGsm) { this.fabricGsm = fabricGsm; }

    public double getFabricWidthMeters() { return fabricWidthMeters; }
    public void setFabricWidthMeters(double fabricWidthMeters) { this.fabricWidthMeters = fabricWidthMeters; }

    public double getTotalFabricWeightKg() { return totalFabricWeightKg; }
    public void setTotalFabricWeightKg(double totalFabricWeightKg) { this.totalFabricWeightKg = totalFabricWeightKg; }

    public double getLiquorRatio() { return liquorRatio; }
    public void setLiquorRatio(double liquorRatio) { this.liquorRatio = liquorRatio; }

    public double getTotalWaterLiters() { return totalWaterLiters; }
    public void setTotalWaterLiters(double totalWaterLiters) { this.totalWaterLiters = totalWaterLiters; }

    public double getCausticSodaConcentrationGpl() { return causticSodaConcentrationGpl; }
    public void setCausticSodaConcentrationGpl(double causticSodaConcentrationGpl) { this.causticSodaConcentrationGpl = causticSodaConcentrationGpl; }

    public double getCausticSodaTotalKg() { return causticSodaTotalKg; }
    public void setCausticSodaTotalKg(double causticSodaTotalKg) { this.causticSodaTotalKg = causticSodaTotalKg; }

    public double getHydrogenPeroxideConcentrationGpl() { return hydrogenPeroxideConcentrationGpl; }
    public void setHydrogenPeroxideConcentrationGpl(double hydrogenPeroxideConcentrationGpl) { this.hydrogenPeroxideConcentrationGpl = hydrogenPeroxideConcentrationGpl; }

    public double getHydrogenPeroxideTotalLiters() { return hydrogenPeroxideTotalLiters; }
    public void setHydrogenPeroxideTotalLiters(double hydrogenPeroxideTotalLiters) { this.hydrogenPeroxideTotalLiters = hydrogenPeroxideTotalLiters; }

    public double getStabilizerGpl() { return stabilizerGpl; }
    public void setStabilizerGpl(double stabilizerGpl) { this.stabilizerGpl = stabilizerGpl; }

    public double getStabilizerTotalKg() { return stabilizerTotalKg; }
    public void setStabilizerTotalKg(double stabilizerTotalKg) { this.stabilizerTotalKg = stabilizerTotalKg; }

    public double getWettingAgentGpl() { return wettingAgentGpl; }
    public void setWettingAgentGpl(double wettingAgentGpl) { this.wettingAgentGpl = wettingAgentGpl; }

    public double getWettingAgentTotalKg() { return wettingAgentTotalKg; }
    public void setWettingAgentTotalKg(double wettingAgentTotalKg) { this.wettingAgentTotalKg = wettingAgentTotalKg; }

    public double getTemperatureCelsius() { return temperatureCelsius; }
    public void setTemperatureCelsius(double temperatureCelsius) { this.temperatureCelsius = temperatureCelsius; }

    public int getCycleDurationMinutes() { return cycleDurationMinutes; }
    public void setCycleDurationMinutes(int cycleDurationMinutes) { this.cycleDurationMinutes = cycleDurationMinutes; }

    public double getAchievedWhitenessIndexBerger() { return achievedWhitenessIndexBerger; }
    public void setAchievedWhitenessIndexBerger(double achievedWhitenessIndexBerger) { this.achievedWhitenessIndexBerger = achievedWhitenessIndexBerger; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
