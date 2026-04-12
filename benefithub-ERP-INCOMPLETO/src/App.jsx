import { useState, useEffect, useRef } from "react";

// ─── DATA LAYER ────────────────────────────────────────────────────────────────
const MOCK_USER = {
  id: "USR-001",
  name: "Mateus Oliveira",
  role: "employee",
  company: "TechCorp Brasil",
  avatar: "MO",
  position: "Dev Back-end Sênior",
  department: "Engenharia",
  wallets: {
    alimentacao: { balance: 847.50, limit: 900, color: "#00C896", icon: "🛒", label: "Vale Alimentação" },
    refeicao: { balance: 312.00, limit: 600, color: "#FF6B35", icon: "🍽️", label: "Vale Refeição" },
    saude: { balance: 1200.00, limit: 1200, color: "#4A9EFF", icon: "🏥", label: "Convênio Saúde" },
    farmacia: { balance: 180.00, limit: 250, color: "#B85FFF", icon: "💊", label: "Convênio Farmácia" },
    academia: { balance: 99.00, limit: 99, color: "#FF4081", icon: "🏋️", label: "Academia" },
    homeoffice: { balance: 150.00, limit: 300, color: "#FFB300", icon: "🏠", label: "Home Office" },
    transporte: { balance: 250.00, limit: 400, color: "#FF9800", icon: "🚇", label: "Vale Transporte" },
  }
};

const TRANSACTIONS = [
  { id: 1, merchant: "Supermercado Extra", category: "alimentacao", amount: -89.40, date: "10/04/2026", time: "09:14", status: "approved", icon: "🛒", location: "São Paulo, SP" },
  { id: 2, merchant: "Restaurante Sabor & Arte", category: "refeicao", amount: -42.00, date: "10/04/2026", time: "12:32", status: "approved", icon: "🍽️", location: "São Paulo, SP" },
  { id: 3, merchant: "Droga Raia", category: "farmacia", amount: -67.80, date: "09/04/2026", time: "18:05", status: "approved", icon: "💊", location: "São Paulo, SP" },
  { id: 4, merchant: "Smart Fit Premium", category: "academia", amount: -99.00, date: "01/04/2026", time: "08:00", status: "approved", icon: "🏋️", location: "São Paulo, SP" },
  { id: 5, merchant: "Padaria Bella Aurora", category: "alimentacao", amount: -23.50, date: "09/04/2026", time: "07:45", status: "approved", icon: "🥐", location: "São Paulo, SP" },
  { id: 6, merchant: "iFood - McDonald's", category: "refeicao", amount: -38.90, date: "08/04/2026", time: "19:22", status: "blocked", icon: "🍔", location: "Online", blocked_reason: "Fora do horário permitido (11h–15h)" },
  { id: 7, merchant: "Hortifruti Natural da Terra", category: "alimentacao", amount: -156.30, date: "07/04/2026", time: "10:11", status: "approved", icon: "🥦", location: "São Paulo, SP" },
  { id: 8, merchant: "Amazon - Cadeira Ergonômica", category: "homeoffice", amount: -299.90, date: "05/04/2026", time: "14:30", status: "approved", icon: "🪑", location: "Online" },
];

const NOTIFICATIONS = [
  { id: 1, type: "warning", title: "Saldo baixo", message: "Seu Vale Refeição está em 52% do limite. Saldo atual: R$ 312,00", time: "2h atrás", read: false },
  { id: 2, type: "success", title: "Recarga realizada", message: "R$ 900,00 creditados no Vale Alimentação", time: "3 dias atrás", read: false },
  { id: 3, type: "error", title: "Pagamento bloqueado", message: "Tentativa no iFood recusada: fora do horário de refeição", time: "2 dias atrás", read: true },
  { id: 4, type: "info", title: "Novo benefício disponível", message: "Seu pacote Auxílio Home Office foi ativado. Saldo: R$ 300,00", time: "1 semana atrás", read: true },
];

const ANALYTICS_DATA = {
  monthly: [
    { month: "Nov", alimentacao: 756, refeicao: 520, saude: 1200, farmacia: 89 },
    { month: "Dez", alimentacao: 892, refeicao: 480, saude: 1200, farmacia: 215 },
    { month: "Jan", alimentacao: 710, refeicao: 598, saude: 800, farmacia: 140 },
    { month: "Fev", alimentacao: 834, refeicao: 456, saude: 1200, farmacia: 67 },
    { month: "Mar", alimentacao: 790, refeicao: 512, saude: 900, farmacia: 180 },
    { month: "Abr", alimentacao: 847, refeicao: 288, saude: 0, farmacia: 70 },
  ]
};

const COMPANY_EMPLOYEES = [
  { id: "E001", name: "Ana Costa", dept: "Marketing", alimentacao: 720, refeicao: 580, totalBenefits: 2899, trend: "up" },
  { id: "E002", name: "Bruno Silva", dept: "Vendas", alimentacao: 895, refeicao: 600, totalBenefits: 3210, trend: "stable" },
  { id: "E003", name: "Carla Santos", dept: "RH", alimentacao: 550, refeicao: 400, totalBenefits: 2100, trend: "down" },
  { id: "E004", name: "Daniel Ramos", dept: "TI", alimentacao: 880, refeicao: 590, totalBenefits: 3050, trend: "up" },
  { id: "E005", name: "Eduardo Lima", dept: "Financeiro", alimentacao: 670, refeicao: 450, totalBenefits: 2450, trend: "stable" },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0A0D14;
    --bg2: #10141F;
    --bg3: #161B28;
    --card: #1A2035;
    --card2: #1E2540;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --text: #F0F4FF;
    --text2: #8A93B0;
    --text3: #5A6380;
    --accent: #00E5A0;
    --accent2: #00B87A;
    --accent3: rgba(0,229,160,0.1);
    --accent4: rgba(0,229,160,0.05);
    --blue: #4A9EFF;
    --orange: #FF6B35;
    --purple: #B85FFF;
    --red: #FF4D6A;
    --yellow: #FFB300;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --r: 16px;
    --r2: 12px;
    --shadow: 0 8px 32px rgba(0,0,0,0.4);
    --glow: 0 0 24px rgba(0,229,160,0.15);
  }

  html, body, #root { height: 100%; background: var(--bg); color: var(--text); font-family: var(--font-body); }

  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  .app {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: var(--bg);
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 260px;
    min-width: 260px;
    background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    position: relative;
    z-index: 10;
  }

  .sidebar-logo {
    padding: 0 24px 28px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .logo-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--accent), #00A8FF);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 16px rgba(0,229,160,0.3);
  }

  .logo-text { font-family: var(--font-display); font-weight: 800; font-size: 18px; letter-spacing: -0.5px; }
  .logo-sub { font-size: 10px; color: var(--text3); font-weight: 500; letter-spacing: 1px; text-transform: uppercase; }

  .sidebar-section-label {
    font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--text3); padding: 16px 24px 8px; margin-top: 8px;
  }

  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 24px; cursor: pointer;
    transition: all 0.15s; position: relative;
    font-size: 14px; font-weight: 500; color: var(--text2);
    border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { color: var(--text); background: rgba(255,255,255,0.04); }
  .nav-item.active {
    color: var(--accent);
    background: var(--accent4);
  }
  .nav-item.active::before {
    content: '';
    position: absolute; left: 0; top: 4px; bottom: 4px;
    width: 3px; background: var(--accent); border-radius: 0 3px 3px 0;
  }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto; background: var(--red); color: white;
    font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 20px;
  }

  .sidebar-footer {
    margin-top: auto; padding: 20px 24px; border-top: 1px solid var(--border);
  }
  .user-card {
    display: flex; align-items: center; gap: 12px; cursor: pointer;
    padding: 10px; border-radius: var(--r2); transition: background 0.15s;
  }
  .user-card:hover { background: rgba(255,255,255,0.04); }
  .user-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--accent), var(--blue));
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; color: var(--bg);
  }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 11px; color: var(--text3); }

  /* ── Main ── */
  .main {
    flex: 1; overflow-y: auto; padding: 32px;
    display: flex; flex-direction: column; gap: 28px;
  }

  /* ── Header ── */
  .page-header {
    display: flex; align-items: flex-start; justify-content: space-between;
  }
  .page-title { font-family: var(--font-display); font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
  .page-subtitle { font-size: 14px; color: var(--text2); margin-top: 4px; }
  .header-actions { display: flex; gap: 10px; align-items: center; }

  .btn {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 18px; border-radius: var(--r2); cursor: pointer;
    font-family: var(--font-body); font-size: 13px; font-weight: 600;
    transition: all 0.15s; border: none; white-space: nowrap;
  }
  .btn-primary {
    background: var(--accent); color: var(--bg);
    box-shadow: 0 4px 16px rgba(0,229,160,0.25);
  }
  .btn-primary:hover { background: #00ffb3; box-shadow: 0 4px 20px rgba(0,229,160,0.4); transform: translateY(-1px); }
  .btn-ghost {
    background: var(--card); color: var(--text2); border: 1px solid var(--border);
  }
  .btn-ghost:hover { border-color: var(--border2); color: var(--text); }
  .btn-icon { padding: 10px; }
  .notif-btn {
    position: relative; background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r2); padding: 10px 14px; cursor: pointer;
    font-size: 16px; display: flex; align-items: center;
  }
  .notif-dot {
    position: absolute; top: 8px; right: 8px;
    width: 8px; height: 8px; border-radius: 50%; background: var(--red);
    border: 2px solid var(--bg2);
  }

  /* ── Cards ── */
  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r); padding: 24px;
  }
  .card-sm { padding: 18px; }
  .card-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 20px;
  }
  .card-title { font-family: var(--font-display); font-size: 15px; font-weight: 700; }
  .card-action { font-size: 12px; color: var(--accent); cursor: pointer; font-weight: 600; }
  .card-action:hover { text-decoration: underline; }

  /* ── Stats Row ── */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  .stat-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r); padding: 20px; position: relative; overflow: hidden;
    transition: all 0.2s;
  }
  .stat-card:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: var(--shadow); }
  .stat-card::after {
    content: ''; position: absolute; top: 0; right: 0;
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, var(--glow-color, rgba(0,229,160,0.08)) 0%, transparent 70%);
  }
  .stat-icon {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 14px;
  }
  .stat-value { font-family: var(--font-display); font-size: 24px; font-weight: 700; margin-bottom: 4px; }
  .stat-label { font-size: 12px; color: var(--text3); font-weight: 500; }
  .stat-trend {
    font-size: 11px; font-weight: 600; margin-top: 8px;
    display: flex; align-items: center; gap: 4px;
  }
  .trend-up { color: var(--accent); }
  .trend-down { color: var(--red); }

  /* ── Wallet Grid ── */
  .wallet-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .wallet-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r); padding: 20px; position: relative;
    overflow: hidden; transition: all 0.2s; cursor: pointer;
  }
  .wallet-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
  .wallet-bg {
    position: absolute; top: -20px; right: -20px;
    width: 100px; height: 100px; border-radius: 50%; opacity: 0.08;
  }
  .wallet-icon-wrap {
    width: 44px; height: 44px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center; font-size: 20px;
    margin-bottom: 16px;
  }
  .wallet-label { font-size: 12px; color: var(--text2); font-weight: 500; margin-bottom: 6px; }
  .wallet-balance { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin-bottom: 12px; }
  .progress-track {
    height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden;
  }
  .progress-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
  .wallet-pct { font-size: 11px; color: var(--text3); margin-top: 6px; }

  /* ── Transactions ── */
  .tx-list { display: flex; flex-direction: column; gap: 2px; }
  .tx-item {
    display: flex; align-items: center; gap: 14px;
    padding: 13px 16px; border-radius: var(--r2);
    transition: background 0.12s; cursor: pointer;
  }
  .tx-item:hover { background: rgba(255,255,255,0.03); }
  .tx-icon-wrap {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; font-size: 18px;
    flex-shrink: 0;
  }
  .tx-info { flex: 1; min-width: 0; }
  .tx-merchant { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tx-meta { font-size: 12px; color: var(--text3); margin-top: 2px; }
  .tx-right { text-align: right; flex-shrink: 0; }
  .tx-amount { font-family: var(--font-display); font-size: 15px; font-weight: 700; }
  .tx-amount.negative { color: var(--text); }
  .tx-status { font-size: 11px; margin-top: 3px; font-weight: 600; }
  .status-approved { color: var(--accent); }
  .status-blocked { color: var(--red); }

  /* ── Chart ── */
  .chart-bars {
    display: flex; align-items: flex-end; gap: 8px;
    height: 140px; padding: 0 4px;
  }
  .chart-group { flex: 1; display: flex; align-items: flex-end; gap: 3px; }
  .chart-bar {
    flex: 1; border-radius: 4px 4px 0 0;
    min-height: 4px; transition: opacity 0.15s;
    cursor: pointer; position: relative;
  }
  .chart-bar:hover { opacity: 0.8; }
  .chart-labels { display: flex; gap: 8px; margin-top: 10px; }
  .chart-label { flex: 1; text-align: center; font-size: 11px; color: var(--text3); }

  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text2); }
  .legend-dot { width: 8px; height: 8px; border-radius: 2px; }

  /* ── Rules Engine ── */
  .rule-item {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 16px; background: var(--bg3);
    border-radius: var(--r2); margin-bottom: 10px; border: 1px solid var(--border);
  }
  .rule-icon {
    width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;
  }
  .rule-info { flex: 1; }
  .rule-name { font-size: 13px; font-weight: 600; }
  .rule-desc { font-size: 12px; color: var(--text3); margin-top: 2px; }
  .toggle {
    width: 44px; height: 24px; border-radius: 12px;
    position: relative; cursor: pointer; transition: background 0.2s; flex-shrink: 0;
  }
  .toggle.on { background: var(--accent); }
  .toggle.off { background: var(--card2); }
  .toggle-thumb {
    position: absolute; top: 3px;
    width: 18px; height: 18px; border-radius: 50%; background: white;
    transition: left 0.2s;
  }
  .toggle.on .toggle-thumb { left: 23px; }
  .toggle.off .toggle-thumb { left: 3px; }

  /* ── Notifications ── */
  .notif-panel {
    position: fixed; top: 0; right: 0; bottom: 0; width: 380px;
    background: var(--bg2); border-left: 1px solid var(--border);
    z-index: 100; padding: 28px; overflow-y: auto;
    transform: translateX(100%); transition: transform 0.3s ease;
  }
  .notif-panel.open { transform: translateX(0); }
  .notif-item {
    padding: 14px; background: var(--card); border-radius: var(--r2);
    border: 1px solid var(--border); margin-bottom: 10px; cursor: pointer;
    transition: all 0.15s; position: relative;
  }
  .notif-item:hover { border-color: var(--border2); }
  .notif-item.unread { border-left: 3px solid var(--accent); }
  .notif-type-icon { font-size: 20px; margin-bottom: 8px; }
  .notif-title { font-size: 13px; font-weight: 700; margin-bottom: 4px; }
  .notif-msg { font-size: 12px; color: var(--text2); line-height: 1.5; }
  .notif-time { font-size: 11px; color: var(--text3); margin-top: 6px; }

  /* ── QR Simulator ── */
  .qr-modal {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center; z-index: 200;
    backdrop-filter: blur(8px);
  }
  .qr-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 24px; padding: 40px; text-align: center;
    max-width: 380px; width: 90%; animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .qr-box {
    width: 180px; height: 180px; margin: 24px auto;
    background: white; border-radius: 16px; padding: 16px;
    display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;
  }
  .qr-cell { border-radius: 1px; }

  /* ── Employee Table ── */
  .emp-table { width: 100%; border-collapse: collapse; }
  .emp-table th {
    font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
    color: var(--text3); padding: 10px 14px; text-align: left;
    border-bottom: 1px solid var(--border);
  }
  .emp-table td {
    padding: 13px 14px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.03);
  }
  .emp-table tr:hover td { background: rgba(255,255,255,0.02); }
  .emp-avatar {
    width: 32px; height: 32px; border-radius: 10px;
    background: linear-gradient(135deg, var(--accent), var(--blue));
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--bg);
  }

  /* ── Pill/Chip ── */
  .chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
  }
  .chip-green { background: rgba(0,229,160,0.1); color: var(--accent); }
  .chip-red { background: rgba(255,77,106,0.1); color: var(--red); }
  .chip-blue { background: rgba(74,158,255,0.1); color: var(--blue); }
  .chip-orange { background: rgba(255,107,53,0.1); color: var(--orange); }

  /* ── Grid helpers ── */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }

  /* ── Search ── */
  .search-wrap { position: relative; }
  .search-input {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--r2); padding: 10px 16px 10px 40px;
    color: var(--text); font-family: var(--font-body); font-size: 13px;
    outline: none; transition: border 0.15s; width: 220px;
  }
  .search-input:focus { border-color: var(--accent); }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--text3); }

  /* ── Divider ── */
  .divider { height: 1px; background: var(--border); margin: 4px 0; }

  /* ── Score ring ── */
  .score-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
  .score-ring svg { transform: rotate(-90deg); }
  .score-value { position: absolute; font-family: var(--font-display); font-size: 22px; font-weight: 700; }
  .score-label { font-size: 11px; color: var(--text3); }

  /* ── Overlay ── */
  .overlay { position: fixed; inset: 0; z-index: 90; }

  /* ── Flash animation ── */
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .pulse { animation: pulse 1.5s ease-in-out infinite; }

  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .fade-in { animation: fadeIn 0.3s ease forwards; }

  /* Scrollbar for main */
  .main::-webkit-scrollbar-track { background: var(--bg); }
`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);
const pct = (v, t) => Math.round((v / t) * 100);

const WALLET_COLORS = {
  alimentacao: "#00C896", refeicao: "#FF6B35", saude: "#4A9EFF",
  farmacia: "#B85FFF", academia: "#FF4081", homeoffice: "#FFB300"
};

// QR Grid
const QR_PATTERN = Array.from({ length: 49 }, (_, i) => {
  const r = Math.floor(i / 7), c = i % 7;
  const corner = (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
  return corner ? 1 : Math.random() > 0.5 ? 1 : 0;
});

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Toggle({ on, onClick }) {
  return (
    <div className={`toggle ${on ? "on" : "off"}`} onClick={onClick}>
      <div className="toggle-thumb" />
    </div>
  );
}

function WalletCard({ type, data, onClick }) {
  const p = pct(data.balance, data.limit);
  return (
    <div className="wallet-card" onClick={() => onClick(type)} style={{ borderColor: p < 30 ? "rgba(255,77,106,0.3)" : undefined }}>
      <div className="wallet-bg" style={{ background: data.color }} />
      <div className="wallet-icon-wrap" style={{ background: `${data.color}20` }}>
        <span style={{ fontSize: 22 }}>{data.icon}</span>
      </div>
      <div className="wallet-label">{data.label}</div>
      <div className="wallet-balance" style={{ color: data.color }}>{fmt(data.balance)}</div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${p}%`, background: p < 30 ? "var(--red)" : data.color }} />
      </div>
      <div className="wallet-pct">{p}% do limite · Limite: {fmt(data.limit)}</div>
    </div>
  );
}

function TxItem({ tx }) {
  const color = WALLET_COLORS[tx.category] || "#aaa";
  return (
    <div className="tx-item">
      <div className="tx-icon-wrap" style={{ background: `${color}18` }}>
        <span>{tx.icon}</span>
      </div>
      <div className="tx-info">
        <div className="tx-merchant">{tx.merchant}</div>
        <div className="tx-meta">{tx.date} · {tx.time} · {tx.location}</div>
      </div>
      <div className="tx-right">
        <div className="tx-amount negative">{fmt(tx.amount)}</div>
        <div className={`tx-status ${tx.status === "approved" ? "status-approved" : "status-blocked"}`}>
          {tx.status === "approved" ? "✓ Aprovado" : "✗ Bloqueado"}
        </div>
      </div>
    </div>
  );
}

function MiniBarChart() {
  const maxVal = 1200;
  const colors = [WALLET_COLORS.alimentacao, WALLET_COLORS.refeicao, WALLET_COLORS.saude, WALLET_COLORS.farmacia];
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {["Alimentação", "Refeição", "Saúde", "Farmácia"].map((l, i) => (
          <div key={l} className="legend-item">
            <div className="legend-dot" style={{ background: colors[i] }} />
            {l}
          </div>
        ))}
      </div>
      <div className="chart-bars">
        {ANALYTICS_DATA.monthly.map((m) => (
          <div key={m.month} className="chart-group">
            {[m.alimentacao, m.refeicao, m.saude, m.farmacia].map((v, i) => (
              <div key={i} className="chart-bar" style={{
                height: `${(v / maxVal) * 100}%`,
                background: colors[i], opacity: 0.85
              }} title={`${fmt(v)}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="chart-labels">
        {ANALYTICS_DATA.monthly.map(m => <div key={m.month} className="chart-label">{m.month}</div>)}
      </div>
    </div>
  );
}

function ScoreRing({ value, max, color, label, size = 100 }) {
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / max) * circ;
  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
          strokeWidth={7} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div className="score-value" style={{ color }}>{Math.round((value / max) * 100)}%</div>
      </div>
    </div>
  );
}

function QRModal({ onClose }) {
  const [step, setStep] = useState("idle"); // idle | scan | confirm | done
  const [amount, setAmount] = useState("89,50");
  const [wallet, setWallet] = useState("alimentacao");

  const simulate = () => {
    setStep("scan");
    setTimeout(() => setStep("confirm"), 1400);
  };
  const approve = () => {
    setStep("done");
    setTimeout(onClose, 2000);
  };

  return (
    <div className="qr-modal" onClick={onClose}>
      <div className="qr-card" onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>{step === "done" ? "✅" : "📱"}</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>
          {step === "idle" && "Simular Pagamento"}
          {step === "scan" && "Lendo QR Code..."}
          {step === "confirm" && "Confirmar Pagamento"}
          {step === "done" && "Pagamento Aprovado!"}
        </div>

        {step === "idle" && (
          <>
            <div className="qr-box">
              {QR_PATTERN.map((v, i) => (
                <div key={i} className="qr-cell" style={{ background: v ? "#000" : "#fff" }} />
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>Carteira</div>
              <select value={wallet} onChange={e => setWallet(e.target.value)}
                style={{ background: "var(--bg3)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", width: "100%", fontFamily: "var(--font-body)" }}>
                {Object.entries(MOCK_USER.wallets).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label} — {fmt(v.balance)}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancelar</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={simulate}>Simular Scan</button>
            </div>
          </>
        )}

        {step === "scan" && (
          <div style={{ padding: "40px 0" }}>
            <div className="pulse" style={{ fontSize: 48 }}>📷</div>
            <div style={{ color: "var(--text2)", marginTop: 12, fontSize: 14 }}>Identificando estabelecimento...</div>
          </div>
        )}

        {step === "confirm" && (
          <>
            <div style={{ background: "var(--bg3)", borderRadius: 12, padding: 20, margin: "20px 0", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 4 }}>Estabelecimento</div>
              <div style={{ fontWeight: 600, marginBottom: 16 }}>🛒 Supermercado Extra</div>
              <div style={{ fontSize: 13, color: "var(--text3)", marginBottom: 4 }}>Valor</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--accent)" }}>R$ {amount}</div>
              <div style={{ marginTop: 12, padding: "8px 12px", background: "rgba(0,229,160,0.08)", borderRadius: 8, fontSize: 12, color: "var(--accent)" }}>
                ✓ Regras verificadas · Saldo suficiente · Categoria permitida
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Recusar</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={approve}>Aprovar</button>
            </div>
          </>
        )}

        {step === "done" && (
          <div style={{ padding: "20px 0" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "var(--accent)", margin: "8px 0" }}>R$ {amount}</div>
            <div style={{ color: "var(--text2)", fontSize: 14 }}>Debitado do Vale Alimentação</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function Dashboard({ onPayment }) {
  const [compactView, setCompactView] = useState(false);
  const total = Object.values(MOCK_USER.wallets).reduce((a, w) => a + w.balance, 0);
  const totalLimit = Object.values(MOCK_USER.wallets).reduce((a, w) => a + w.limit, 0);

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Top stats */}
      <div className="stats-grid">
        {[
          { icon: "💰", label: "Saldo Total", value: fmt(total), trend: "+R$ 900 na última recarga", up: true, color: "var(--accent)", bg: "rgba(0,229,160,0.12)" },
          { icon: "📊", label: "Utilização do Mês", value: "68%", trend: "↑ 8% vs mês anterior", up: true, color: "var(--blue)", bg: "rgba(74,158,255,0.12)" },
          { icon: "🔄", label: "Transações (Abril)", value: "14", trend: "4 pendentes de saldo", up: false, color: "var(--orange)", bg: "rgba(255,107,53,0.12)" },
          { icon: "🛡️", label: "Pagamentos Bloqueados", value: "1", trend: "Fora do horário", up: false, color: "var(--red)", bg: "rgba(255,77,106,0.12)" },
        ].map((s) => (
          <div key={s.label} className="stat-card" style={{ "--glow-color": s.bg }}>
            <div className="stat-icon" style={{ background: s.bg }}>
              <span>{s.icon}</span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-trend ${s.up ? "trend-up" : "trend-down"}`}>
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Carteiras */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💳 Minhas Carteiras</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="btn btn-primary btn-icon" style={{ fontSize: 14, padding: "8px 16px" }} onClick={onPayment}>
              ⚡ Pagar Agora
            </button>
            <div className="chip chip-blue" style={{ fontSize: 11, padding: "4px 8px", cursor: "pointer", marginRight: 8 }} onClick={() => setCompactView(!compactView)}>
              {compactView ? "Visualização completa" : "Visualização compacta"}
            </div>
          </div>
        </div>
        <div className="wallet-grid" style={{ gridTemplateColumns: compactView ? "repeat(6, 1fr)" : "repeat(3, 1fr)" }}>
          {Object.entries(MOCK_USER.wallets).map(([k, v]) => (
            <WalletCard key={k} type={k} data={v} onClick={() => {}} />
          ))}
        </div>
      </div>

      {/* Charts + Transactions */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">📈 Gastos por Mês</div>
            <div className="card-action">Ver detalhes →</div>
          </div>
          <MiniBarChart />
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">🔄 Últimas Transações</div>
            <div className="card-action">Ver todas →</div>
          </div>
          <div className="tx-list">
            {TRANSACTIONS.slice(0, 5).map(tx => <TxItem key={tx.id} tx={tx} />)}
          </div>
        </div>
      </div>

      {/* Usage rings */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">🎯 Utilização dos Benefícios</div>
          <span className="chip chip-blue">Abril 2026</span>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {Object.entries(MOCK_USER.wallets).map(([k, v]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <ScoreRing value={v.balance} max={v.limit} color={v.color} size={90} />
              <div style={{ fontSize: 12, color: "var(--text2)", textAlign: "center" }}>{v.icon} {v.label.split(" ")[1] || v.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Goals */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">💰 Metas de Economia</div>
          <span className="chip chip-green">Meta mensal: Economizar 20%</span>
        </div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {Object.entries(MOCK_USER.wallets).map(([k, v]) => {
            const saved = v.limit - v.balance;
            const savingsRate = (saved / v.limit) * 100;
            const goalReached = savingsRate >= 20;
            return (
              <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", position: "relative" }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
                    <circle cx="40" cy="40" r="36" fill="none" stroke={v.color}
                      strokeWidth={8} strokeLinecap="round"
                      strokeDasharray="226" strokeDashoffset={`${226 * (1 - Math.min(savingsRate / 100, 1))}`}
                      style={{ transition: "stroke-dashoffset 0.8s ease" }} />
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: v.color }}>{Math.round(savingsRate)}%</div>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>{fmt(saved)} economizado</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "var(--text2)", textAlign: "center" }}>{v.icon} {v.label.split(" ")[1] || v.label}</div>
                <div style={{ marginTop: 8, fontSize: 11, color: goalReached ? "var(--accent)" : "var(--red)", fontWeight: 600 }}>
                  {goalReached ? "Meta atingida!" : "Continue economizando"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TransactionsPage() {
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [valueRange, setValueRange] = useState({ min: "", max: "" });

  const filtered = TRANSACTIONS.filter(tx => {
    // Category/status filter
    if (filter !== "all" && tx.category !== filter && tx.status !== filter) {
      return false;
    }

    // Date range filter
    if (dateRange.start || dateRange.end) {
      const txDate = new Date(tx.date.split('/').reverse().join('-')); // Convert dd/mm/yyyy to yyyy-mm-dd
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;

      if (startDate && txDate < startDate) return false;
      if (endDate && txDate > endDate) return false;
    }

    // Value range filter (absolute value since amounts are negative)
    if (valueRange.min || valueRange.max) {
      const absAmount = Math.abs(tx.amount);
      const minVal = valueRange.min ? parseFloat(valueRange.min) : 0;
      const maxVal = valueRange.max ? parseFloat(valueRange.max) : Infinity;

      if (absAmount < minVal || absAmount > maxVal) return false;
    }

    return true;
  });

  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="card">
        <div className="card-header">
          <div className="card-title">🔍 Filtros Avançados</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
          {/* Category filter */}
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>Categoria</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["all", "alimentacao", "refeicao", "farmacia", "blocked"].map(f => (
                <button key={f} className={`btn ${filter === f ? "btn-primary" : "btn-ghost"}`}
                  style={{ padding: "7px 12px", fontSize: 11 }}
                  onClick={() => setFilter(f)}>
                  {{ all: "Todas", alimentacao: "🛒 Alimentação", refeicao: "🍽️ Refeição", farmacia: "💊 Farmácia", blocked: "🚫 Bloqueadas" }[f]}
                </button>
              ))}
            </div>
          </div>

          {/* Date range filter */}
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>Período</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="date"
                value={dateRange.start || ""}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r2)", color: "var(--text)", padding: "8px 12px", fontSize: 13, minWidth: 100 }}
              />
              <span style={{ color: "var(--text2)", fontSize: 11 }}> até </span>
              <input
                type="date"
                value={dateRange.end || ""}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r2)", color: "var(--text)", padding: "8px 12px", fontSize: 13, minWidth: 100 }}
              />
            </div>
          </div>

          {/* Value range filter */}
          <div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>Valor (R$)</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="number"
                placeholder="Mín"
                value={valueRange.min || ""}
                onChange={(e) => setValueRange({ ...valueRange, min: e.target.value })}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r2)", color: "var(--text)", padding: "8px 12px", fontSize: 13, minWidth: 80 }}
              />
              <span style={{ color: "var(--text2)", fontSize: 11 }}> — </span>
              <input
                type="number"
                placeholder="Máx"
                value={valueRange.max || ""}
                onChange={(e) => setValueRange({ ...valueRange, max: e.target.value })}
                style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--r2)", color: "var(--text)", padding: "8px 12px", fontSize: 13, minWidth: 80 }}
              />
            </div>
          </div>

          {/* Clear filters button */}
          <div style={{ display: "flex", alignItems: "end" }}>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setFilter("all");
                setDateRange({ start: "", end: "" });
                setValueRange({ min: "", max: "" });
              }}
              style={{ padding: "8px 16px", fontSize: 12 }}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="tx-list">
          {filtered.map(tx => (
            <div key={tx.id}>
              <TxItem tx={tx} />
              {tx.blocked_reason && (
                <div style={{ margin: "0 16px 8px 70px", padding: "8px 12px", background: "rgba(255,77,106,0.08)", borderRadius: 8, fontSize: 12, color: "var(--red)" }}>
                  ⚠️ Motivo do bloqueio: {tx.blocked_reason}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text2)" }}>
              Nenhuma transação encontrada com os filtros aplicados
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RulesPage() {
  const [rules, setRules] = useState([
    { id: 1, icon: "🛒", name: "Vale Alimentação: apenas supermercados", desc: "Impede uso em restaurantes, farmácias e outros", on: true, category: "alimentacao" },
    { id: 2, icon: "⏰", name: "Vale Refeição: apenas 11h–15h", desc: "Transações fora desse horário são automaticamente bloqueadas", on: true, category: "refeicao" },
    { id: 3, icon: "📅", name: "Bloquear uso em fins de semana", desc: "Válido para vale refeição e alimentação", on: false, category: "geral" },
    { id: 4, icon: "💰", name: "Limite diário de R$ 200", desc: "Valor máximo por transação no vale alimentação", on: true, category: "alimentacao" },
    { id: 5, icon: "📍", name: "Apenas estabelecimentos cadastrados", desc: "Pagamentos somente em parceiros da rede", on: false, category: "geral" },
    { id: 6, icon: "🔔", name: "Alerta com saldo < 20%", desc: "Notificação automática quando saldo for baixo", on: true, category: "notificacao" },
    { id: 7, icon: "🏥", name: "Saúde: apenas clínicas e laboratórios", desc: "Farmácias não aceitas pelo convênio médico", on: true, category: "saude" },
  ]);
  const toggle = (id) => setRules(r => r.map(x => x.id === id ? { ...x, on: !x.on } : x));
  return (
    <div className="fade-in">
      <div className="card">
        <div className="card-header">
          <div className="card-title">⚙️ Motor de Regras Inteligentes</div>
          <button className="btn btn-primary" style={{ fontSize: 12, padding: "7px 14px" }}>+ Nova Regra</button>
        </div>
        <div style={{ color: "var(--text2)", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>
          Configure regras automáticas que controlam onde, quando e como os benefícios podem ser utilizados. Regras ativas são aplicadas em tempo real nas transações.
        </div>
        {rules.map(r => (
          <div key={r.id} className="rule-item">
            <div className="rule-icon">{r.icon}</div>
            <div className="rule-info">
              <div className="rule-name">{r.name}</div>
              <div className="rule-desc">{r.desc}</div>
            </div>
            <span className={`chip ${r.on ? "chip-green" : "chip-red"}`} style={{ marginRight: 12, fontSize: 10 }}>
              {r.on ? "ATIVO" : "INATIVO"}
            </span>
            <Toggle on={r.on} onClick={() => toggle(r.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmployeesPage() {
  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="stats-grid">
        {[
          { icon: "👥", label: "Total Funcionários", value: "247", color: "var(--accent)" },
          { icon: "💸", label: "Gasto Total Abril", value: "R$ 89.4K", color: "var(--blue)" },
          { icon: "📊", label: "Utilização Média", value: "74%", color: "var(--orange)" },
          { icon: "🚫", label: "Bloqueios no Mês", value: "12", color: "var(--red)" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: `${s.color}18` }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">👤 Funcionários</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="Buscar funcionário..." />
            </div>
            <button className="btn btn-primary" style={{ fontSize: 12, padding: "7px 14px" }}>+ Adicionar</button>
          </div>
        </div>
        <table className="emp-table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Departamento</th>
              <th>Alimentação</th>
              <th>Refeição</th>
              <th>Total Benefícios</th>
              <th>Tendência</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {COMPANY_EMPLOYEES.map(e => (
              <tr key={e.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="emp-avatar">{e.name.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text3)" }}>{e.id}</div>
                    </div>
                  </div>
                </td>
                <td><span className="chip chip-blue">{e.dept}</span></td>
                <td style={{ color: "var(--accent)" }}>{fmt(e.alimentacao)}</td>
                <td style={{ color: "var(--orange)" }}>{fmt(e.refeicao)}</td>
                <td style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{fmt(e.totalBenefits)}</td>
                <td>
                  <span className={`chip ${e.trend === "up" ? "chip-green" : e.trend === "down" ? "chip-red" : "chip-blue"}`}>
                    {e.trend === "up" ? "↑ Crescendo" : e.trend === "down" ? "↓ Caindo" : "→ Estável"}
                  </span>
                </td>
                <td><button className="btn btn-ghost" style={{ fontSize: 11, padding: "5px 10px" }}>Ver Perfil</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const totalMonth = 89400;
  const categories = [
    { label: "Vale Alimentação", value: 34200, max: 50000, color: WALLET_COLORS.alimentacao, icon: "🛒" },
    { label: "Vale Refeição", value: 28100, max: 40000, color: WALLET_COLORS.refeicao, icon: "🍽️" },
    { label: "Convênio Saúde", value: 18700, max: 20000, color: WALLET_COLORS.saude, icon: "🏥" },
    { label: "Farmácia", value: 8400, max: 15000, color: WALLET_COLORS.farmacia, icon: "💊" },
  ];
  return (
    <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-2">
        <div className="card">
          <div className="card-title" style={{ marginBottom: 20 }}>📊 Gastos por Categoria — Abril</div>
          {categories.map(c => (
            <div key={c.label} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13 }}>{c.icon} {c.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{fmt(c.value)}</span>
              </div>
              <div className="progress-track" style={{ height: 8 }}>
                <div className="progress-fill" style={{ width: `${(c.value / c.max) * 100}%`, background: c.color }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>{Math.round((c.value / c.max) * 100)}% do orçamento · Orçamento: {fmt(c.max)}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title" style={{ marginBottom: 20 }}>🏆 Top Utilizadores</div>
          {COMPANY_EMPLOYEES.map((e, i) => (
            <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 24, textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: i === 0 ? "#FFB300" : "var(--text3)", fontSize: 14 }}>
                {i + 1}
              </div>
              <div className="emp-avatar" style={{ width: 36, height: 36 }}>
                {e.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{e.name}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{e.dept}</div>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)" }}>{fmt(e.totalBenefits)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">📅 Histórico Semestral de Gastos</div>
        </div>
        <MiniBarChart />
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "🏠", label: "Dashboard" },
  { id: "wallets", icon: "💳", label: "Carteiras" },
  { id: "transactions", icon: "🔄", label: "Transações" },
  { id: "rules", icon: "⚙️", label: "Motor de Regras" },
  { id: "analytics", icon: "📊", label: "Analytics" },
  { id: "employees", icon: "👥", label: "Funcionários" },
];

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const TITLES = {
    dashboard: { title: "Dashboard", sub: `Olá, ${MOCK_USER.name} 👋 Veja um resumo dos seus benefícios` },
    wallets: { title: "Carteiras", sub: "Gerencie seus saldos e limites de benefícios" },
    transactions: { title: "Transações", sub: "Histórico completo de uso dos seus benefícios" },
    rules: { title: "Motor de Regras", sub: "Configure regras inteligentes para controle de uso" },
    analytics: { title: "Analytics", sub: "Relatórios e insights de utilização corporativa" },
    employees: { title: "Funcionários", sub: "Gestão de colaboradores e seus pacotes de benefícios" },
  };

  const t = TITLES[page];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">💼</div>
            <div>
              <div className="logo-text">BenefitHub</div>
              <div className="logo-sub">Corporate Benefits</div>
            </div>
          </div>

          <div className="sidebar-section-label">Menu Principal</div>
          {NAV.map(n => (
            <button key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`}
              onClick={() => setPage(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              {n.label}
              {n.id === "transactions" && <span className="nav-badge">1</span>}
            </button>
          ))}

          <div className="sidebar-section-label">Sistema</div>
          {[
            { icon: "🤝", label: "Convênios & Parceiros" },
            { icon: "🔔", label: "Notificações", badge: unread },
            { icon: "📋", label: "Relatórios" },
            { icon: "⚙️", label: "Configurações" },
          ].map(n => (
            <button key={n.label} className="nav-item" onClick={() => n.label === "Notificações" && setNotifOpen(true)}>
              <span className="nav-icon">{n.icon}</span>
              {n.label}
              {n.badge ? <span className="nav-badge">{n.badge}</span> : null}
            </button>
          ))}

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">{MOCK_USER.avatar}</div>
              <div>
                <div className="user-name">{MOCK_USER.name}</div>
                <div className="user-role">{MOCK_USER.position}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, padding: "6px 10px", background: "var(--accent4)", borderRadius: 8, border: "1px solid rgba(0,229,160,0.15)" }}>
              <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>{MOCK_USER.company}</div>
              <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 1 }}>{MOCK_USER.department}</div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main">
          <div className="page-header">
            <div>
              <div className="page-title">{t.title}</div>
              <div className="page-subtitle">{t.sub}</div>
            </div>
            <div className="header-actions">
              <button className="btn btn-ghost" style={{ fontSize: 13 }}>📥 Exportar</button>
              <div className="notif-btn" onClick={() => setNotifOpen(true)}>
                🔔 {unread > 0 && <span className="notif-dot" />}
              </div>
              <button className="btn btn-primary" onClick={() => setQrOpen(true)}>⚡ Pagar</button>
            </div>
          </div>

          {page === "dashboard" && <Dashboard onPayment={() => setQrOpen(true)} />}
          {page === "wallets" && (
            <div className="fade-in">
              <div className="wallet-grid" style={{ marginBottom: 24 }}>
                {Object.entries(MOCK_USER.wallets).map(([k, v]) => (
                  <WalletCard key={k} type={k} data={v} onClick={() => {}} />
                ))}
              </div>
              <div className="card">
                <div className="card-title" style={{ marginBottom: 16 }}>💡 Sugestões Inteligentes</div>
                {[
                  { icon: "⚠️", msg: "Seu Vale Refeição está com saldo baixo. Solicite recarga com o RH.", color: "var(--orange)" },
                  { icon: "✅", msg: "Vale Alimentação com bom saldo. Você tem 53 dias até o próximo ciclo.", color: "var(--accent)" },
                  { icon: "🏋️", msg: "Academia renovada automaticamente. Próxima cobrança: 01/05.", color: "var(--blue)" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: "var(--bg3)", borderRadius: 10, marginBottom: 8, border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <span style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{s.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {page === "transactions" && <TransactionsPage />}
          {page === "rules" && <RulesPage />}
          {page === "analytics" && <AnalyticsPage />}
          {page === "employees" && <EmployeesPage />}
        </main>

        {/* Notification Panel */}
        {notifOpen && <div className="overlay" onClick={() => setNotifOpen(false)} />}
        <div className={`notif-panel ${notifOpen ? "open" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 }}>Notificações</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{unread} não lidas</div>
            </div>
            <button className="btn btn-ghost btn-icon" onClick={() => setNotifOpen(false)}>✕</button>
          </div>
          {NOTIFICATIONS.map(n => (
            <div key={n.id} className={`notif-item ${n.read ? "" : "unread"}`}>
              <div className="notif-type-icon">
                {{ warning: "⚠️", success: "✅", error: "❌", info: "ℹ️" }[n.type]}
              </div>
              <div className="notif-title">{n.title}</div>
              <div className="notif-msg">{n.message}</div>
              <div className="notif-time">{n.time}</div>
            </div>
          ))}
        </div>

        {/* QR Modal */}
        {qrOpen && <QRModal onClose={() => setQrOpen(false)} />}
      </div>
    </>
  );
}
