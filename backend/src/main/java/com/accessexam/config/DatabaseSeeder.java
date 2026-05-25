package com.accessexam.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import javax.sql.DataSource;
import java.sql.Connection;
import com.accessexam.repository.UserRepository;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final DataSource dataSource;

    public DatabaseSeeder(UserRepository userRepository, DataSource dataSource) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            try (Connection conn = dataSource.getConnection()) {
                ScriptUtils.executeSqlScript(conn, new ClassPathResource("data.sql"));
                System.out.println("Database seeded successfully from data.sql");
            } catch (Exception e) {
                System.err.println("Failed to seed database: " + e.getMessage());
            }
        } else {
            System.out.println("Database already contains data. Skipping seed.");
        }
    }
}
