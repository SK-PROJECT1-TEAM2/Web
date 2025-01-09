package org.example.demo_sc.repository;

import org.example.demo_sc.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    // 회사 이름으로 회사 조회
    Optional<Company> findByCompanyName(String companyName);
}
