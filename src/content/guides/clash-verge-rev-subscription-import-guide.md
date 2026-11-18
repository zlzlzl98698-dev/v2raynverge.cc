---
title: "2026 Clash Verge Rev 下载、安装与订阅导入完整教程：Service Mode 与 TUN 模式配置"
seoTitle: "Clash Verge Rev 教程 2026：官方下载、机场订阅导入与服务模式TUN配置"
description: "原版 Clash 停更后，Clash Verge Rev 怎么下载和导入订阅？本文详解 Windows 与 macOS (Apple Silicon/Intel) 安装包选择、VLESS/Hysteria2 订阅拉取、Rule 分流模式与 Service Mode 虚拟网卡开启步骤。"
slug: "clash-verge-rev-subscription-import-guide"
pubDate: "2026-10-19"
updatedDate: "2026-11-18"
category: "clash"
osPlatform: "Windows 10/11 · macOS (M系列/Intel) · Linux"
clientName: "Clash Verge Rev (内置 Mihomo 内核)"
difficulty: "新手友好 · 5 分钟完成"
tags: ["Clash Verge", "Clash Verge下载", "Clash Verge订阅", "Mihomo内核", "Service Mode"]
cover: "/images/covers/clash-verge-rev-guide.svg"
coverAlt: "2026 Clash Verge Rev 下载安装、订阅导入与 TUN 服务模式完整教程图"
author: "v2rayn指南网络评测室"
excerpt: "【直接结论】Clash Verge Rev 是目前桌面端替代已停更 Clash for Windows (CFW) 的首选开源图形界面客户端。它基于轻量级 Tauri 架构开发，原生内置最新 Mihomo（原 Clash Meta）内核，直接支持 VLESS、Trojan、Hysteria 2 等全部主流机场协议。完整使用只需四步：1）根据电脑架构下载正确安装包（Windows 选 `x64-setup.exe`，Mac M系列芯片选 `aarch64.dmg`）；2）在支持通用订阅的机场后台复制 Clash Meta 订阅链接，粘贴到软件左侧“订阅 (Profiles)”栏点击导入并选中激活；3）在“代理 (Proxies)”页选择“规则 (Rule)”模式并测试节点延迟；4）在“设置 (Settings)”中打开“系统代理 (System Proxy)”即可正常访问海外网络。"
pillar: true
featured: true
primaryKeyword: "Clash Verge 订阅"
secondaryKeywords: ["Clash Verge下载", "Clash Verge Rev教程", "Clash导入订阅失败", "Clash Verge服务模式"]
relatedBrands: ["guangsuyun", "muguang", "weifeng", "xingdaomeng", "yifan", "weitu", "tiziyun"]
relatedSlugs: ["v2rayn-complete-tutorial-windows", "clash-meta-mihomo-core-configuration", "clash-troubleshooting-connection-timeout"]
priceVerifiedDate: "2026-10-19"
testDate: "2026-10-19"
reviewStatus: "verified"
faq:
  - question: "为什么不建议点击机场网站上的“一键导入 Clash”按钮，而是推荐手动复制粘贴订阅链接？"
    answer: "因为很多机场后台的“一键导入”按钮调用的是旧版 `clash://install-config` URL 协议，有时因浏览器拦截、未关联默认程序或 User-Agent 识别问题导致导入空白。直接点击“复制订阅链接”，然后在 Clash Verge Rev 的“订阅”输入框里粘贴并点击“导入”，成功率是 100%，还能顺手设置每 12 小时自动更新。"
  - question: "macOS 安装 Clash Verge Rev 后打开提示“Clash Verge 已损坏，无法打开，你应该将它移到废纸篓”怎么办？"
    answer: "这是苹果 macOS Gatekeeper 对未缴纳苹果开发者年费签名的开源软件的默认拦截，并非软件真的损坏。只需打开 Mac 的“终端 (Terminal)”，输入命令 `sudo xattr -r -d com.apple.quarantine /Applications/Clash\\ Verge.app` 并回车输入开机密码，即可正常打开。"
---

## 一、第一步：按系统架构精准选择 Clash Verge Rev 安装包

在 GitHub 官方发布页（`clash-verge-rev/clash-verge-rev/releases`）中，每次更新都会列出十几个不同后缀的文件。请按下表对号入座，切勿下错架构：

| 操作系统与芯片类型 | 推荐下载的文件后缀名称 | 备注说明 |
| :--- | :--- | :--- |
| **Windows 10 / 11 (主流 64位电脑)** | `Clash.Verge_x.x.x_x64-setup.exe` | 标准安装版（若电脑缺少 WebView2 会自动引导安装） |
| **Windows 便携免安装版** | `Clash.Verge_x.x.x_x64_portable.zip` | 解压即用，适合放在移动硬盘或非系统盘 |
| **Windows ARM 笔记本 (如 Surface Pro)** | `Clash.Verge_x.x.x_arm64-setup.exe` | 仅限高通骁龙 ARM 处理器 Windows 设备 |
| **macOS 苹果自研芯片 (M1 / M2 / M3 / M4)** | **`Clash.Verge_x.x.x_aarch64.dmg`** | **90% 近年新款 MacBook / Mac mini 必选此项** |
| **macOS Intel 芯片 (2020年以前老款 Mac)** | `Clash.Verge_x.x.x_x64.dmg` | Intel 处理器 Mac 专用 |
| **Linux (Ubuntu / Debian / Mint)** | `clash-verge_x.x.x_amd64.deb` | 使用 `sudo dpkg -i` 或 `apt install` 安装 |

---

## 二、第二步：导入并激活机场订阅（Profile）

1. **获取正确的订阅链接**：
   - 登录支持第三方通用订阅的机场后台（如 **光速云、暮光加速、微风网络、星岛梦、唯兔云、一翻云、二猫云、梯子云** 等）；
   - 找到“复制订阅”区域：如果后台有明确列出 **“复制 Clash Meta / Mihomo 订阅”**，请优先复制该项；如果只有 **“复制 Clash 订阅”** 或 **“复制通用订阅”**，直接复制即可（Clash Verge Rev 内置的 Mihomo 内核同时兼容 YAML 与 Base64 节点列表）。
2. **粘贴导入到 Clash Verge Rev**：
   - 打开 Clash Verge Rev，点击左侧导航栏的第 2 项 **`订阅 (Profiles)`**；
   - 在顶部输入框中粘贴刚才复制的 `https://...` 订阅 URL，点击右侧的 **`导入 (Import)`** 按钮；
   - **极其关键的一步**：导入成功后，下方会多出一张订阅卡片（显示机场名称、已用流量/总流量与到期时间），**请务必用鼠标左键点击一下这张卡片**，使其边框变成蓝色高亮选中状态！
3. **设置定时自动更新**：
   - 右键点击该订阅卡片 $\rightarrow$ 选择 **`编辑信息 (Edit Info)`**；
   - 在 **`更新间隔 (Update Interval)`** 一栏填入 `720`（单位：分钟，代表每 12 小时自动更新一次节点）；
   - 如果遇到某些机场防火墙拦截默认请求头，可在 **`User Agent`** 一栏填入 `clash.meta`，点击保存。

---

## 三、第三步：选择规则模式（Rule）与节点分流策略

点击软件左侧导航栏的第 1 项 **`代理 (Proxies)`**：

1. **顶部模式切换**：
   - 请确保右上角选中 **`规则 (Rule)`** 模式！
   - 切勿长期停留在 `全局 (Global)`（会导致国内网站变慢且疯狂消耗机场流量）或 `直连 (Direct)`（相当于没开代理）。
2. **理解策略组（Proxy Groups）**：
   - 第一排通常是主策略组（如 `🚀 节点选择` 或 `Proxy`）：点击右下角的 Wi-Fi 测速图标，等待节点显示绿色的毫秒数（如 `香港 IEPL 01 - 22ms`），点击一个延迟最低的香港、台湾或新加坡节点即可。
   - 下方通常还有细分应用策略组（如 `🤖 OpenAI / ChatGPT`、`🎬 Netflix`、`📺 YouTube`）：
     - 如果你使用的是光速云、二猫云等在香港节点对 ChatGPT 有限制的品牌，只需展开 `🤖 OpenAI / ChatGPT` 策略组，单独将其点选为 `日本`、`新加坡` 或 `美国` 节点，而主策略组依然保持在 22ms 的香港节点！这样既不影响日常最快网速，又能让 AI 工具 100% 稳定解锁。

---

## 四、第四步：开启系统代理与 Service Mode (TUN 虚拟网卡)

点击左侧导航栏的 **`设置 (Settings)`**：

1. **日常标准用法：开启“系统代理 (System Proxy)”**
   - 打开 **`系统代理`** 开关（变成蓝色）；
   - 如需开机自启，可一并打开 **`开机自启 (Auto Launch)`** 与 **`静默启动`**。此时所有主流浏览器（Chrome / Edge / Firefox / Safari）及支持系统代理的应用均已联网成功。
2. **开发者与全局接管进阶用法：安装 Service Mode 并开启 TUN 模式**
   - 为什么需要安装服务模式？因为创建系统级虚拟网卡需要操作系统的管理员（Root / Administrator）权限。如果不安装服务模式直接开 TUN，每次重启都要弹窗或报错。
   - **操作步骤**：
     1. 在 `设置` 页面找到 **`服务模式 (Service Mode)`**，点击右侧的小盾牌图标；
     2. 在弹出的窗口中点击 **`安装 (Install)`**，允许管理员权限提权，等待状态变为绿色的 `Installed / Active`；
     3. 打开上方的 **`虚拟网卡模式 (TUN Mode)`** 开关。此时哪怕是不走系统代理的命令行终端、Git、Docker 和外服软件也能被完美分流接管！
