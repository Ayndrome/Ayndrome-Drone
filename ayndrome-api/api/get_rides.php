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

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Not logged in'
    ]);
    exit();
}

try {
    // Check if database connection is valid
    if (!$conn || $conn->connect_error) {
        error_log("Database connection error: " . ($conn ? $conn->connect_error : "Connection is null"));
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database connection error'
        ]);
        exit();
    }
    
    // Check if rides table exists
    $tableCheck = $conn->query("SHOW TABLES LIKE 'rides'");
    if ($tableCheck->num_rows === 0) {
        // Create rides table if it doesn't exist
        $createTable = "CREATE TABLE IF NOT EXISTS rides (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            user_id INT(11) NOT NULL,
            pickup_location VARCHAR(255) NOT NULL,
            dropoff_location VARCHAR(255) NOT NULL,
            pickup_time DATETIME NOT NULL,
            status ENUM('pending', 'accepted', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )";
        
        if ($conn->query($createTable) !== TRUE) {
            error_log("Error creating rides table: " . $conn->error);
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Database configuration error'
            ]);
            exit();
        }
        
        // Return empty rides array since the table was just created
        echo json_encode([
            'success' => true,
            'rides' => []
        ]);
        exit();
    }
    
    // Get user's rides
    $stmt = $conn->prepare("SELECT * FROM rides WHERE user_id = ? ORDER BY created_at DESC");
    if (!$stmt) {
        error_log("SQL preparation error: " . $conn->error);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database query error'
        ]);
        exit();
    }
    
    $userId = $_SESSION['user_id'];
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $rides = [];
    while ($row = $result->fetch_assoc()) {
        $rides[] = $row;
    }
    
    echo json_encode([
        'success' => true,
        'rides' => $rides
    ]);
    
} catch (Exception $e) {
    // Log the error (but don't expose it to the client)
    error_log("Error fetching rides: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred while fetching rides. Please try again.'
    ]);
}

// End output buffering and flush
ob_end_flush();
?> 