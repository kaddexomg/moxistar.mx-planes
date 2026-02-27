package com.moxistar;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PlanQualityController {

    @GetMapping("/api/quality-score")
    public Map<String, Object> qualityScore(@RequestParam(defaultValue = "pro8") String plan) {
        int score = switch (plan) {
            case "pro40" -> 97;
            case "pro20" -> 90;
            default -> 83;
        };

        return Map.of("plan", plan, "confidenceScore", score, "engine", "java-enterprise-scorer-v2");
    }

    @PostMapping("/api/recharge/validate")
    public Map<String, Object> validateRecharge(@RequestBody Map<String, Object> payload) {
        String phone = String.valueOf(payload.getOrDefault("phone", ""));
        int amount = Integer.parseInt(String.valueOf(payload.getOrDefault("amount", 0)));
        boolean valid = phone.matches("\\d{10}") && amount >= 100;
        return Map.of(
            "valid", valid,
            "phone", phone,
            "amount", amount,
            "engine", "java-payment-guard"
        );
    }
}
