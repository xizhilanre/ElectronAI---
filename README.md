# VChat - 跨平台AI桌面聊天应用

一个基于 Vue 3.5 和 Electron 构建的现代化、轻量级跨平台AI聊天应用，支持多种大语言模型提供商。

## 🌟 功能特性

- **🚀 多模型支持**: 集成 OpenAI、DeepSeek、文心一言、通义千问等主流AI模型
- **💬 智能对话**: 支持多轮对话，上下文记忆，流式响应
- **🌍 跨平台**: 基于 Electron，支持 Windows、macOS、Linux
- **🎨 现代化UI**: 使用 Vue 3.5 + Tailwind CSS，界面简洁美观
- **🌐 国际化**: 支持中英文切换
- **💾 本地存储**: 使用 Dexie.js 进行本地数据存储
- **⚡ 高性能**: 使用 Vite 构建，开发体验流畅
- **🔧 可配置**: 支持自定义模型配置和API密钥

## 🛠 技术栈

### 前端技术
- **Vue 3.5** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue状态管理
- **Vue Router** - Vue.js官方路由
- **Tailwind CSS** - 实用优先的CSS框架
- **Radix Vue** - 无障碍UI组件库
- **Vue I18n** - Vue.js国际化插件

### 桌面应用技术
- **Electron 30+** - 跨平台桌面应用框架
- **Electron Forge** - Electron应用构建和分发工具

### 数据存储
- **Dexie.js** - IndexedDB包装库，用于本地数据存储

### AI模型集成
- **OpenAI API** - GPT系列模型
- **百度千帆** - 文心一言模型
- **阿里通义** - 通义千问模型
- **DeepSeek** - 深度求索模型

## 📦 安装与使用

### 环境要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 快速开始

1. **克隆项目**
```bash
git clone https://github.com/your-username/vchat.git
cd vchat
```

2. **安装依赖**
```bash
npm install
```

3. **开发模式运行**
```bash
npm start
```

4. **构建应用**
```bash
# 打包应用
npm run make

# 仅打包不构建安装包
npm run package
```

## 🔧 配置说明

### 模型配置
在应用设置中可以配置以下模型提供商：
- **OpenAI**: 需要 API Key，支持 GPT-3.5/GPT-4
- **百度千帆**: 需要 API Key 和 Secret Key
- **阿里通义**: 需要 API Key
- **DeepSeek**: 需要 API Key

### 环境变量
创建 `.env` 文件配置默认设置：
```env
# OpenAI 配置
OPENAI_API_KEY=your_openai_api_key

# 百度千帆配置
BAIDU_API_KEY=your_baidu_api_key
BAIDU_SECRET_KEY=your_baidu_secret_key

# 阿里通义配置
ALI_API_KEY=your_alibaba_api_key

# DeepSeek 配置
DEEPSEEK_API_KEY=your_deepseek_api_key
```

## 🏗 项目结构

```
vchat/
├── src/
│   ├── components/          # Vue组件
│   │   ├── Button.vue
│   │   ├── ConversationList.vue
│   │   ├── MessageInput.vue
│   │   ├── MessageList.vue
│   │   └── ProviderSelect.vue
│   ├── config/             # 配置文件
│   │   └── providerConfig.ts
│   ├── i18n/               # 国际化
│   ├── locales/            # 语言文件
│   ├── providers/          # AI模型提供商
│   │   ├── BaseProvider.ts
│   │   ├── OpenAIProvider.ts
│   │   ├── QianfanProvider.ts
│   │   └── createProvider.ts
│   ├── stores/             # Pinia状态管理
│   ├── views/              # 页面组件
│   ├── App.vue
│   ├── main.ts
│   └── types.ts            # TypeScript类型定义
├── out/                    # 构建输出
├── assets/                 # 静态资源
└── package.json
```

## 🚀 开发指南

### 添加新的AI模型提供商

1. 在 `src/providers/` 目录下创建新的提供商类，继承 `BaseProvider`
2. 实现必要的方法：`chat()`, `getModels()` 等
3. 在 `src/providers/createProvider.ts` 中注册新的提供商
4. 更新配置文件和类型定义

### 国际化支持

- 支持语言：中文、英文
- 语言文件位于 `src/locales/`
- 使用 Vue I18n 进行国际化管理

## 📱 界面预览

- **主界面**: 左侧对话列表，右侧聊天窗口
- **设置页面**: 模型配置、API密钥管理
- **新对话**: 支持选择不同的AI模型
- **消息展示**: 支持Markdown渲染、代码高亮

## 🔒 安全说明

- API密钥本地存储，不会上传到服务器
- 支持本地数据加密存储
- 遵循最小权限原则

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！







