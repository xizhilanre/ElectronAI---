# ElectronAi - 轻量级跨平台聊天应用

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
- **百度千帆**: 需要 API Key 和 Secret Key
- **阿里通义**: 需要 API Key
- **DeepSeek**: 需要 API Key

## 🏗 项目结构

```
ElectronAI/
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

## 区别

本项目在[Al助手Cursor辅助 Vue3.5+Electron+ 大模型跨平台实战_实战课程_慕课网](https://coding.imooc.com/class/921.html)的基础上改进而来

原版如图所示，界面略显粗糙，于是结合ai优化了一下界面效果

![信图片_2025-11-30_193702_25](C:\Users\xizhilanre\Desktop\ElectronAI\ElectronAI---\assets/微信图片_2025-11-30_193702_250.jpg)

现版本如下图，增加了一些动效，改进了一下配色，优化了一下体验

![信图片_2025-11-30_193640_37](C:\Users\xizhilanre\Desktop\ElectronAI\ElectronAI---\assets/微信图片_2025-11-30_193640_374.jpg)



**具体表现为：**

1. 视觉设计优化
  渐变背景：添加了动态渐变背景 bg-gradient-to-br from-slate-50 to-blue-50 animate-gradient-x，增加了视觉吸引力
  半透明效果：使用 bg-white/80 backdrop-blur-sm 创建了现代的毛玻璃效果
  阴影效果：添加了 shadow-2xl 增强深度感
  渐变文字：标题使用了 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent 的渐变效果
2. 动画和过渡效果
  入场动画：添加了多种动画效果，包括滑入动画 (animate-slide-in-left, animate-slide-in-right) 和淡入动画 (animate-fade-in)
  延迟动画：通过 animate-fade-in-delay 系列实现了分阶段显示效果
  微交互：按钮添加了 hover:scale-105 active:scale-95 的缩放效果
  过渡动画：添加了 transition-all duration-200 使状态变化更平滑
3. 布局优化
  更好的间距：增加了更多的内边距和外边距，如 p-6、px-3 py-4 等
  改进的尺寸：侧边栏宽度从 300px 增加到 320px，提供更好的内容展示空间
  分区更明确：添加了更多的边框和分隔线，如 border-r border-slate-200/50
4. 对话列表优化
  卡片式设计：每个对话项使用了圆角卡片式设计 rounded-xl
  状态指示：添加了状态指示器，如 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full
  模型标签美化：使用渐变背景和圆角设计 inline-flex items-center px-2.5 py-0.5 rounded-full
  悬停效果：添加了悬停时的缩放和阴影效果
  空状态设计：添加了精美的空状态提示，包括图标和引导文字
5. 按钮优化
  动态缩放：添加了 hover:scale-105 active:scale-95 的交互反馈
  图标过渡：图标添加了 transition-transform duration-200 的过渡效果
  更丰富的按钮样式：在 App.vue 中直接使用了渐变背景 bg-gradient-to-r from-blue-500 to-blue-600
6. 响应式设计
  移动端适配：添加了媒体查询，针对不同屏幕尺寸优化了布局
  可调整的侧边栏：在小屏幕上自动调整侧边栏宽度
7. 滚动条美化
  自定义滚动条：添加了自定义的滚动条样式，使用渐变色彩
  平滑滚动：启用了 scroll-behavior: smooth 的平滑滚动效果
8. 字体优化
  更好的字体粗细：定义了更精确的字体粗细级别
  字间距调整：添加了 tracking-tight 调整字间距
  行高优化：使用 leading-relaxed 优化文本行高


---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！







