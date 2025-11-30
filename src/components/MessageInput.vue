<template>
  <div class="message-input w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-300 p-4">
    <!-- 图片预览 -->
    <div v-if="imagePreview" class="mb-4 relative">
      <div class="relative inline-block">
        <img :src="imagePreview" alt="Preview" class="h-32 w-32 object-cover rounded-xl border-2 border-slate-200 shadow-md">
        <button @click="clearImage" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 shadow-lg">
          ✕
        </button>
      </div>
    </div>
    
    <!-- 输入区域 -->
    <div class="flex items-end space-x-3">
      <input type="file" accept="image/*" ref="fileInput" class="hidden" @change="handleImageUpload">
      
      <!-- 图片上传按钮 -->
      <button 
        @click="triggerFileInput" 
        :disabled="disabled"
        class="p-2 rounded-xl transition-all duration-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="disabled ? 'text-slate-300' : 'text-slate-500 hover:text-slate-700'"
      >
        <Icon icon="radix-icons:image" width="20" height="20" />
      </button>
      
      <!-- 文本输入框 -->
      <div class="flex-1 relative">
        <textarea 
          class="w-full outline-none bg-transparent resize-none text-slate-800 placeholder-slate-400 leading-relaxed"
          rows="1"
          v-model="model"
          :disabled="disabled"
          :placeholder="t('common.send') + '...'"
          @keydown.enter.prevent="handleEnter"
          @input="adjustTextareaHeight"
          ref="textareaRef"
        ></textarea>
      </div>
      
      <!-- 发送按钮 -->
      <Button 
        icon-name="radix-icons:paper-plane" 
        @click="onCreate" 
        :disabled="disabled || !model?.trim()"
        class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {{ t('common.send') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import Button from './Button.vue'

const { t } = useI18n()

const props = defineProps<{
  disabled?: boolean;
}>()
const emit = defineEmits<{
  create: [value: string, imagePath?: string]
}>()
const model = defineModel<string>()
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInput.value?.click()
  }
}

const clearImage = () => {
  imagePreview.value = ''
  selectedImage = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

let selectedImage: File | null = null
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedImage = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(selectedImage)
  }
}

const adjustTextareaHeight = async () => {
  await nextTick()
  const textarea = textareaRef.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
  }
}

const handleEnter = (event: KeyboardEvent) => {
  if (!event.shiftKey && model.value?.trim()) {
    event.preventDefault()
    onCreate()
  }
}

const onCreate = () => {
  if (model.value && model.value.trim() !== '') {
    emit('create', model.value, selectedImage?.path || undefined)
    selectedImage = null
    imagePreview.value = ''
    // 重置textarea高度
    nextTick(() => {
      if (textareaRef.value) {
        textareaRef.value.style.height = 'auto'
      }
    })
  }
}

</script>