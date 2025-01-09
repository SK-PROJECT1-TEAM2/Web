-- Table: users
CREATE TABLE users (
    userNo INT AUTO_INCREMENT PRIMARY KEY,  -- user_no -> userNo
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    userName VARCHAR(50) NOT NULL,          -- user_name -> userName
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- created_at -> createdAt
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- updated_at -> updatedAt
);

-- Table: companies
CREATE TABLE companies (
    companyNo INT AUTO_INCREMENT PRIMARY KEY, -- company_no -> companyNo
    companyName VARCHAR(100) NOT NULL,        -- company_name -> companyName
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- created_at -> createdAt
);

-- Table: posts
CREATE TABLE posts (
    postNo INT AUTO_INCREMENT PRIMARY KEY,    -- post_no -> postNo
    userNo INT NOT NULL,                      -- user_no -> userNo
    companyNo INT,                            -- company_no -> companyNo
    title VARCHAR(200) NOT NULL,
    content TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- created_at -> createdAt
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- updated_at -> updatedAt
    FOREIGN KEY (userNo) REFERENCES users(userNo) ON DELETE CASCADE,
    FOREIGN KEY (companyNo) REFERENCES companies(companyNo) ON DELETE SET NULL
);

-- Table: attachments
CREATE TABLE attachments (
    attachmentNo INT AUTO_INCREMENT PRIMARY KEY, -- attachment_no -> attachmentNo
    postNo INT NOT NULL,                          -- post_no -> postNo
    fileName VARCHAR(255) NOT NULL,              -- file_name -> fileName
    fileUrl VARCHAR(500) NOT NULL,               -- file_url -> fileUrl
    fileType VARCHAR(50) NOT NULL,               -- file_type -> fileType
    uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- uploaded_at -> uploadedAt
    FOREIGN KEY (postNo) REFERENCES posts(postNo) ON DELETE CASCADE
);

-- Table: comments
CREATE TABLE comments (
    commentNo INT AUTO_INCREMENT PRIMARY KEY,    -- comment_no -> commentNo
    postNo INT NOT NULL,                          -- post_no -> postNo
    userNo INT NOT NULL,                          -- user_no -> userNo
    comment TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- created_at -> createdAt
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- updated_at -> updatedAt
    FOREIGN KEY (postNo) REFERENCES posts(postNo) ON DELETE CASCADE,
    FOREIGN KEY (userNo) REFERENCES users(userNo) ON DELETE CASCADE
);

-- Table: mentors
CREATE TABLE mentors (
    mentorId INT AUTO_INCREMENT PRIMARY KEY,     -- mentor_id -> mentorId
    companyNo INT NOT NULL,                       -- company_no -> companyNo
    userNo INT NOT NULL,                          -- user_no -> userNo
    assignedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- assigned_at -> assignedAt
    FOREIGN KEY (companyNo) REFERENCES companies(companyNo) ON DELETE CASCADE,
    FOREIGN KEY (userNo) REFERENCES users(userNo) ON DELETE CASCADE
);
