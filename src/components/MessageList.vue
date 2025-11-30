<template>
  <div class="message-list space-y-6" ref="_ref">
    <div class="message-item" v-for="message in messages" :key="message.id">
      <!-- 用户消息 -->
      <div v-if="message.type === 'question'" class="flex justify-end">
        <div class="max-w-[70%] group">
          <div class="text-xs text-slate-400 mb-2 text-right">
            {{dayjs(message.createdAt).format('HH:mm')}}
          </div>
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-lg transform transition-all duration-200 group-hover:scale-[1.02]">
            <img v-if="message.imagePath" :src="`safe-file://${message.imagePath}`" alt="Message image" class="max-w-xs rounded-lg mb-3 block">
            <div class="text-sm leading-relaxed font-medium">{{message.content}}</div>
          </div>
        </div>
      </div>
      
      <!-- AI回复消息 -->
      <div v-else class="flex justify-start">
        <div class="max-w-[70%] group">
          <div class="flex items-center mb-2">
            <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-2 shadow-md">
              <span class="text-white text-sm">🤖</span>
            </div>
            <div class="text-xs text-slate-400">
              {{dayjs(message.createdAt).format('HH:mm')}}
            </div>
          </div>
          
          <!-- 加载状态 -->
          <div v-if="message.status === 'loading'" class="bg-white p-4 rounded-2xl rounded-tl-none shadow-lg border border-slate-200">
            <div class="flex items-center space-x-2 text-slate-500">
              <Icon icon="eos-icons:three-dots-loading" class="text-lg"></Icon>
              <span class="text-sm">思考中...</span>
            </div>
          </div>
          
          <!-- 错误状态 -->
          <div v-else-if="message.status === 'error'" class="bg-red-50 p-4 rounded-2xl rounded-tl-none shadow-lg border border-red-200">
            <div class="flex items-center space-x-2 text-red-700">
              <Icon icon="radix-icons:exclamation-triangle" class="text-lg"></Icon>
              <span class="text-sm font-medium">{{message.content}}</span>
            </div>
          </div>
          
          <!-- 正常回复 -->
          <div v-else class="bg-white p-4 rounded-2xl rounded-tl-none shadow-lg border border-slate-200 transform transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-xl">
            <div class="prose prose-slate prose-sm max-w-none prose-headings:my-3 prose-li:my-1 prose-ul:my-2 prose-p:my-2 prose-pre:p-0 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
              <vue-markdown :source="message.content" :plugins="plugins"/>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { Icon } from '@iconify/vue'
import VueMarkdown from 'vue-markdown-render'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import { MessageProps } from '../types'
defineProps<{ messages: MessageProps[] }>()
const plugins = [ markdownItHighlightjs ]
const _ref = ref<HTMLDivElement>()
defineExpose({
  ref: _ref
})
</script>
  