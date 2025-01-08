-- Table: users
CREATE TABLE users (
                       user_no INT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(100) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       user_name VARCHAR(50) NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: companies
CREATE TABLE companies (
                           company_no INT AUTO_INCREMENT PRIMARY KEY,
                           company_name VARCHAR(100) NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: posts
CREATE TABLE posts (
                       post_no INT AUTO_INCREMENT PRIMARY KEY,
                       user_no INT NOT NULL,
                       company_no INT,
                       title VARCHAR(200) NOT NULL,
                       content TEXT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       FOREIGN KEY (user_no) REFERENCES users(user_no) ON DELETE CASCADE,
                       FOREIGN KEY (company_no) REFERENCES companies(company_no) ON DELETE SET NULL
);

-- Table: attachments
CREATE TABLE attachments (
                             attachment_no INT AUTO_INCREMENT PRIMARY KEY,
                             post_no INT NOT NULL,
                             file_name VARCHAR(255) NOT NULL,
                             file_url VARCHAR(500) NOT NULL,
                             file_type VARCHAR(50) NOT NULL,
                             uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (post_no) REFERENCES posts(post_no) ON DELETE CASCADE
);

-- Table: comments
CREATE TABLE comments (
                          comment_no INT AUTO_INCREMENT PRIMARY KEY,
                          post_no INT NOT NULL,
                          user_no INT NOT NULL,
                          comment TEXT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (post_no) REFERENCES posts(post_no) ON DELETE CASCADE,
                          FOREIGN KEY (user_no) REFERENCES users(user_no) ON DELETE CASCADE
);

-- Table: mentors
CREATE TABLE mentors (
                         mentor_id INT AUTO_INCREMENT PRIMARY KEY,
                         company_no INT NOT NULL,
                         user_no INT NOT NULL,
                         assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (company_no) REFERENCES companies(company_no) ON DELETE CASCADE,
                         FOREIGN KEY (user_no) REFERENCES users(user_no) ON DELETE CASCADE
);
