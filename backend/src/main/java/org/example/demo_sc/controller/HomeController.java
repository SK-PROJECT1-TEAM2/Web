package org.example.demo_sc.controller;

import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class HomeController {

    private final CompanyRepository companyRepository;
    private final PostRepository postRepository;

    // 생성자 주입을 통한 의존성 주입
    public HomeController(CompanyRepository companyRepository, PostRepository postRepository) {
        this.companyRepository = companyRepository;
        this.postRepository = postRepository;
    }

    // 회사 목록 페이지
    @GetMapping("/")
    public String showBoard(Model model) {
        List<Company> companies = companyRepository.findAll();
        model.addAttribute("companies", companies);
        return "board"; // 회사 목록을 보여주는 페이지
    }

    // 특정 회사 게시판 페이지
    @GetMapping("/company/{companyName}")
    public String showCompanyBoard(@PathVariable String companyName, Model model) {
        // 회사 정보 조회
        Company company = companyRepository.findByCompanyName(companyName)
                .orElseThrow(() -> new IllegalArgumentException("Invalid company name: " + companyName));

        // 회사에 해당하는 게시글 조회
        List<Post> posts = postRepository.findByCompanyCompanyNoOrderByCreatedAtDesc(company.getCompanyNo());
        model.addAttribute("company", company);
        model.addAttribute("posts", posts);

        return "companyboard"; // 게시판 페이지로 이동
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


    @GetMapping("/mypage")
    public String mypage(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            // 비로그인 상태 처리 (로그인 페이지로 리다이렉트 등)
            return "redirect:/login";
        }
        return "mypage";
    }

}
