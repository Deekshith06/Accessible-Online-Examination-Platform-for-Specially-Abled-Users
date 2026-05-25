package com.accessexam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.List;

/**
 * CORS configuration — allows the plain HTML/JS frontend to call the API.
 * The frontend opens as file:// URLs or from a local dev server (e.g. Live Server).
 * In production, restrict allowedOrigins to your actual domain.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Allow all origins for dev (restrict in production!)
        config.setAllowedOriginPatterns(List.of("*"));

        // Allowed HTTP methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // Allowed headers
        config.setAllowedHeaders(List.of("*"));

        // Expose Authorization header so frontend can read JWT
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));

        config.setAllowCredentials(false);  // must be false when allowedOriginPatterns = *

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
