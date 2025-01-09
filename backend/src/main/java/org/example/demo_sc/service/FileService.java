package org.example.demo_sc.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    private static final String UPLOAD_DIRECTORY = "uploads/"; // 업로드 폴더 상대 경로

    public String saveFile(MultipartFile file) {
        try {
            // 업로드 디렉토리 경로 생성
            Path uploadPath = Paths.get(UPLOAD_DIRECTORY);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath); // 디렉토리가 없으면 생성
            }

            // 파일 저장 경로 설정
            Path filePath = uploadPath.resolve(file.getOriginalFilename());
            Files.write(filePath, file.getBytes()); // 파일 저장

            return filePath.toString(); // 저장된 파일 경로 반환
        } catch (Exception e) {
            throw new RuntimeException("파일 저장에 실패했습니다.", e);
        }
    }
}

