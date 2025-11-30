<template>
  <div class="conversation-list space-y-2">
    <div 
      class="group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md"
      :class="{
        'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg': store.selectedId === item.id,
        'bg-white/60 hover:bg-white/90 border border-transparent hover:border-slate-200': store.selectedId !== item.id
      }"
      v-for="item in items"
      :key="item.id"
      @contextmenu.prevent="showContextMenu(item.id)"
    >
    <!-- 点击跳转至对话详情页 -->
     <a @click.prevent="goToConversation(item.id)" class="block">
      <!-- 模型标签和时间 -->
      <div class="flex justify-between items-center mb-2">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200">
          <span class="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></span>
          {{item.selectedModel}}
        </span>
        <span class="text-xs text-slate-500 font-medium">{{dayjs(item.updatedAt).format('MM月DD日')}}</span>
      </div>
      
      <!-- 标题 -->
      <h2 class="font-semibold text-slate-800 text-sm leading-5 truncate group-hover:text-blue-700 transition-colors duration-200">
        {{item.title}}
      </h2>
      
      <!-- 悬停效果 -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
    </div>
    
    <!-- 空状态 -->
    <div v-if="items.length === 0" class="text-center py-12 px-4">
      <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
        <span class="text-2xl">💬</span>
      </div>
      <h3 class="text-slate-600 font-medium mb-2">还没有对话</h3>
      <p class="text-slate-500 text-sm">点击下方按钮开始新的对话</p>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { onMounted } from 'vue'
import { ConversationProps } from '../types'
import { useConversationStore } from '../stores/conversation'

defineProps<{ items: ConversationProps[] }>()
// defineprops接收items属性，items是一个数组，数组元素是ConversationProps类型，默认值为空数组
const router = useRouter()
const store = useConversationStore()

const showContextMenu = (id: number) => {
  window.electronAPI.showContextMenu(id)
}

onMounted(() => {
  window.electronAPI.onDeleteConversation(async (id: number) => {
    await store.deleteConversation(id)
    if (store.selectedId === id) {
      store.selectedId = -1
      router.push('/')
    }
  })
})

const goToConversation = (id: number) => {
  router.push({ path: `/conversation/${id}`})
  store.selectedId = id
}
</script>
  