package org.example.demo_sc.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "mentors")
@Setter
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Mentor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mentor_id;

    @ManyToOne
    @JoinColumn(name = "company_no", nullable = false)
    private Company company; // 소속 회사

    @ManyToOne
    @JoinColumn(name = "user_no", nullable = false)
    private User user; // 멘토

    private LocalDateTime assigned_at;

    @PrePersist
    public void onCreate() {
        assigned_at = LocalDateTime.now();
    }
}