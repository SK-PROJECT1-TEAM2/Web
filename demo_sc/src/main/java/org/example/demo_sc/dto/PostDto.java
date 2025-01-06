package org.example.demo_sc.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostDto {
    private Integer user_no; // 작성자 ID
    private Integer company_no; // 회사 ID
    private String title;
    private String content;
}