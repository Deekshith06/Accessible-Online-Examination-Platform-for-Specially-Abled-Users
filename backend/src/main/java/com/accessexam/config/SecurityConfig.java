package com.accessexam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.accessexam.security.JwtFilter;
import com.accessexam.security.UserDetailsServiceImpl;

/**
 * Spring Security configuration.
 * - Stateless JWT authentication
 * - Public endpoints: /api/auth/**, /h2-console/**
 * - ADMIN-only: POST/PUT/DELETE on /api/exams, /api/questions, /api/users
 * - STUDENT: GET exams, GET questions, POST/GET submissions, GET /users/me
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final UserDetailsServiceImpl userDetailsService;

    public SecurityConfig(JwtFilter jwtFilter, UserDetailsServiceImpl userDetailsService){
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Enable CORS via CorsFilter bean
            .cors(org.springframework.security.config.Customizer.withDefaults())
            // Disable CSRF (stateless API)
            .csrf(AbstractHttpConfigurer::disable)

            // Disable frameOptions for H2 console
            .headers(headers -> headers.frameOptions(fo -> fo.disable()))

            // Stateless session
            .sessionManagement(sm ->
                sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/error").permitAll()

                // Admin-only write operations
                .requestMatchers(HttpMethod.POST, "/api/exams/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/exams/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/exams/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/questions/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/questions/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/questions/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/users/{id}/extra-time").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/users").hasRole("ADMIN")

                // All other requests need authentication
                .anyRequest().authenticated()
            )

            // Add JWT filter before UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
