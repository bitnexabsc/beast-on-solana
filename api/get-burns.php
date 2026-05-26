<?php
require_once __DIR__ . '/../db/config.php';
ensureTables();
$conn = getDB();

if (!$conn) {
    echo json_encode(['devInitial' => 100000000, 'burnPerMilestone' => 2500000, 'milestoneInterval' => 50000, 'burns' => []]);
    exit;
}

$burns = [];
$result = $conn->query("SELECT id, date, milestone, amount, dev_remaining, tx_hash, solscan_url FROM burns ORDER BY date ASC");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $burns[] = $row;
    }
}

echo json_encode(['devInitial' => 152081514, 'burnPerMilestone' => 7604076, 'milestoneInterval' => 100000, 'burns' => $burns]);
