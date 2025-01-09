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
        // 필요한 필드에 대해 추가적으로 매핑
    }
}