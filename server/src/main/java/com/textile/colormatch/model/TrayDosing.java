package com.textile.colormatch.model;

public class TrayDosing {
    private int trayNumber; // 1 to 14
    private String dyeName;
    private String hexColor;
    private double currentConcentrationPercent; // e.g. 1.25%
    private double currentDyeGrams;
    private double addedDyeGrams;
    private double totalDyeGrams;
    private String status; // ACTIVE, STANDBY, REFILL_NEEDED

    public TrayDosing() {}

    public TrayDosing(int trayNumber, String dyeName, String hexColor, 
                      double currentConcentrationPercent, double currentDyeGrams, 
                      double addedDyeGrams, double totalDyeGrams, String status) {
        this.trayNumber = trayNumber;
        this.dyeName = dyeName;
        this.hexColor = hexColor;
        this.currentConcentrationPercent = currentConcentrationPercent;
        this.currentDyeGrams = currentDyeGrams;
        this.addedDyeGrams = addedDyeGrams;
        this.totalDyeGrams = totalDyeGrams;
        this.status = status;
    }

    public int getTrayNumber() { return trayNumber; }
    public void setTrayNumber(int trayNumber) { this.trayNumber = trayNumber; }

    public String getDyeName() { return dyeName; }
    public void setDyeName(String dyeName) { this.dyeName = dyeName; }

    public String getHexColor() { return hexColor; }
    public void setHexColor(String hexColor) { this.hexColor = hexColor; }

    public double getCurrentConcentrationPercent() { return currentConcentrationPercent; }
    public void setCurrentConcentrationPercent(double currentConcentrationPercent) { this.currentConcentrationPercent = currentConcentrationPercent; }

    public double getCurrentDyeGrams() { return currentDyeGrams; }
    public void setCurrentDyeGrams(double currentDyeGrams) { this.currentDyeGrams = currentDyeGrams; }

    public double getAddedDyeGrams() { return addedDyeGrams; }
    public void setAddedDyeGrams(double addedDyeGrams) { this.addedDyeGrams = addedDyeGrams; }

    public double getTotalDyeGrams() { return totalDyeGrams; }
    public void setTotalDyeGrams(double totalDyeGrams) { this.totalDyeGrams = totalDyeGrams; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
