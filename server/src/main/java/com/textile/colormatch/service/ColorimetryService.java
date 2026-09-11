package com.textile.colormatch.service;

import com.textile.colormatch.model.ColorData;
import org.springframework.stereotype.Service;

@Service
public class ColorimetryService {

    // D65 Standard Reference White Points (2° Standard Observer)
    private static final double XN = 95.047;
    private static final double YN = 100.000;
    private static final double ZN = 108.883;

    public ColorData parseColor(String hex) {
        String cleanHex = hex.trim().replace("#", "");
        if (cleanHex.length() == 3) {
            cleanHex = "" + cleanHex.charAt(0) + cleanHex.charAt(0)
                    + cleanHex.charAt(1) + cleanHex.charAt(1)
                    + cleanHex.charAt(2) + cleanHex.charAt(2);
        }
        int r = Integer.parseInt(cleanHex.substring(0, 2), 16);
        int g = Integer.parseInt(cleanHex.substring(2, 4), 16);
        int b = Integer.parseInt(cleanHex.substring(4, 6), 16);
        return fromRgb(r, g, b, "#" + cleanHex.toUpperCase());
    }

    public ColorData fromRgb(int r, int g, int b) {
        String hex = String.format("#%02X%02X%02X", r, g, b);
        return fromRgb(r, g, b, hex);
    }

    public ColorData fromRgb(int r, int g, int b, String hex) {
        // Step 1: sRGB to Linear RGB
        double rLin = pivotRgb(r / 255.0);
        double gLin = pivotRgb(g / 255.0);
        double bLin = pivotRgb(b / 255.0);

        // Step 2: Linear RGB to CIEXYZ (D65)
        double x = (rLin * 0.4124564 + gLin * 0.3575761 + bLin * 0.1804375) * 100.0;
        double y = (rLin * 0.2126729 + gLin * 0.7151522 + bLin * 0.0721750) * 100.0;
        double z = (rLin * 0.0193339 + gLin * 0.1191920 + bLin * 0.9503041) * 100.0;

        // Step 3: CIEXYZ to CIELAB
        double fx = pivotXyz(x / XN);
        double fy = pivotXyz(y / YN);
        double fz = pivotXyz(z / ZN);

        double l = Math.max(0.0, 116.0 * fy - 16.0);
        double a = 500.0 * (fx - fy);
        double bStar = 200.0 * (fy - fz);

        // Round to 1 decimal place for display consistency
        double roundedL = Math.round(l * 10.0) / 10.0;
        double roundedA = Math.round(a * 10.0) / 10.0;
        double roundedB = Math.round(bStar * 10.0) / 10.0;

        return new ColorData(hex, r, g, b, roundedL, roundedA, roundedB);
    }

    private double pivotRgb(double n) {
        return (n > 0.04045) ? Math.pow((n + 0.055) / 1.055, 2.4) : (n / 12.92);
    }

    private double pivotXyz(double n) {
        double delta = 6.0 / 29.0;
        return (n > Math.pow(delta, 3)) ? Math.cbrt(n) : (n / (3.0 * delta * delta) + 4.0 / 29.0);
    }

    /**
     * Calculates CIEDE2000 Color Difference Delta E (00).
     */
    public double calculateCiede2000(ColorData c1, ColorData c2) {
        double l1 = c1.getL(), a1 = c1.getA(), b1 = c1.getBStar();
        double l2 = c2.getL(), a2 = c2.getA(), b2 = c2.getBStar();

        double cStar1 = Math.sqrt(a1 * a1 + b1 * b1);
        double cStar2 = Math.sqrt(a2 * a2 + b2 * b2);
        double cBar = (cStar1 + cStar2) / 2.0;

        double cBar7 = Math.pow(cBar, 7);
        double g = 0.5 * (1.0 - Math.sqrt(cBar7 / (cBar7 + Math.pow(25.0, 7))));

        double aPrime1 = (1.0 + g) * a1;
        double aPrime2 = (1.0 + g) * a2;

        double cPrime1 = Math.sqrt(aPrime1 * aPrime1 + b1 * b1);
        double cPrime2 = Math.sqrt(aPrime2 * aPrime2 + b2 * b2);

        double hPrime1 = Math.toDegrees(Math.atan2(b1, aPrime1));
        if (hPrime1 < 0) hPrime1 += 360.0;

        double hPrime2 = Math.toDegrees(Math.atan2(b2, aPrime2));
        if (hPrime2 < 0) hPrime2 += 360.0;

        double deltaLPrime = l2 - l1;
        double deltaCPrime = cPrime2 - cPrime1;

        double deltaHPrimeDegrees;
        if (cPrime1 * cPrime2 == 0) {
            deltaHPrimeDegrees = 0;
        } else if (Math.abs(hPrime2 - hPrime1) <= 180.0) {
            deltaHPrimeDegrees = hPrime2 - hPrime1;
        } else if (hPrime2 - hPrime1 > 180.0) {
            deltaHPrimeDegrees = hPrime2 - hPrime1 - 360.0;
        } else {
            deltaHPrimeDegrees = hPrime2 - hPrime1 + 360.0;
        }

        double deltaBigHPrime = 2.0 * Math.sqrt(cPrime1 * cPrime2) * Math.sin(Math.toRadians(deltaHPrimeDegrees / 2.0));

        double lBarPrime = (l1 + l2) / 2.0;
        double cBarPrime = (cPrime1 + cPrime2) / 2.0;

        double hBarPrime;
        if (cPrime1 * cPrime2 == 0) {
            hBarPrime = hPrime1 + hPrime2;
        } else if (Math.abs(hPrime1 - hPrime2) <= 180.0) {
            hBarPrime = (hPrime1 + hPrime2) / 2.0;
        } else if (hPrime1 + hPrime2 < 360.0) {
            hBarPrime = (hPrime1 + hPrime2 + 360.0) / 2.0;
        } else {
            hBarPrime = (hPrime1 + hPrime2 - 360.0) / 2.0;
        }

        double t = 1.0 - 0.17 * Math.cos(Math.toRadians(hBarPrime - 30.0))
                + 0.24 * Math.cos(Math.toRadians(2.0 * hBarPrime))
                + 0.32 * Math.cos(Math.toRadians(3.0 * hBarPrime + 6.0))
                - 0.20 * Math.cos(Math.toRadians(4.0 * hBarPrime - 63.0));

        double deltaTheta = 30.0 * Math.exp(-Math.pow((hBarPrime - 275.0) / 25.0, 2));

        double cBarPrime7 = Math.pow(cBarPrime, 7);
        double rc = 2.0 * Math.sqrt(cBarPrime7 / (cBarPrime7 + Math.pow(25.0, 7)));

        double lBarMinus50Sq = Math.pow(lBarPrime - 50.0, 2);
        double sl = 1.0 + (0.015 * lBarMinus50Sq) / Math.sqrt(20.0 + lBarMinus50Sq);
        double sc = 1.0 + 0.045 * cBarPrime;
        double sh = 1.0 + 0.015 * cBarPrime * t;
        double rt = -Math.sin(Math.toRadians(2.0 * deltaTheta)) * rc;

        double kl = 1.0;
        double kc = 1.0;
        double kh = 1.0;

        double termL = deltaLPrime / (kl * sl);
        double termC = deltaCPrime / (kc * sc);
        double termH = deltaBigHPrime / (kh * sh);

        double deltaE00 = Math.sqrt(termL * termL + termC * termC + termH * termH + rt * termC * termH);
        return Math.round(deltaE00 * 10.0) / 10.0;
    }

    public double calculateCie76(ColorData c1, ColorData c2) {
        double dL = c2.getL() - c1.getL();
        double da = c2.getA() - c1.getA();
        double db = c2.getBStar() - c1.getBStar();
        double e76 = Math.sqrt(dL * dL + da * da + db * db);
        return Math.round(e76 * 10.0) / 10.0;
    }
}
