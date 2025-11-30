<template>
  <div class=" flex items-center justify-between h-screen">
    <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <!-- 设置conversation-list高度占90%，防止底部按钮遮挡，overflow-y-auto 用于滚动 -->
        <ConversationList :items="items" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <!-- 设置conversation-list底部按钮，占10%，grid-cols-2 用于2列布局 -->
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            {{ t('common.newChat') }}
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
            {{ t('common.settings') }}
          </Button>
        </RouterLink>
      </div>
    </div>
    <div class="h-full flex-1">
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