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

    @Column(nullable = false, length = 255)
    private String save_name;

    @Column(nullable = false, length = 255)
    private String file_type;

    @Column(nullable = false, length = 500)
    private String file_url;


    @Builder
    public Attachment(Integer attachment_no, Post post, String file_name, String save_name, String file_type, String file_url) {
        this.attachment_no = attachment_no;
        this.post = post;
        this.file_name = file_name;
        this.save_name = save_name;
        this.file_type = file_type;
        this.file_url = file_url;
    }

}