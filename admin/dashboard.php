<?php
session_start();
require_once '../db/config.php';

if (!isset($_SESSION['admin_logged'])) {
    header('Location: index.php');
    exit;
}

ensureTables();
$conn = getDB();
if (!$conn) {
    die('Database connection failed. Check db/config.php credentials.');
}

// Handle POST actions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action === 'update_config') {
        $stmt = $conn->prepare("UPDATE site_config SET contract_address=?, token_name=?, ticker=?, telegram=?, twitter=?, holders=?, market_cap=? WHERE id=1");
        $stmt->bind_param('sssssss', $_POST['contract_address'], $_POST['token_name'], $_POST['ticker'], $_POST['telegram'], $_POST['twitter'], $_POST['holders'], $_POST['market_cap']);
        $stmt->execute();
        $msg = 'Site config updated!';
    }

    if ($action === 'update_submission') {
        $stmt = $conn->prepare("UPDATE task_submissions SET status=?, admin_notes=?, reward_tx=? WHERE id=?");
        $stmt->bind_param('sssi', $_POST['status'], $_POST['admin_notes'], $_POST['reward_tx'], $_POST['submission_id']);
        $stmt->execute();
        $msg = 'Submission updated!';
    }

    if ($action === 'add_burn') {
        $count = $conn->query("SELECT COUNT(*) as c FROM burns")->fetch_assoc()['c'];
        $milestone = ($count + 1) * 50000;
        $amount = 2500000;
        $remaining = 100000000 - (($count + 1) * $amount);
        $txHash = trim($_POST['tx_hash']);
        $solscan = "https://solscan.io/tx/$txHash";
        $date = date('Y-m-d');
        $stmt = $conn->prepare("INSERT INTO burns (date, milestone, amount, dev_remaining, tx_hash, solscan_url) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('siisss', $date, $milestone, $amount, $remaining, $txHash, $solscan);
        $stmt->execute();
        $msg = "Burn #" . ($count + 1) . " recorded! $amount tokens burned.";
    }

    if ($action === 'add_reward') {
        $date = date('Y-m-d');
        $bonus = intval($_POST['bonus'] ?? 0);
        $subId = !empty($_POST['submission_id']) ? intval($_POST['submission_id']) : null;
        $solscan = "https://solscan.io/tx/" . $_POST['tx_hash'];
        $stmt = $conn->prepare("INSERT INTO reward_distributions (date, wallet, amount, tier, bonus, tx_hash, solscan_url, submission_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('sssisssi', $date, $_POST['wallet'], $_POST['amount'], $_POST['tier'], $bonus, $_POST['tx_hash'], $solscan, $subId);
        $stmt->execute();
        $msg = 'Reward distribution recorded!';
    }

    if ($action === 'delete_submission') {
        $stmt = $conn->prepare("DELETE FROM task_submissions WHERE id=?");
        $stmt->bind_param('i', $_POST['submission_id']);
        $stmt->execute();
        $msg = 'Submission deleted.';
    }

    header('Location: dashboard.php?msg=' . urlencode($msg));
    exit;
}

// Fetch data
$config = $conn->query("SELECT * FROM site_config WHERE id=1")->fetch_assoc();
$submissions = $conn->query("SELECT * FROM task_submissions ORDER BY timestamp DESC");
$burns = $conn->query("SELECT * FROM burns ORDER BY date DESC");
$rewards = $conn->query("SELECT * FROM reward_distributions ORDER BY date DESC");

$subCount = $conn->query("SELECT COUNT(*) as c FROM task_submissions")->fetch_assoc()['c'];
$pendingCount = $conn->query("SELECT COUNT(*) as c FROM task_submissions WHERE status='pending'")->fetch_assoc()['c'];
$approvedCount = $conn->query("SELECT COUNT(*) as c FROM task_submissions WHERE status='approved'")->fetch_assoc()['c'];
$burnCount = $conn->query("SELECT COUNT(*) as c FROM burns")->fetch_assoc()['c'];
$rewardCount = $conn->query("SELECT COUNT(*) as c FROM reward_distributions")->fetch_assoc()['c'];

$totalBurned = 0;
$r = $conn->query("SELECT SUM(amount) as total FROM burns")->fetch_assoc();
if ($r['total']) $totalBurned = intval($r['total']);

$totalDistributed = 0;
$r = $conn->query("SELECT SUM(amount + COALESCE(bonus,0)) as total FROM reward_distributions")->fetch_assoc();
if ($r['total']) $totalDistributed = intval($r['total']);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Dashboard | $BEASTSOL</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    body { background: #0c001f; color: #f0e8ff; font-family: 'Inter', sans-serif; }
    .sidebar { background: rgba(20,16,30,0.95); border-right: 1px solid rgba(255,255,255,0.1); min-height: 100vh; position: fixed; width: 240px; }
    .sidebar a { color: rgba(240,232,255,0.7); text-decoration: none; display: block; padding: 0.75rem 1.25rem; border-left: 3px solid transparent; transition: all 0.2s; }
    .sidebar a:hover, .sidebar a.active { background: rgba(255,0,128,0.1); border-left-color: #ff0080; color: #ff0080; }
    .sidebar .brand { font-family: 'Orbitron', sans-serif; font-weight: 700; color: #fff; padding: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .main { margin-left: 240px; padding: 2rem; }
    .stat-card { background: rgba(20,16,30,0.65); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 1.25rem; }
    .stat-card .num { font-family: 'Orbitron', sans-serif; font-size: 1.75rem; font-weight: 700; color: #ff0080; }
    .stat-card .label { font-size: 0.75rem; color: rgba(240,232,255,0.5); text-transform: uppercase; letter-spacing: 0.05em; }
    .table-dark-custom { background: transparent; }
    .table-dark-custom thead th { background: rgba(255,0,128,0.15); color: #ff0080; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.75rem 1rem; }
    .table-dark-custom tbody td { border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(240,232,255,0.7); padding: 0.75rem 1rem; font-size: 0.85rem; vertical-align: middle; }
    .form-control, .form-select, textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; }
    .form-control:focus, .form-select:focus, textarea:focus { border-color: #ff0080; box-shadow: 0 0 0 0.2rem rgba(255,0,128,0.25); color: #fff; }
    .form-control::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
    .form-select option { background: #1a1028; color: #fff; }
    .btn-pink { background: #ff0080; border: none; color: #fff; font-weight: 600; }
    .btn-pink:hover { background: #db0070; color: #fff; }
    .badge-pending { background: rgba(255,193,7,0.2); color: #ffc107; border: 1px solid rgba(255,193,7,0.4); }
    .badge-approved { background: rgba(40,167,69,0.2); color: #28a745; border: 1px solid rgba(40,167,69,0.4); }
    .badge-rejected { background: rgba(220,53,69,0.2); color: #dc3545; border: 1px solid rgba(220,53,69,0.4); }
    .section { display: none; }
    .section.active { display: block; }
    label { color: rgba(240,232,255,0.8); font-size: 0.85rem; font-weight: 600; }
    .card-glass { background: rgba(20,16,30,0.65); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; }
    @media (max-width: 768px) {
      .sidebar { width: 100%; min-height: auto; position: relative; }
      .main { margin-left: 0; }
      .sidebar .nav { display: flex; overflow-x: auto; }
      .sidebar a { white-space: nowrap; border-left: none; border-bottom: 3px solid transparent; }
      .sidebar a:hover, .sidebar a.active { border-left: none; border-bottom-color: #ff0080; }
    }
  </style>
</head>
<body>

<div class="sidebar">
  <div class="brand">$BEASTSOL Admin</div>
  <nav class="nav flex-column">
    <a href="#" class="active" onclick="showSection('overview', this)"><i class="bi bi-grid-1x2 me-2"></i>Overview</a>
    <a href="#" onclick="showSection('config', this)"><i class="bi bi-gear me-2"></i>Site Config</a>
    <a href="#" onclick="showSection('submissions', this)"><i class="bi bi-inbox me-2"></i>Submissions <span class="badge bg-warning ms-1"><?= $pendingCount ?></span></a>
    <a href="#" onclick="showSection('burns', this)"><i class="bi bi-fire me-2"></i>Burns</a>
    <a href="#" onclick="showSection('rewards', this)"><i class="bi bi-trophy me-2"></i>Rewards</a>
    <a href="../" target="_blank"><i class="bi bi-box-arrow-up-right me-2"></i>View Site</a>
    <a href="logout.php"><i class="bi bi-box-arrow-left me-2"></i>Logout</a>
  </nav>
</div>

<div class="main">
  <?php if (isset($_GET['msg'])): ?>
    <div class="alert alert-success alert-dismissible py-2"><i class="bi bi-check-circle me-1"></i><?= htmlspecialchars($_GET['msg']) ?><button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
  <?php endif; ?>

  <div id="section-overview" class="section active">
    <h2 class="h4 fw-bold text-white mb-4">Dashboard Overview</h2>
    <div class="row g-3 mb-4">
      <div class="col-6 col-lg-3">
        <div class="stat-card"><div class="num"><?= $subCount ?></div><div class="label">Total Submissions</div></div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card"><div class="num" style="color:#ffc107;"><?= $pendingCount ?></div><div class="label">Pending Review</div></div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card"><div class="num"><?= $burnCount ?></div><div class="label">Burns Completed</div></div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card"><div class="num"><?= $rewardCount ?></div><div class="label">Rewards Sent</div></div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card"><div class="num"><?= number_format($totalBurned) ?></div><div class="label">Total Tokens Burned</div></div>
      </div>
      <div class="col-6 col-lg-3">
        <div class="stat-card"><div class="num"><?= number_format($totalDistributed) ?></div><div class="label">Total Distributed</div></div>
      </div>
    </div>

    <div class="card-glass p-4">
      <h5 class="text-white mb-3"><i class="bi bi-clock-history text-pink me-2"></i>Recent Submissions</h5>
      <?php if ($submissions->num_rows === 0): ?>
        <p class="text-muted">No submissions yet.</p>
      <?php else: ?>
        <div class="table-responsive">
          <table class="table table-dark-custom mb-0">
            <thead><tr><th>Date</th><th>Tier</th><th>X Handle</th><th>Wallet</th><th>Status</th></tr></thead>
            <tbody>
              <?php $i = 0; while ($s = $submissions->fetch_assoc()): if ($i++ >= 5) break; ?>
              <tr>
                <td><?= htmlspecialchars($s['timestamp']) ?></td>
                <td><?= htmlspecialchars($s['tier']) ?></td>
                <td>@<?= htmlspecialchars($s['x_handle']) ?></td>
                <td><code><?= htmlspecialchars(substr($s['wallet'], 0, 8)) ?>...</code></td>
                <td><span class="badge badge-<?= $s['status'] ?>"><?= ucfirst($s['status']) ?></span></td>
              </tr>
              <?php endwhile; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>
    </div>
  </div>

  <div id="section-config" class="section">
    <h2 class="h4 fw-bold text-white mb-4">Site Configuration</h2>
    <div class="card-glass p-4">
      <form method="POST">
        <input type="hidden" name="action" value="update_config">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Contract Address</label>
            <input type="text" name="contract_address" class="form-control" value="<?= htmlspecialchars($config['contract_address']) ?>" placeholder="TBA AT LAUNCH">
          </div>
          <div class="col-md-3">
            <label class="form-label">Token Name</label>
            <input type="text" name="token_name" class="form-control" value="<?= htmlspecialchars($config['token_name']) ?>">
          </div>
          <div class="col-md-3">
            <label class="form-label">Ticker</label>
            <input type="text" name="ticker" class="form-control" value="<?= htmlspecialchars($config['ticker']) ?>">
          </div>
          <div class="col-md-4">
            <label class="form-label">Telegram Handle</label>
            <input type="text" name="telegram" class="form-control" value="<?= htmlspecialchars($config['telegram']) ?>">
          </div>
          <div class="col-md-4">
            <label class="form-label">Twitter Handle</label>
            <input type="text" name="twitter" class="form-control" value="<?= htmlspecialchars($config['twitter']) ?>">
          </div>
          <div class="col-md-4">
            <label class="form-label">Holders Count</label>
            <input type="text" name="holders" class="form-control" value="<?= htmlspecialchars($config['holders'] ?? '') ?>" placeholder="e.g. 1.2K">
          </div>
          <div class="col-md-4">
            <label class="form-label">Market Cap</label>
            <input type="text" name="market_cap" class="form-control" value="<?= htmlspecialchars($config['market_cap'] ?? '') ?>" placeholder="e.g. $50K">
          </div>
        </div>
        <button type="submit" class="btn btn-pink mt-3"><i class="bi bi-save me-1"></i>Save Config</button>
      </form>
    </div>
  </div>

  <div id="section-submissions" class="section">
    <h2 class="h4 fw-bold text-white mb-4">Task Submissions</h2>
    <div class="card-glass p-4">
      <?php if ($submissions->num_rows === 0): ?>
        <p class="text-muted text-center py-4">No submissions yet.</p>
      <?php else: ?>
        <div class="table-responsive">
          <table class="table table-dark-custom mb-0">
            <thead><tr><th>#</th><th>Date</th><th>Tier</th><th>X Handle</th><th>Wallet</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <?php $submissions->data_seek(0); while ($s = $submissions->fetch_assoc()): ?>
              <tr>
                <td class="text-pink fw-bold"><?= $s['id'] ?></td>
                <td><?= htmlspecialchars($s['timestamp']) ?></td>
                <td><?= htmlspecialchars($s['tier']) ?></td>
                <td>@<?= htmlspecialchars($s['x_handle']) ?></td>
                <td><code class="small"><?= htmlspecialchars(substr($s['wallet'], 0, 6)) ?>...<?= htmlspecialchars(substr($s['wallet'], -4)) ?></code></td>
                <td><span class="badge badge-<?= $s['status'] ?>"><?= ucfirst($s['status']) ?></span></td>
                <td>
                  <button class="btn btn-sm btn-outline-light py-0 px-2" onclick="editSubmission(<?= $s['id'] ?>, '<?= htmlspecialchars($s['status']) ?>', '<?= htmlspecialchars($s['admin_notes'] ?? '') ?>', '<?= htmlspecialchars($s['reward_tx'] ?? '') ?>')">Edit</button>
                  <form method="POST" class="d-inline" onsubmit="return confirm('Delete?')">
                    <input type="hidden" name="action" value="delete_submission">
                    <input type="hidden" name="submission_id" value="<?= $s['id'] ?>">
                    <button class="btn btn-sm btn-outline-danger py-0 px-2"><i class="bi bi-trash"></i></button>
                  </form>
                </td>
              </tr>
              <?php endwhile; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>
    </div>

    <div class="modal fade" id="editModal" tabindex="-1">
      <div class="modal-dialog">
        <form method="POST" class="modal-content" style="background:#1a1028; border:1px solid rgba(255,255,255,0.1);">
          <div class="modal-header border-bottom border-secondary">
            <h5 class="modal-title text-white">Edit Submission</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" name="action" value="update_submission">
            <input type="hidden" name="submission_id" id="edit-id">
            <div class="mb-3">
              <label class="form-label">Status</label>
              <select name="status" id="edit-status" class="form-select">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Reward TX Hash</label>
              <input type="text" name="reward_tx" id="edit-reward-tx" class="form-control" placeholder="Solscan TX hash">
            </div>
            <div class="mb-3">
              <label class="form-label">Admin Notes</label>
              <textarea name="admin_notes" id="edit-notes" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer border-top border-secondary">
            <button type="button" class="btn btn-outline-light btn-sm" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-pink btn-sm">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div id="section-burns" class="section">
    <h2 class="h4 fw-bold text-white mb-4">Burn Management</h2>
    <div class="card-glass p-4 mb-4">
      <h5 class="text-white mb-3"><i class="bi bi-plus-circle text-pink me-2"></i>Record New Burn</h5>
      <form method="POST">
        <input type="hidden" name="action" value="add_burn">
        <div class="row g-3 align-items-end">
          <div class="col-md-8">
            <label class="form-label">Solscan TX Hash</label>
            <input type="text" name="tx_hash" class="form-control" placeholder="Enter burn transaction hash" required>
          </div>
          <div class="col-md-4">
            <button type="submit" class="btn btn-pink w-100"><i class="bi bi-fire me-1"></i>Record Burn</button>
          </div>
        </div>
        <p class="text-muted small mt-2 mb-0">Next burn: $<?= number_format(($burnCount + 1) * 50000) ?> MC. Amount: 2,500,000 tokens (2.5%).</p>
      </form>
    </div>

    <div class="card-glass p-4">
      <h5 class="text-white mb-3"><i class="bi bi-clock-history text-pink me-2"></i>Burn History</h5>
      <?php if ($burns->num_rows === 0): ?>
        <p class="text-muted text-center py-3">No burns recorded yet.</p>
      <?php else: ?>
        <div class="table-responsive">
          <table class="table table-dark-custom mb-0">
            <thead><tr><th>#</th><th>Date</th><th>Milestone</th><th>Amount</th><th>Dev Remaining</th><th>TX</th></tr></thead>
            <tbody>
              <?php while ($b = $burns->fetch_assoc()): ?>
              <tr>
                <td class="text-pink fw-bold"><?= $b['id'] ?></td>
                <td><?= htmlspecialchars($b['date']) ?></td>
                <td>$<?= number_format($b['milestone']) ?></td>
                <td class="text-pink fw-bold"><?= number_format($b['amount']) ?></td>
                <td><?= number_format($b['dev_remaining']) ?></td>
                <td><a href="<?= htmlspecialchars($b['solscan_url']) ?>" target="_blank" class="text-pink small">View <i class="bi bi-box-arrow-up-right"></i></a></td>
              </tr>
              <?php endwhile; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>
    </div>
  </div>

  <div id="section-rewards" class="section">
    <h2 class="h4 fw-bold text-white mb-4">Reward Distributions</h2>
    <div class="card-glass p-4 mb-4">
      <h5 class="text-white mb-3"><i class="bi bi-plus-circle text-pink me-2"></i>Record New Distribution</h5>
      <form method="POST">
        <input type="hidden" name="action" value="add_reward">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Wallet Address</label>
            <input type="text" name="wallet" class="form-control" placeholder="Solana wallet" required>
          </div>
          <div class="col-md-2">
            <label class="form-label">Amount</label>
            <input type="number" name="amount" class="form-control" placeholder="20000" required>
          </div>
          <div class="col-md-2">
            <label class="form-label">Bonus</label>
            <input type="number" name="bonus" class="form-control" placeholder="0" value="0">
          </div>
          <div class="col-md-2">
            <label class="form-label">Tier</label>
            <select name="tier" class="form-select">
              <option value="verified">Verified X</option>
              <option value="unverified">Non-Verified</option>
              <option value="youtube">YouTube/Influencer</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">TX Hash</label>
            <input type="text" name="tx_hash" class="form-control" placeholder="Solscan TX" required>
          </div>
        </div>
        <button type="submit" class="btn btn-pink mt-3"><i class="bi bi-send me-1"></i>Record Distribution</button>
      </form>
    </div>

    <div class="card-glass p-4">
      <h5 class="text-white mb-3"><i class="bi bi-trophy text-pink me-2"></i>Distribution History</h5>
      <?php if ($rewards->num_rows === 0): ?>
        <p class="text-muted text-center py-3">No rewards distributed yet.</p>
      <?php else: ?>
        <div class="table-responsive">
          <table class="table table-dark-custom mb-0">
            <thead><tr><th>#</th><th>Date</th><th>Wallet</th><th>Amount</th><th>Tier</th><th>TX</th></tr></thead>
            <tbody>
              <?php while ($r = $rewards->fetch_assoc()): ?>
              <tr>
                <td class="text-pink fw-bold"><?= $r['id'] ?></td>
                <td><?= htmlspecialchars($r['date']) ?></td>
                <td><code class="small"><?= htmlspecialchars(substr($r['wallet'], 0, 6)) ?>...<?= htmlspecialchars(substr($r['wallet'], -4)) ?></code></td>
                <td class="text-pink fw-bold"><?= number_format($r['amount'] + ($r['bonus'] ?? 0)) ?></td>
                <td><span class="badge badge-approved"><?= htmlspecialchars($r['tier']) ?></span></td>
                <td><a href="<?= htmlspecialchars($r['solscan_url']) ?>" target="_blank" class="text-pink small">View <i class="bi bi-box-arrow-up-right"></i></a></td>
              </tr>
              <?php endwhile; ?>
            </tbody>
          </table>
        </div>
      <?php endif; ?>
    </div>
  </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
function showSection(name, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
}
function editSubmission(id, status, notes, rewardTx) {
  document.getElementById('edit-id').value = id;
  document.getElementById('edit-status').value = status;
  document.getElementById('edit-notes').value = notes;
  document.getElementById('edit-reward-tx').value = rewardTx;
  new bootstrap.Modal(document.getElementById('editModal')).show();
}
</script>
</body>
</html>
