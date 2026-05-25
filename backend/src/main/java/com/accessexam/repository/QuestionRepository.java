package com.accessexam.repository;

import com.accessexam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExamIdOrderByOrderIndexAsc(Long examId);
    int countByExamId(Long examId);
    void deleteByExamId(Long examId);
}
