<?php
// Include database connection
require_once 'db_connect.php';

// Check if database connection is valid
if (!$conn || $conn->connect_error) {
    die("Database connection error: " . ($conn ? $conn->connect_error : "Connection is null"));
}

// Create users table
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(64) NULL,
    token_expiry INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Users table created successfully\n";
    
    // Check if the table is empty
    $result = $conn->query("SELECT COUNT(*) as count FROM users");
    $row = $result->fetch_assoc();
    
    if ($row['count'] == 0) {
        // Create a test user
        $password = password_hash('password123', PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (first_name, last_name, email, phone, password) 
                VALUES ('Test', 'User', 'test@example.com', '1234567890', '$password')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Test user created successfully\n";
        } else {
            echo "Error creating test user: " . $conn->error . "\n";
        }
    } else {
        echo "Users table already contains data\n";
    }
} else {
    echo "Error creating users table: " . $conn->error . "\n";
}

$conn->close();
?> 