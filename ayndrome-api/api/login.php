<?php
// Start output buffering to prevent any output before headers
ob_start();

// Include CORS configuration
require_once 'cors.php';

// Include database connection
require_once 'db_connect.php';

// Start session
session_start();

// Set content type to JSON
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit();
}

$email = $data['email'];
$password = $data['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

try {
    // Check if database connection is valid
    if (!$conn || $conn->connect_error) {
        error_log("Database connection error: " . ($conn ? $conn->connect_error : "Connection is null"));
        http_response_code(500);
        echo json_encode(['error' => 'Database connection error']);
        exit();
    }
    
    // Check if users table exists
    $tableCheck = $conn->query("SHOW TABLES LIKE 'users'");
    if ($tableCheck->num_rows === 0) {
        error_log("Users table does not exist");
        http_response_code(500);
        echo json_encode(['error' => 'Database configuration error']);
        exit();
    }
    
    // Check if user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    if (!$stmt) {
        error_log("SQL preparation error: " . $conn->error);
        http_response_code(500);
        echo json_encode(['error' => 'Database query error']);
        exit();
    }
    
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password']);
        exit();
    }
    
    $user = $result->fetch_assoc();
    
    // Verify password
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password']);
        exit();
    }
    
    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['first_name'] = $user['first_name'];
    $_SESSION['last_name'] = $user['last_name'];
    
    // Prepare user data for response (excluding sensitive information)
    $userData = [
        'id' => $user['id'],
        'email' => $user['email'],
        'first_name' => $user['first_name'],
        'last_name' => $user['last_name'],
        'phone' => $user['phone'] ?? null,
        'created_at' => $user['created_at']
    ];
    
    // Set remember me cookie if requested
    if (isset($data['rememberMe']) && $data['rememberMe'] === true) {
        $token = bin2hex(random_bytes(32));
        $expiry = time() + (30 * 24 * 60 * 60); // 30 days
        
        // Check if remember_token column exists
        $columnCheck = $conn->query("SHOW COLUMNS FROM users LIKE 'remember_token'");
        if ($columnCheck->num_rows === 0) {
            // Add remember_token and token_expiry columns if they don't exist
            $conn->query("ALTER TABLE users ADD COLUMN remember_token VARCHAR(64) NULL, ADD COLUMN token_expiry INT NULL");
        }
        
        // Store token in database
        $updateStmt = $conn->prepare("UPDATE users SET remember_token = ?, token_expiry = ? WHERE id = ?");
        if (!$updateStmt) {
            error_log("SQL preparation error for update: " . $conn->error);
        } else {
            $updateStmt->bind_param("sii", $token, $expiry, $user['id']);
            $updateStmt->execute();
        }
        
        // Set cookie
        setcookie('remember_token', $token, $expiry, '/', '', true, true);
    }
    
    // Return success response with user data
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => $userData
    ]);
    
} catch (Exception $e) {
    // Log the error (but don't expose it to the client)
    error_log("Login error: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred during login. Please try again.']);
}

// End output buffering and flush
ob_end_flush();
?> 