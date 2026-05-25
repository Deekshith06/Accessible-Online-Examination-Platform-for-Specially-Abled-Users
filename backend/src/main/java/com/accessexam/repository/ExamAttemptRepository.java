package com.accessexam.repository;

import com.accessexam.entity.ExamAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, Long> {
    List<ExamAttempt> findByUserIdOrderByStartedAtDesc(Long userId);
    List<ExamAttempt> findByExamIdOrderBySubmittedAtDesc(Long examId);
    Optional<ExamAttempt> findByUserIdAndExamIdAndStatus(Long userId, Long examId,
            ExamAttempt.AttemptStatus status);
}
