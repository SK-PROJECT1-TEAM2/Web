package org.example.demo_sc.repository;

import org.example.demo_sc.entity.Attachment;
import org.example.demo_sc.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
// git push 테스트트
@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Integer> {
    List<Attachment> findByPost(Post post);
}