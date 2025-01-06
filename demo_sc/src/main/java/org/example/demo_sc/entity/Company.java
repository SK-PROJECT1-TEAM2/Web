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
    private Integer company_no;

    @Column(nullable = false, length = 100)
    private String company_name;

    @Column(updatable = false)
    private LocalDateTime created_at;

    @PrePersist
    public void onCreate() {
        created_at = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Post> posts; // 회사에 속한 게시물들
}