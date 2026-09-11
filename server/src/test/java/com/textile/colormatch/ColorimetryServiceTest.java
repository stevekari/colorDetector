package com.textile.colormatch;

import com.textile.colormatch.model.ColorData;
import com.textile.colormatch.service.ColorimetryService;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ColorimetryServiceTest {

    private final ColorimetryService service = new ColorimetryService();

    @Test
    public void testColorParsingAndLab() {
        ColorData target = service.parseColor("#C82030");
        System.out.println("Target: Hex=" + target.getHex() + " R=" + target.getR() + " G=" + target.getG() + " B=" + target.getB() + " L=" + target.getL() + " a=" + target.getA() + " b=" + target.getBStar());
        assertNotNull(target);
        assertEquals(200, target.getR());
        assertEquals(32, target.getG());
        assertEquals(48, target.getB());

        ColorData sample = service.parseColor("#D2453A");
        System.out.println("Sample: Hex=" + sample.getHex() + " R=" + sample.getR() + " G=" + sample.getG() + " B=" + sample.getB() + " L=" + sample.getL() + " a=" + sample.getA() + " b=" + sample.getBStar());
        assertNotNull(sample);
        assertEquals(210, sample.getR());
        assertEquals(69, sample.getG());
        assertEquals(58, sample.getB());
    }

    @Test
    public void testDeltaECalculation() {
        ColorData target = service.parseColor("#C82030");
        ColorData sample = service.parseColor("#D2453A");

        double deltaE = service.calculateCiede2000(target, sample);
        double deltaE76 = service.calculateCie76(target, sample);
        System.out.println("Calculated CIEDE2000: " + deltaE + ", CIE76: " + deltaE76);

        assertEquals(0.0, service.calculateCiede2000(target, target), 0.01);
    }
}
