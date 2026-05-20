<?php
// Start output buffering to prevent any output before headers
ob_start();

// Get the origin from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// List of allowed origins
$allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
];

// Check if the origin is allowed
if (in_array($origin, $allowedOrigins)) {
    // Set CORS headers
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
}

// Set response headers
header('Content-Type: application/json');

// Return 200 OK for preflight requests
http_response_code(200);
echo json_encode(['status' => 'ok']);
?> 