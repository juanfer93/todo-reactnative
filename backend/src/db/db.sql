CREATE DATABASE todo_list;
USE todo_list;

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- La base de datos la hice desde un servidor local, lo hice con XAMPP y con HEIDISQL