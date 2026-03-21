<?php
// 客户联系方式收集API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? '';
$contact = $data['contact'] ?? '';
$question = $data['question'] ?? '';
$timestamp = date('Y-m-d H:i:s');

if ($name || $contact) {
    $log = "[$timestamp] 姓名: $name, 联系方式: $contact, 问题: $question\n";
    file_put_contents('/var/www/html/leads.txt', $log, FILE_APPEND);
    
    // 发送邮件通知
    $to = '1455933248@qq.com';
    $subject = '广交会VIP新客户留言';
    $message = "新客户留言：\n姓名: $name\n联系方式: $contact\n问题: $question";
    $headers = 'From: service@cantonfairassist.online';
    @mail($to, $subject, $message, $headers);
    
    echo json_encode(['success' => true, 'message' => '收到，我们会尽快联系您！']);
} else {
    echo json_encode(['success' => false, 'message' => '请提供联系方式']);
}
