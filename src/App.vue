<template>
  <div class="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-gradient-x">
    <!-- 左侧边栏 -->
    <div class="w-[320px] bg-white/80 backdrop-blur-sm border-r border-slate-200/50 flex flex-col shadow-2xl animate-slide-in-left">
      <!-- 头部标题 -->
      <div class="p-6 border-b border-slate-200/50 animate-fade-in">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse-subtle tracking-tight">
          VChat AI
        </h1>
        <p class="text-sm font-medium text-slate-500 mt-2 animate-fade-in-delay">智能对话助手</p>
      </div>
      
      <!-- 对话列表 -->
      <div class="flex-1 overflow-y-auto px-3 py-4 animate-fade-in-delay-2">
        <ConversationList :items="items" />
      </div>
      
      <!-- 底部操作按钮 -->
      <div class="p-4 border-t border-slate-200/50 bg-white/50 animate-fade-in-delay-3">
        <div class="grid grid-cols-2 gap-3">
          <RouterLink to="/">
            <Button icon-name="radix-icons:chat-bubble" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95">
              {{ t('common.newChat') }}
            </Button>
          </RouterLink>
          <RouterLink to="/settings">
            <Button icon-name="radix-icons:gear" plain class="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 transition-all duration-200 transform hover:scale-105 active:scale-95">
              {{ t('common.settings') }}
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <!-- 主内容区域 -->
    <div class="flex-1 flex flex-col animate-slide-in-right">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { initI18n } from './i18n'
import { initProviders } from './db'
import { useConversationStore } from './stores/conversation'
import { useProviderStore } from './stores/provider'
// 引入对话列表组件
import ConversationList from './components/ConversationList.vue'
import Button from './components/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const conversationStore = useConversationStore()
const provdierStore = useProviderStore()
const items = computed(() => conversationStore.items)

// 监听菜单事件
window.electronAPI.onMenuNewConversation(() => {
  router.push('/')
})

window.electronAPI.onMenuOpenSettings(() => {
  router.push('/settings')
})

onMounted(async () => {
  await initI18n()
  await initProviders()
  // 获取最初需要的数据
  conversationStore.fetchConversations()
  provdierStore.fetchProviders()
})
</script>

<style scoped>
/* 渐变背景动画 */
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 8s ease infinite;
}

@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 侧边栏滑入动画 */
.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out;
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 主内容区域滑入动画 */
.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 淡入动画 */
.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-delay {
  animation: fade-in 0.6s ease-out 0.2s both;
}

.animate-fade-in-delay-2 {
  animation: fade-in 0.6s ease-out 0.4s both;
}

.animate-fade-in-delay-3 {
  animation: fade-in 0.6s ease-out 0.6s both;
}

/* 脉冲动画 */
.animate-pulse-subtle {
  animation: pulse-subtle 3s ease-in-out infinite;
}

@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
/* 响应式设计 */
@media (max-width: 768px) {
  .w-\[320px\] {
    width: 280px !important;
  }
}

@media (max-width: 640px) {
  .w-\[320px\] {
    width: 240px !important;
  }
  
  .text-2xl {
    font-size: 1.5rem !important;
  }
  
  .p-6 {
    padding: 1rem !important;
  }
}

/* 字体优化 */
.font-medium {
  font-weight: 500;
}

.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.leading-relaxed {
  line-height: 1.625;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>