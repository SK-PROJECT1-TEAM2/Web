package org.example.demo_sc.controller;

import org.example.demo_sc.entity.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyPageController {

    @GetMapping("/mypage")
    public String mypage(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        if (userDetails == null) {
            return "redirect:/login"; // 비로그인 상태 시 로그인 페이지로 리다이렉트
        }

        // UserDetails를 User로 캐스팅
        if (userDetails instanceof User) {
            User user = (User) userDetails;

            // 사용자 이름과 이메일을 모델에 추가
            model.addAttribute("username", user.getDisplayName()); // User의 사용자 이름 필드
            model.addAttribute("email", user.getEmail());       // User의 이메일 필드
        } else {
            throw new IllegalStateException("UserDetails는 User로 변환할 수 없습니다.");
        }

        return "mypage"; // mypage.html 템플릿
    }
}

