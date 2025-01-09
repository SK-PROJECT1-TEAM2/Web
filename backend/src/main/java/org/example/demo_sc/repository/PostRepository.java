package org.example.demo_sc.repository;

import org.example.demo_sc.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findAllByOrderByCreatedAtDesc();

    // 회사 번호로 게시글을 조회하는 메서드
    List<Post> findByCompanyCompanyNoOrderByCreatedAtDesc(Integer companyNo);
}
