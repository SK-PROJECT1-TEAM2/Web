package org.example.demo_sc.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class AppSecurityConfig {

    private final UserDetailsService userDetailsService;

    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.cors().and()
            .authorizeHttpRequests(auth -> auth
                    // 댓글 엔드포인트는 인증 없이 접근 허용
                    .requestMatchers("/api/articles/*/comments").permitAll()
                    // 로그인, 회원가입 등 다른 경로는 인증 없이 접근 허용
                    .requestMatchers("/login", "/signup", "/signup_process", "/css/**", "/js/**", "/api/articles").permitAll()
                    // 그 외 특정 경로는 인증 필요
                    .requestMatchers("/mypage", "/write-post", "/api/articles/**", "/board", "/company/**").authenticated()
                    // 나머지 모든 요청은 인증 없이 허용
                    .anyRequest().permitAll()
            )
            .formLogin(form -> form
                    .loginPage("/login")
                    .defaultSuccessUrl("/", true)
                    .failureUrl("/login?error=true")
                    .permitAll()
                    .successHandler((request, response, authentication) -> {
                        response.setContentType("application/json");
                        String jsonResponse = "Login Success";
                        response.getWriter().write(jsonResponse);
                    })
            )
            .logout(logout -> logout
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login")
                    .invalidateHttpSession(true)
            )
            .csrf(csrf -> csrf.disable());

    return http.build();
}

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder())
                .and()
                .build();
    }

    // CORS 설정을 명확히 하기 위해 별도의 설정 클래스를 추가
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")  // React 서버 주소
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
