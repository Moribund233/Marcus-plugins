# .marcus-plugin 包格式

## 概述

`.marcus-plugin` 是一个 ZIP 格式的归档文件，包含 Marcus 工具的完整定义和资源。

## 目录结构

```
plugin.marcus-plugin/
├── marcus-plugin.json   ← 清单文件（必选）
├── icon.png             ← 图标（推荐，128x128 PNG）
├── dist/                ← 工具源码/二进制
│   ├── main.py
│   ├── requirements.txt
│   └── ...
├── docs/                ← 文档
│   └── index.html       ← 详情页（可选）
└── screenshots/         ← 截图（可选）
```

## 打包命令

```bash
cd plugin-source/
zip -r plugin.marcus-plugin \
  marcus-plugin.json \
  icon.png \
  dist/ \
  docs/ \
  screenshots/
```

## manifest 字段说明

| 字段 | 类型 | 必选 | 说明 |
|------|------|------|------|
| `api_version` | string | 是 | 当前为 `"1"` |
| `id` | string | 是 | 唯一标识，kebab-case |
| `display_name` | string | 是 | 显示名称 |
| `description` | string | 否 | 简短描述 |
| `icon` | string | 否 | 图标路径 |
| `categories` | string[] | 否 | 分类标签 |
| `version` | string | 是 | semver 版本号 |
| `min_marcus_version` | string | 否 | 最低 Marcus 版本 |
| `contribution` | string | 是 | `web` / `terminal` / `file` |
| `web` | object | 见上 | Web 工具配置 |
| `terminal` | object | 见上 | 终端工具配置 |
| `file` | object | 见上 | 文件工具配置 |
| `ui` | object | 否 | UI 表单描述 |

## 版本规范

- 严格遵循 semver (`MAJOR.MINOR.PATCH`)
- Release tag 格式：`<plugin-id>@v<version>`（如 `slugify-url@v1.0.0`）
