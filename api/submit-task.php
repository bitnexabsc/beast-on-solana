<?php
require_once __DIR__ . '/../db/config.php';
ensureTables();
$conn = getDB();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Server error.']);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$maxPerIP = 3;

$stmt = $conn->prepare("SELECT COUNT(*) as c FROM task_submissions WHERE ip = ?");
$stmt->bind_param('s', $ip);
$stmt->execute();
if ($stmt->get_result()->fetch_assoc()['c'] >= $maxPerIP) {
    echo json_encode(['success' => false, 'message' => 'Maximum submissions reached for your IP.']);
    exit;
}

$tier = trim($_POST['tier'] ?? '');
$xHandle = trim($_POST['x_handle'] ?? '');
$wallet = trim($_POST['wallet'] ?? '');
$links = trim($_POST['links'] ?? '');
$articles = trim($_POST['article_links'] ?? '');

if (!$tier || !$xHandle || !$wallet || !$links) {
    echo json_encode(['success' => false, 'message' => 'All required fields must be filled.']);
    exit;
}

if (!preg_match('/^[1-9A-HJ-NP-Za-km-z]{32,44}$/', $wallet)) {
    echo json_encode(['success' => false, 'message' => 'Invalid Solana wallet address format.']);
    exit;
}

$timestamp = date('Y-m-d H:i:s');
$stmt = $conn->prepare("INSERT INTO task_submissions (timestamp, ip, tier, x_handle, wallet, links, articles, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')");
$stmt->bind_param('sssssss', $timestamp, $ip, $tier, $xHandle, $wallet, $links, $articles);
$stmt->execute();

echo json_encode(['success' => true, 'message' => 'Submission received! Our team reviews within 24-48 hours.']);
