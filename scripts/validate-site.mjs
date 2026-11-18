import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function getFiles(dir, extList = ['.md', '.mdx']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFiles(full, extList));
    } else if (extList.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

console.log('=== [1/3] 校验 Markdown/MDX 内容合规性（禁止硬编码推广链接 & 校验标题） ===');
const contentFiles = getFiles(path.join(ROOT, 'src', 'content'));
const forbiddenAffiliateDomains = [
  'gsyvipaff.com',
  'twilightaff.com',
  'flycataff.com',
  'breezenetaff.com',
  'dalaoyunaff.com',
  'xingdaomeng.com',
  '2maoyunaff.cc',
  'worryfreeaff.com',
  'v2yunvipaff.com',
  'fireflyaff.com',
  'yuzoucloud.cc',
  'vipaff.cc',
  'civetnet.com',
  'jlyvipaff.com',
  'gntaff.com',
  '1flyunaff.cc',
  'sogoyunaff.cc',
  'kosingaff.com',
  'speedworldaff.cc',
  'flashleapaff.com',
  'gcvipaff.com',
  'shandianshuaff.com',
  'yunjiexianaff.com',
  'liulianyunaff.com',
  'shenxingaff.com',
  'huanqiutiaff.com',
  'invisibleaff.com',
  'ladderaff.com',
  'lingdongaff.com',
  'wavenetaff.com',
  'edgenovaaff.cc',
];

for (const file of contentFiles) {
  const text = fs.readFileSync(file, 'utf-8');
  if (!text.includes('title:')) {
    throw new Error(`内容文件缺少 title 字段: ${file}`);
  }
  for (const domain of forbiddenAffiliateDomains) {
    if (text.includes(domain)) {
      throw new Error(`发现违规硬编码推广域名 ${domain} 于 Markdown 文件: ${file}`);
    }
  }
}
console.log(`通过：共检查 ${contentFiles.length} 个内容文件，0 硬编码推广链接。`);

console.log('=== [2/3] 校验 13 个 SEO/GEO 规划文档完整性 ===');
const requiredDocs = [
  'SEO-一级导航规划.md',
  'SEO-二级专题规划.md',
  'SEO-三级文章集群规划.md',
  'SEO-完整文章标题库.md',
  'SEO-关键词映射表.csv',
  'GEO-实体关系映射表.csv',
  'GEO-长尾问题库.csv',
  'SEO-内部链接矩阵.csv',
  'SEO-内容发布优先级.md',
  'SEO-品牌评测规划.md',
  'SEO-URL路由规划.csv',
  '品牌数据审计报告.md',
  '数据来源及核实记录.md',
];

for (const doc of requiredDocs) {
  const p = path.join(ROOT, 'docs', 'seo-geo', doc);
  if (!fs.existsSync(p)) {
    throw new Error(`缺少必需的 SEO/GEO 规划文件: ${p}`);
  }
}
console.log(`通过：13 个 SEO/GEO 规划文档全部就绪。`);

console.log('=== [3/3] 校验 Apache .htaccess 与 robots.txt 存在性 ===');
if (!fs.existsSync(path.join(ROOT, '.htaccess'))) {
  throw new Error('缺少根目录 .htaccess 部署配置文件');
}
if (!fs.existsSync(path.join(ROOT, 'public', 'robots.txt'))) {
  throw new Error('缺少 public/robots.txt');
}
console.log('通过：构建前全站数据与合规检查 100% 合格！');
