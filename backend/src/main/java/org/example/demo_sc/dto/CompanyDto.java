// package org.example.demo_sc.dto;

// import lombok.*;

// @Getter
// @Setter
// @ToString
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// public class CompanyDto {
//     private Integer companyNo;        // 회사 고유 번호
//     private String companyName;       // 회사 이름
//     private String createdAt;         // 생성일 (datetime -> String)
// }

package org.example.demo_sc.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private Integer companyNo;        
    private String companyName;       
    private String createdAt;         

    private List<PostDto> posts;      

    // ★ 3개짜리 생성자를 직접 추가
    public CompanyDto(Integer companyNo, String companyName, String createdAt) {
        this.companyNo = companyNo;
        this.companyName = companyName;
        this.createdAt = createdAt;
    }
}