package org.example.demo_sc.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    @Value("${file.dir}") // application.yml에서 설정한 상대 경로를 읽어옵니다
    private String uploadDir;

    public String saveFile(MultipartFile file) throws IOException {
        // 상대 경로를 절대 경로로 변환
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath();

        // 디렉토리가 없으면 생성
        File dir = uploadPath.toFile();
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // 파일을 지정된 경로에 저장
        Path destinationPath = uploadPath.resolve(file.getOriginalFilename());
        File dest = destinationPath.toFile();
        file.transferTo(dest); // 실제 파일 저장

        return destinationPath.toString(); // 저장된 파일 경로 반환 (절대 경로)
    }
}
