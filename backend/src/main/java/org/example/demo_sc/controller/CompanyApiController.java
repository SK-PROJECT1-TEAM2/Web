package org.example.demo_sc.controller;

import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버
public class CompanyApiController {

    private final CompanyRepository companyRepository;
    private final PostRepository postRepository;

    public CompanyApiController(CompanyRepository companyRepository, PostRepository postRepository) {
        this.companyRepository = companyRepository;
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Map<String, Object>> getAllCompaniesWithPosts() {
        List<Company> companies = companyRepository.findAll();

        return companies.stream().map(company -> {
            List<Post> posts = postRepository.findTop3ByCompanyCompanyNoOrderByCreatedAtDesc(company.getCompanyNo());
            Map<String, Object> data = new HashMap<>();
            data.put("company", company);
            data.put("posts", posts);
            return data;
        }).toList();
    }

    @GetMapping("/{companyId}")
    public Map<String, Object> getCompanyBoard(@PathVariable Integer companyId,
                                               @RequestParam(value = "keyword", required = false) String keyword,
                                               @RequestParam(value = "page", defaultValue = "0") int page) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid company ID: " + companyId));

        Pageable pageable = PageRequest.of(page, 5, Sort.by("createdAt").descending());
        Page<Post> posts;

        if (keyword != null && !keyword.isEmpty()) {
            posts = postRepository.findByCompanyCompanyNoAndTitleContainingIgnoreCase(company.getCompanyNo(), keyword, pageable);
        } else {
            posts = postRepository.findByCompanyCompanyNo(company.getCompanyNo(), pageable);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("company", company);
        response.put("posts", posts.getContent());
        response.put("totalPages", posts.getTotalPages());
        return response;
    }
}
