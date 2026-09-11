package com.textile.colormatch.model;

import java.util.List;

public class ColorComparisonResult {
    private ColorData targetColor;
    private ColorData sampleColor;
    private double deltaE; // CIEDE2000
    private double deltaE76; // Euclidean CIE76
    private double deltaL; // L_sample - L_target
    private double deltaA; // a_sample - a_target
    private double deltaB; // b_sample - b_target
    private double deltaChroma;
    private double deltaHue;
    
    // Status: PASS, WARNING, ADJUST_NEEDED
    private String matchStatus;
    private String statusMessage;
    private boolean isMatch;

    // Formulation advice list (e.g. "Add 3% Red", "Add 1% Blue", "Increase Yellow Tone")
    private List<DyeAdjustment> adjustments;
    private List<String> textAdvices;
    private List<String> suggestedActionButtons; // e.g. ["Add RED", "Add BLUE", "Add YELLOW"]

    // Chemical & Environmental ROI Metrics
    private double waterSavedLiters;
    private double estimatedTimeSavedHours;
    private double dyeWasteReductionKg;

    public ColorComparisonResult() {}

    public ColorData getTargetColor() { return targetColor; }
    public void setTargetColor(ColorData targetColor) { this.targetColor = targetColor; }

    public ColorData getSampleColor() { return sampleColor; }
    public void setSampleColor(ColorData sampleColor) { this.sampleColor = sampleColor; }

    public double getDeltaE() { return deltaE; }
    public void setDeltaE(double deltaE) { this.deltaE = deltaE; }

    public double getDeltaE76() { return deltaE76; }
    public void setDeltaE76(double deltaE76) { this.deltaE76 = deltaE76; }

    public double getDeltaL() { return deltaL; }
    public void setDeltaL(double deltaL) { this.deltaL = deltaL; }

    public double getDeltaA() { return deltaA; }
    public void setDeltaA(double deltaA) { this.deltaA = deltaA; }

    public double getDeltaB() { return deltaB; }
    public void setDeltaB(double deltaB) { this.deltaB = deltaB; }

    public double getDeltaChroma() { return deltaChroma; }
    public void setDeltaChroma(double deltaChroma) { this.deltaChroma = deltaChroma; }

    public double getDeltaHue() { return deltaHue; }
    public void setDeltaHue(double deltaHue) { this.deltaHue = deltaHue; }

    public String getMatchStatus() { return matchStatus; }
    public void setMatchStatus(String matchStatus) { this.matchStatus = matchStatus; }

    public String getStatusMessage() { return statusMessage; }
    public void setStatusMessage(String statusMessage) { this.statusMessage = statusMessage; }

    public boolean isMatch() { return isMatch; }
    public void setMatch(boolean match) { isMatch = match; }

    public List<DyeAdjustment> getAdjustments() { return adjustments; }
    public void setAdjustments(List<DyeAdjustment> adjustments) { this.adjustments = adjustments; }

    public List<String> getTextAdvices() { return textAdvices; }
    public void setTextAdvices(List<String> textAdvices) { this.textAdvices = textAdvices; }

    public List<String> getSuggestedActionButtons() { return suggestedActionButtons; }
    public void setSuggestedActionButtons(List<String> suggestedActionButtons) { this.suggestedActionButtons = suggestedActionButtons; }

    public double getWaterSavedLiters() { return waterSavedLiters; }
    public void setWaterSavedLiters(double waterSavedLiters) { this.waterSavedLiters = waterSavedLiters; }

    public double getEstimatedTimeSavedHours() { return estimatedTimeSavedHours; }
    public void setEstimatedTimeSavedHours(double estimatedTimeSavedHours) { this.estimatedTimeSavedHours = estimatedTimeSavedHours; }

    public double getDyeWasteReductionKg() { return dyeWasteReductionKg; }
    public void setDyeWasteReductionKg(double dyeWasteReductionKg) { this.dyeWasteReductionKg = dyeWasteReductionKg; }
}
