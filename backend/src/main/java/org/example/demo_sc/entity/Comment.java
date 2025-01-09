package org.example.demo_sc.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "comments")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer comment_no;

    @ManyToOne
    @JoinColumn(name = "post_no", nullable = false)
    private Post post; // 소속 게시물

    @ManyToOne
    @JoinColumn(name = "user_no", nullable = false)
    private User user; // 작성자

    @Column(nullable = false)
    private String comment;

    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    @PrePersist
    public void onCreate() {
        created_at = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updated_at = LocalDateTime.now();
    }
}