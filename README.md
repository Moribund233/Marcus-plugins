# marcus-plugins

> Marcus 工具箱的插件注册中心

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

基于 GitHub Releases 的插件商店索引，Marcus 客户端通过读取 `index.json` 发现、搜索、安装和更新插件。

## 架构

```
GitHub Releases (存储 .marcus-plugin 包)
    │
    ▼
index.json (自动维护的元数据索引)
    │
    ▼
Marcus 客户端 → 读取 → 渲染商店 UI → 下载安装
```

## 仓库结构

```
├── index.json              ← 插件主索引（由 Action 自动维护）
├── .github/workflows/
│   └── sync-index.yml      ← Release 发布时自动更新 index.json
├── schema/
│   └── marcus-plugin.json  ← .marcus-plugin 包的 JSON Schema
├── templates/
│   └── marcus-plugin.json  ← manifest 模板
├── plugins/                ← 示例/开发中的插件
│   ├── marcus-img2ascii/
│   └── marcus-textstats/
└── docs/
    ├── package-format.md   ← .marcus-plugin 包格式说明
    └── store-client.md     ← Marcus 客户端集成文档
```

## 发布插件

所有操作通过 GitHub CLI 完成：

```bash
# 打包插件
cd my-plugin
zip plugin.marcus-plugin marcus-plugin.json icon.png dist/

# 发布（首次）
gh release create "my-plugin@v1.0.0" \
  --title "my-plugin v1.0.0" \
  --notes "发布说明" \
  --attach plugin.marcus-plugin

# 更新
gh release create "my-plugin@v1.1.0" \
  --title "my-plugin v1.1.0" \
  --notes "更新内容" \
  --attach plugin.marcus-plugin

# 弃用（Release notes 含 "最终版本" 时自动标记）
gh release create "my-plugin@v1.2.0" \
  --notes "【最终版本】此工具已停止维护"
```

## 插件格式

`.marcus-plugin` 是一个 ZIP 包，内容：

```
plugin.marcus-plugin/
├── marcus-plugin.json   ← manifest
├── icon.png             ← 图标（可选）
├── dist/                ← 工具代码（可选）
└── docs/                ← 文档（可选）
```

## 许可证

[MIT](LICENSE)
