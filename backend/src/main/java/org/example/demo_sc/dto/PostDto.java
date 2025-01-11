package org.example.demo_sc.dto;

import lombok.*;
import org.example.demo_sc.entity.Post;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private String userName; // 추가
    private Integer postNo;
    private Integer user_no; // 작성자 ID
    private Integer company_no; // 회사 ID
    private String title;
    private String content;
    private String filePath;
    private LocalDateTime createdAt;

    // Post를 받아서 PostDto로 변환하는 생성자 추가
    public PostDto(Post post) {
        this.postNo = post.getPostNo();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdAt = post.getCreatedAt();
        this.user_no = post.getUser().getUser_no();
        // 필요한 필드에 대해 추가적으로 매핑

        // ★ userName 추가
        if (post.getUser() != null) {
            this.userName = post.getUser().getDisplayName(); // 혹은 getEmail()
        }
    }
}