<?php
// Start output buffering to prevent any output before headers
ob_start();

// Include CORS configuration
require_once 'cors.php';

// Include database connection
require_once 'db_connect.php';

// Set content type to JSON
header('Content-Type: application/json');

// Start session
session_start();

// Check if user is logged in via session
if (isset($_SESSION['user_id'])) {
    try {
        // Get user data
        $stmt = $conn->prepare("SELECT id, first_name, last_name, email, phone FROM users WHERE id = ?");
        $stmt->bind_param("i", $_SESSION['user_id']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            echo json_encode([
                'success' => true,
                'loggedIn' => true,
                'user' => $user
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'loggedIn' => false,
                'error' => 'User not found'
            ]);
        }
    } catch (Exception $e) {
        error_log("Session check error: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'loggedIn' => false,
            'error' => 'Database error occurred'
        ]);
    }
} 
// Check if user is logged in via remember me cookie
else if (isset($_COOKIE['remember_token'])) {
    try {
        $token = $_COOKIE['remember_token'];
        
        // Get user data by token
        $stmt = $conn->prepare("SELECT id, first_name, last_name, email, phone FROM users WHERE remember_token = ? AND token_expiry > ?");
        $currentTime = time();
        $stmt->bind_param("si", $token, $currentTime);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['first_name'] = $user['first_name'];
            $_SESSION['last_name'] = $user['last_name'];
            
            echo json_encode([
                'success' => true,
                'loggedIn' => true,
                'user' => $user
            ]);
        } else {
            // Invalid or expired remember token, remove cookie
            setcookie('remember_token', '', time() - 3600, '/', '', true, true);
            
            echo json_encode([
                'success' => false,
                'loggedIn' => false,
                'error' => 'Invalid or expired remember token'
            ]);
        }
    } catch (Exception $e) {
        error_log("Remember token check error: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'loggedIn' => false,
            'error' => 'Database error occurred'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'loggedIn' => false,
        'error' => 'Not logged in'
    ]);
}

// End output buffering and flush
ob_end_flush();
?> 