<?php
// Include CORS configuration
require_once 'cors.php';

// Start session
session_start();

// Clear session
session_destroy();

// Clear remember me cookie if it exists
if (isset($_COOKIE['remember_token'])) {
    setcookie('remember_token', '', time() - 3600, '/', '', true, true);
}

echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);
?> 