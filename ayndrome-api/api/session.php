<?php
session_start();

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function getUserData() {
    if (isLoggedIn()) {
        return $_SESSION['user_data'];
    }
    return null;
}

function setUserSession($userData) {
    $_SESSION['user_id'] = $userData['id'];
    $_SESSION['user_data'] = $userData;
}

function logout() {
    session_unset();
    session_destroy();
}
?> 