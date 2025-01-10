package org.example.demo_sc.controller;
//
import jakarta.transaction.Transactional;
import org.example.demo_sc.dto.PostDto;
import org.example.demo_sc.entity.*;
import org.example.demo_sc.exception.UserNotFoundException;
import org.example.demo_sc.repository.AttachmentRepository;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.example.demo_sc.repository.UserRepository;
import org.example.demo_sc.repository.MentorRepository;
import org.example.demo_sc.service.FileService;
import org.example.demo_sc.service.PostService;
import org.hibernate.Hibernate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

//@Controller
//@RequestMapping("/mypage")
//public class MyPageController {
//
//    private final PostService postService;
//    private final CompanyRepository companyRepository;
//    private final PostRepository postRepository;
//    private final FileService fileService;
//    private final UserRepository userRepository;
//    private final AttachmentRepository attachmentRepository;
//    private final MentorRepository mentorRepository;
//
//    @Autowired
//    public MyPageController(PostService postService, CompanyRepository companyRepository,
//                            PostRepository postRepository, FileService fileService, UserRepository userRepository,
//                            AttachmentRepository attachmentRepository, MentorRepository mentorRepository) {
//        this.postService = postService;
//        this.companyRepository = companyRepository;
//        this.postRepository = postRepository;
//        this.fileService = fileService;
//        this.userRepository = userRepository;
//        this.attachmentRepository = attachmentRepository;
//        this.mentorRepository = mentorRepository;
//    }
//
//    @Transactional
//    @GetMapping
//    public String mypage(@AuthenticationPrincipal UserDetails userDetails, Model model) {
//        if (userDetails == null) {
//            return "redirect:/login"; // 비로그인 상태 시 로그인 페이지로 리다이렉트
//        }
//
//        // UserDetails를 User로 캐스팅
//        if (userDetails instanceof User) {
//            User user = (User) userDetails;
//
//
//            // 사용자 이름과 이메일을 모델에 추가
//            model.addAttribute("username", user.getDisplayName()); // User의 사용자 이름 필드
//            model.addAttribute("email", user.getEmail());       // User의 이메일 필드
//
//            // 멘토등록정보 가져오기
//            List<Mentor> mentors = mentorRepository.findAllByUser(user);
//            model.addAttribute("mentors", mentors);
//
//
//        } else {
//            throw new IllegalStateException("UserDetails는 User로 변환할 수 없습니다.");
//        }
//
//        return "mypage"; // mypage.html 템플릿
//    }
//
//    // 'MENTOR REGISTER' 게시글 작성 페이지
//    @GetMapping("/write-post")
//    public String mentorShowWritePostPage(Model model) {
//        Company mentorRegister = companyRepository.findByCompanyName("MENTOR REGISTER")
//                .orElseThrow(() -> new IllegalArgumentException("MENTOR REGISTER 회사를 찾을 수 없습니다."));
//        model.addAttribute("company", mentorRegister);
//        return "mentor-write"; // write.html 템플릿
//    }
//
//    // 게시글 작성 처리
//    @PostMapping("/post")
//    public String mentorSubmitPost(
//            @RequestParam("title") String title,
//            @RequestParam("content") String content,
//            @RequestParam("file") MultipartFile file,
//            Principal principal) {
//
//        // 현재 로그인한 사용자의 이메일
//        String email = principal.getName();
//
//        // 사용자 정보 조회 (이메일 기준으로)
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
//
//        // 'MENTOR REGISTER' 고정
//        Company company = companyRepository.findByCompanyName("MENTOR REGISTER")
//                .orElseThrow(() -> new IllegalArgumentException("MENTOR REGISTER 회사를 찾을 수 없습니다."));
//
//        // 게시글 생성 및 저장
//        Post post = new Post();
//        post.setTitle(title);
//        post.setCompany(company);
//        post.setContent(content);
//        post.setUser(user);
//
//        // 게시글 저장 (PostRepository 사용)
//        Post savedPost = postRepository.save(post);
//
//        // 첨부파일 저장
//        if (!file.isEmpty()) {
//            mentorSaveAttachment(file, savedPost);
//        }
//
//        // 작성 완료 후 리다이렉트
//        return "redirect:/mypage";
//    }
//
//    // 첨부파일 저장 메서드
//    private void mentorSaveAttachment(MultipartFile file, Post post) {
//        try {
//            String filePath = fileService.saveFile(file);
//            // Builder 패턴을 사용하여 Attachment 객체 생성
//            Attachment attachment = Attachment.builder()
//                    .file_name(file.getOriginalFilename())
//                    .save_name(file.getOriginalFilename())  // 실제 저장된 파일 이름
//                    .file_type(file.getContentType())
//                    .file_url(filePath)  // 파일 저장 경로
//                    .post(post)
//                    .build();
//            attachmentRepository.save(attachment);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to save attachment: " + e.getMessage(), e);
//        }
//    }
//}

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MyPageController {

    @GetMapping("/mypage")
    public Map<String, Object> getMyPage(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();

        if (authentication != null) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = (User) userDetails;
            response.put("username", user.getDisplayName());
            response.put("email", userDetails.getUsername()); // 예시로 이메일을 생성 (실제로는 DB에서 가져와야 함)
        } else {
            response.put("message", "로그인되지 않았습니다.");
        }

        return response;
    }
}
