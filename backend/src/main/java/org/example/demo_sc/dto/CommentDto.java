package org.example.demo_sc.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.example.demo_sc.entity.Comment; // 이 라인을 추가

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Integer id; // comment_no 매핑
    private Integer post_no; // 소속 게시물 ID
    private String username; // 작성자 ID
    private String comment;
    private String time; // 생성 시간 (포맷된 문자열)

    public CommentDto(Comment comment) {
        this.id = comment.getComment_no();
        this.post_no = comment.getPost().getPostNo(); // Post 엔티티의 postNo 가져오기
        this.username = comment.getUser().getDisplayName();
        this.comment = comment.getComment();
        this.time = comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
    }
}