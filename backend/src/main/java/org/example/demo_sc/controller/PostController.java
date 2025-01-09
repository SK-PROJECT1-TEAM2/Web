package org.example.demo_sc.controller;

import org.example.demo_sc.dto.CommentDto;
import org.example.demo_sc.dto.PostDto;
import org.example.demo_sc.entity.Attachment;
import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.entity.User;
import org.example.demo_sc.exception.UserNotFoundException;
import org.example.demo_sc.repository.AttachmentRepository;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.example.demo_sc.repository.UserRepository;
import org.example.demo_sc.service.FileService;
import org.example.demo_sc.service.PostService;
import org.example.demo_sc.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.security.Principal;
import org.springframework.ui.Model;



import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/articles")
public class PostController {

    private final PostService postService;
    private final CompanyRepository companyRepository;
    private final PostRepository postRepository;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final AttachmentRepository attachmentRepository;
    private final CommentService commentService;


    @Autowired
    // 생성자에서 의존성 주입
    public PostController(PostService postService, CompanyRepository companyRepository,
                          PostRepository postRepository, FileService fileService, UserRepository userRepository,AttachmentRepository attachmentRepository,CommentService commentService) {
        this.postService = postService;
        this.companyRepository = companyRepository;
        this.postRepository = postRepository;
        this.fileService = fileService;
        this.userRepository = userRepository;
        this.attachmentRepository = attachmentRepository;
        this.commentService = commentService;
    }

    // 모든 게시글 조회
    @GetMapping
    public List<PostDto> getAllArticles() {
        return postService.getAllPosts();
    }

    // 특정 게시글 조회
    @GetMapping("/{id}")
    public PostDto getArticleById(@PathVariable Integer id) {
        return postService.getPostById(id);
    }

    // 게시물 작성
    @PostMapping("/post")
    public String submitPost(
            @RequestParam("title") String title,
            @RequestParam("companyNo") Integer companyNo, // 회사 ID
            @RequestParam("content") String content,
            @RequestParam("file") MultipartFile file,
            Principal principal){

        String email = principal.getName(); // 현재 로그인한 사용자의 이메일

        // 사용자 정보 조회 (이메일 기준으로)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        // 회사 정보 조회
        Company company = companyRepository.findById(companyNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid company ID: " + companyNo));

        // 게시글 생성
        Post post = new Post();
        post.setTitle(title);
        post.setCompany(company);
        post.setContent(content);
        post.setUser(user);

        //게시글 저장
        Post savedPost = postRepository.save(post);

        // 파일 저장 및 Attachment 생성
        if (!file.isEmpty()) {
            saveAttachment(file, savedPost);
        }

        // 게시글 저장 위로 이동
        //postRepository.save(post);

        // 게시판으로 리다이렉트
        return "redirect:/company/" + company.getCompanyName(); // 회사 이름을 URL 파라미터로 사용
    }

//    // 게시글 수정
//    @PutMapping("/{id}")
//    public ResponseEntity<String> updateArticle(
//            @PathVariable Integer id,
//            @RequestBody PostDto postDto
//    ) {
//        postService.updatePost(id, postDto);
//        return ResponseEntity.ok("게시글이 성공적으로 수정되었습니다.");
//    }

    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Integer id) {
        postService.deletePost(id);
        return ResponseEntity.ok("게시글이 성공적으로 삭제되었습니다.");
    }

    // 게시글 상세 페이지 조회
    @GetMapping("/post/{postId}")
    public String getPostDetail(@PathVariable Integer postId, Principal principal, Model model) {
        // 게시글 조회
        Post post = postService.getPostByNo(postId);


        // 현재 로그인한 사용자 이메일
        String currentUserEmail = principal.getName();

        // 작성자인지 여부 판단
        boolean user = post.getUser().getEmail().equals(currentUserEmail);

        // 댓글 목록 조회 및 DTO 변환
        List<CommentDto> comments = commentService.getCommentsByPostId(postId);

        // 모델에 데이터 추가
        model.addAttribute("post", post);
        model.addAttribute("comments", comments);
        model.addAttribute("user", user); // 작성자인지 여부 추가
        return "post"; // post.html 템플릿
    }

    // 게시글 수정 (현재 페이지에서 처리)
    @PostMapping("/post/{postId}/edit")
    public String editPost(@PathVariable Integer postId,
                           @RequestParam String title,
                           @RequestParam String content,
                           Principal principal) {
        // 게시글 조회 및 작성자 확인
        Post post = postService.getPostByNo(postId);

        // 현재 로그인한 사용자와 게시글 작성자가 같은지 확인
        if (!post.getUser().getEmail().equals(principal.getName())) {
            throw new IllegalStateException("작성자만 수정할 수 있습니다.");
        }


        // 게시글 수정
        post.setTitle(title);
        post.setContent(content);
        postService.updatePost(postId, new PostDto(post)); // 서비스 계층에서 처리

        // 수정 후 다시 상세 페이지로 리다이렉트
        return "redirect:/api/articles/post/" + postId;
    }


    @GetMapping("/post/edit/{postId}")
    public String showEditPage(@PathVariable Integer postId, Model model, Principal principal) {
        // 게시글 조회
        Post post = postService.getPostByNo(postId);

        // 현재 로그인한 사용자와 게시글 작성자가 같은지 확인
        if (!post.getUser().getEmail().equals(principal.getName())) {
            throw new IllegalStateException("작성자만 수정할 수 있습니다.");
        }

        // 모델에 데이터 추가
        model.addAttribute("post", post);
        return "postedit"; // 수정 페이지 템플릿
    }


    // 댓글 추가
    @PostMapping("/post/{postId}/comment")
    public String addComment(@PathVariable Integer postId, @RequestParam String content, Principal principal) {
        // 현재 로그인된 사용자 조회
        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 댓글 추가
        commentService.addComment(postId, user, content);

        // 상세 페이지로 리다이렉트
        return "redirect:/api/articles/post/" + postId;
    }


    // 첨부파일 저장
    private void saveAttachment(MultipartFile file, Post post) {
        try {
            String filePath = fileService.saveFile(file);
            // Builder 패턴을 사용하여 Attachment 객체 생성
            Attachment attachment = Attachment.builder()
                    .file_name(file.getOriginalFilename())
                    .save_name(file.getOriginalFilename())  // 실제 저장된 파일 이름
                    .file_type(file.getContentType())
                    .file_url(filePath)  // 파일 저장 경로
                    .post(post)
                    .build();
            attachmentRepository.save(attachment);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save attachment: " + e.getMessage(), e);
        }
    }
}
