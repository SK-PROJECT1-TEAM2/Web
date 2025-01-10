package org.example.demo_sc.repository;

import org.example.demo_sc.entity.Comment;
import org.example.demo_sc.entity.Mentor;
import org.example.demo_sc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MentorRepository extends JpaRepository<Mentor, Integer> {
    List<Mentor> findAllByUser(User user); // Post 객체를 기반으로 댓글 조회
}


