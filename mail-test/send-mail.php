<?php
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'muhammadawais1212004@gmail.com';
    $mail->Password   = 'acmbqbxgkvjeobhn';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Send notification to admin
    $mail->setFrom('muhammadawais1212004@gmail.com', 'ChatPlug AI');
    $mail->addAddress('muhammadawais1212004@gmail.com');
    $mail->addReplyTo($email, $name);
    $mail->Subject = "New message from $name";
    $mail->Body    = "Name: $name\nEmail: $email\nMessage: $message";
    $mail->send();

    // Send confirmation to user
    $mail->clearAddresses();
    $mail->clearReplyTos();
    $mail->addAddress($email, $name);
    $mail->Subject = "Thank you for contacting ChatPlug AI";
    $mail->Body    = "Hello $name,\n\nThank you for reaching out to ChatPlug AI!\n\nWe have received your message and will get back to you as soon as possible.\n\nYour message:\n$message\n\nBest regards,\nChatPlug AI Team";
    $mail->send();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $mail->ErrorInfo]);
}