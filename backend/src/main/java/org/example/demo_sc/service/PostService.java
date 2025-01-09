package org.example.demo_sc.service;

import org.example.demo_sc.dto.PostDto;
import org.example.demo_sc.entity.Company;
import org.example.demo_sc.entity.Post;
import org.example.demo_sc.entity.User;
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

    public PostService(PostRepository postRepository, UserRepository userRepository, CompanyRepository companyRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
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
                .filePath(file != null && !file.isEmpty() ? "/uploads/" + file.getOriginalFilename() : null)
                .build();

        if (file != null && !file.isEmpty()) {
            saveFile(file, post.getFilePath());
        }

        postRepository.save(post);
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
                        .filePath(post.getFilePath())
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
                .filePath(post.getFilePath())
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
