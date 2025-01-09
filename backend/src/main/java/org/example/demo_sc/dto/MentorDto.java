package org.example.demo_sc.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MentorDto {
    private Integer company_no; // 소속 회사 ID
    private Integer user_no; // 멘토 ID
}