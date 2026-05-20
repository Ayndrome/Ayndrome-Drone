<?php
// Remove CORS headers from here as they're handled by cors.php
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');
// header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'ayndrome';
$username = 'root';
$password = '';

// PDO Connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    error_log("PDO Connection failed: " . $e->getMessage());
    // Don't output error directly, let the calling script handle it
}

// mysqli Connection
try {
    $conn = new mysqli($host, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
        error_log("mysqli Connection failed: " . $conn->connect_error);
        // Don't output error directly, let the calling script handle it
    }
} catch(Exception $e) {
    error_log("mysqli Connection failed: " . $e->getMessage());
    // Don't output error directly, let the calling script handle it
}
?> 