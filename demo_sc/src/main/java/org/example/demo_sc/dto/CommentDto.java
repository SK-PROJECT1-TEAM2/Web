package org.example.demo_sc.dto;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Integer post_no; // 소속 게시물 ID
    private Integer user_no; // 작성자 ID
    private String comment;
}