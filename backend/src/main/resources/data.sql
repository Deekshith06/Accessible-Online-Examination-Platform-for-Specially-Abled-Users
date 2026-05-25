-- ============================================================
-- AccessExam Seed Data
-- Runs on startup (H2 dev mode)
-- ============================================================

-- ── SEED ADMIN USER ──────────────────────────────────────────
-- Password: admin123 (BCrypt hashed)
INSERT INTO users (name, email, password, role, disability_type, extra_time_minutes)
VALUES (
  'Admin User',
  'admin@accessexam.com',
  '$2b$10$Sd/wYx/CQ9B.JkSGjxEm6uDiDdecH9eGNuPmNKp0PgJKxre1lrOQy',
  'ADMIN',
  'NONE',
  0
);

-- ── SEED STUDENT USERS ───────────────────────────────────────
-- Password: student123 (BCrypt hashed)
INSERT INTO users (name, email, password, role, disability_type, extra_time_minutes)
VALUES (
  'Yugandhar',
  'yugandhar@example.com',
  '$2a$10$N2gSiETuNiFkRg0.fkp57.t6BCJ8YGNSbqFsEXFVvp9c0BuR0m4Se',
  'STUDENT',
  'VISUAL',
  30
);

INSERT INTO users (name, email, password, role, disability_type, extra_time_minutes)
VALUES (
  'Arun Kumar',
  'arun@example.com',
  '$2a$10$N2gSiETuNiFkRg0.fkp57.t6BCJ8YGNSbqFsEXFVvp9c0BuR0m4Se',
  'STUDENT',
  'MOTOR',
  20
);

INSERT INTO users (name, email, password, role, disability_type, extra_time_minutes)
VALUES (
  'Priya Sharma',
  'priya@example.com',
  '$2a$10$N2gSiETuNiFkRg0.fkp57.t6BCJ8YGNSbqFsEXFVvp9c0BuR0m4Se',
  'STUDENT',
  'COGNITIVE',
  45
);

-- ── SEED EXAMS ───────────────────────────────────────────────
INSERT INTO exams (title, description, duration_minutes, marks_per_question, status, scheduled_at, created_by)
VALUES (
  'General Knowledge Test',
  'A comprehensive general knowledge examination covering geography, science, history, and current affairs.',
  60, 4, 'ACTIVE', CURRENT_TIMESTAMP, 1
);

INSERT INTO exams (title, description, duration_minutes, marks_per_question, status, scheduled_at, created_by)
VALUES (
  'Mathematics Basics',
  'Fundamental mathematics covering arithmetic, algebra, and basic geometry concepts.',
  45, 4, 'ACTIVE', CURRENT_TIMESTAMP, 1
);

INSERT INTO exams (title, description, duration_minutes, marks_per_question, status, scheduled_at, created_by)
VALUES (
  'English Comprehension',
  'English language comprehension test with reading passages and grammar questions.',
  90, 4, 'UPCOMING', DATEADD('DAY', 8, CURRENT_TIMESTAMP), 1
);

-- ── SEED QUESTIONS (General Knowledge — Exam ID 1) ──────────
INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index) VALUES
(1, 'What is the capital city of India?', 'New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 0, 1),
(1, 'Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 1, 2),
(1, 'Who wrote the Indian national anthem?', 'Rabindranath Tagore', 'Bankim Chandra', 'Mahatma Gandhi', 'Sarojini Naidu', 0, 3),
(1, 'What is the chemical formula for water?', 'H2O', 'CO2', 'NaCl', 'O2', 0, 4),
(1, 'How many states are there in India (as of 2024)?', '28', '29', '30', '27', 0, 5),
(1, 'What is the largest ocean on Earth?', 'Atlantic', 'Indian', 'Arctic', 'Pacific', 3, 6),
(1, 'Who is known as the Father of the Nation in India?', 'Jawaharlal Nehru', 'B.R. Ambedkar', 'Mahatma Gandhi', 'Sardar Patel', 2, 7),
(1, 'Which is the longest river in the world?', 'Amazon', 'Nile', 'Yangtze', 'Mississippi', 1, 8),
(1, 'What is the speed of light (approximate)?', '3×10⁸ m/s', '3×10⁶ m/s', '1.5×10⁸ m/s', '9×10⁸ m/s', 0, 9),
(1, 'In which year did India gain independence?', '1947', '1950', '1945', '1942', 0, 10),
(1, 'Which is the smallest continent?', 'Europe', 'Antarctica', 'Australia', 'South America', 2, 11),
(1, 'What does CPU stand for?', 'Central Processing Unit', 'Computer Power Unit', 'Core Processing Unit', 'Central Program Utility', 0, 12),
(1, 'How many bones are in the adult human body?', '206', '208', '196', '210', 0, 13),
(1, 'What is the national animal of India?', 'Lion', 'Elephant', 'Tiger', 'Peacock', 2, 14),
(1, 'Which gas do plants absorb during photosynthesis?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen', 2, 15),
(1, 'Who invented the telephone?', 'Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'James Watt', 1, 16),
(1, 'What is the square root of 144?', '11', '12', '13', '14', 1, 17),
(1, 'Which is the currency of Japan?', 'Yuan', 'Won', 'Yen', 'Ringgit', 2, 18),
(1, 'How many primary colors are there?', '2', '3', '4', '5', 1, 19),
(1, 'What is the hardest natural substance on Earth?', 'Gold', 'Iron', 'Diamond', 'Quartz', 2, 20);

-- ── SEED QUESTIONS (Mathematics Basics — Exam ID 2) ─────────
INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index) VALUES
(2, 'What is 15 × 12?', '160', '180', '175', '165', 1, 1),
(2, 'What is the value of π (pi) approximately?', '3.14', '3.41', '2.71', '3.17', 0, 2),
(2, 'What is the area of a square with side 7?', '42', '49', '56', '28', 1, 3),
(2, 'What is 25% of 200?', '25', '40', '50', '75', 2, 4),
(2, 'Solve: 3x + 5 = 20. What is x?', '3', '4', '5', '6', 2, 5),
(2, 'What is the LCM of 4 and 6?', '8', '12', '16', '24', 1, 6),
(2, 'What is the square root of 81?', '7', '8', '9', '10', 2, 7),
(2, 'If a triangle has angles 60°, 60°, and __, what is the missing angle?', '60°', '90°', '45°', '30°', 0, 8),
(2, 'What is the perimeter of a rectangle with length 8 and width 5?', '26', '40', '13', '30', 0, 9),
(2, 'What is 2⁵ (2 to the power of 5)?', '16', '24', '32', '64', 2, 10),
(2, 'What is the HCF of 12 and 18?', '4', '6', '9', '12', 1, 11),
(2, 'A train travels 360 km in 4 hours. What is its speed?', '80 km/h', '90 km/h', '85 km/h', '100 km/h', 1, 12),
(2, 'What is the sum of angles in a triangle?', '90°', '180°', '270°', '360°', 1, 13),
(2, 'What is -5 + (-3)?', '-2', '-8', '8', '2', 1, 14),
(2, 'What is the volume of a cube with side 3?', '9', '18', '27', '54', 2, 15);
