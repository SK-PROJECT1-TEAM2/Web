package org.example.demo_sc.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AttachmentDto {
    private Integer post_no; // 소속 게시물 ID
    private String file_name;
    private String file_url;
    private String file_type;
}