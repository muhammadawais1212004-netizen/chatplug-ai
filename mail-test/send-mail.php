<?php
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);
$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');

$apiKey = getenv('BREVO_API_KEY');

function sendBrevoEmail($apiKey, $toEmail, $toName, $subject, $body) {
    $data = [
        "sender" => ["name" => "ChatPlug AI", "email" => "muhammadawais1212004@gmail.com"],
        "to" => [["email" => $toEmail, "name" => $toName]],
        "subject" => $subject,
        "textContent" => $body
    ];

    $ch = curl_init('https://api.brevo.com/v3/smtp/email');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Accept: application/json",
        "Content-Type: application/json",
        "api-key: $apiKey"
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $httpCode >= 200 && $httpCode < 300;
}

try {
    $adminSent = sendBrevoEmail(
        $apiKey,
        'muhammadawais1212004@gmail.com',
        'ChatPlug AI',
        "New message from $name",
        "Name: $name\nEmail: $email\nMessage: $message"
    );

    $userSent = sendBrevoEmail(
        $apiKey,
        $email,
        $name,
        "Thank you for contacting ChatPlug AI",
        "Hello $name,\n\nThank you for reaching out to ChatPlug AI!\n\nWe have received your message and will get back to you as soon as possible.\n\nYour message:\n$message\n\nBest regards,\nChatPlug AI Team"
    );

    if ($adminSent && $userSent) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send one or more emails.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
