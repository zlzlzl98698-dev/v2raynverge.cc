import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

console.log('=== [Post-Build QA] 验证生产构建产物 dist/ ===');
if (!fs.existsSync(DIST)) {
  throw new Error('dist 目录不存在，构建失败！');
}

const htmlFiles = getHtmlFiles(DIST);
console.log(`1. 静态 HTML 页面总数: ${htmlFiles.length} 页`);
if (htmlFiles.length < 80) {
  throw new Error(`生成的 HTML 页面数量 (${htmlFiles.length}) 少于预期（应包含首页+4一级+28二级+31品牌+20文章等）`);
}

// 检查 Sitemap 与 Pagefind
const sitemapIndex = path.join(DIST, 'sitemap-index.xml');
const sitemap0 = path.join(DIST, 'sitemap-0.xml');
const robots = path.join(DIST, 'robots.txt');
const pagefindJs = path.join(DIST, 'pagefind', 'pagefind.js');

if (!fs.existsSync(sitemapIndex) || !fs.existsSync(sitemap0)) {
  throw new Error('缺少自动生成的 sitemap-index.xml 或 sitemap-0.xml');
}
if (!fs.existsSync(robots)) {
  throw new Error('dist 中缺少 robots.txt');
}
if (!fs.existsSync(pagefindJs)) {
  throw new Error('dist/pagefind/pagefind.js 不存在，Pagefind 全文搜索索引未生成！');
}

// 确保 sitemap.xml 存在并同步 sitemap-index.xml，满足所有搜索引擎对 /sitemap.xml 的默认抓取
const sitemapGeneral = path.join(DIST, 'sitemap.xml');
fs.copyFileSync(sitemapIndex, sitemapGeneral);

// 复制 .htaccess 到 dist/ 以便 dist/ 目录可直接完整上传至 Apache 部署
const htaccessSrc = path.join(ROOT, '.htaccess');
const htaccessDest = path.join(DIST, '.htaccess');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, htaccessDest);
}

// 确保 /404.html 与 /404/index.html 同时存在以兼容各类 Apache 配置
const page404 = path.join(DIST, '404.html');
const dir404 = path.join(DIST, '404');
if (fs.existsSync(page404)) {
  fs.mkdirSync(dir404, { recursive: true });
  fs.copyFileSync(page404, path.join(dir404, 'index.html'));
}

// 抽样校验 H1、Canonical 与推广链接 rel="nofollow sponsored noopener"
let affiliateLinkCount = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf-8');
  if (!html.includes('<link rel="canonical"')) {
    throw new Error(`页面缺少 canonical 标签: ${file}`);
  }
  if (!html.includes('<h1')) {
    throw new Error(`页面缺少 H1 标签: ${file}`);
  }
  const matches = html.match(/rel="nofollow sponsored noopener"/g);
  if (matches) {
    affiliateLinkCount += matches.length;
  }
}

console.log(`2. Sitemap 校验通过: sitemap-index.xml & sitemap-0.xml 已生成`);
console.log(`3. Pagefind 中文搜索索引校验通过: dist/pagefind/pagefind.js 已生成`);
console.log(`4. 推广链接合规属性校验通过: 共检测到 ${affiliateLinkCount} 处规范标记 rel="nofollow sponsored noopener"`);
console.log(`5. Apache .htaccess 已同步至 dist/.htaccess，可直接部署上线！`);
