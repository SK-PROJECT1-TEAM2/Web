package org.example.demo_sc.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "attachments")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attachment_no;

    @ManyToOne
    @JoinColumn(name = "post_no", nullable = false)
    private Post post; // 소속 게시물

    @Column(nullable = false, length = 255)
    private String file_name;

    @Column(nullable = false, length = 500)
    private String file_url;

    @Column(nullable = false, length = 50)
    private String file_type;

    private LocalDateTime uploaded_at;

    @PrePersist
    public void onCreate() {
        uploaded_at = LocalDateTime.now();
    }
}