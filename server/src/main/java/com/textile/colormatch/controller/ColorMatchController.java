package com.textile.colormatch.controller;

import com.textile.colormatch.model.*;
import com.textile.colormatch.service.ColorimetryService;
import com.textile.colormatch.service.FormulationEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ColorMatchController {

    private final ColorimetryService colorimetryService;
    private final FormulationEngineService formulationEngineService;

    public ColorMatchController(ColorimetryService colorimetryService, FormulationEngineService formulationEngineService) {
        this.colorimetryService = colorimetryService;
        this.formulationEngineService = formulationEngineService;
    }

    @PostMapping("/color/parse")
    public ResponseEntity<ColorData> parseColor(@RequestBody Map<String, Object> request) {
        if (request.containsKey("hex")) {
            String hex = (String) request.get("hex");
            return ResponseEntity.ok(colorimetryService.parseColor(hex));
        } else if (request.containsKey("r") && request.containsKey("g") && request.containsKey("b")) {
            int r = ((Number) request.get("r")).intValue();
            int g = ((Number) request.get("g")).intValue();
            int b = ((Number) request.get("b")).intValue();
            return ResponseEntity.ok(colorimetryService.fromRgb(r, g, b));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/color/analyze")
    public ResponseEntity<ColorComparisonResult> analyze(@RequestBody Map<String, Object> request) {
        ColorData target;
        ColorData sample;

        if (request.get("target") instanceof Map) {
            Map<?, ?> tMap = (Map<?, ?>) request.get("target");
            if (tMap.containsKey("hex")) {
                target = colorimetryService.parseColor((String) tMap.get("hex"));
            } else {
                target = colorimetryService.fromRgb(
                        ((Number) tMap.get("r")).intValue(),
                        ((Number) tMap.get("g")).intValue(),
                        ((Number) tMap.get("b")).intValue());
            }
        } else if (request.containsKey("targetHex")) {
            target = colorimetryService.parseColor((String) request.get("targetHex"));
        } else {
            target = colorimetryService.parseColor("#C82030");
        }

        if (request.get("sample") instanceof Map) {
            Map<?, ?> sMap = (Map<?, ?>) request.get("sample");
            if (sMap.containsKey("hex")) {
                sample = colorimetryService.parseColor((String) sMap.get("hex"));
            } else {
                sample = colorimetryService.fromRgb(
                        ((Number) sMap.get("r")).intValue(),
                        ((Number) sMap.get("g")).intValue(),
                        ((Number) sMap.get("b")).intValue());
            }
        } else if (request.containsKey("sampleHex")) {
            sample = colorimetryService.parseColor((String) request.get("sampleHex"));
        } else {
            sample = colorimetryService.parseColor("#D2453A");
        }

        double waterLiters = request.containsKey("waterVolumeLiters") 
                ? ((Number) request.get("waterVolumeLiters")).doubleValue() : 4200.0;
        double yardage = request.containsKey("yardageMeters") 
                ? ((Number) request.get("yardageMeters")).doubleValue() : 2000.0;

        ColorComparisonResult result = formulationEngineService.analyze(target, sample, waterLiters, yardage);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/batches/current")
    public ResponseEntity<BatchContext> getCurrentBatch() {
        BatchContext context = new BatchContext();
        context.setBatchId("#1245");
        context.setClientName("Alpine Industrial Textiles");
        context.setClientCode("#C82030");
        context.setClientColorName("Crimson Scarlet Grade A");
        context.setYardageMeters(2000.0);
        context.setFabricGsm(220.0);
        context.setAutoclaveId("Autoclave Vessel #3 (14-Tray Liquor System)");
        context.setWaterVolumeLiters(4200.0);

        PretreatmentInfo pretreatment = formulationEngineService.calculatePretreatment(2000.0, 220.0, 1.6, 4200.0);
        context.setPretreatment(pretreatment);

        ColorData target = colorimetryService.parseColor("#C82030");
        ColorData sample = colorimetryService.parseColor("#D2453A");
        ColorComparisonResult initialAnalysis = formulationEngineService.analyze(target, sample, 4200.0, 2000.0);
        context.setTrays(formulationEngineService.buildDefault14Trays(initialAnalysis));

        return ResponseEntity.ok(context);
    }

    @PostMapping("/pretreatment/calculate")
    public ResponseEntity<PretreatmentInfo> calculatePretreatment(@RequestBody Map<String, Object> req) {
        double yardage = req.containsKey("yardage") ? ((Number) req.get("yardage")).doubleValue() : 2000.0;
        double gsm = req.containsKey("gsm") ? ((Number) req.get("gsm")).doubleValue() : 220.0;
        double width = req.containsKey("width") ? ((Number) req.get("width")).doubleValue() : 1.6;
        double water = req.containsKey("waterLiters") ? ((Number) req.get("waterLiters")).doubleValue() : 4200.0;

        return ResponseEntity.ok(formulationEngineService.calculatePretreatment(yardage, gsm, width, water));
    }
}
