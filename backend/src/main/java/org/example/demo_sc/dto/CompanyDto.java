package org.example.demo_sc.dto;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private Integer companyNo;        // 회사 고유 번호
    private String companyName;       // 회사 이름
    private String createdAt;         // 생성일 (datetime -> String)
}
