package com.moxistar;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlanQualityController {

    @GetMapping("/api/quality-score")
    public Map<String, Object> qualityScore(@RequestParam(defaultValue = "pro-start") String plan) {
        int score = switch (plan) {
            case "pro-elite" -> 97;
            case "pro-vision" -> 89;
            default -> 81;
        };

        return Map.of(
            "plan", plan,
            "confidenceScore", score,
            "engine", "java-enterprise-scorer"
        );
    }
}
