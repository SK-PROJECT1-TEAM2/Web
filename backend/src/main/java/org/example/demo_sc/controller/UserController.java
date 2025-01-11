package org.example.demo_sc.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.demo_sc.dto.UserDto;
import org.example.demo_sc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * - 인증없이 접근가능함 : 로그인, 회원가입
 * - 인증후에 접근가능함 : 로그아웃 (필요시 컨트롤러 분리 가능함)
 * - 시나리오
 *  - 회원가입 -> 로그인 -> 홈페이지 자동이동 -> 로그아웃 클릭 -> 로그인
 */
@Controller
public class UserController {
    @Autowired
    private UserService userService;

//    // 로그인
//    @GetMapping("/login")
//    public String login() {
//        return "login";
//    }

    // 회원가입
    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

    // 회원가입 처리
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup_process")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        // 1. 전달된 데이터 확인
        System.out.println("회원가입 요청 데이터: " + userDto);

        // 2. 서비스에서 회원가입 처리 (UserService)
        try {
            userService.create(userDto);  // 사용자 생성 로직
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입 성공!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패! 다시 시도해주세요.");
        }
    }

    // 로그아웃 작성
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        // 1. 인증 해제(로그아웃), (요청, 응답, 현재 사용자의 인증정보를 전달)
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());

        // 2. 최종 로그인으로 이동
        return "redirect:/login";
    }

}
