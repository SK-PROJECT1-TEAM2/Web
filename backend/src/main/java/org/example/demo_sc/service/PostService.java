package org.example.demo_sc.service;

import org.example.demo_sc.dto.PostDto;
import org.example.demo_sc.entity.Attachment;
import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.entity.User;
import org.example.demo_sc.repository.AttachmentRepository;
import org.example.demo_sc.repository.CompanyRepository;
import org.example.demo_sc.repository.PostRepository;
import org.example.demo_sc.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final AttachmentRepository attachmentRepository;
    private final FileService fileService;

    public PostService(PostRepository postRepository, UserRepository userRepository, CompanyRepository companyRepository, AttachmentRepository attachmentRepository, FileService fileService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.attachmentRepository = attachmentRepository;
        this.fileService = fileService;
    }

    // 게시글 생성 (파일 업로드 포함)
    public void createPostWithFile(PostDto postDto, MultipartFile file) throws IOException {
        User user = userRepository.findById(postDto.getUser_no())
                .orElseThrow(() -> new RuntimeException("작성자를 찾을 수 없습니다: " + postDto.getUser_no()));

        Company company = null;
        if (postDto.getCompany_no() != null) {
            company = companyRepository.findById(postDto.getCompany_no())
                    .orElseThrow(() -> new RuntimeException("회사를 찾을 수 없습니다: " + postDto.getCompany_no()));
        }

        Post post = Post.builder()
                .user(user)
                .company(company)
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .build();

        Post savedPost = postRepository.save(post);

        if (file != null && !file.isEmpty()) {
            String filePath = fileService.saveFile(file); // 파일 저장
            Attachment attachment = Attachment.builder()
                    .post(savedPost)
                    .file_name(file.getOriginalFilename())
                    .save_name(generateUniqueFileName(file.getOriginalFilename()))
                    .file_type(file.getContentType())
                    .file_url(filePath)
                    .build();
            attachmentRepository.save(attachment);
        }

    }

    private String generateUniqueFileName(String originalFileName) {
        return System.currentTimeMillis() + "_" + originalFileName;
    }

    private void saveFile(MultipartFile file, String filePath) throws IOException {
        // 실제 파일 저장 로직 구현
    }

    // 모든 게시글 조회
    public List<PostDto> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(post -> PostDto.builder()
                        .user_no(post.getUser().getUser_no())
                        .company_no(post.getCompany() != null ? post.getCompany().getCompanyNo() : null)
                        .title(post.getTitle())
                        .content(post.getContent())
                        .build())
                .collect(Collectors.toList());
    }

    // 특정 게시글 조회
    public PostDto getPostById(Integer postNo) {
        Post post = postRepository.findById(postNo)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postNo));

        return PostDto.builder()
                .user_no(post.getUser().getUser_no())
                .company_no(post.getCompany() != null ? post.getCompany().getCompanyNo() : null)
                .title(post.getTitle())
                .content(post.getContent())
                .build();
    }

    // 게시글 수정
    public void updatePost(Integer postNo, PostDto postDto) {
        Post post = postRepository.findById(postNo)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다: " + postNo));

        if (postDto.getCompany_no() != null) {
            Company company = companyRepository.findById(postDto.getCompany_no())
                    .orElseThrow(() -> new RuntimeException("회사를 찾을 수 없습니다: " + postDto.getCompany_no()));
            post.setCompany(company);
        }

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        postRepository.save(post);
    }

    // 게시글 삭제
    public void deletePost(Integer postNo) {
        postRepository.deleteById(postNo);
    }

}