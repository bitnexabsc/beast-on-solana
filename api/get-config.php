<?php
require_once __DIR__ . '/../db/config.php';
ensureTables();
$conn = getDB();

if (!$conn) {
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

$result = $conn->query("SELECT contract_address, token_name, ticker, telegram, twitter, holders, market_cap FROM site_config WHERE id=1");
if ($result && $row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    echo json_encode(['contract_address' => 'TBA AT LAUNCH', 'token_name' => 'Beast on Solana', 'ticker' => '$BEASTSOL', 'telegram' => 'beastonsolana', 'twitter' => 'BeastOnSolfx', 'holders' => null, 'market_cap' => null]);
}
