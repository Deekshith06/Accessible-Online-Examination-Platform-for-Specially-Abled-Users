package com.accessexam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * AccessExam – Accessible Online Examination Platform
 * Main Spring Boot entry point.
 */
@SpringBootApplication
public class AccessExamApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccessExamApplication.class, args);
        System.out.println("""
                \n
                ╔══════════════════════════════════════════════════╗
                ║   AccessExam Backend started successfully! ♿    ║
                ║   API Base URL : http://localhost:8080/api       ║
                ║   H2 Console   : http://localhost:8080/h2-console║
                ╚══════════════════════════════════════════════════╝
                """);
    }
}
