package org.example.demo_sc.controller;

import org.example.demo_sc.dto.CompanyDto;
import org.example.demo_sc.dto.PostDto;
import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
}