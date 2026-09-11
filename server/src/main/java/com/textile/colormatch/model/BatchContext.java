package com.textile.colormatch.model;

import java.util.List;

public class BatchContext {
    private String batchId; // "#1245"
    private String clientName; // "Alpine Textiles"
    private String clientCode; // "#C82030"
    private String clientColorName; // "Crimson Scarlet"
    private double yardageMeters; // 2000.0
    private double fabricGsm; // 220.0
    private String autoclaveId; // "Autoclave Unit #3 (14-Trays)"
    private double waterVolumeLiters; // 4200.0 (3000 to 5000 L)
    private PretreatmentInfo pretreatment;
    private List<TrayDosing> trays; // 14 trays

    public BatchContext() {}

    public String getBatchId() { return batchId; }
    public void setBatchId(String batchId) { this.batchId = batchId; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientCode() { return clientCode; }
    public void setClientCode(String clientCode) { this.clientCode = clientCode; }

    public String getClientColorName() { return clientColorName; }
    public void setClientColorName(String clientColorName) { this.clientColorName = clientColorName; }

    public double getYardageMeters() { return yardageMeters; }
    public void setYardageMeters(double yardageMeters) { this.yardageMeters = yardageMeters; }

    public double getFabricGsm() { return fabricGsm; }
    public void setFabricGsm(double fabricGsm) { this.fabricGsm = fabricGsm; }

    public String getAutoclaveId() { return autoclaveId; }
    public void setAutoclaveId(String autoclaveId) { this.autoclaveId = autoclaveId; }

    public double getWaterVolumeLiters() { return waterVolumeLiters; }
    public void setWaterVolumeLiters(double waterVolumeLiters) { this.waterVolumeLiters = waterVolumeLiters; }

    public PretreatmentInfo getPretreatment() { return pretreatment; }
    public void setPretreatment(PretreatmentInfo pretreatment) { this.pretreatment = pretreatment; }

    public List<TrayDosing> getTrays() { return trays; }
    public void setTrays(List<TrayDosing> trays) { this.trays = trays; }
}
