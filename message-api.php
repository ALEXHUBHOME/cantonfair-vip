<?php
// 客户留言API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['name'] ?? '');
$contact = trim($data['contact'] ?? '');
$message = trim($data['message'] ?? '');
$timestamp = date('Y-m-d H:i:s');

// 验证必填
if (!$contact) {
    echo json_encode(['success' => false, 'message' => '请填写联系方式']);
    exit;
}

if (!$message) {
    echo json_encode(['success' => false, 'message' => '请填写留言内容']);
    exit;
}

// 记录到文件
$log = "[$timestamp] 姓名: $name, 联系方式: $contact, 内容: $message\n";
file_put_contents('/var/www/html/messages.txt', $log, FILE_APPEND);

// 发送邮件通知
$to = '1455933248@qq.com';
$subject = '【新留言】广交会VIP服务网站';
$body = "来自网站的留言：\n\n姓名: $name\n联系方式: $contact\n留言: $message\n时间: $timestamp";
$headers = 'From: service@cantonfairassist.online';
@mail($to, $subject, $body, $headers);

echo json_encode(['success' => true, 'message' => '留言成功！我们会尽快联系您！']);
