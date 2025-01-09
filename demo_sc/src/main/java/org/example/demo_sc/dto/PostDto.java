package org.example.demo_sc.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
    private Integer post_no;
    private Integer user_no; // 작성자 ID
    private Integer company_no; // 회사 ID
    private String title;
    private String content;
    private String filePath;
    private LocalDateTime createdAt;
}