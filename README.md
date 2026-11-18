# v2rayn指南 (v2raynverge.cc)

一个基于 Astro 构建的卡片式技术博客、网络工具评测数据库与知识库系统。

## 技术架构

- **核心框架**: Astro (Static Output / SSG)
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS
- **站内搜索**: Pagefind (静态离线中文全文搜索)
- **内容组织**: Astro Content Collections (Markdown / MDX)
- **部署环境**: Apache / 静态托管服务 (配套 `.htaccess`)

## 项目结构

```text
v2raynverge.cc/
├── public/                 # 静态资源 (图片、Logo、robots.txt、favicon)
├── src/
│   ├── components/         # 页面组件 (导航、卡片、评测表、搜索弹窗)
│   ├── content/            # 文章内容 (评测报告、横向对比、操作指南)
│   ├── data/               # 数据库 (品牌全字段数据、客户端矩阵、导航定义)
│   ├── layouts/            # 页面布局模板
│   └── pages/              # 站点路由页面
├── scripts/                # 自动化构建、验证与预览辅助脚本
├── astro.config.mjs        # Astro 配置文件
└── package.json            # 项目依赖与运行脚本
```

## 本地开发与构建

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
开发服务默认绑定端口 `8088`：
```bash
npm run dev
```
本地访问地址：`http://localhost:8088/`

### 3. 生产环境构建
```bash
npm run build
```
该命令会自动完成：
1. 前置内容与链接规范校验
2. Astro 静态 HTML 编译打包
3. Pagefind 全文检索索引生成
4. 生产产物与部署配置文件验证

### 4. 预览生产构建
```bash
npm run preview
```
在浏览器打开 `http://localhost:8088/` 即可预览完整静态站点。

## 生产部署说明

执行 `npm run build` 后，构建产物将输出在 `dist/` 目录中。
将 `dist/` 目录下的所有文件上传至 Web 服务器（如 Apache、Nginx 或各类静态托管服务）即可完成上线。配套的 `.htaccess` 文件已自动同步至构建目录，负责 HTTPS 规范化、URL 斜杠策略及静态缓存控制。
