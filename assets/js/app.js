const CONFIG = {
  tokenName:        "Beast on Solana",
  ticker:           "$BEASTSOL",
  contractAddress:  "TBA AT LAUNCH",
  devInitialTokens: 100000000,
  burnPerMilestone: 2500000,
  milestoneInterval: 50000,
  totalMilestones:  40,
  maxMC:            2000000,
  solscanBase:      "https://solscan.io/tx/",
  telegram:         "https://t.me/beastonsolana",
  twitter:          "https://x.com/BeastOnSolfx",
};

async function loadSiteConfig() {
  try {
    const res = await fetch('/api/get-config.php');
    const cfg = await res.json();
    if (cfg.contract_address) {
      CONFIG.contractAddress = cfg.contract_address;
      const caEl = document.getElementById('ca-text');
      if (caEl) caEl.textContent = cfg.contract_address;

      const solscanLinks = document.querySelectorAll('a[href*="solscan.io/token/TBA"], a[href*="solscan.io/token/%5BCA%5D"]');
      solscanLinks.forEach(a => {
        a.href = a.href.replace('TBA', cfg.contract_address).replace('%5BCA%5D', cfg.contract_address);
      });

      const raydiumLinks = document.querySelectorAll('a[href*="raydium.io"]');
      raydiumLinks.forEach(a => {
        a.href = a.href.replace(/outputCurrency=TBA|outputCurrency=%5BCA%5D/, 'outputCurrency=' + cfg.contract_address);
      });

      const dexLinks = document.querySelectorAll('a[href*="dexscreener.com"]');
      dexLinks.forEach(a => {
        a.href = a.href.replace(/\/TBA$/, '/' + cfg.contract_address);
      });

      const birdLinks = document.querySelectorAll('a[href*="birdeye.so"]');
      birdLinks.forEach(a => {
        a.href = a.href.replace(/\/TBA$/, '/' + cfg.contract_address);
      });
    }
    if (cfg.holders && cfg.holders !== '—') {
      updateEl('stat-holders', cfg.holders);
    }
    if (cfg.market_cap && cfg.market_cap !== '—') {
      updateEl('stat-mc', cfg.market_cap);
    }
    if (cfg.telegram) {
      CONFIG.telegram = 'https://t.me/' + cfg.telegram;
    }
    if (cfg.twitter) {
      CONFIG.twitter = 'https://x.com/' + cfg.twitter;
    }
  } catch (e) {
    console.warn('Config not available, using defaults.', e);
  }
}

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

async function loadBurnData() {
  try {
    const res  = await fetch('/api/get-burns.php');
    const data = await res.json();
    const completed = data.burns.length;
    const totalBurned = completed * CONFIG.burnPerMilestone;
    const devRemaining = CONFIG.devInitialTokens - totalBurned;
    const pct = ((totalBurned / CONFIG.devInitialTokens) * 100).toFixed(1);
    const nextMC = (completed + 1) * CONFIG.milestoneInterval;

    updateEl('stat-burned', formatNum(totalBurned));
    updateEl('burns-completed', completed);
    updateEl('tokens-burned-total', formatNum(totalBurned));
    updateEl('dev-remaining', formatNum(devRemaining));
    updateEl('next-burn-mc', '$' + formatNum(nextMC));
    updateEl('burn-pct', pct + '%');
    const bar = document.getElementById('burn-bar-fill');
    if (bar) bar.style.width = pct + '%';

    renderMilestoneGrid(completed);
    renderRecentBurns(data.burns.slice(-3).reverse());

  } catch (e) {
    console.warn('Burn data not yet available.', e);
  }
}

function renderMilestoneGrid(burnsDone) {
  const grid = document.getElementById('milestone-grid');
  if (!grid) return;
  let html = '';
  for (let i = 1; i <= CONFIG.totalMilestones; i++) {
    const mc      = i * CONFIG.milestoneInterval;
    const burned  = i <= burnsDone;
    const current = i === burnsDone + 1;
    const mcLabel = mc >= 1000000 ? (mc/1000000)+'M' : (mc/1000)+'K';
    html += `
      <div class="col-6 col-md-3 col-lg-2">
        <div class="phase-box text-center milestone-box ${burned ? 'border-pink' : ''}
             ${current ? 'border-warning' : ''}"
             style="${burned
               ? 'background:rgba(255,0,128,0.12);border-color:#ff0080;'
               : current
               ? 'border-color:gold;background:rgba(255,215,0,0.05);animation:glowPulse 2s ease-in-out infinite;'
               : ''}">
          <div style="font-size:0.7rem;">
            ${burned ? '<span class="fire-icon">🔥</span>' : current ? '⏳' : '🎯'}
          </div>
          <div style="font-size:0.8rem; font-weight:700;
                      color:${burned ? '#ff0080' : 'rgba(255,255,255,0.7)'};">
            $${mcLabel}
          </div>
          ${burned ? '<div style="font-size:0.65rem;color:#ff0080;">BURNED ✓</div>' : ''}
          ${current ? '<div style="font-size:0.65rem;color:gold;">NEXT</div>' : ''}
        </div>
      </div>`;
  }
  grid.innerHTML = html;
}

function renderRecentBurns(burns) {
  const el = document.getElementById('recent-burns-log');
  if (!el) return;
  if (!burns.length) return;
  el.innerHTML = burns.map(b => `
    <div class="burn-row">
      <div>
        <span class="text-pink fw-bold"><span class="fire-icon">🔥</span> ${formatNum(b.amount)} $BEASTSOL</span>
        <small class="text-muted ms-2">${b.date}</small>
      </div>
      <div class="text-end">
        <span class="text-muted small">$${formatNum(b.milestone)} MC milestone</span><br>
        <a href="${b.solscan_url}" target="_blank"
           class="text-pink small" style="font-size:0.75rem;">
          View TX <i class="bi bi-box-arrow-up-right"></i>
        </a>
      </div>
    </div>`).join('');
}

function renderFullBurnTable(burns) {
  const el = document.getElementById('full-burn-table');
  if (!el) return;
  if (!burns.length) {
    el.innerHTML = '<p class="text-center text-muted py-4">No burns recorded yet. First burn triggers at $50K market cap.</p>';
    return;
  }
  el.innerHTML = `
    <div class="table-responsive">
      <table class="table table-dark-glass mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Milestone</th>
            <th>Tokens Burned</th>
            <th>Dev Remaining</th>
            <th>TX Hash</th>
          </tr>
        </thead>
        <tbody>
          ${burns.map(b => `
            <tr>
              <td class="text-pink fw-bold">${b.id}</td>
              <td>${b.date}</td>
              <td>$${formatNum(b.milestone)}</td>
              <td class="text-pink fw-bold">${Number(b.amount).toLocaleString()}</td>
              <td>${Number(b.dev_remaining).toLocaleString()}</td>
              <td><a href="${b.solscan_url}" target="_blank" class="text-pink">View on Solscan <i class="bi bi-box-arrow-up-right"></i></a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderRewardTable(distributions) {
  const el = document.getElementById('reward-table');
  if (!el) return;
  if (!distributions.length) {
    el.innerHTML = '<p class="text-center text-muted py-4">No rewards distributed yet. Complete tasks to earn!</p>';
    return;
  }
  el.innerHTML = `
    <div class="table-responsive">
      <table class="table table-dark-glass mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Wallet</th>
            <th>Amount</th>
            <th>Tier</th>
            <th>TX Hash</th>
          </tr>
        </thead>
        <tbody>
          ${distributions.map(d => `
            <tr>
              <td class="text-pink fw-bold">${d.id}</td>
              <td>${d.date}</td>
              <td><code class="small">${d.wallet.substring(0,8)}...${d.wallet.substring(d.wallet.length-6)}</code></td>
              <td class="text-pink fw-bold">${(Number(d.amount) + (Number(d.bonus)||0)).toLocaleString()}</td>
              <td><span class="task-badge">${d.tier}</span></td>
              <td><a href="https://solscan.io/tx/${d.tx_hash}" target="_blank" class="text-pink">View <i class="bi bi-box-arrow-up-right"></i></a></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

async function loadRewardData() {
  try {
    const res  = await fetch('/api/get-rewards.php');
    const data = await res.json();
    updateEl('total-distributed', formatNum(data.distributed));
    updateEl('total-recipients', data.distributions.length);
    updateEl('community-fund', formatNum(data.communityFund - data.distributed));
    renderRewardTable(data.distributions);
  } catch (e) {
    console.warn('Reward data not yet available.', e);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const msg  = document.getElementById('form-msg');
  const data = new FormData(form);

  msg.style.display = 'block';
  msg.innerHTML = '<div class="alert alert-info">Submitting...</div>';

  fetch('/api/submit-task.php', { method: 'POST', body: data })
    .then(r => r.json())
    .then(res => {
      msg.innerHTML = res.success
        ? `<div class="alert alert-success">${res.message}</div>`
        : `<div class="alert alert-danger">${res.message}</div>`;
      if (res.success) form.reset();
    })
    .catch(() => {
      msg.innerHTML = `<div class="alert alert-danger">Submission failed. Please try again or contact us on Telegram.</div>`;
    });

  return false;
}

function formatNum(n) {
  n = Number(n);
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function updateEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

document.addEventListener('DOMContentLoaded', () => {
  loadSiteConfig();
  loadBurnData();
  if (document.getElementById('reward-table')) {
    loadRewardData();
  }
  if (document.getElementById('full-burn-table')) {
    loadBurnData();
  }
});
