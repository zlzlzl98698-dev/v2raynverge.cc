import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const COVERS_DIR = path.join(ROOT, 'public', 'images', 'covers');
const DOCS_DIR = path.join(ROOT, 'docs', 'seo-geo');

fs.mkdirSync(COVERS_DIR, { recursive: true });
fs.mkdirSync(DOCS_DIR, { recursive: true });

// 1. 生成 18 张现代编辑感 SVG 文章封面 (Minimal Editorial + Technical Blueprint)
const coverSpecs = [
  { file: 'default-editorial.svg', tag: 'V2RAYNVERGE.CC · EDITORIAL', title: 'v2rayn指南 · 网络工具与专线评测', sub: 'IEPL / IPLC / VLESS / Mihomo / Xray-core', accent: '#2563EB', bg2: '#DBEAFE' },
  { file: 'airport-recommend-2026.svg', tag: '2026 PILLAR REPORT', title: '2026 专线机场推荐与选型总览', sub: '31家独立去重品牌 · 晚高峰吞吐与每GB成本精算', accent: '#2563EB', bg2: '#E0E7FF' },
  { file: 'airport-ranking-benchmark.svg', tag: 'BENCHMARK &amp; RANKING', title: '2026 机场五维量化排行榜', sub: '香港21-27ms · 新加坡42-46ms · 真实测速拆解', accent: '#1D4ED8', bg2: '#DBEAFE' },
  { file: 'best-value-pricing.svg', tag: 'COST-PER-GB ANALYSIS', title: '高性价比机场与不限时流量包精算', sub: '年付小包折算 vs 18-25元月付主力档 vs 永久包', accent: '#0284C7', bg2: '#E0F2FE' },
  { file: 'iepl-iplc-stability.svg', tag: 'NETWORK ARCHITECTURE', title: 'IEPL 与 IPLC 企业级稳定专线解析', sub: '国内BGP入口 · 内网过境直连 · 晚高峰零丢包机制', accent: '#0F172A', bg2: '#E2E8F0' },
  { file: 'budget-cheap-airports.svg', tag: 'UNDER 10 YUAN GUIDE', title: '10元以内便宜机场与5.6元档审计', sub: '光速云/飞猫云/无忧链接/闪电鼠/大佬云边界实测', accent: '#0D9488', bg2: '#CCFBF1' },
  { file: 'free-nodes-security.svg', tag: 'SECURITY AUDIT', title: '免费梯子与公开节点池安全真相', sub: 'TLS嗅探 · DNS污染 · IP欺诈度与百元合规替代', accent: '#DC2626', bg2: '#FEE2E2' },
  { file: 'scientific-internet-2026.svg', tag: 'PROTOCOL EVOLUTION', title: '2026 科学上网协议与架构全景指南', sub: 'VLESS-Reality · Trojan · Hysteria 2 · 双栈分流', accent: '#4F46E5', bg2: '#E0E7FF' },
  { file: 'vpn-vs-airport-guide.svg', tag: 'ARCHITECTURE COMPARISON', title: '传统商业 VPN 与专线机场深度对比', sub: '连通率 · 规则分流粒度 · 专属客户端 vs 通用订阅', accent: '#7C3AED', bg2: '#EDE9FE' },
  { file: 'clash-ecosystem-2026.svg', tag: 'CLIENT KNOWLEDGE BASE', title: '2026 代理客户端全景生态与选型', sub: 'Win / Mac / Android / iOS / Linux / OpenWrt 20+工具', accent: '#2563EB', bg2: '#DBEAFE' },
  { file: 'runaway-warning-risk.svg', tag: 'RISK INTELLIGENCE', title: '机场跑路预警信号与主备双订阅风控', sub: '8大停服前兆识别 · 拒绝三年付陷阱 · 冗余备份架构', accent: '#D97706', bg2: '#FEF3C7' },
  { file: 'guangsuyun-review.svg', tag: 'IN-DEPTH BRAND REVIEW', title: '光速云 2026 深度评测与实测报告', sub: '2020老牌 · IEPL+企业内网双线 · VLESS · 147永久包', accent: '#2563EB', bg2: '#DBEAFE' },
  { file: 'feimao-muguang-review.svg', tag: 'BRAND REVIEW SERIES', title: '暮光加速与飞猫云实测对比解析', sub: 'BGP多设备通用订阅 vs 零门槛专属客户端即登即用', accent: '#0EA5E9', bg2: '#E0F2FE' },
  { file: 'v2rayn-complete-guide.svg', tag: 'WINDOWS &amp; DESKTOP GUIDE', title: 'v2rayN 2026 完整安装与分流教程', sub: 'Xray / sing-box 双核心切换 · 真连接测速 · TUN模式', accent: '#1E40AF', bg2: '#DBEAFE' },
  { file: 'clash-verge-rev-guide.svg', tag: 'CLASH VERGE REV MANUAL', title: 'Clash Verge Rev 下载、订阅导入与排障', sub: 'Tauri轻量架构 · Service Mode服务模式 · 本地覆写', accent: '#2563EB', bg2: '#E0E7FF' },
  { file: 'clash-meta-mihomo.svg', tag: 'MIHOMO CORE ENGINE', title: 'Clash Meta (Mihomo) 内核与 DNS 进阶配置', sub: 'Fake-IP防污染 · Sniffer域名嗅探 · AI精准分流规则', accent: '#4338CA', bg2: '#E0E7FF' },
  { file: 'troubleshooting-timeout.svg', tag: 'DIAGNOSTIC PLAYBOOK', title: '节点全部 Timeout 超时与断网急救手册', sub: 'NTP时间同步 · 代理端口冲突 · ERR_PROXY修复五步法', accent: '#E11D48', bg2: '#FFE4E6' },
  { file: 'comparison-matrix.svg', tag: 'HEAD-TO-HEAD MATRIX', title: '主流专线品牌与客户端多维横向对比', sub: '参数同台竞技 · 实测延迟带宽 · 适用场景精准匹配', accent: '#0F172A', bg2: '#F1F5F9' },
];

for (const spec of coverSpecs) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="60%" stop-color="#EFF6FF"/>
      <stop offset="100%" stop-color="${spec.bg2}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" stroke-width="0.7" stroke-opacity="0.45"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1030" cy="140" r="220" fill="${spec.accent}" fill-opacity="0.07"/>
  <circle cx="960" cy="480" r="160" fill="${spec.accent}" fill-opacity="0.05"/>
  <rect x="72" y="68" width="1056" height="494" rx="28" fill="#FFFFFF" fill-opacity="0.92" stroke="#E2E8F0" stroke-width="2"/>
  <rect x="120" y="124" width="320" height="42" rx="21" fill="${spec.accent}" fill-opacity="0.1"/>
  <text x="144" y="151" fill="${spec.accent}" font-family="system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="16" font-weight="700" letter-spacing="1.5">${spec.tag}</text>
  <text x="120" y="258" fill="#0F172A" font-family="system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="46" font-weight="800">${spec.title}</text>
  <text x="120" y="328" fill="#475569" font-family="system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="24" font-weight="500">${spec.sub}</text>
  <line x1="120" y1="395" x2="1080" y2="395" stroke="#E2E8F0" stroke-width="2"/>
  <rect x="120" y="432" width="180" height="54" rx="12" fill="${spec.accent}"/>
  <text x="150" y="466" fill="#FFFFFF" font-family="system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif" font-size="20" font-weight="700">v2rayn指南</text>
  <text x="324" y="466" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" font-weight="600">v2raynverge.cc · 独立数据审计与实测智库</text>
  <g transform="translate(860, 425)">
    <rect width="220" height="68" rx="14" fill="#0F172A"/>
    <circle cx="30" cy="34" r="7" fill="#10B981"/>
    <text x="50" y="30" fill="#94A3B8" font-family="ui-monospace, monospace" font-size="12">STATUS: VERIFIED</text>
    <text x="50" y="50" fill="#F8FAFC" font-family="ui-monospace, monospace" font-size="15" font-weight="700">2026 DATA MATRIX</text>
  </g>
</svg>`;
  fs.writeFileSync(path.join(COVERS_DIR, spec.file), svg, 'utf-8');
}

console.log('Generated', coverSpecs.length, 'SVG covers.');
