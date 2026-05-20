<?php
// Get the origin from the request
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// List of allowed origins
$allowed_origins = [
    'http://localhost:5173',  // Vite dev server
    'http://localhost:3000',  // React dev server
    'http://localhost',       // Local development
    'http://localhost:80',    // Apache default
    'http://127.0.0.1:5173', // Vite dev server alternative
    'http://127.0.0.1:3000', // React dev server alternative
    'http://127.0.0.1',      // Local development alternative
    'http://127.0.0.1:80'    // Apache default alternative
];

// Check if the origin is allowed
if (in_array($origin, $allowed_origins)) {
    // Set specific origin instead of wildcard
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?> 