package org.example.demo_sc.controller;

import org.example.demo_sc.dto.CompanyDto;
import org.example.demo_sc.dto.PostDto;
import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyApiController {

    private final CompanyRepository companyRepository;
    private final PostRepository postRepository;

    public CompanyApiController(CompanyRepository companyRepository, PostRepository postRepository) {
        this.companyRepository = companyRepository;
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<CompanyDto> getAllCompanies() {
        // 모든 회사 데이터를 CompanyDto로 변환
        return companyRepository.findAll().stream()
                .map(company -> new CompanyDto(
                        company.getCompanyNo(),
                        company.getCompanyName(),
                        company.getCreatedAt().toString()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{companyNo}/posts")
    public List<PostDto> getPostsByCompany(@PathVariable Integer companyNo) {
        // 특정 회사의 게시글 데이터를 PostDto로 변환
        List<Post> posts = postRepository.findTop3ByCompanyCompanyNoOrderByCreatedAtDesc(companyNo);

        return posts.stream()
                .map(PostDto::new) // Post -> PostDto 변환
                .collect(Collectors.toList());
    }

    @GetMapping("/{companyNo}")
    public ResponseEntity<?> getCompanyById(@PathVariable Integer companyNo) {
        try {
            System.out.println("요청 받은 companyNo: " + companyNo); // 요청 ID 로그
            Company company = companyRepository.findById(companyNo)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid company ID: " + companyNo));
            CompanyDto companyDto = new CompanyDto(
                    company.getCompanyNo(),
                    company.getCompanyName(),
                    company.getCreatedAt().toString()
            );
            return ResponseEntity.ok(companyDto);
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid company ID: " + companyNo + " - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            System.err.println("서버 오류 발생: " + e.getMessage());
            e.printStackTrace(); // 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }
}
