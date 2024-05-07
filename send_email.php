<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $to = "info@edwardattuati.com";
    $subject = "Nuovo messaggio da $name";
    $body = "From: $name\nEmail: $email\n\n$message";

  /*if (mail($to, $subject, $body)) {
        echo "Messaggio inviato con successo!";
    } else {
        echo "Errore nell'invio del messaggio. Riprova più tardi.";
    } */
}
?>
