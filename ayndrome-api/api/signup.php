<?php
// Start output buffering to prevent any output before headers
ob_start();

// Set CORS headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
require_once 'db_connect.php';

// Start session
session_start();

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate input
if (!isset($data['firstName']) || !isset($data['lastName']) || !isset($data['email']) || !isset($data['phone']) || !isset($data['password'])) {
    echo json_encode([
        'success' => false,
        'error' => 'All fields are required'
    ]);
    exit;
}

$firstName = $data['firstName'];
$lastName = $data['lastName'];
$email = $data['email'];
$phone = $data['phone'];
$password = $data['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email format'
    ]);
    exit;
}

// Validate password length
if (strlen($password) < 6) {
    echo json_encode([
        'success' => false,
        'error' => 'Password must be at least 6 characters long'
    ]);
    exit;
}

try {
    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode([
            'success' => false,
            'error' => 'Email already registered'
        ]);
        exit;
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstName, $lastName, $email, $phone, $hashedPassword);
    $stmt->execute();
    
    // Get the new user ID
    $userId = $conn->insert_id;
    
    // Set session variables
    $_SESSION['user_id'] = $userId;
    
    // Get user data for response
    $stmt = $conn->prepare("SELECT id, first_name, last_name, email, phone FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    // Set cookie for remember me
    if (isset($data['rememberMe']) && $data['rememberMe']) {
        setcookie('remember_token', $userId, time() + (86400 * 30), '/', '', true, true);
    }
    
    // Set response headers
    header('Content-Type: application/json');
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => $user
    ]);
} catch (Exception $e) {
    // Set response headers
    header('Content-Type: application/json');
    
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
}

$stmt->close();
$conn->close();
?> 