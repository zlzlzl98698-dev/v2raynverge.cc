export const SITE_CONFIG = {
  domain: 'v2raynverge.cc',
  siteUrl: 'https://v2raynverge.cc',
  deployMirrorUrl: 'https://clash-cloud.run',
  brandName: 'v2rayn指南',
  brandTagline: '中文机场与 VPN 专业评测媒体 · 代理客户端知识库 · 品牌评测数据库',
  language: 'zh-CN',
  locale: 'zh_CN',
  defaultAuthor: 'v2rayn指南网络评测室',
  editorialTeam: 'v2rayn指南独立实验室与协议工程组',
  contactEmail: 'editorial@v2raynverge.cc',
  updatedDate: '2026-11-18',
  verifiedDate: '2026-10-19',
  verifications: {
    google: process.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.PUBLIC_BING_SITE_VERIFICATION || '',
    baidu: process.env.PUBLIC_BAIDU_SITE_VERIFICATION || '',
    shenma: process.env.PUBLIC_SHENMA_SITE_VERIFICATION || '',
  },
  description:
    'v2rayn指南（v2raynverge.cc）是专注于中文机场推荐、31家专线与中转品牌横向评测、v2rayN 与 Clash Verge Rev 客户端深度教程、订阅排障及 AI/流媒体节点可用性观测的原创卡片式技术评测媒体。',
  keywords: [
    'v2rayn指南',
    'v2rayN教程',
    '机场推荐',
    '2026机场推荐',
    '机场排行',
    '性价比机场',
    '稳定机场',
    '便宜机场',
    'Clash Verge',
    'Clash Verge下载',
    'Clash Verge订阅',
    'Clash Meta',
    'VPN推荐',
    '科学上网',
    '光速云评测',
  ],
  disclosure: {
    affiliateNotice:
      '含推广链接，通过链接注册可能为本站带来佣金，不影响用户支付价格。',
    editorialIndependence:
      '商业推广优先级仅影响页面展示顺位与推荐卡片位置，不代表独立网络测试速度或稳定性排名第一。所有测速、套餐及解锁状态均明确标注数据来源（独立实测 / 品牌资料 / 历史记录 / 待核实）。',
    riskWarning:
      '跨境网络工具仅限合法合规的学术科研、跨境电商、海外软件开发与日常公开资讯查阅。请优先按月付或小额套餐实测本地晚高峰表现，切勿盲目购买超长周期套餐。',
  },
  theme: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F7F9FC',
    textPrimary: '#172033',
    textSecondary: '#64748B',
    brandBlue: '#2563EB',
    lightBlueBg: '#EFF6FF',
    borderColor: '#E5EAF1',
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
