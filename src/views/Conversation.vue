<template>
  <!-- 聊天头部 -->
  <div class="h-20 bg-white/70 backdrop-blur-sm border-b border-slate-200/50 flex items-center px-6 justify-between shadow-sm" v-if="convsersation">
    <div class="flex items-center space-x-4">
      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <span class="text-white text-lg">🤖</span>
      </div>
      <div>
        <h3 class="font-bold text-slate-800 text-lg">{{convsersation.title}}</h3>
        <div class="flex items-center space-x-2 mt-1">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span class="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
            在线
          </span>
          <span class="text-xs text-slate-500">{{dayjs(convsersation.updatedAt).format('MM月DD日 HH:mm')}}</span>
        </div>
      </div>
    </div>

    
    <!-- 右侧操作按钮 -->
    <div class="flex items-center space-x-2">
      <button class="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200">
        <span class="text-lg">📎</span>
      </button>
      <button class="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200">
        <span class="text-lg">⚙️</span>
      </button>
    </div>
  </div>
  
  <!-- 消息列表 -->
  <div class="flex-1 bg-gradient-to-b from-slate-50 to-white overflow-y-auto">
    <div class="max-w-4xl mx-auto px-6 py-6">
      <MessageList :messages="filteredMessages" ref="messageListRef"/>
    </div>
  </div>
  
  <!-- 输入区域 -->
  <div class="bg-white/70 backdrop-blur-sm border-t border-slate-200/50 p-6">
    <div class="max-w-4xl mx-auto">
      <MessageInput  @create="sendNewMessage" v-model="inputValue" :disabled="messageStore.isMessageLoading"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import MessageInput from '../components/MessageInput.vue'
import MessageList from '../components/MessageList.vue'
import { useConversationStore } from '../stores/conversation'
import { useMessageStore } from '../stores/message'
import { useProviderStore } from '../stores/provider'
import { MessageProps, MessageListInstance, MessageStatus } from '../types'
import { db } from '../db'
const inputValue = ref('')
let currentMessageListHeight = 0
const messageListRef = ref<MessageListInstance>()
const route = useRoute()
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const provdierStore = useProviderStore()
const filteredMessages = computed(() => messageStore.items)
const sendedMessages = computed(() => filteredMessages.value
  .filter(message => message.status!== 'loading' && message.status !== 'error')
  .map(message => {
    return {
      role: message.type === 'question' ? 'user' : 'assistant',
      content: message.content,
      ...(message.imagePath && { imagePath: message.imagePath })
    }
  })
)
let conversationId = ref(parseInt(route.params.id as string))
const initMessageId = parseInt(route.query.init as string)
const convsersation = computed(() => conversationStore.getConversationById(conversationId.value))
const lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value))
const sendNewMessage = async (question: string, imagePath?: string) => {
  if (question) {
    let copiedImagePath: string | undefined
    if (imagePath) {
      try {
        copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath)
        console.log('copiedImagePath', copiedImagePath)
      } catch (error) {
        console.error('Failed to copy image:', error)
      }
    }
    const date = new Date().toISOString()
    await messageStore.createMessage({
			content: question,
			conversationId: conversationId.value,
			createdAt: date,
      updatedAt: date,
			type: 'question',
      ...(copiedImagePath && { imagePath: copiedImagePath })
    })
    inputValue.value = ''
    creatingInitialMessage()
  }
}
const messageScrollToBottom = async () => {
	await nextTick()
  if (messageListRef.value) {
    messageListRef.value.ref.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
}
const creatingInitialMessage = async () => {
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading'
  }
  const newMessageId = await messageStore.createMessage(createdData)
  await messageScrollToBottom()
  if (convsersation.value) {
    const provider = provdierStore.getProviderById(convsersation.value.providerId)
    if (provider) {
      console.log('provider', provider)
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: convsersation.value.selectedModel,
        messages: sendedMessages.value
      })
    }
  }
}
watch(() => route.params.id, async (newId: string) => {
  conversationId.value = parseInt(newId)
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()
  currentMessageListHeight = 0
})
onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()
  if (initMessageId) {
    await creatingInitialMessage()
  }
  let streamContent = ''
  const checkAndScrollToBottom = async () => {
    if (messageListRef.value) {
      const newHeight = messageListRef.value.ref.clientHeight
      console.log('the newHeight', newHeight)
			console.log('the currentMessageListHeight', currentMessageListHeight)
      if (newHeight > currentMessageListHeight) {
        console.log('scroll to bottom')
        currentMessageListHeight = newHeight
        await messageScrollToBottom()
      }
    }
  }
  window.electronAPI.onUpdateMessage(async (streamData) => {
    console.log('stream', streamData)
    const { messageId, data } = streamData
    streamContent += data.result
    const getMessageStatus = (data: any): MessageStatus => {
      if (data.is_error) {
        return 'error'
      } else if (data.is_end) {
        return 'finished' 
      } else {
        return 'streaming'
      }
    }
    const updatedData = {
      content: streamContent,
      status: getMessageStatus(data),
      updatedAt: new Date().toISOString()
    }
    // update database
    // update filteredMessages
    await messageStore.updateMessage(messageId, updatedData)
    await nextTick()
    await checkAndScrollToBottom()
    if(data.is_end) {
      streamContent = ''
    }
  })
})
</script>