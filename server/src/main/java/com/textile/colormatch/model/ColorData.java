package com.textile.colormatch.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ColorData {
    private String hex;
    private int r;
    private int g;
    private int b;
    
    @JsonProperty("L")
    private double l;

    @JsonProperty("a")
    private double a;

    @JsonProperty("bStar")
    private double bStar;

    public ColorData() {}

    public ColorData(String hex, int r, int g, int b, double l, double a, double bStar) {
        this.hex = hex;
        this.r = r;
        this.g = g;
        this.b = b;
        this.l = l;
        this.a = a;
        this.bStar = bStar;
    }

    public String getHex() {
        return hex;
    }

    public void setHex(String hex) {
        this.hex = hex;
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }

    public int getG() {
        return g;
    }

    public void setG(int g) {
        this.g = g;
    }

    public int getB() {
        return b;
    }

    public void setB(int b) {
        this.b = b;
    }

    public double getL() {
        return l;
    }

    public void setL(double l) {
        this.l = l;
    }

    public double getA() {
        return a;
    }

    public void setA(double a) {
        this.a = a;
    }

    public double getBStar() {
        return bStar;
    }

    public void setBStar(double bStar) {
        this.bStar = bStar;
    }
}
