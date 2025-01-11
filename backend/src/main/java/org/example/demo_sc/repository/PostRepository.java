package org.example.demo_sc.repository;

import org.example.demo_sc.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    // 회사별 최신 3개의 게시글 조회
    @Query(value = "SELECT * FROM posts p WHERE p.company_no = :companyNo ORDER BY p.created_at DESC LIMIT 3", nativeQuery = true)
    List<Post> findTop3ByCompanyCompanyNoOrderByCreatedAtDesc(@Param("companyNo") Integer companyNo);

    // 페이징 처리된 게시글 조회
    Page<Post> findByCompanyCompanyNo(Integer companyNo, Pageable pageable);

    // 검색어를 포함한 페이징 처리된 게시글 조회
    Page<Post> findByCompanyCompanyNoAndTitleContainingIgnoreCase(Integer companyNo, String keyword, Pageable pageable);

}


