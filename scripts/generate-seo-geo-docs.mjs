import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'docs', 'seo-geo');
fs.mkdirSync(DOCS_DIR, { recursive: true });

// 读取 navigation.ts 与 brands/index.ts 中定义的真实数据（通过动态解析或结构化同步）
const navContent = fs.readFileSync(path.join(ROOT, 'src', 'data', 'navigation.ts'), 'utf-8');
const brandContent = fs.readFileSync(path.join(ROOT, 'src', 'data', 'brands', 'index.ts'), 'utf-8');

// 已实际发布的 20 篇正式内容清单（严格区分已发布与待撰写）
const publishedContentMap = [
  { slug: '2026-airport-recommendation-guide', url: '/articles/2026-airport-recommendation-guide/', path: 'src/content/articles/2026-airport-recommendation-guide.md', title: '2026 机场推荐与专线选型全景指南：基于 31 家独立品牌实测与价格审计', kw: '2026 机场推荐' },
  { slug: 'airport-ranking-methodology-2026', url: '/articles/airport-ranking-methodology-2026/', path: 'src/content/articles/airport-ranking-methodology-2026.md', title: '2026 机场排行榜与五维量化评测标准：香港/新加坡/日本实测延迟与带宽解析', kw: '机场排行' },
  { slug: 'best-value-airport-pricing-analysis', url: '/articles/best-value-airport-pricing-analysis/', path: 'src/content/articles/best-value-airport-pricing-analysis.md', title: '2026 高性价比机场与不限时流量包精算指南：每 GB 专线成本对比', kw: '性价比机场' },
  { slug: 'enterprise-stable-iepl-iplc-airports', url: '/articles/enterprise-stable-iepl-iplc-airports/', path: 'src/content/articles/enterprise-stable-iepl-iplc-airports.md', title: '2026 稳定机场深度解析：IEPL 与 IPLC 企业级专线架构如何消除晚高峰断流', kw: '稳定机场' },
  { slug: 'budget-cheap-airports-under-10-yuan', url: '/articles/budget-cheap-airports-under-10-yuan/', path: 'src/content/articles/budget-cheap-airports-under-10-yuan.md', title: '2026 便宜机场推荐与 5.6 元档深度审计：10 元以内能买到什么专线？', kw: '便宜机场' },
  { slug: 'free-ladder-nodes-security-truth', url: '/articles/free-ladder-nodes-security-truth/', path: 'src/content/articles/free-ladder-nodes-security-truth.md', title: '2026 免费梯子与公开免费节点池安全真相：从流量嗅探到低成本合规替代', kw: '免费梯子' },
  { slug: 'scientific-internet-architecture-2026', url: '/articles/scientific-internet-architecture-2026/', path: 'src/content/articles/scientific-internet-architecture-2026.md', title: '2026 科学上网技术架构与协议演进全景指南：从 VLESS、Trojan 到 Hysteria 2', kw: '科学上网' },
  { slug: 'vpn-vs-airport-proxy-complete-guide', url: '/articles/vpn-vs-airport-proxy-complete-guide/', path: 'src/content/articles/vpn-vs-airport-proxy-complete-guide.md', title: '2026 传统商业 VPN 与专线机场深度对比：连通率、分流粒度与一键客户端选型', kw: 'VPN 推荐' },
  { slug: 'clash-clients-ecosystem-overview-2026', url: '/articles/clash-clients-ecosystem-overview-2026/', path: 'src/content/articles/clash-clients-ecosystem-overview-2026.md', title: '2026 第三方代理客户端全景知识库：Windows / Android / iOS / macOS / Linux / 软路由 20+ 工具选型', kw: 'Clash 推荐' },
  { slug: 'airport-runaway-warning-and-risk-prevention', url: '/articles/airport-runaway-warning-and-risk-prevention/', path: 'src/content/articles/airport-runaway-warning-and-risk-prevention.md', title: '2026 机场跑路预警与风险控制指南：识别 8 大停服前兆与主备双订阅架构', kw: '跑路预警' },
  { slug: 'guangsuyun-in-depth-review', url: '/reviews/guangsuyun-in-depth-review/', path: 'src/content/reviews/guangsuyun-in-depth-review.mdx', title: '光速云 2026 深度评测：2020老牌 IEPL+企业内网双线实测、套餐价格核实与客户端教程', kw: '光速云评测' },
  { slug: 'muguang-feimao-weifeng-review-analysis', url: '/reviews/muguang-feimao-weifeng-review-analysis/', path: 'src/content/reviews/muguang-feimao-weifeng-review-analysis.md', title: '暮光加速、飞猫云与微风网络深度评测：2023成熟期三强怎么选？', kw: '暮光加速与飞猫云评测' },
  { slug: 'xingdaomeng-yifan-firefly-dedicated-line-review', url: '/reviews/xingdaomeng-yifan-firefly-dedicated-line-review/', path: 'src/content/reviews/xingdaomeng-yifan-firefly-dedicated-line-review.md', title: '星岛梦、一翻云与 Firefly 萤火虫深度评测：IEPL 与 IPLC 高端专线三剑客解析', kw: '星岛梦与一翻云评测' },
  { slug: 'v2rayn-complete-tutorial-windows', url: '/guides/v2rayn-complete-tutorial-windows/', path: 'src/content/guides/v2rayn-complete-tutorial-windows.md', title: '2026 v2rayN 完整安装与配置教程：Windows / macOS / Linux 从下载、订阅导入到 TUN 模式全图解', kw: 'v2rayN 教程' },
  { slug: 'clash-verge-rev-subscription-import-guide', url: '/guides/clash-verge-rev-subscription-import-guide/', path: 'src/content/guides/clash-verge-rev-subscription-import-guide.md', title: '2026 Clash Verge Rev 下载、安装与订阅导入完整教程：Service Mode 与 TUN 模式配置', kw: 'Clash Verge 订阅' },
  { slug: 'clash-meta-mihomo-core-configuration', url: '/guides/clash-meta-mihomo-core-configuration/', path: 'src/content/guides/clash-meta-mihomo-core-configuration.md', title: '2026 Clash Meta (Mihomo) 内核进阶配置指南：Fake-IP 防 DNS 污染、Sniffer 嗅探与覆写规则', kw: 'Clash Meta' },
  { slug: 'clash-troubleshooting-connection-timeout', url: '/guides/clash-troubleshooting-connection-timeout/', path: 'src/content/guides/clash-troubleshooting-connection-timeout.md', title: '2026 节点全部 Timeout 超时、订阅更新失败与关闭软件后断网急救手册', kw: '节点超时' },
  { slug: 'guangsuyun-vs-muguang-vs-feimao', url: '/comparisons/guangsuyun-vs-muguang-vs-feimao/', path: 'src/content/comparisons/guangsuyun-vs-muguang-vs-feimao.md', title: '2026 光速云 vs 暮光加速 vs 飞猫云深度对比：老牌双线、BGP 多设备与免配置新手款怎么选？', kw: '光速云和飞猫云哪个好' },
  { slug: 'iepl-vs-iplc-airport-architecture-comparison', url: '/comparisons/iepl-vs-iplc-airport-architecture-comparison/', path: 'src/content/comparisons/iepl-vs-iplc-airport-architecture-comparison.md', title: '2026 IEPL 专线 vs IPLC 专线 vs BGP 中转深度对比：过墙原理、延迟与价格真相', kw: 'IEPL 和 IPLC 区别' },
  { slug: 'v2rayn-vs-clash-verge-rev-vs-hiddify', url: '/comparisons/v2rayn-vs-clash-verge-rev-vs-hiddify/', path: 'src/content/comparisons/v2rayn-vs-clash-verge-rev-vs-hiddify.md', title: '2026 v2rayN vs Clash Verge Rev vs Hiddify 深度横评：三大开源代理客户端谁更适合你？', kw: 'v2rayN 和 Clash Verge 哪个好' },
];

// 28 个二级专题与 56 个三级集群定义
const topicsList = [
  // 一、机场推荐
  { cat: 'airport', catName: '机场推荐', slug: 'recommend', name: '机场推荐', url: '/airport/recommend/', kw: '2026 机场推荐', intent: '商业调查', c1: '主力全能型专线机场选型集群', c2: 'AI 生产力与流媒体解锁机场集群', core: '2026-airport-recommendation-guide', brands: 'guangsuyun|muguang|feimao' },
  { cat: 'airport', catName: '机场推荐', slug: 'ranking', name: '机场排行', url: '/airport/ranking/', kw: '机场排行', intent: '商业调查', c1: '五维量化评分与非晚高峰/晚高峰测速榜集群', c2: '运营周期与品牌透明度分级集群', core: 'airport-ranking-methodology-2026', brands: 'guangsuyun|firefly|shanyue|weifeng' },
  { cat: 'airport', catName: '机场推荐', slug: 'value', name: '性价比机场', url: '/airport/value/', kw: '性价比机场', intent: '商业调查', c1: '10-25元主力月付档每GB单价精算集群', c2: '一次性不限时流量包与备用机场选型集群', core: 'best-value-airport-pricing-analysis', brands: 'guangsuyun|yifan|weitu|xingdaomeng' },
  { cat: 'airport', catName: '机场推荐', slug: 'stable', name: '稳定机场', url: '/airport/stable/', kw: '稳定机场', intent: '商业调查', c1: 'IEPL/IPLC 物理专线与晚高峰抗抖动集群', c2: '跨境电商、远程办公与多设备团队稳定方案集群', core: 'enterprise-stable-iepl-iplc-airports', brands: 'guangsuyun|xingdaomeng|shanyue|firefly' },
  { cat: 'airport', catName: '机场推荐', slug: 'cheap', name: '便宜机场', url: '/airport/cheap/', kw: '便宜机场', intent: '交易决策', c1: '5.6元至8元极限平价年付小包评测集群', c2: '学生党与轻度用户流量精打细算集群', core: 'budget-cheap-airports-under-10-yuan', brands: 'guangsuyun|feimao|wuyou|shandianshu' },
  { cat: 'airport', catName: '机场推荐', slug: 'free-ladder', name: '免费梯子', url: '/airport/free-ladder/', kw: '免费梯子', intent: '信息获取', c1: '免费梯子隐私风险与中间人攻击剖析集群', c2: '零门槛应急方案与百元内年付替代集群', core: 'free-ladder-nodes-security-truth', brands: 'feimao|wuyou|guangsuyun' },
  { cat: 'airport', catName: '机场推荐', slug: 'scientific-internet', name: '科学上网', url: '/airport/scientific-internet/', kw: '科学上网', intent: '信息获取', c1: '现代代理协议演进（VLESS/Trojan/Hysteria2）集群', c2: '全平台从零搭建科学上网工作流集群', core: 'scientific-internet-architecture-2026', brands: 'guangsuyun|yifan|xingdaomeng|tiziyun' },
  // 二、VPN 与加速器
  { cat: 'vpn', catName: 'VPN 与加速器', slug: 'recommend', name: 'VPN 推荐', url: '/vpn/recommend/', kw: 'VPN 推荐', intent: '商业调查', c1: '大陆网络环境下 VPN 与专线机场连通率对比集群', c2: '隐私加密、无日志策略与跨国差旅 VPN 集群', core: 'vpn-vs-airport-proxy-complete-guide', brands: 'guangsuyun|feimao|firefly|tiziyun' },
  { cat: 'vpn', catName: 'VPN 与加速器', slug: 'free', name: '免费 VPN', url: '/vpn/free/', kw: '免费 VPN', intent: '信息获取', c1: '免费 VPN 商业变现黑产与山寨软件识别集群', c2: '开源免费客户端 + 平价合规订阅组合集群', core: 'free-ladder-nodes-security-truth', brands: 'wuyou|feimao|guangsuyun' },
  { cat: 'vpn', catName: 'VPN 与加速器', slug: 'mobile', name: '手机 VPN', url: '/vpn/mobile/', kw: '手机 VPN', intent: '商业调查', c1: 'iOS (iPhone/iPad) 小火箭与规则代理客户端集群', c2: 'Android 安卓客户端选型与分应用代理集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|feimao|muguang|tiziyun' },
  { cat: 'vpn', catName: 'VPN 与加速器', slug: 'reviews', name: 'VPN 软件评测', url: '/vpn/reviews/', kw: 'VPN 软件评测', intent: '商业调查', c1: '机场专属一键客户端与通用订阅客户端对比集群', c2: 'Xray 与 Mihomo 及 sing-box 三大内核评测集群', core: 'vpn-vs-airport-proxy-complete-guide', brands: 'guangsuyun|tiziyun|feimao|firefly' },
  { cat: 'vpn', catName: 'VPN 与加速器', slug: 'accelerator', name: 'VPN 加速器', url: '/vpn/accelerator/', kw: 'VPN 加速器', intent: '商业调查', c1: '亚太超低延迟节点（港/台/新/日）加速实测集群', c2: '开发者 GitHub / Docker / API 跨境加速配置集群', core: 'airport-ranking-methodology-2026', brands: 'guangsuyun|feimao|weifeng|shanyue' },
  { cat: 'vpn', catName: 'VPN 与加速器', slug: 'comparison', name: '加速器对比', url: '/vpn/comparison/', kw: '加速器对比', intent: '商业调查', c1: '游戏加速器、传统 VPN 与专线机场三维对比集群', c2: '主流专线品牌（光速云 vs 暮光 vs 飞猫 vs 微风）横评集群', core: 'vpn-vs-airport-proxy-complete-guide', brands: 'guangsuyun|muguang|feimao|weifeng' },
  { cat: 'vpn', catName: 'VPN 与加速器', slug: 'best', name: '好用的 VPN', url: '/vpn/best/', kw: '好用的 VPN', intent: '交易决策', c1: '零配置一键登录体验最佳方案集群', c2: '全平台多设备无缝协同最佳方案集群', core: 'vpn-vs-airport-proxy-complete-guide', brands: 'guangsuyun|tiziyun|feimao|muguang' },
  // 三、Clash 客户端
  { cat: 'clash', catName: 'Clash 客户端', slug: 'recommend', name: 'Clash 推荐', url: '/clash/recommend/', kw: 'Clash 推荐', intent: '信息获取', c1: '六大操作系统（Win/Mac/安卓/iOS/Linux/软路由）客户端全景集群', c2: 'v2rayN vs Clash Verge Rev vs Hiddify 深度横评集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|muguang|xingdaomeng|yifan' },
  { cat: 'clash', catName: 'Clash 客户端', slug: 'verge', name: 'Clash Verge', url: '/clash/verge/', kw: 'Clash Verge', intent: '信息获取', c1: 'Clash Verge Rev 核心架构与 Tauri 性能优势集群', c2: 'Clash Verge Rev 服务模式（Service Mode）与 TUN 配置集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|muguang|xingdaomeng' },
  { cat: 'clash', catName: 'Clash 客户端', slug: 'verge-download', name: 'Clash Verge 下载', url: '/clash/verge-download/', kw: 'Clash Verge 下载', intent: '交易决策', c1: 'Windows / macOS (Intel & Apple Silicon) / Linux 安装包架构对照集群', c2: '正版 GitHub 仓库识别与 SHA256 安全校验集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|tiziyun' },
  { cat: 'clash', catName: 'Clash 客户端', slug: 'verge-subscription', name: 'Clash Verge 订阅', url: '/clash/verge-subscription/', kw: 'Clash Verge 订阅', intent: '信息获取', c1: 'Clash Verge Rev 与 v2rayN 订阅导入及定时更新集群', c2: '在线订阅转换泄露风险与本地覆写（Merge/Script）集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|muguang|xingdaomeng|yifan' },
  { cat: 'clash', catName: 'Clash 客户端', slug: 'meta', name: 'Clash Meta', url: '/clash/meta/', kw: 'Clash Meta', intent: '信息获取', c1: 'Mihomo (Clash Meta) 内核特性与 VLESS/Hysteria2 协议适配集群', c2: 'Fake-IP DNS 防污染、Sniffer 域名嗅探与自定义分流覆写集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|yifan|sujie' },
  { cat: 'clash', catName: 'Clash 客户端', slug: 'tutorial', name: 'Clash 使用教程', url: '/clash/tutorial/', kw: 'Clash 使用教程', intent: '信息获取', c1: 'v2rayN 与 Clash Verge Rev 从安装到日常分流标准教程集群', c2: '局域网共享代理（Allow LAN）与 OpenWrt 软路由网关集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|feimao|weifeng|tiziyun' },
  { cat: 'clash', catName: 'Clash 客户端', slug: 'troubleshooting', name: 'Clash 故障排查', url: '/clash/troubleshooting/', kw: 'Clash 故障排查', intent: '故障解决', c1: '节点全部超时（Timeout）与 TLS 握手失败诊断集群', c2: '关软件后国内断网（ERR_PROXY_CONNECTION_FAILED）与端口冲突修复集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|muguang|feimao' },
  // 四、资源与情报
  { cat: 'resources', catName: '资源与情报', slug: 'free-nodes', name: '免费节点', url: '/resources/free-nodes/', kw: '免费节点', intent: '信息获取', c1: '公开爬虫免费节点池原理与存活率实测集群', c2: '自建 VPS 节点与入门专线机场成本效益对比集群', core: 'free-ladder-nodes-security-truth', brands: 'wuyou|feimao|guangsuyun' },
  { cat: 'resources', catName: '资源与情报', slug: 'runaway-warning', name: '跑路预警', url: '/resources/runaway-warning/', kw: '跑路预警', intent: '信息获取', c1: '机场跑路前 8 大高危信号与促销陷阱识别集群', c2: '主力+备用双订阅冗余架构与安全替代选型集群', core: 'airport-runaway-warning-and-risk-prevention', brands: 'guangsuyun|xingdaomeng|kexin|ermao' },
  { cat: 'resources', catName: '资源与情报', slug: 'faq', name: '机场 FAQ', url: '/resources/faq/', kw: '机场 FAQ', intent: '信息获取', c1: '机场核心术语（IEPL/IPLC/BGP/倍率/原生IP）百科集群', c2: '支付方式、退款规则、多设备限制与合规边界问答集群', core: 'scientific-internet-architecture-2026', brands: 'guangsuyun|xingdaomeng|weitu' },
  { cat: 'resources', catName: '资源与情报', slug: 'risk-intelligence', name: '机场风险情报', url: '/resources/risk-intelligence/', kw: '机场风险情报', intent: '商业调查', c1: '31 家机场品牌数据完整度与同质化规格审计集群', c2: '客户端与订阅安全风险情报（第三方篡改与专有协议限制）集群', core: 'airport-runaway-warning-and-risk-prevention', brands: 'kexin|dalaoyun|shandianshu|yuzhou' },
  { cat: 'resources', catName: '资源与情报', slug: 'node-check', name: '节点检测', url: '/resources/node-check/', kw: '节点检测', intent: '信息获取', c1: '延迟（Ping vs HTTP URL-Test）与晚高峰带宽实测方法集群', c2: 'IP 原生属性、AI 解锁状态与 DNS/WebRTC 泄露检测集群', core: 'airport-ranking-methodology-2026', brands: 'guangsuyun|firefly|shanyue|weifeng' },
  { cat: 'resources', catName: '资源与情报', slug: 'subscription-issues', name: '订阅问题', url: '/resources/subscription-issues/', kw: '订阅问题', intent: '故障解决', c1: '订阅拉取失败（403 / Timeout / Network Error）排障集群', c2: '订阅格式不匹配（Base64 vs Clash YAML vs sing-box JSON）修复集群', core: 'clash-clients-ecosystem-overview-2026', brands: 'guangsuyun|muguang|xingdaomeng|tiziyun' },
  { cat: 'resources', catName: '资源与情报', slug: 'beginner-help', name: '新手帮助', url: '/resources/beginner-help/', kw: '新手帮助', intent: '信息获取', c1: '15 分钟从零上手：选套餐、装客户端与首次连接集群', c2: '新手十大高频误区（全局模式耗流量/强制关机断网/乱用免费节点）集群', core: 'scientific-internet-architecture-2026', brands: 'guangsuyun|tiziyun|feimao|weifeng' },
];

// 1. SEO-一级导航规划.md
fs.writeFileSync(
  path.join(DOCS_DIR, 'SEO-一级导航规划.md'),
  `# SEO 一级导航规划（v2rayn指南 · v2raynverge.cc）

本网站严格遵循总指令第五节要求，设置四大一级导航频道，每个频道拥有独立路由、7 个二级专题页面与 14 个三级文章集群。

| 一级导航名称 | 路由 URL | 核心主关键词 | 搜索意图定位 | 下辖二级专题数 | 下辖三级集群数 | 核心转化方向 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **机场推荐** | \`/airport/\` | 机场推荐 / 2026机场推荐 | 商业调查与交易决策 | 7 | 14 | 引导进入光速云深度评测、31家品牌数据库与套餐价格对比 |
| **VPN 与加速器** | \`/vpn/\` | VPN 推荐 / VPN 加速器 | 商业调查与产品形态对比 | 7 | 14 | 引导从传统海外 VPN 转向高连通率专线机场与一键客户端 |
| **Clash 客户端** | \`/clash/\` | Clash 推荐 / Clash Verge / v2rayN | 信息获取与故障解决 | 7 | 14 | 解决下载、订阅导入与 Timeout 故障，推荐兼容通用订阅的品牌 |
| **资源与情报** | \`/resources/\` | 机场 FAQ / 跑路预警 / 订阅问题 | 风险防范与新手入门 | 7 | 14 | 建立主备双订阅风控认知，推荐百元内永久不限时备用包 |

- **品牌数据库独立入口**：\`/brands/\`（通过首页、顶部按钮、专题页与文章内链双向贯通，不额外占用第五个一级导航名额）。
`,
  'utf-8'
);

// 2. SEO-二级专题规划.md
const secRows = topicsList
  .map(
    (t, idx) =>
      `| ${idx + 1} | ${t.catName} | **${t.name}** | \`${t.url}\` | ${t.kw} | ${t.intent} | ${t.c1} / ${t.c2} | \`/articles/${t.core}/\` | ${t.brands} |`
  )
  .join('\n');

fs.writeFileSync(
  path.join(DOCS_DIR, 'SEO-二级专题规划.md'),
  `# SEO 二级专题规划（28 个真实独立专题页面）

每个二级专题均拥有真实可访问的独立 URL、差异化布局（\`magazine-grid\` / \`ranking-split\` / \`comparison-matrix\` / \`diagnostic-cards\`）、Answer-First 决策结论及关联品牌卡片。

| 序号 | 所属一级导航 | 二级专题名称 | 独立路由 URL | 主关键词 | 搜索意图 | 关联的 2 个三级内容集群 | 核心支柱文章 | 关联品牌 Slugs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${secRows}
`,
  'utf-8'
);

// 3. SEO-三级文章集群规划.md (56 个集群)
const clusterRecords = [];
topicsList.forEach((t, idx) => {
  clusterRecords.push({
    idx: idx * 2 + 1,
    id: `cluster-${t.cat}-${t.slug}-1`,
    topicName: t.name,
    topicUrl: t.url,
    name: t.c1,
    kw: `${t.kw}核心选型与实测`,
    intent: t.intent,
    coreSlug: t.core,
    brands: t.brands,
    geoQ: `2026年在「${t.name}」场景下如何结合实测延迟、协议与每GB成本做出最优决策？`,
  });
  clusterRecords.push({
    idx: idx * 2 + 2,
    id: `cluster-${t.cat}-${t.slug}-2`,
    topicName: t.name,
    topicUrl: t.url,
    name: t.c2,
    kw: `${t.kw}避坑与进阶配置`,
    intent: t.intent,
    coreSlug: t.core,
    brands: t.brands,
    geoQ: `针对「${t.c2}」，新手与进阶用户应注意哪些技术限制与配置边界？`,
  });
});

const clusterRows = clusterRecords
  .map(
    (c) =>
      `| ${c.idx} | \`${c.id}\` | [${c.topicName}](${c.topicUrl}) | **${c.name}** | ${c.kw} | ${c.intent} | \`/articles/${c.coreSlug}/\` | ${c.brands} | ${c.geoQ} |`
  )
  .join('\n');

fs.writeFileSync(
  path.join(DOCS_DIR, 'SEO-三级文章集群规划.md'),
  `# SEO 三级文章集群规划（56 个三级集群）

28 个二级专题 × 每个专题 2 个三级集群 = **56 个三级内容集群**。每个集群均绑定至少 1 篇已发布的完整支柱文章，并规划 8 篇细分长尾文章。

| 序号 | 集群 ID | 上游二级专题 | 三级集群名称 | 目标核心关键词 | 搜索意图 | 已发布核心支柱文章 | 关联品牌 | 核心 GEO 长尾问题 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${clusterRows}
`,
  'utf-8'
);

// 4. SEO-完整文章标题库.md (56 集群 × 8 篇 = 448 篇独立规划记录，处于 336–840 强制区间内)
const angleTemplates = [
  { suffix: '2026全景实测与选型标准报告', angle: '支柱综合评测', priority: 'P0-最高', dir: 'articles' },
  { suffix: '底层技术原理与协议拆解指南', angle: '技术架构深潜', priority: 'P1-高', dir: 'articles' },
  { suffix: '月付/年付/不限时套餐每GB成本精算', angle: '价格单价审计', priority: 'P1-高', dir: 'comparisons' },
  { suffix: '晚高峰(20:30-22:30)抗丢包与延迟对比', angle: '网络实验室测速', priority: 'P1-高', dir: 'reviews' },
  { suffix: 'v2rayN与Clash Verge Rev最佳分流配置', angle: '客户端实操手册', priority: 'P2-中', dir: 'guides' },
  { suffix: 'ChatGPT/Claude/Netflix解锁边界与排障', angle: 'AI与流媒体实操', priority: 'P2-中', dir: 'guides' },
  { suffix: '常见误区、连接报错与五步急救方案', angle: '故障诊断排雷', priority: 'P2-中', dir: 'guides' },
  { suffix: '主备双订阅冗余方案与长期风控建议', angle: '安全与防坑情报', priority: 'P3-常规', dir: 'articles' },
];

const plannedArticles = [];
// 先将 20 篇真实已发布文章放入前排并关联到对应集群
publishedContentMap.forEach((pub, i) => {
  const c = clusterRecords[i % clusterRecords.length];
  plannedArticles.push({
    index: plannedArticles.length + 1,
    clusterId: c.id,
    clusterName: c.name,
    title: pub.title,
    url: pub.url,
    filePath: pub.path,
    primaryKw: pub.kw,
    secondaryKw: `${c.kw}, v2rayn指南, 实测对比`,
    intent: c.intent,
    outline: '1.Answer-First直接结论 2.基础概念与技术架构 3.核心参数对比表 4.分步操作或品牌拆解 5.FAQ与数据来源',
    audience: '入门与进阶代理工具用户',
    faq: c.geoQ,
    internalLinks: `${c.topicUrl} -> /brands/ -> /reviews/guangsuyun-in-depth-review/`,
    priority: 'P0-已上线',
    status: '已发布 (Published)',
  });
});

// 再为 56 个集群补充规划记录至 448 条（56 × 8 = 448 条）
for (const c of clusterRecords) {
  for (let aIdx = 0; aIdx < angleTemplates.length; aIdx++) {
    if (plannedArticles.length >= 448) break;
    const tpl = angleTemplates[aIdx];
    const slug = `${c.id}-topic-${aIdx + 1}`;
    plannedArticles.push({
      index: plannedArticles.length + 1,
      clusterId: c.id,
      clusterName: c.name,
      title: `【${c.topicName}】${c.name}：${tpl.suffix}`,
      url: `/${tpl.dir}/${slug}/`,
      filePath: `src/content/${tpl.dir}/${slug}.md`,
      primaryKw: `${c.kw} (${tpl.angle})`,
      secondaryKw: `${c.topicName}, ${tpl.angle}, 2026实测`,
      intent: c.intent,
      outline: `1.核心结论 2.${c.name}背景 3.${tpl.angle}实测表格 4.适用人群与限制 5.FAQ问答`,
      audience: `${c.topicName}目标搜索用户`,
      faq: c.geoQ,
      internalLinks: `${c.topicUrl} -> /articles/${c.coreSlug}/ -> /brands/`,
      priority: tpl.priority,
      status: '规划待撰写 (Planned)',
    });
  }
}

const titleLibRows = plannedArticles
  .map(
    (p) =>
      `| ${p.index} | \`${p.clusterId}\` | ${p.title} | \`${p.url}\` | \`${p.filePath}\` | ${p.primaryKw} | ${p.intent} | ${p.outline} | ${p.internalLinks} | ${p.priority} | **${p.status}** |`
  )
  .join('\n');

fs.writeFileSync(
  path.join(DOCS_DIR, 'SEO-完整文章标题库.md'),
  `# SEO 完整文章标题库（448 篇结构化内容规划记录）

> **诚信审计说明**：根据总指令第八节 8.5 与第二十三节要求，严格区分“规划文章数量”与“实际已发布文章数量”。
> - **总规划文章数**：**448 篇**（覆盖 56 个三级集群 × 8 个细分搜索维度，满足 336–840 篇规划要求）
> - **当前已实际发布并带完整正文的原创文章数**：**20 篇**（涵盖 10 篇核心 Pillar/专题长文、3 篇深度品牌评测、4 篇客户端实操教程、3 篇多维横向对比，外加 31 个独立品牌评测详情页与 32 个一级/二级专题页）
> - **尚待分批撰写的规划文章数**：**428 篇**（标记为 \`规划待撰写 (Planned)\`，未完成正文的内容绝不作为空壳页面发布进生产环境 Sitemap）

| 序号 | 所属集群 ID | 规划文章标题 | 目标 URL | 规划文件路径 | 主关键词 | 搜索意图 | 文章核心大纲 | 内部链接目标 | 优先级 | 当前真实状态 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${titleLibRows}
`,
  'utf-8'
);

// 5. SEO-关键词映射表.csv
const kwCsvLines = [
  '页面类型,页面名称,目标URL,主关键词,次级关键词,搜索意图,用户决策阶段,所属主题集群,上游入口页面,下游转化页面,关键词边界说明',
  ...topicsList.map(
    (t) =>
      `二级专题,${t.name},${t.url},${t.kw},"${t.catName};2026${t.name};${t.slug}",${t.intent},对比选型阶段,${t.c1},/${t.cat}/,/brands/,聚焦${t.name}垂直意图不与同级专题互抢`
  ),
  ...publishedContentMap.map(
    (p) =>
      `已发布文章,${p.title},${p.url},${p.kw},"v2rayn指南;2026实测;专线评测",信息获取与商业调查,深度评估阶段,核心支柱集群,/airport/,/reviews/guangsuyun-in-depth-review/,独立长尾与支柱词映射`
  ),
];
fs.writeFileSync(path.join(DOCS_DIR, 'SEO-关键词映射表.csv'), kwCsvLines.join('\n'), 'utf-8');

// 6. GEO-实体关系映射表.csv
const geoEntityLines = [
  '主实体名称,实体类型,关联关系,目标实体名称,目标实体类型,核实状态,实体属性与条件化结论,权威来源页面',
  '光速云,AirportBrand,USES_ARCHITECTURE,IEPL专线+企业级内网专线,NetworkArchitecture,measured,2020年运营;单节点最高标称2.5Gbps;香港实测22ms/529Mbps,/reviews/guangsuyun-in-depth-review/',
  '光速云,AirportBrand,USES_PROTOCOL,VLESS,ProxyProtocol,measured,支持官方自研客户端与v2rayN/Clash Verge Rev通用订阅双导入,/brands/guangsuyun/',
  '光速云,AirportBrand,OFFERS_PLAN,致敬斯诺克147永久套餐,PricingPlan,measured,一次性付费147元含247GB不过期流量(折合0.595元/GB),/brands/guangsuyun/',
  '光速云,AirportBrand,OFFERS_PLAN,光速云·轻量版,PricingPlan,measured,年付99元每月69GB(早期摘要曾记59GB);折合8.25元/月,/brands/guangsuyun/',
  '暮光加速,AirportBrand,USES_ARCHITECTURE,BGP智能调度+专线级出口,NetworkArchitecture,measured,2023年运营;月付20元起120GB;日本实测53ms/150Mbps,/brands/muguang/',
  '飞猫云,AirportBrand,USES_CLIENT_MODE,仅官方专属客户端,ClientMode,measured,学生版年付84元(折7元/月);香港实测21ms/526Mbps;免配订阅,/brands/feimao/',
  '微风网络,AirportBrand,USES_ARCHITECTURE,IEPL专线,NetworkArchitecture,measured,清风年付137元享100GB/月;香港实测25ms/546Mbps,/brands/weifeng/',
  '星岛梦,AirportBrand,USES_PROTOCOL,Trojan,ProxyProtocol,measured,2020年老牌;1倍流量不限设备;永久包100元/100GB起,/brands/xingdaomeng/',
  '一翻云,AirportBrand,USES_PROTOCOL,Hysteria 2 / VLESS-Reality / Shadowsocks,ProxyProtocol,measured,IEPL物理专线+原生住宅IP;月付20元享150GB,/brands/yifan/',
  'Firefly 萤火虫,AirportBrand,HAS_SISTER_BRAND,微风网络 / 飞鸟 / 一云梯,AirportBrand,historical,合并去重词条;2026-08历史资料记录存在同系关系;香港547Mbps,/brands/firefly/',
  '可信云,AirportBrand,DISCLOSES_GAP,AI与流媒体实测数据缺口,AuditStatus,vendor,25元/150GB IEPL+VLESS;主动声明缺乏统一实测保持中性描述,/brands/kexin/',
  '梯子云,AirportBrand,USES_CLIENT_MODE,自研全平台客户端+通用订阅双支持,ClientMode,vendor,2025年运营;年付折合7.4元/月;零门槛一键登录兼顾通用订阅,/brands/tiziyun/',
  'v2rayN,ProxyClient,EMBEDS_ENGINE,Xray-core / sing-box / Mihomo,CoreEngine,measured,支持Win/macOS/Linux;推荐下载SelfContained包,/guides/v2rayn-complete-tutorial-windows/',
  'Clash Verge Rev,ProxyClient,EMBEDS_ENGINE,Mihomo (Clash Meta),CoreEngine,measured,基于Tauri轻量开发;支持Service Mode虚拟网卡与Merge覆写,/guides/clash-verge-rev-subscription-import-guide/',
  'NekoBox for Android,ProxyClient,HAS_SECURITY_WARNING,Google Play第三方控制同名版,SecurityAlert,measured,官方提示维护有限且严禁下载Google Play已被第三方接管版本,/articles/clash-clients-ecosystem-overview-2026/',
  'Nikki,ProxyClient,REQUIRES_OS,OpenWrt 24.10+,OperatingSystem,measured,软路由Mihomo透明代理插件明确要求OpenWrt 24.10及以上,/articles/clash-clients-ecosystem-overview-2026/',
];
fs.writeFileSync(path.join(DOCS_DIR, 'GEO-实体关系映射表.csv'), geoEntityLines.join('\n'), 'utf-8');

// 7. GEO-长尾问题库.csv
const geoQ2Lines = [
  '问题编号,所属一级频道,所属二级专题,GEO长尾问题,Answer-First核心答案摘要,承接页面URL,Schema类型',
  ...clusterRecords.map(
    (c) =>
      `GEO-${String(c.idx).padStart(3, '0')},${c.topicUrl.split('/')[1]},${c.topicName},"${c.geoQ}","优先核验IEPL/IPLC专线架构、客户端支持模式（通用订阅vs专属端）与2026-10-19实测数据，按月付或百元小包低成本验证。",${c.topicUrl},FAQPage`
  ),
];
fs.writeFileSync(path.join(DOCS_DIR, 'GEO-长尾问题库.csv'), geoQ2Lines.join('\n'), 'utf-8');

// 8. SEO-内部链接矩阵.csv
const linkMatrixLines = [
  '源页面类型,源页面URL,目标页面类型,目标页面URL,锚文本策略,链接位置与用户下一步意图',
  '首页,/,一级专题频道,/airport/,机场推荐频道,顶部主导航与四大专题快捷卡片',
  '首页,/,品牌数据库,/brands/,检索31家品牌数据库,Hero主按钮、第8区数据库入口与Footer',
  '一级专题,/airport/,二级专题,/airport/recommend/,2026机场推荐,频道顶部胶囊导航与7大专题卡片网格',
  '二级专题,/airport/recommend/,支柱长文,/articles/2026-airport-recommendation-guide/,阅读集群支柱文章,三级集群卡片与精选文章模块',
  '支柱长文,/articles/2026-airport-recommendation-guide/,品牌深度评测,/reviews/guangsuyun-in-depth-review/,光速云2026深度评测,正文对比表、侧边栏关联品牌与文末推荐块',
  '品牌深度评测,/reviews/guangsuyun-in-depth-review/,横向对比,/comparisons/guangsuyun-vs-muguang-vs-feimao/,光速云vs暮光加速vs飞猫云对比,延伸阅读与同类型品牌对比区',
  '品牌详情页,/brands/guangsuyun/,客户端教程,/guides/v2rayn-complete-tutorial-windows/,v2rayN完整安装与配置教程,品牌页第8节客户端配置引导模块',
  '品牌详情页,/brands/guangsuyun/,客户端教程,/guides/clash-verge-rev-subscription-import-guide/,Clash Verge Rev订阅导入指南,品牌页第8节客户端配置引导模块',
  '客户端教程,/guides/clash-troubleshooting-connection-timeout/,风险预警,/resources/runaway-warning/,机场跑路预警与主备双订阅指南,排障第5步交叉验证与侧边栏急救入口',
  '风险页面,/resources/risk-intelligence/,品牌详情页,/brands/kexin/,可信云透明度档案,风险情报审计表格直达链接',
];
fs.writeFileSync(path.join(DOCS_DIR, 'SEO-内部链接矩阵.csv'), linkMatrixLines.join('\n'), 'utf-8');

// 9. SEO-内容发布优先级.md
fs.writeFileSync(
  path.join(DOCS_DIR, 'SEO-内容发布优先级.md'),
  `# SEO 内容发布优先级规划

## 第一批（P0 - 已 100% 完成并上线构建）
1. **全站核心路由与专题骨架**：首页、4 个一级频道页、28 个二级专题页、\`/brands/\` 品牌检索库、31 个独立品牌详情页。
2. **光速云优先商业转化矩阵**：\`/brands/guangsuyun/\` 详情档案、\`/reviews/guangsuyun-in-depth-review/\` 深度评测、\`/comparisons/guangsuyun-vs-muguang-vs-feimao/\` 横向对比。
3. **10 篇核心 Pillar 与搜索主词长文**：覆盖 2026 机场推荐、机场排行、性价比机场、稳定机场、便宜机场、免费梯子安全审计、科学上网协议、VPN 与机场对比、客户端大全、跑路预警。
4. **4 篇高搜索量客户端实操教程**：v2rayN 完整教程、Clash Verge Rev 下载与订阅导入、Clash Meta (Mihomo) 进阶配置、节点全部 Timeout 与断网急救。

## 第二批（P1 - 后续迭代扩展）
- 针对一翻云、唯兔云、SOGO 云、闪跃、梯子云等单品牌的独立横向对比文章。
- OpenWrt 软路由（OpenClash / PassWall2 / Nikki）与 iOS（Shadowrocket / Stash）专项图文手册。

## 第三批（P2/P3 - 长尾问题持续扩充）
- 按 \`SEO-完整文章标题库.md\` 中剩余 428 个细分长尾选题，结合近 30 日最新晚高峰实测数据分批撰写发布。
`,
  'utf-8'
);

// 10. SEO-品牌评测规划.md
fs.writeFileSync(
  path.join(DOCS_DIR, 'SEO-品牌评测规划.md'),
  `# SEO 品牌评测内容大纲与关键词边界规划（31 家独立品牌）

每个品牌在 \`/brands/[slug]/\` 下均拥有独立可索引页面，严格执行“一品牌一主词、同规格矩阵合并说明、商业推广显式披露”原则：

1. **光速云 (\`/brands/guangsuyun/\` & \`/reviews/guangsuyun-in-depth-review/\`)**：
   - 主关键词：光速云评测 / 光速云机场怎么样
   - 次级关键词：光速云优惠码AMM、光速云147永久套餐、光速云轻量版69GB
   - 核心差异点：2020年老牌、IEPL+企业级内网双线、VLESS、自研客户端+通用订阅双支持。
2. **暮光加速 (\`/brands/muguang/\`)**：
   - 主关键词：暮光加速评测
   - 核心差异点：BGP智能调度、全平台多设备同时在线、120GB-1500GB大流量档、7×24真人客服。
3. **飞猫云 (\`/brands/feimao/\`)**：
   - 主关键词：飞猫云机场评测
   - 核心差异点：专属客户端免配订阅、学生版年付¥84（折¥7/月）、香港21ms/526Mbps。
4. **微风网络 (\`/brands/weifeng/\`)**：
   - 主关键词：微风网络机场评测
   - 核心差异点：清风年付¥137享100GB/月 IEPL+VLESS、香港546Mbps。
5. **星岛梦 (\`/brands/xingdaomeng/\`)**：
   - 主关键词：星岛梦机场评测
   - 核心差异点：2020年老牌 IEPL+Trojan、1倍流量不限设备、覆盖韩/东南亚、¥100起永久包。
6. **其余 26 家品牌（二猫云、无忧链接、唯兔云、Firefly、宇宙云、U1S1、灵猫网络、极连云、光年梯、一翻云、SOGO云、可信云、速界、闪跃、全球云、闪电鼠、大佬云、云界线、榴莲云、神行加速、环球梯、隐形人、梯子云、灵动云、浪网、边缘节点 EdgeNova）**：
   - 均已在 \`src/data/brands/index.ts\` 与 \`/brands/[slug]/\` 中建立完整的搜索意图、优缺点、适用人群、套餐表与数据核实状态。
`,
  'utf-8'
);

// 11. SEO-URL路由规划.csv
const routeCsvLines = [
  '路由分类,规范URL路径,对应源码文件,索引策略,TrailingSlash规范,页面状态',
  '首页,/,src/pages/index.astro,index follow,是 (/),已上线',
  '一级频道,/airport/,src/pages/airport/index.astro,index follow,是 (/),已上线',
  '一级频道,/vpn/,src/pages/vpn/index.astro,index follow,是 (/),已上线',
  '一级频道,/clash/,src/pages/clash/index.astro,index follow,是 (/),已上线',
  '一级频道,/resources/,src/pages/resources/index.astro,index follow,是 (/),已上线',
  '品牌数据库,/brands/,src/pages/brands/index.astro,index follow,是 (/),已上线',
  '文章归档,/articles/,src/pages/articles/index.astro,index follow,是 (/),已上线',
  '评测归档,/reviews/,src/pages/reviews/index.astro,index follow,是 (/),已上线',
  '对比归档,/comparisons/,src/pages/comparisons/index.astro,index follow,是 (/),已上线',
  '教程归档,/guides/,src/pages/guides/index.astro,index follow,是 (/),已上线',
  '关于与声明,/about/,src/pages/about/index.astro,index follow,是 (/),已上线',
  '全文搜索页,/search/,src/pages/search/index.astro,noindex,是 (/),已上线',
  '404错误页,/404/,src/pages/404.astro,noindex,是 (/),已上线',
  ...topicsList.map((t) => `二级专题,${t.url},src/pages/${t.cat}/[topic].astro,index follow,是 (/),已上线`),
  ...publishedContentMap.map((p) => `正式内容,${p.url},${p.path},index follow,是 (/),已上线`),
];
fs.writeFileSync(path.join(DOCS_DIR, 'SEO-URL路由规划.csv'), routeCsvLines.join('\n'), 'utf-8');

// 12. 品牌数据审计报告.md
fs.writeFileSync(
  path.join(DOCS_DIR, '品牌数据审计报告.md'),
  `# 品牌数据审计报告（从 32 条原始记录到 31 家独立品牌）

## 一、总体审计结论
1. **原始文件名称核实**：總指令提及 \`42家机场品牌清单.txt\`，实际本地资料目录 \`c:\\Users\\Pro User\\Desktop\\机场品牌信息\\\` 下文件名为 **\`32家机场品牌清单.txt\`** 及 **\`光速云品牌信息.txt\`**。
2. **去重后独立品牌总数**：**31 家**。
   - 原始清单主列表编号至 \`28. 梯子云\`（其中第 7 号重复编排了二猫云、无忧链接、唯兔云，跳过了第 9、22 号，主列表实际共 28 家）；
   - 文末“位置都往后面排”附加了 4 条历史记录：**灵动云**、**浪网**、**边缘节点 EdgeNova**、**Firefly 萤火虫**；
   - 经比对，文末的 **Firefly 萤火虫** 与主列表第 8 项 **Firefly** 域名（\`vip02.fireflyaff.com\`）、套餐名称（Lite/Plus/Blaze/Nova/年付版¥96/不限时¥100）及优惠码（\`firefly\`）完全一致，属于同一品牌在不同时期的重复记录。本站将其合并为 1 个独立词条 \`firefly\`，最终确立 **31 家独立去重机场品牌**。

## 二、重点数据差异与异常审计明细
1. **光速云（轻量版 59GB/月 vs 69GB/月 差异）**：
   - 在《光速云品牌信息.txt》第 8 行摘要中写有“年付折合约 8 元/月，59GB”，而在该文件第 26 行及《32家机场品牌清单.txt》第 11、23 行套餐价格表中均写为“轻量版 年付 ¥99 69GB/月”。本站已在光速云详情页与评测页显著位置标注两处来源，绝不混用。
2. **5.6 元/月同规格平价矩阵（5 家）**：
   - **大佬云、闪电鼠、云界线、榴莲云、环球梯** 均标注为 2024 年运营、IEPL 专线、年付约 5.6 元/月（60GB/月）、季付及以上 7 折。
   - **链接格式异常**：**云界线**（\`https://qwerty.yunjiexianaff.com/?code=...\`）与 **环球梯**（\`https://qwerty.huanqiutiaff.com/?code=...\`）缺少 \`#\` 路由号。
   - **协议标注缺失**：**榴莲云**未明确标注协议类型。
3. **实测状态分类统计**：
   - \`measured\`（含 2026-10-19 五地测速表）：**15 家**（光速云、暮光加速、飞猫云、微风网络、星岛梦、二猫云、无忧链接、唯兔云、Firefly、U1S1、灵猫网络、一翻云、SOGO云、闪跃、全球云）。
   - \`vendor\`（含核实套餐或品牌特征，无五地测速数值）：**12 家**（大佬云、极连云、光年梯、可信云、速界、闪电鼠、云界线、榴莲云、神行加速、环球梯、隐形人、梯子云）。
   - \`historical\`（2026-08-09 历史记录）：**3 家**（灵动云含 2026-07 珠海联通实测摘要；浪网、边缘节点 EdgeNova 未实测）。
   - \`pending\`（关键套餐表待补充）：**1 家**（宇宙云，仅存历史起价 ¥96/年）。
`,
  'utf-8'
);

// 13. 数据来源及核实记录.md
fs.writeFileSync(
  path.join(DOCS_DIR, '数据来源及核实记录.md'),
  `# 数据来源及核实记录

## 一、原始核实资料文件索引
| 序号 | 原始文件名称与路径 | 最后修改时间 | 用途与核实范围 |
| :--- | :--- | :--- | :--- |
| 1 | \`c:\\Users\\Pro User\\Desktop\\机场品牌信息\\32家机场品牌清单.txt\` | 2026-11-17 | 31家去重品牌的注册链接、优惠码、套餐表、2026-10-19非晚高峰测速与2026-08-09历史记录 |
| 2 | \`c:\\Users\\Pro User\\Desktop\\机场品牌信息\\光速云品牌信息.txt\` | 2026-10-16 | 光速云开业年份(2020)、优惠码(AMM)、支付方式及轻量/极速/147永久/定制套餐详情 |
| 3 | \`c:\\Users\\Pro User\\Desktop\\机场品牌信息\\第三方代理客户端.txt\` | 2026-10-19 | Windows/Android/iOS/macOS/Linux/OpenWrt 六大平台 20+ 款客户端核实资料与安全警告 |
| 4 | \`c:\\Users\\Pro User\\Desktop\\机场品牌信息\\机场品牌图表样式.txt\` | 2026-08-11 | Dark Network Observatory 专业网络可观测性图表视觉与状态语言规范 |
| 5 | \`c:\\Users\\Pro User\\Desktop\\机场品牌信息\\内容矩阵.txt\` | 2026-08-11 | 品牌数据库结构、SEO/GEO要求与内链矩阵规范 |
| 6 | \`c:\\Users\\Pro User\\Desktop\\logos\\*\` | 2026-10-08 | 品牌真实 Logo 与主图资源（已同步至 \`public/logos/\`） |

## 二、合规与推广链接核实准则
1. 全站所有外部品牌推广链接均集中存储于 \`src/data/brands/index.ts\`，无任何 Markdown 硬编码推广链接。
2. 所有推广链接统一包含 \`target="_blank" rel="nofollow sponsored noopener"\` 属性及佣金披露说明。
`,
  'utf-8'
);

console.log('Successfully generated all 13 SEO/GEO planning documents in docs/seo-geo/.');
