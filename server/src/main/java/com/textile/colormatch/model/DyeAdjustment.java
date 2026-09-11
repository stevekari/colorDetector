package com.textile.colormatch.model;

public class DyeAdjustment {
    private String dyeName;
    private String colorType; // RED, BLUE, YELLOW, BLACK, GREEN, etc.
    private String hex;
    private double percentage;
    private String instruction; // e.g. "Add 5% Reactive Crimson Red (42 kg)"
    private int suggestedTray;
    private double estimatedGrams;
    private double estimatedKg;
    private String boxCode; // e.g. "D-10", "D-12", "D-15"
    private String dyeStrength; // "200%", "450%"
    private String iconColor; // hex or color identifier

    public DyeAdjustment() {}

    public DyeAdjustment(String dyeName, String colorType, String hex, double percentage, 
                         String instruction, int suggestedTray, double estimatedGrams, 
                         double estimatedKg, String boxCode, String dyeStrength, String iconColor) {
        this.dyeName = dyeName;
        this.colorType = colorType;
        this.hex = hex;
        this.percentage = percentage;
        this.instruction = instruction;
        this.suggestedTray = suggestedTray;
        this.estimatedGrams = estimatedGrams;
        this.estimatedKg = estimatedKg;
        this.boxCode = boxCode;
        this.dyeStrength = dyeStrength;
        this.iconColor = iconColor;
    }

    public String getDyeName() { return dyeName; }
    public void setDyeName(String dyeName) { this.dyeName = dyeName; }

    public String getColorType() { return colorType; }
    public void setColorType(String colorType) { this.colorType = colorType; }

    public String getHex() { return hex; }
    public void setHex(String hex) { this.hex = hex; }

    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }

    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }

    public int getSuggestedTray() { return suggestedTray; }
    public void setSuggestedTray(int suggestedTray) { this.suggestedTray = suggestedTray; }

    public double getEstimatedGrams() { return estimatedGrams; }
    public void setEstimatedGrams(double estimatedGrams) { this.estimatedGrams = estimatedGrams; }

    public double getEstimatedKg() { return estimatedKg; }
    public void setEstimatedKg(double estimatedKg) { this.estimatedKg = estimatedKg; }

    public String getBoxCode() { return boxCode; }
    public void setBoxCode(String boxCode) { this.boxCode = boxCode; }

    public String getDyeStrength() { return dyeStrength; }
    public void setDyeStrength(String dyeStrength) { this.dyeStrength = dyeStrength; }

    public String getIconColor() { return iconColor; }
    public void setIconColor(String iconColor) { this.iconColor = iconColor; }
}
