package org.example.demo_sc.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Integer post_no; // 소속 게시물 ID
    private String username; // 작성자 ID
    private String comment;
    private LocalDateTime createdAt;

    public CommentDto(String comment, String username, LocalDateTime createdAt) {
        this.comment = comment;
        this.username = username;
        this.createdAt = createdAt;
    }
}