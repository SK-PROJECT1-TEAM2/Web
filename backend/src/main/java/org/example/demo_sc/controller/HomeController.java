package org.example.demo_sc.controller;

import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    private final CompanyRepository companyRepository;
    private final PostRepository postRepository;

    // 생성자 주입을 통한 의존성 주입
    public HomeController(CompanyRepository companyRepository, PostRepository postRepository) {
        this.companyRepository = companyRepository;
        this.postRepository = postRepository;
    }

    // 회사 목록과 최신 글 3개를 표시하는 메서드
    @GetMapping("/")
    public String showBoard(Model model) {
        List<Company> companies = companyRepository.findAll();
        Map<Integer, List<Post>> companyPostsMap = new HashMap<>();

        for (Company company : companies) {
            List<Post> latestPosts = postRepository.findTop3ByCompanyCompanyNoOrderByCreatedAtDesc(company.getCompanyNo());
            companyPostsMap.put(company.getCompanyNo(), latestPosts);
        }

        model.addAttribute("companies", companies);
        model.addAttribute("companyPostsMap", companyPostsMap);
        return "board";
    }




    // 특정 회사 게시판 페이지
    @GetMapping("/company/{companyName}")
    public String showCompanyBoard(@PathVariable String companyName,
                                   @RequestParam(value = "keyword", required = false) String keyword,
                                   @RequestParam(value = "page", defaultValue = "0") int page,
                                   Model model) {
        // 회사 정보 조회
        Company company = companyRepository.findByCompanyName(companyName)
                .orElseThrow(() -> new IllegalArgumentException("Invalid company name: " + companyName));

        // 페이지 및 정렬 설정
        Pageable pageable = PageRequest.of(page, 5, Sort.by("createdAt").descending()); // 한 페이지에 5개의 게시글 표시

        // 게시글 검색 및 페이징 처리
        Page<Post> posts;
        if (keyword != null && !keyword.isEmpty()) {
            posts = postRepository.findByCompanyCompanyNoAndTitleContainingIgnoreCase(company.getCompanyNo(), keyword, pageable);
        } else {
            posts = postRepository.findByCompanyCompanyNo(company.getCompanyNo(), pageable);
        }

        // 모델에 데이터 추가
        model.addAttribute("company", company);
        model.addAttribute("posts", posts);
        model.addAttribute("keyword", keyword);

        return "companyboard"; // 게시판 페이지 템플릿 이름
    }


    @GetMapping("/index")
    public String home(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            System.out.println("로그인 성공 사용자: " + userDetails.getUsername());
        } else {
            System.out.println("로그인 실패 또는 비로그인 상태");
        }
        return "board";
    }

    @GetMapping("/write-post")
    public String showWritePostPage(Model model) {
        // 데이터베이스에서 회사 목록 조회
        List<Company> companies = companyRepository.findAll();
        // Thymeleaf로 데이터 전달
        model.addAttribute("companies", companies);
        return "write"; // 템플릿 파일 이름
    }

}
