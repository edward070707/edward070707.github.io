<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = 'info@edwardattuati.com';
    $subject = 'New Message from ' . $name;
    $body = "Name: $name\nEmail: $email\n\n$message";
    
    // Send email
    if (mail($to, $subject, $body)) {
        echo 'Message sent successfully!';
    } else {
        echo 'Message could not be sent. Please try again later.';
    }
}
?>
