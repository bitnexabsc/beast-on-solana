<?php
require_once __DIR__ . '/../db/config.php';
ensureTables();
$conn = getDB();

if (!$conn) {
    echo json_encode(['communityFund' => 50000000, 'distributed' => 0, 'distributions' => []]);
    exit;
}

$distributions = [];
$total = 0;
$result = $conn->query("SELECT id, date, wallet, amount, tier, bonus, tx_hash, solscan_url FROM reward_distributions ORDER BY date ASC");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $distributions[] = $row;
        $total += intval($row['amount']) + intval($row['bonus'] ?? 0);
    }
}

    echo json_encode(['communityFund' => 50000000, 'distributed' => $total, 'distributions' => $distributions]);
