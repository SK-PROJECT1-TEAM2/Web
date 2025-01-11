package org.example.demo_sc.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "companies")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_no")
    private Integer companyNo;

    @Column(name = "company_name", nullable = false, length = 100)
    private String companyName;

    @Column(updatable = false)
    private LocalDateTime created_at;

    @PrePersist
    public void onCreate() {
        created_at = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Post> posts; // 회사에 속한 게시물들

    // 명시적으로 getter 메서드 추가
    public Integer getCompanyNo() {
        return companyNo;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public LocalDateTime getCreatedAt() {
        return created_at;
    }
}

