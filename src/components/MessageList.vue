<template>
  <div class="message-list" ref="_ref">
    <div class="message-item mb-3" v-for="message in messages" :key="message.id">
      <div class="flex" :class="{'justify-end': message.type === 'question'}">
        <div>
          <div class="text-sm text-gray-500 mb-2" :class="{'text-right': message.type === 'question'}">
            {{message.createdAt}}
          </div>
          <div class="message-question bg-green-700 text-white p-2 rounded-md" v-if="message.type === 'question'">
            <img v-if="message.imagePath" :src="`safe-file://${message.imagePath}`" alt="Message image" class="h-24 w-24 object-cover rounded block">
            {{message.content}}
          </div>
          <div 
            class="message-answer p-2 rounded-md" 
            v-else
            :class="{'bg-red-100 text-red-700': message.status === 'error', 'bg-gray-200 text-gray-700': message.status !== 'error'}"
          >
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading"></Icon>
            </template>
            <template v-else-if="message.status === 'error'">
              <span>{{message.content}}</span>
            </template>
            <div v-else class="prose prose-slate prose-headings:my-2 prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-pre:p-0">
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
  