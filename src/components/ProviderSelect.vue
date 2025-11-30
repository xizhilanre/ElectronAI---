<template>
  <div class="provider-select w-full">
    <SelectRoot v-model="currentModel">
      <!-- 触发选择模型的下拉菜单 -->
      <SelectTrigger class="flex w-full items-center justify-between 
        rounded-md py-1.5 px-3 shadow-sm border outline-none data-[placeholder]:text-gray-400">
        <!-- 显示当前选择的模型或占位符，类似input的placeholder -->
        <SelectValue :placeholder="t('provider.selectModel')" />
        <Icon
          icon="radix-icons:chevron-down"
          class="h-5 w-5"
        />
      </SelectTrigger>
      <!-- 下拉菜单内容，包含所有可用的模型，selectportal 用于将下拉菜单内容渲染到 body 中 -->
      <SelectPortal>
        <SelectContent class="bg-white rounded-md shadow-md z-[100] border">
          <!-- 下拉菜单的视口，用于滚动模型列表 -->
          <SelectViewport class="p-2">
            <div v-for="provider in items">
              <SelectLabel class="flex items-center px-6 h-7 text-gray-500">
                <img :src="provider.avatar" :alt="provider.name" class="h-5 w-5 mr-2 rounded">
                {{provider.title}}
              </SelectLabel>
              <SelectGroup>
                <SelectItem 
                  v-for="(model, index) in provider.models" :key="index" :value="`${provider.id}/${model}`"
                  class="outline-none rounded flex items-center h-7 px-6 relative
                    text-green-700 cursor-pointer
                    data-[highlighted]:bg-green-700 data-[highlighted]:text-white
                  "
                >
                  <SelectItemIndicator class=" absolute left-2 w-6">
                    <Icon icon="radix-icons:check" />
                  </SelectItemIndicator>
                  <SelectItemText>{{model}}</SelectItemText>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator class="h-[1px] my-2 bg-gray-300" />
            </div>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
  
<script lang="ts" setup>
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { ProviderProps } from '../types'

const { t } = useI18n()
defineProps<{ items: ProviderProps[] }>()
const currentModel = defineModel<string>()
</script>