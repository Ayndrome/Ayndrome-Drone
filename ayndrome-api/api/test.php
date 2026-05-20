<?php
// Start output buffering to prevent any output before headers
ob_start();

// Include CORS configuration
require_once 'cors.php';

// Set content type to JSON
header('Content-Type: application/json');

// Return a simple success response
echo json_encode([
    'success' => true,
    'message' => 'API is working correctly',
    'timestamp' => time(),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
    'php_version' => PHP_VERSION
]);

// End output buffering and flush
ob_end_flush();
?> 