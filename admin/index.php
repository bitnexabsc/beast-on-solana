<?php
session_start();
require_once '../db/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    if ($user === ADMIN_USER && $pass === ADMIN_PASS) {
        $_SESSION['admin_logged'] = true;
        $_SESSION['admin_user'] = $user;
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Invalid credentials';
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin Login | $BEASTSOL</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <style>
    body { background: radial-gradient(circle at top, #ff0080 0%, #35006d 45%, #0c001f 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .login-card { background: rgba(20,16,30,0.85); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); border-radius: 1rem; max-width: 400px; width: 100%; }
    .form-control { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; }
    .form-control:focus { border-color: #ff0080; box-shadow: 0 0 0 0.2rem rgba(255,0,128,0.25); color: #fff; }
    .form-control::placeholder { color: rgba(255,255,255,0.4); }
    .btn-pink { background: #ff0080; border: none; color: #fff; font-weight: 600; }
    .btn-pink:hover { background: #db0070; color: #fff; }
    label { color: rgba(240,232,255,0.8); }
  </style>
</head>
<body>
  <div class="login-card p-4 p-md-5 mx-3">
    <div class="text-center mb-4">
      <h2 class="fw-bold text-white" style="font-family:'Orbitron',sans-serif;">Admin</h2>
      <p class="text-muted small mb-0">$BEASTSOL Management Panel</p>
    </div>
    <?php if (!empty($error)): ?>
      <div class="alert alert-danger py-2 small"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="POST">
      <div class="mb-3">
        <label class="form-label small fw-semibold">Username</label>
        <input type="text" name="username" class="form-control" required autofocus>
      </div>
      <div class="mb-4">
        <label class="form-label small fw-semibold">Password</label>
        <input type="password" name="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-pink w-100 py-2">Login</button>
    </form>
  </div>
</body>
</html>
