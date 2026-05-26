# 🚀 PRODUCTION-READY IMPLEMENTATION PROMPT
## Pump.fun Memecoin Website — Full Community Reward System
### Based on: BeastOnSolana Design Reference (beastonsolana.page.gd)
### Version: 1.0 | May 2026

---

## 📋 PROJECT OVERVIEW

Build a **complete, production-ready static website** for a Pump.fun Solana memecoin
with a full community reward/task system, burn tracker, transparency log, and
whitepaper page. Deploy via cPanel File Manager to any shared hosting or InfinityFree.

**Design Reference:** The Beast on Solana website uses:
- Dark radial gradient background: `#ff0080 → #35006d → #0c001f`
- Glassmorphism cards: `rgba(20,16,30,0.62)` + `backdrop-filter:blur(6px)`
- Pink accent color: `#ff0080`
- Bootstrap 5 as CSS framework
- Sticky navbar, hero section with mascot, glass cards, roadmap grid, footer

**Your site replicates this aesthetic BUT adds the full community reward engine.**

---

## 🛠️ TECH STACK

```
Frontend:   HTML5 + Bootstrap 5.3 + Custom CSS (no build tools)
Backend:    PHP 8.1 (for form submission + task logging) — cPanel compatible
Database:   MySQL (via cPanel phpMyAdmin) OR flat JSON files
Fonts:      Google Fonts — "Orbitron" (headings) + "Inter" (body)
Icons:      Bootstrap Icons 1.11
Hosting:    cPanel shared hosting or InfinityFree (PHP+MySQL supported)
Deploy:     Upload ZIP via cPanel File Manager → Extract to public_html
```

---

## 📁 FILE STRUCTURE

```
public_html/
├── index.html                    ← Main landing page
├── whitepaper/
│   └── index.html                ← Whitepaper page
├── rewards/
│   └── index.html                ← Community rewards dashboard
├── burns/
│   └── index.html                ← Public burn tracker & log
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css     ← Bootstrap 5.3
│   │   └── style.css             ← Custom styles
│   ├── js/
│   │   ├── bootstrap.bundle.min.js
│   │   └── app.js                ← Custom JS (counters, animations)
│   └── img/
│       ├── mascot.png            ← Token mascot image
│       ├── banner.png            ← Hero banner
│       └── og-image.png          ← Social share image (1200×630)
├── api/
│   ├── submit-task.php           ← Handles task submission POST
│   ├── get-burns.php             ← Returns burn log JSON
│   └── get-rewards.php           ← Returns reward distribution log JSON
├── data/
│   ├── burns.json                ← Burn history log
│   └── rewards.json              ← Reward distribution history
├── 404.html
└── favicon.ico
```

---

## 🎨 DESIGN SYSTEM

### CSS Variables (put in :root in style.css)

```css
:root {
  /* Brand Colors */
  --pink:         #ff0080;
  --pink-dark:    #db0070;
  --pink-glow:    rgba(255, 0, 128, 0.35);
  --purple-deep:  #35006d;
  --purple-mid:   #560bad;
  --dark-base:    #0c001f;
  --dark-card:    rgba(20, 16, 30, 0.65);

  /* Background */
  --bg-gradient: radial-gradient(circle at top,
    #ff0080 0%, #35006d 45%, #0c001f 100%);

  /* Glass Card */
  --glass-bg:     rgba(20, 16, 30, 0.65);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-blur:   blur(8px);

  /* Text */
  --text-light:   #f0e8ff;
  --text-muted:   rgba(240, 232, 255, 0.65);

  /* Glow */
  --glow-pink: 0 0 24px rgba(255, 0, 128, 0.45),
               0 0 60px rgba(255, 0, 128, 0.15);
}

/* Background */
body {
  background: var(--bg-gradient);
  background-attachment: fixed;
  font-family: 'Inter', sans-serif;
  color: var(--text-light);
  min-height: 100vh;
}

/* Glass Card */
.card-glass {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-radius: 1rem;
}

/* Glow Text */
.text-glow {
  text-shadow: var(--glow-pink);
  color: var(--pink);
}

/* Pink Button */
.btn-pink {
  background: var(--pink);
  border-color: var(--pink);
  color: #fff;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: var(--glow-pink);
}
.btn-pink:hover {
  background: var(--pink-dark);
  transform: translateY(-2px);
  box-shadow: 0 0 32px rgba(255,0,128,0.6);
}

/* Phase Box (roadmap) */
.phase-box {
  border: 1px solid var(--glass-border);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  background: rgba(255,255,255,0.03);
  transition: border-color 0.2s, background 0.2s;
}
.phase-box:hover {
  border-color: var(--pink);
  background: rgba(255,0,128,0.07);
}

/* Mascot */
.hero-mascot {
  max-height: 480px;
  filter: drop-shadow(0 12px 40px rgba(0,0,0,0.5));
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
}

/* Burn Progress Bar */
.burn-bar {
  height: 12px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}
.burn-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--pink), #ff6b00);
  border-radius: 6px;
  transition: width 1s ease;
}

/* Task Badge */
.task-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(255,0,128,0.15);
  border: 1px solid rgba(255,0,128,0.4);
  color: #ff4aa8;
}

/* Reward Tier Card */
.reward-tier {
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  padding: 1.5rem;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  transition: transform 0.2s, border-color 0.2s;
}
.reward-tier:hover {
  transform: translateY(-4px);
  border-color: var(--pink);
}
.reward-tier.tier-special {
  border-color: gold;
  box-shadow: 0 0 24px rgba(255,215,0,0.2);
}

/* Burn Event Row */
.burn-row {
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding: 0.75rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.burn-row:last-child { border-bottom: none; }

/* Stat Counter */
.stat-num {
  font-family: 'Orbitron', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--pink);
  text-shadow: var(--glow-pink);
}
```

---

## 📄 PAGE 1: index.html — Main Landing Page

### 1.1 — `<head>` Block

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[TOKEN NAME] | $[TICKER] — Fair Launch on Solana</title>
  <meta name="description" content="$[TICKER] official site. Fair launch on Solana via pump.fun. Community rewards, burn tracker, and roadmap.">

  <!-- Open Graph (for Twitter/Telegram link previews) -->
  <meta property="og:title"       content="$[TICKER] — [TAGLINE]">
  <meta property="og:description" content="Community-first memecoin. Fair launch. No team allocation. LP burned.">
  <meta property="og:image"       content="https://[YOUR-DOMAIN]/assets/img/og-image.png">
  <meta property="og:url"         content="https://[YOUR-DOMAIN]">
  <meta name="twitter:card"       content="summary_large_image">

  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
```

### 1.2 — Navbar

```html
<nav class="navbar navbar-expand-lg border-bottom border-light-subtle bg-black bg-opacity-50 sticky-top">
  <div class="container">
    <a class="navbar-brand fw-bold text-white" style="font-family:'Orbitron',sans-serif;"
       href="/">$[TICKER]</a>
    <button class="navbar-toggler border-light" type="button"
            data-bs-toggle="collapse" data-bs-target="#mainNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-1">
        <li class="nav-item"><a class="nav-link text-light" href="#about">About</a></li>
        <li class="nav-item"><a class="nav-link text-light" href="#tokenomics">Tokenomics</a></li>
        <li class="nav-item"><a class="nav-link text-light" href="#rewards">Rewards</a></li>
        <li class="nav-item"><a class="nav-link text-light" href="#burns">Burn Tracker</a></li>
        <li class="nav-item"><a class="nav-link text-light" href="#roadmap">Roadmap</a></li>
        <li class="nav-item"><a class="nav-link text-light" href="/whitepaper/">Whitepaper</a></li>
        <li class="nav-item ms-lg-2">
          <a class="btn btn-pink btn-sm" href="https://pump.fun" target="_blank">Buy Now</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### 1.3 — Hero Section

```html
<header class="hero py-5 py-lg-6" style="
  background: linear-gradient(135deg,
    rgba(255,0,128,0.18), rgba(86,11,173,0.14));
">
  <div class="container">
    <div class="row align-items-center g-4 g-lg-5">

      <!-- Left: Copy -->
      <div class="col-lg-6">
        <span class="task-badge mb-3 d-inline-block">
          🔥 Fair Launch on Pump.fun
        </span>
        <h1 class="display-4 fw-bold text-white mb-3"
            style="font-family:'Orbitron',sans-serif; line-height:1.15;">
          [TOKEN TAGLINE]<br>
          <span class="text-glow">Is Here.</span>
        </h1>
        <p class="lead mb-2" style="color:var(--text-muted);">
          [1–2 sentence description of the token and community mission.]
        </p>
        <p class="mb-4" style="color:var(--text-muted); font-size:0.9rem;">
          No team allocation · No presale · LP burned · Community owns everything
        </p>
        <div class="d-flex flex-wrap gap-2">
          <a class="btn btn-pink btn-lg" href="https://pump.fun"
             target="_blank" rel="noopener noreferrer">
            <i class="bi bi-lightning-charge-fill me-1"></i>Buy on pump.fun
          </a>
          <a class="btn btn-outline-light btn-lg" href="#rewards">
            <i class="bi bi-gift me-1"></i>Earn Rewards
          </a>
          <a class="btn btn-outline-light btn-lg" href="/whitepaper/">
            Whitepaper
          </a>
        </div>

        <!-- Live Stats Row -->
        <div class="row g-3 mt-4">
          <div class="col-4 text-center">
            <div class="stat-num" id="stat-holders">—</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">HOLDERS</div>
          </div>
          <div class="col-4 text-center">
            <div class="stat-num" id="stat-mc">—</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">MARKET CAP</div>
          </div>
          <div class="col-4 text-center">
            <div class="stat-num" id="stat-burned">—</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">TOKENS BURNED</div>
          </div>
        </div>
      </div>

      <!-- Right: Mascot -->
      <div class="col-lg-6 text-center">
        <img src="assets/img/mascot.png" alt="[TOKEN NAME] Mascot"
             class="img-fluid hero-mascot" loading="eager">
      </div>

    </div>
  </div>
</header>
```

### 1.4 — Contract Address Bar

```html
<!-- CONTRACT ADDRESS BANNER -->
<div class="py-3 border-top border-bottom border-light-subtle"
     style="background:rgba(0,0,0,0.4);">
  <div class="container d-flex flex-wrap align-items-center justify-content-center gap-3">
    <span class="text-muted small">Contract Address:</span>
    <code class="text-pink small fw-bold" id="ca-text">TBA AT LAUNCH</code>
    <button class="btn btn-sm btn-outline-light py-0 px-2"
            onclick="copyCA()" style="font-size:0.75rem;">
      <i class="bi bi-copy me-1"></i>Copy
    </button>
    <a href="https://solscan.io/token/[CA]" target="_blank"
       class="btn btn-sm btn-outline-light py-0 px-2" style="font-size:0.75rem;">
      <i class="bi bi-box-arrow-up-right me-1"></i>Solscan
    </a>
  </div>
</div>
```

### 1.5 — About Section

```html
<section id="about" class="container py-5">
  <div class="card card-glass">
    <div class="card-body p-4 p-lg-5">
      <div class="row align-items-center g-4">
        <div class="col-lg-8">
          <p class="task-badge mb-3">About</p>
          <h2 class="h2 fw-bold text-white mb-3"
              style="font-family:'Orbitron',sans-serif;">
            What is $[TICKER]?
          </h2>
          <p style="color:var(--text-muted); line-height:1.8;">
            [Full about paragraph — 3–4 sentences describing the token, its inspiration,
            community focus, and what makes it different from other meme coins.]
          </p>
          <p style="color:var(--text-muted); line-height:1.8;">
            Launched via Pump.fun's bonding curve model — 100% fair, 100% community.
            Once the bonding curve reached market cap threshold, all liquidity was
            automatically migrated to Raydium and the LP tokens were permanently burned.
          </p>
        </div>
        <div class="col-lg-4">
          <ul class="list-unstyled" style="color:var(--text-muted);">
            <li class="mb-2"><i class="bi bi-check-circle-fill text-pink me-2"></i>0% Team Allocation</li>
            <li class="mb-2"><i class="bi bi-check-circle-fill text-pink me-2"></i>LP Permanently Burned</li>
            <li class="mb-2"><i class="bi bi-check-circle-fill text-pink me-2"></i>Mint Authority Revoked</li>
            <li class="mb-2"><i class="bi bi-check-circle-fill text-pink me-2"></i>Freeze Authority Revoked</li>
            <li class="mb-2"><i class="bi bi-check-circle-fill text-pink me-2"></i>Dev Wallet Burns Every $100K</li>
            <li class="mb-2"><i class="bi bi-check-circle-fill text-pink me-2"></i>Community Rewards Active</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 1.6 — Tokenomics Section

```html
<section id="tokenomics" class="container py-4">
  <p class="task-badge mb-3">Tokenomics</p>
  <h2 class="h3 fw-bold text-white mb-4" style="font-family:'Orbitron',sans-serif;">
    Token Info
  </h2>
  <div class="row g-4">

    <!-- Token Details -->
    <div class="col-lg-4">
      <div class="card card-glass h-100">
        <div class="card-body p-4">
          <h3 class="h5 text-white mb-3">
            <i class="bi bi-coin text-pink me-2"></i>Token Details
          </h3>
          <ul class="list-unstyled mb-0" style="color:var(--text-muted);">
            <li class="py-2 border-bottom border-light-subtle">
              <strong class="text-white">Name</strong>
              <span class="float-end">[TOKEN NAME]</span>
            </li>
            <li class="py-2 border-bottom border-light-subtle">
              <strong class="text-white">Ticker</strong>
              <span class="float-end text-pink fw-bold">$[TICKER]</span>
            </li>
            <li class="py-2 border-bottom border-light-subtle">
              <strong class="text-white">Chain</strong>
              <span class="float-end">Solana (SPL)</span>
            </li>
            <li class="py-2 border-bottom border-light-subtle">
              <strong class="text-white">Total Supply</strong>
              <span class="float-end">1,000,000,000</span>
            </li>
            <li class="py-2 border-bottom border-light-subtle">
              <strong class="text-white">Team Allocation</strong>
              <span class="float-end text-pink fw-bold">0%</span>
            </li>
            <li class="py-2">
              <strong class="text-white">Buy/Sell Tax</strong>
              <span class="float-end">0%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- How to Buy -->
    <div class="col-lg-4">
      <div class="card card-glass h-100">
        <div class="card-body p-4">
          <h3 class="h5 text-white mb-3">
            <i class="bi bi-cart-plus text-pink me-2"></i>How to Buy
          </h3>
          <ol style="color:var(--text-muted); padding-left:1.2rem; line-height:2;">
            <li>Download <strong class="text-white">Phantom</strong> or
                <strong class="text-white">Solflare</strong> wallet.</li>
            <li>Fund your wallet with <strong class="text-white">SOL</strong>
                from any exchange.</li>
            <li>Go to <strong class="text-white">pump.fun</strong> and search
                <code class="text-pink">$[TICKER]</code> or paste the CA.</li>
            <li>Set slippage to <strong class="text-white">1–3%</strong>
                and confirm your swap.</li>
            <li>Join our <strong class="text-white">Telegram</strong> and
                claim your community reward!</li>
          </ol>
          <a class="btn btn-pink w-100 mt-3" href="https://pump.fun"
             target="_blank">
            <i class="bi bi-lightning-charge-fill me-1"></i>Buy on pump.fun
          </a>
        </div>
      </div>
    </div>

    <!-- Dev Burn Commitment -->
    <div class="col-lg-4">
      <div class="card card-glass h-100"
           style="border-color:rgba(255,0,128,0.5);">
        <div class="card-body p-4">
          <h3 class="h5 text-white mb-3">
            <i class="bi bi-fire text-pink me-2"></i>Dev Burn Commitment
          </h3>
          <p style="color:var(--text-muted); font-size:0.9rem;">
            Dev wallet holds <strong class="text-white">152,081,514 tokens</strong>
            (5 SOL buy at launch). Every $100K market cap milestone triggers a
            public burn of <strong class="text-white">7,604,076 tokens</strong>.
          </p>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1">
              <small style="color:var(--text-muted);">Burned so far</small>
              <small class="text-pink fw-bold" id="burn-pct">0%</small>
            </div>
            <div class="burn-bar">
              <div class="burn-bar-fill" id="burn-bar-fill" style="width:0%"></div>
            </div>
          </div>
          <p class="mb-0" style="font-size:0.8rem; color:var(--text-muted);">
            🔥 Dev wallet reaches <strong class="text-white">ZERO at $2M</strong>
            market cap. All burns verified on Solscan.
          </p>
          <a href="/burns/" class="btn btn-outline-light btn-sm w-100 mt-3">
            View Burn Log <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </div>

  </div>
</section>
```

### 1.7 — Community Rewards Section (KEY SECTION)

```html
<section id="rewards" class="container py-5">
  <div class="text-center mb-5">
    <p class="task-badge mb-3">Earn Tokens</p>
    <h2 class="h2 fw-bold text-white" style="font-family:'Orbitron',sans-serif;">
      Community Rewards
    </h2>
    <p style="color:var(--text-muted); max-width:600px; margin:0 auto;">
      Complete tasks, promote $[TICKER], and earn tokens directly to your wallet.
      Rewards are FIXED regardless of token price. Transparency is maintained —
      every distribution posted publicly with TX hash.
    </p>
  </div>

  <div class="row g-4">

    <!-- VERIFIED X PROFILE TIER -->
    <div class="col-lg-4">
      <div class="reward-tier h-100">
        <div class="d-flex align-items-center gap-2 mb-3">
          <span style="font-size:1.5rem;">✅</span>
          <div>
            <div class="fw-bold text-white">Verified X Profile</div>
            <div class="task-badge mt-1">20,000 $[TICKER]</div>
          </div>
        </div>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">
          Complete ALL of the following tasks:
        </p>
        <ul style="color:var(--text-muted); font-size:0.85rem;
                   padding-left:1rem; line-height:2;">
          <li>Create <strong class="text-white">10 tweets</strong>
              with CA + Telegram link</li>
          <li><strong class="text-white">20 retweets</strong>
              from other community posts</li>
          <li>Hit <strong class="text-white">DEX Screener 🚀 Rocket</strong>
              + Vote on Jupiter</li>
          <li>Follow <strong class="text-white">official X account</strong></li>
        </ul>
        <div class="p-3 rounded mt-3"
             style="background:rgba(255,0,128,0.08); border:1px solid rgba(255,0,128,0.25);">
          <p class="mb-1" style="color:#ff4aa8; font-size:0.8rem; font-weight:600;">
            🎁 BONUS: +50,000 $[TICKER]
          </p>
          <p class="mb-0" style="color:var(--text-muted); font-size:0.8rem;">
            Write article on: Binance Square + CoinMarketCap
            + CoinGecko + Gate.io Community
          </p>
        </div>
        <a href="#submit-task" class="btn btn-pink w-100 mt-3">
          Submit Task
        </a>
      </div>
    </div>

    <!-- NON-VERIFIED PROFILE TIER -->
    <div class="col-lg-4">
      <div class="reward-tier h-100">
        <div class="d-flex align-items-center gap-2 mb-3">
          <span style="font-size:1.5rem;">👤</span>
          <div>
            <div class="fw-bold text-white">Non-Verified Profile</div>
            <div class="task-badge mt-1">20,000 $[TICKER]</div>
          </div>
        </div>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">
          Complete ALL of the following tasks:
        </p>
        <ul style="color:var(--text-muted); font-size:0.85rem;
                   padding-left:1rem; line-height:2;">
          <li>Hold <strong class="text-white">20,000 $[TICKER]</strong>
              for minimum <strong class="text-white">30 minutes</strong>
              at time of claim</li>
          <li>Create <strong class="text-white">20 tweets</strong>
              with CA + Telegram link</li>
          <li><strong class="text-white">40 retweets</strong>
              from community posts</li>
          <li>Hit <strong class="text-white">DEX Screener 🚀 Rocket</strong></li>
        </ul>
        <div class="p-3 rounded mt-3"
             style="background:rgba(255,0,128,0.08); border:1px solid rgba(255,0,128,0.25);">
          <p class="mb-1" style="color:#ff4aa8; font-size:0.8rem; font-weight:600;">
            🎁 BONUS: +50,000 $[TICKER]
          </p>
          <p class="mb-0" style="color:var(--text-muted); font-size:0.8rem;">
            Write article on: Binance Square + CoinMarketCap
            + CoinGecko + Gate.io Community
          </p>
        </div>
        <a href="#submit-task" class="btn btn-pink w-100 mt-3">
          Submit Task
        </a>
      </div>
    </div>

    <!-- YOUTUBE / INFLUENCER TIER -->
    <div class="col-lg-4">
      <div class="reward-tier tier-special h-100">
        <div class="d-flex align-items-center gap-2 mb-3">
          <span style="font-size:1.5rem;">🎥</span>
          <div>
            <div class="fw-bold text-white">YouTube / Influencer</div>
            <div class="task-badge mt-1"
                 style="background:rgba(255,215,0,0.12);
                        border-color:rgba(255,215,0,0.5); color:gold;">
              1,000,000 $[TICKER]
            </div>
          </div>
        </div>
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:1rem;">
          Special award for content creators:
        </p>
        <ul style="color:var(--text-muted); font-size:0.85rem;
                   padding-left:1rem; line-height:2;">
          <li>Minimum <strong class="text-white">50,000 subscribers</strong>
              on YouTube or social media</li>
          <li>Create a <strong class="text-white">minimum 5-minute video</strong>
              discussing $[TICKER]</li>
          <li>Video must include <strong class="text-white">CA on screen</strong></li>
          <li>Must achieve <strong class="text-white">500+ views</strong>
              within 72 hours</li>
          <li>Video must remain <strong class="text-white">live for 30 days</strong></li>
        </ul>
        <div class="p-3 rounded mt-3"
             style="background:rgba(255,215,0,0.06); border:1px solid rgba(255,215,0,0.3);">
          <p class="mb-0" style="color:gold; font-size:0.8rem;">
            ⭐ Submit video link + wallet address to Telegram admin for review.
            Reward sent within 24 hours of verification.
          </p>
        </div>
        <a href="https://t.me/[TELEGRAM_HANDLE]"
           class="btn w-100 mt-3 fw-bold"
           style="background:gold; color:#000; border-color:gold;"
           target="_blank">
          Contact Admin on Telegram
        </a>
      </div>
    </div>

  </div>

  <!-- REWARD RULES NOTE -->
  <div class="card card-glass mt-4">
    <div class="card-body p-4">
      <div class="row g-3 align-items-center">
        <div class="col-lg-8">
          <h4 class="h6 text-white mb-2">
            <i class="bi bi-shield-check text-pink me-2"></i>
            Reward Rules & Transparency
          </h4>
          <p class="mb-0" style="color:var(--text-muted); font-size:0.875rem; line-height:1.7;">
            Token distribution amount is <strong class="text-white">PERMANENTLY FIXED</strong>
            regardless of market cap or token price. All reward distributions are posted publicly
            on X and Telegram with the recipient wallet address and Solscan TX hash.
            This is a pure community token — community members are the key to its success.
          </p>
        </div>
        <div class="col-lg-4 text-lg-end">
          <a href="/rewards/" class="btn btn-outline-light">
            <i class="bi bi-trophy me-1"></i>View All Distributions
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 1.8 — Task Submission Form

```html
<section id="submit-task" class="container py-4">
  <div class="card card-glass">
    <div class="card-body p-4 p-lg-5">
      <div class="row g-4">
        <div class="col-lg-6">
          <p class="task-badge mb-3">Submit for Review</p>
          <h2 class="h3 fw-bold text-white mb-2">Claim Your Reward</h2>
          <p style="color:var(--text-muted); font-size:0.9rem;">
            Fill in all fields. Our team verifies submissions within 24–48 hours.
            Verified rewards are sent directly to your Solana wallet and posted publicly.
          </p>
          <ul style="color:var(--text-muted); font-size:0.85rem; line-height:2;">
            <li>One submission per wallet address</li>
            <li>Provide ALL tweet links (not just one)</li>
            <li>Non-verified profile must hold 20K tokens at review time</li>
            <li>Bonus article reward requires all 4 platforms</li>
          </ul>
        </div>
        <div class="col-lg-6">
          <!-- Using PHP form submission OR link to Google Form -->
          <form id="task-form" action="api/submit-task.php" method="POST"
                onsubmit="return handleSubmit(event)">
            <div class="mb-3">
              <label class="form-label text-light small fw-semibold">Profile Type</label>
              <select class="form-select bg-dark text-light border-light-subtle" name="tier" required>
                <option value="">Select your tier...</option>
                <option value="verified">✅ Verified X Profile</option>
                <option value="unverified">👤 Non-Verified Profile</option>
                <option value="youtube">🎥 YouTube / Influencer (50K+ subs)</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label text-light small fw-semibold">
                Your X (Twitter) Handle
              </label>
              <div class="input-group">
                <span class="input-group-text bg-dark text-muted border-light-subtle">@</span>
                <input type="text" class="form-control bg-dark text-light border-light-subtle"
                       name="x_handle" placeholder="yourhandle" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label text-light small fw-semibold">
                Your Solana Wallet Address
              </label>
              <input type="text" class="form-control bg-dark text-light border-light-subtle"
                     name="wallet" placeholder="Enter your SOL wallet address" required>
            </div>
            <div class="mb-3">
              <label class="form-label text-light small fw-semibold">
                Tweet / Post Links (paste all, one per line)
              </label>
              <textarea class="form-control bg-dark text-light border-light-subtle"
                        name="links" rows="4"
                        placeholder="https://x.com/yourhandle/status/...&#10;https://x.com/yourhandle/status/..."
                        required></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label text-light small fw-semibold">
                Bonus Article Links (optional — all 4 platforms for +50K)
              </label>
              <textarea class="form-control bg-dark text-light border-light-subtle"
                        name="article_links" rows="3"
                        placeholder="Binance Square: https://...&#10;CMC: https://...&#10;CoinGecko: https://...&#10;Gate.io: https://...">
              </textarea>
            </div>
            <button type="submit" class="btn btn-pink w-100 fw-bold">
              <i class="bi bi-send me-2"></i>Submit for Review
            </button>
            <div id="form-msg" class="mt-3 text-center" style="display:none;"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 1.9 — Burn Tracker Section (Preview)

```html
<section id="burns" class="container py-5">
  <div class="text-center mb-4">
    <p class="task-badge mb-3">Dev Commitment</p>
    <h2 class="h2 fw-bold text-white" style="font-family:'Orbitron',sans-serif;">
      🔥 Burn Tracker
    </h2>
    <p style="color:var(--text-muted);">
      Dev wallet burns 7,604,076 tokens every $100K market cap milestone.
      Zero tokens remaining at $2M. All burns verified on Solscan.
    </p>
  </div>

  <!-- Progress Overview -->
  <div class="card card-glass mb-4">
    <div class="card-body p-4">
      <div class="row g-4 text-center">
        <div class="col-6 col-lg-3">
          <div class="stat-num" id="burns-completed">0</div>
          <div style="color:var(--text-muted); font-size:0.8rem;">BURNS COMPLETED</div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="stat-num" id="tokens-burned-total">0</div>
          <div style="color:var(--text-muted); font-size:0.8rem;">TOKENS BURNED</div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="stat-num" id="dev-remaining">152M</div>
          <div style="color:var(--text-muted); font-size:0.8rem;">DEV REMAINING</div>
        </div>
        <div class="col-6 col-lg-3">
          <div class="stat-num" id="next-burn-mc">$100K</div>
          <div style="color:var(--text-muted); font-size:0.8rem;">NEXT BURN AT</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Milestone Grid (20 boxes, $100K to $2M) -->
  <div class="row g-2 mb-4" id="milestone-grid">
    <!-- JavaScript renders 20 milestone boxes dynamically -->
    <!-- Each box: $100K / $200K ... $2M -->
    <!-- Burned = pink fill, Pending = ghost -->
  </div>

  <!-- Recent Burns Log (last 3) -->
  <div class="card card-glass">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h5 text-white mb-0">
          <i class="bi bi-fire text-pink me-2"></i>Recent Burns
        </h3>
        <a href="/burns/" class="btn btn-sm btn-outline-light">
          View All <i class="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
      <div id="recent-burns-log">
        <p style="color:var(--text-muted);" class="text-center py-3">
          No burns yet. First burn at $100K market cap.
        </p>
      </div>
    </div>
  </div>
</section>
```

### 1.10 — Roadmap Section

```html
<section id="roadmap" class="container py-5">
  <div class="card card-glass">
    <div class="card-body p-4 p-lg-5">
      <p class="task-badge mb-3">The Journey</p>
      <h2 class="h2 fw-bold text-white mb-4"
          style="font-family:'Orbitron',sans-serif;">
        Roadmap
      </h2>
      <div class="row g-3">
        <div class="col-md-6">
          <div class="phase-box">
            <span class="task-badge mb-2 d-inline-block">Phase 1</span>
            <h4 class="h6 text-white mt-2">The Awakening</h4>
            <ul style="color:var(--text-muted); font-size:0.85rem; margin:0; padding-left:1rem;">
              <li>✅ Fair launch on Pump.fun</li>
              <li>✅ Raydium migration + LP burn</li>
              <li>✅ Community channels established</li>
              <li>✅ Community reward system live</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="phase-box">
            <span class="task-badge mb-2 d-inline-block">Phase 2</span>
            <h4 class="h6 text-white mt-2">The Roar</h4>
            <ul style="color:var(--text-muted); font-size:0.85rem; margin:0; padding-left:1rem;">
              <li>🔄 CoinMarketCap + CoinGecko listing</li>
              <li>🔄 DEX Screener + Birdeye trending campaigns</li>
              <li>🔄 KOL partnerships and raids</li>
              <li>🔄 $100K market cap → First burn 🔥</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="phase-box">
            <span class="task-badge mb-2 d-inline-block">Phase 3</span>
            <h4 class="h6 text-white mt-2">Sharpening the Claws</h4>
            <ul style="color:var(--text-muted); font-size:0.85rem; margin:0; padding-left:1rem;">
              <li>🎯 NFT collection launch</li>
              <li>🎯 Staking dApp deployment</li>
              <li>🎯 First CEX listing application</li>
              <li>🎯 $1M market cap milestone celebration</li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="phase-box">
            <span class="task-badge mb-2 d-inline-block">Phase 4</span>
            <h4 class="h6 text-white mt-2">King of the Jungle</h4>
            <ul style="color:var(--text-muted); font-size:0.85rem; margin:0; padding-left:1rem;">
              <li>🏆 DAO governance launch</li>
              <li>🏆 Dev wallet = ZERO at $2M 🔥</li>
              <li>🏆 Tier-1 CEX listing</li>
              <li>🏆 Cross-chain expansion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 1.11 — Social Links / Community Section

```html
<section class="container py-4">
  <div class="card card-glass text-center">
    <div class="card-body p-4 p-lg-5">
      <h2 class="h3 fw-bold text-white mb-2"
          style="font-family:'Orbitron',sans-serif;">
        Join the Community
      </h2>
      <p style="color:var(--text-muted);" class="mb-4">
        Every holder is a key member. Join us, earn rewards, and build together.
      </p>
      <div class="d-flex flex-wrap justify-content-center gap-3">
        <a href="https://t.me/[TELEGRAM]" target="_blank"
           class="btn btn-outline-light btn-lg px-4">
          <i class="bi bi-telegram me-2"></i>Telegram
        </a>
        <a href="https://x.com/[TWITTER]" target="_blank"
           class="btn btn-outline-light btn-lg px-4">
          <i class="bi bi-twitter-x me-2"></i>X / Twitter
        </a>
        <a href="https://dexscreener.com/solana/[CA]" target="_blank"
           class="btn btn-outline-light btn-lg px-4">
          <i class="bi bi-graph-up me-2"></i>DEX Screener
        </a>
        <a href="https://birdeye.so/token/[CA]" target="_blank"
           class="btn btn-outline-light btn-lg px-4">
          <i class="bi bi-binoculars me-2"></i>Birdeye
        </a>
        <a href="https://raydium.io/swap/?inputCurrency=sol&outputCurrency=[CA]"
           target="_blank" class="btn btn-outline-light btn-lg px-4">
          <i class="bi bi-arrow-left-right me-2"></i>Raydium
        </a>
      </div>
    </div>
  </div>
</section>
```

### 1.12 — Footer

```html
<footer class="border-top border-light-subtle py-4 mt-5">
  <div class="container">
    <div class="row g-3 align-items-center">
      <div class="col-lg-4">
        <span class="fw-bold text-white" style="font-family:'Orbitron',sans-serif;">
          $[TICKER]
        </span>
        <p class="text-muted small mt-1 mb-0">
          © 2026 [TOKEN NAME]. Community-driven. No financial advice.
        </p>
      </div>
      <div class="col-lg-4 text-center">
        <p class="text-muted small mb-0">
          Powered by <strong class="text-white">Solana</strong> +
          <strong class="text-white">Pump.fun</strong>
        </p>
      </div>
      <div class="col-lg-4 text-lg-end">
        <div class="d-flex gap-3 justify-content-lg-end flex-wrap">
          <a class="link-light small" href="https://t.me/[TG]">Telegram</a>
          <a class="link-light small" href="https://x.com/[TW]">X</a>
          <a class="link-light small" href="/whitepaper/">Whitepaper</a>
          <a class="link-light small" href="/burns/">Burn Log</a>
          <a class="link-light small" href="/rewards/">Rewards</a>
        </div>
      </div>
    </div>
  </div>
</footer>
<script src="assets/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/app.js"></script>
```

---

## 📄 PAGE 2: /burns/index.html — Full Burn Tracker

Build a dedicated page showing:

1. **Hero stats:** Total burned, Dev remaining, Next burn milestone
2. **Full milestone grid:** 20 boxes ($100K → $2M), burned ones highlighted pink
3. **Complete burn history table:**

```
| Date | Milestone | Tokens Burned | Dev Remaining | TX Hash (Solscan link) | Verified |
```

4. Data source: `/data/burns.json` loaded via `fetch()`
5. Format of burns.json:

```json
{
  "devInitial": 152081514,
  "burnPerMilestone": 7604076,
  "milestoneInterval": 100000,
  "burns": [
    {
      "id": 1,
      "date": "2026-06-15",
      "milestone": 100000,
      "amount": 7604076,
      "devRemaining": 144477438,
      "txHash": "5xFg9...[full hash]",
      "solscanUrl": "https://solscan.io/tx/5xFg9..."
    }
  ]
}
```

---

## 📄 PAGE 3: /rewards/index.html — Public Reward Distributions Log

Build a transparency log showing every reward sent:

1. **Summary stats:** Total distributed, Total recipients, Community fund remaining
2. **Distribution log table:**

```
| Date | Recipient Wallet | Amount | Tier | Task TX | Distribution TX (Solscan) |
```

3. Data source: `/data/rewards.json`

```json
{
  "communityFund": 80000000,
  "distributed": 0,
  "distributions": [
    {
      "id": 1,
      "date": "2026-06-10",
      "wallet": "7xAb3...",
      "amount": 20000,
      "tier": "verified",
      "bonus": 50000,
      "txHash": "9kLm2...",
      "solscanUrl": "https://solscan.io/tx/9kLm2..."
    }
  ]
}
```

---

## 📄 PAGE 4: /whitepaper/index.html — Whitepaper Page

Replicate the Beast site whitepaper page:
1. Simple nav with back button
2. Glass card with whitepaper title
3. Download button for Whitepaper.pdf (or .txt)
4. Key highlights list (fair launch, LP burn, community, no tax)
5. Full whitepaper text rendered in sections OR inline read option

---

## ⚙️ app.js — JavaScript Logic

```javascript
// ─── CONFIGURATION ─────────────────────────────
const CONFIG = {
  tokenName:        "[TOKEN NAME]",
  ticker:           "$[TICKER]",
  contractAddress:  "TBA",
  devInitialTokens: 152081514,
  burnPerMilestone: 7604076,
  milestoneInterval: 100000,
  totalMilestones:  20,
  maxMC:            2000000,
  solscanBase:      "https://solscan.io/tx/",
  telegram:         "https://t.me/[HANDLE]",
  twitter:          "https://x.com/[HANDLE]",
};

// ─── COPY CONTRACT ADDRESS ──────────────────────
function copyCA() {
  const ca = document.getElementById('ca-text').textContent;
  if (ca === 'TBA AT LAUNCH') return;
  navigator.clipboard.writeText(ca).then(() => {
    const btn = document.querySelector('[onclick="copyCA()"]');
    btn.innerHTML = '<i class="bi bi-check me-1"></i>Copied!';
    setTimeout(() => {
      btn.innerHTML = '<i class="bi bi-copy me-1"></i>Copy';
    }, 2000);
  });
}

// ─── LOAD BURN DATA ────────────────────────────
async function loadBurnData() {
  try {
    const res  = await fetch('/data/burns.json');
    const data = await res.json();
    const completed = data.burns.length;
    const totalBurned = completed * CONFIG.burnPerMilestone;
    const devRemaining = CONFIG.devInitialTokens - totalBurned;
    const pct = ((totalBurned / CONFIG.devInitialTokens) * 100).toFixed(1);
    const nextMC = (completed + 1) * CONFIG.milestoneInterval;

    // Update hero stats
    updateEl('stat-burned',       formatNum(totalBurned));
    // Update burn section stats
    updateEl('burns-completed',   completed);
    updateEl('tokens-burned-total', formatNum(totalBurned));
    updateEl('dev-remaining',     formatNum(devRemaining));
    updateEl('next-burn-mc',      '$' + formatNum(nextMC));
    // Update progress bar
    updateEl('burn-pct',          pct + '%');
    const bar = document.getElementById('burn-bar-fill');
    if (bar) bar.style.width = pct + '%';

    // Render milestone grid
    renderMilestoneGrid(completed);

    // Render recent burns
    renderRecentBurns(data.burns.slice(-3).reverse());

  } catch (e) {
    console.warn('Burn data not yet available.', e);
  }
}

// ─── RENDER MILESTONE GRID ─────────────────────
function renderMilestoneGrid(burnsDone) {
  const grid = document.getElementById('milestone-grid');
  if (!grid) return;
  let html = '';
  for (let i = 1; i <= CONFIG.totalMilestones; i++) {
    const mc      = i * CONFIG.milestoneInterval;
    const burned  = i <= burnsDone;
    const current = i === burnsDone + 1;
    html += `
      <div class="col-6 col-md-3 col-lg-2">
        <div class="phase-box text-center ${burned ? 'border-pink' : ''}
             ${current ? 'border-warning' : ''}"
             style="${burned
               ? 'background:rgba(255,0,128,0.12);border-color:var(--pink);'
               : current
               ? 'border-color:gold;background:rgba(255,215,0,0.05);'
               : ''}">
          <div style="font-size:0.7rem; color:var(--text-muted);">
            ${burned ? '🔥' : current ? '⏳' : '🎯'}
          </div>
          <div style="font-size:0.8rem; font-weight:700;
                      color:${burned ? 'var(--pink)' : 'var(--text-muted)'};">
            $${(mc >= 1000000 ? (mc/1000000)+'M' : (mc/1000)+'K')}
          </div>
          ${burned ? '<div style="font-size:0.65rem;color:var(--pink);">BURNED ✓</div>' : ''}
          ${current ? '<div style="font-size:0.65rem;color:gold;">NEXT</div>' : ''}
        </div>
      </div>`;
  }
  grid.innerHTML = html;
}

// ─── RENDER RECENT BURNS ───────────────────────
function renderRecentBurns(burns) {
  const el = document.getElementById('recent-burns-log');
  if (!el) return;
  if (!burns.length) return;
  el.innerHTML = burns.map(b => `
    <div class="burn-row">
      <div>
        <span class="text-pink fw-bold">🔥 ${formatNum(b.amount)} $[TICKER]</span>
        <small class="text-muted ms-2">${b.date}</small>
      </div>
      <div class="text-end">
        <span class="text-muted small">$${formatNum(b.milestone)} MC milestone</span><br>
        <a href="${b.solscanUrl}" target="_blank"
           class="text-pink small" style="font-size:0.75rem;">
          View TX <i class="bi bi-box-arrow-up-right"></i>
        </a>
      </div>
    </div>`).join('');
}

// ─── TASK FORM SUBMISSION ──────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const msg  = document.getElementById('form-msg');
  const data = new FormData(form);

  fetch('api/submit-task.php', { method: 'POST', body: data })
    .then(r => r.json())
    .then(res => {
      msg.style.display = 'block';
      msg.innerHTML = res.success
        ? `<div class="alert alert-success">${res.message}</div>`
        : `<div class="alert alert-danger">${res.message}</div>`;
      if (res.success) form.reset();
    })
    .catch(() => {
      msg.style.display = 'block';
      msg.innerHTML = `<div class="alert alert-danger">
        Submission failed. Please try again or contact us on Telegram.
      </div>`;
    });

  return false;
}

// ─── HELPERS ───────────────────────────────────
function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}
function updateEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ─── INIT ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadBurnData();
});
```

---

## ⚙️ api/submit-task.php — Task Submission Backend

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Rate limiting: basic IP check
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$logFile  = __DIR__ . '/../data/submissions.json';
$maxPerIP = 3; // max submissions per IP

// Read existing submissions
$submissions = [];
if (file_exists($logFile)) {
  $submissions = json_decode(file_get_contents($logFile), true) ?? [];
}

// Count submissions from this IP
$ipCount = count(array_filter($submissions,
  fn($s) => ($s['ip'] ?? '') === $ip
));

if ($ipCount >= $maxPerIP) {
  echo json_encode(['success' => false,
    'message' => 'Maximum submissions reached for your IP address.']);
  exit;
}

// Validate required fields
$tier       = trim($_POST['tier']     ?? '');
$xHandle    = trim($_POST['x_handle'] ?? '');
$wallet     = trim($_POST['wallet']   ?? '');
$links      = trim($_POST['links']    ?? '');
$articles   = trim($_POST['article_links'] ?? '');

if (!$tier || !$xHandle || !$wallet || !$links) {
  echo json_encode(['success' => false,
    'message' => 'All required fields must be filled.']);
  exit;
}

// Basic Solana wallet validation (base58, 32-44 chars)
if (!preg_match('/^[1-9A-HJ-NP-Za-km-z]{32,44}$/', $wallet)) {
  echo json_encode(['success' => false,
    'message' => 'Invalid Solana wallet address format.']);
  exit;
}

// Save submission
$entry = [
  'id'           => count($submissions) + 1,
  'timestamp'    => date('Y-m-d H:i:s'),
  'ip'           => $ip,
  'tier'         => $tier,
  'x_handle'     => $xHandle,
  'wallet'       => $wallet,
  'links'        => $links,
  'articles'     => $articles,
  'status'       => 'pending',
];

$submissions[] = $entry;
file_put_contents($logFile, json_encode($submissions, JSON_PRETTY_PRINT));

// Optional: send Telegram notification to admin
$tgBotToken  = 'YOUR_BOT_TOKEN';
$tgChatId    = 'YOUR_CHAT_ID';
$msg = "📬 New Task Submission\n"
     . "Tier: {$tier}\n"
     . "X: @{$xHandle}\n"
     . "Wallet: {$wallet}\n"
     . "Submitted: " . date('Y-m-d H:i:s');

// Uncomment to enable Telegram notification:
// file_get_contents("https://api.telegram.org/bot{$tgBotToken}/sendMessage?"
//   . http_build_query(['chat_id' => $tgChatId, 'text' => $msg]));

echo json_encode([
  'success' => true,
  'message' => '✅ Submission received! Our team reviews within 24–48 hours. '
             . 'Reward is sent to your wallet after verification.'
]);
```

---

## 🚀 DEPLOYMENT GUIDE (cPanel)

```
Step 1: Create folder structure locally matching FILE STRUCTURE above
Step 2: Replace all [PLACEHOLDERS] with your real values:
        [TOKEN NAME], [TICKER], [TELEGRAM], [TWITTER], [CA], [YOUR-DOMAIN]
Step 3: Add your mascot.png and og-image.png to assets/img/
Step 4: ZIP the entire public_html contents
Step 5: Open cPanel File Manager
Step 6: Navigate to public_html
Step 7: Upload ZIP → Extract → Move all files to root
Step 8: Set folder permissions: data/ → 755, data/*.json → 644
Step 9: Set api/*.php → 644
Step 10: Visit your domain and verify all pages load
Step 11: Test form submission and check data/submissions.json is written

IMPORTANT AFTER LAUNCH:
• Update index.html with real contract address
• Update data/burns.json after each burn event
• Post burn TX hash publicly within 5 minutes of burn
• Update data/rewards.json after each reward distribution
```

---

## 📋 PLACEHOLDERS CHECKLIST

```
[ ] [TOKEN NAME]       — Full name of your token
[ ] [TICKER]           — Token ticker symbol (e.g., BEAST)
[ ] [TAGLINE]          — One-line tagline for hero section
[ ] [TELEGRAM]         — Telegram group handle (without @)
[ ] [TWITTER]          — X/Twitter handle (without @)
[ ] [CA]               — Contract address (update after launch)
[ ] [YOUR-DOMAIN]      — Your website domain
[ ] mascot.png         — Your token mascot image (500×500px min, transparent PNG)
[ ] og-image.png       — Social share image (1200×630px)
[ ] Whitepaper.pdf     — Your whitepaper document
[ ] TG Bot Token       — For admin notifications (optional)
[ ] TG Chat ID         — Your admin chat ID (optional)
```

---

*End of Implementation Prompt — v1.0*
*Designed based on: beastonsolana.page.gd reference site*
*Stack: HTML5 + Bootstrap 5 + PHP 8 + cPanel deploy*
