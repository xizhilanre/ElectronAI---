<template>
  <div class="max-w-4xl mx-auto p-8">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
        {{ t('settings.title') }}
      </h1>
      <p class="text-slate-500">个性化您的应用体验</p>
    </div>
    
    <!-- 标签页 -->
    <TabsRoot v-model="activeTab" class="w-full">
      <TabsList class="flex border-b border-slate-200 mb-8 bg-white/50 backdrop-blur-sm rounded-t-xl p-2">
        <TabsTrigger 
          value="general" 
          class="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-100"
        >
          <Icon icon="radix-icons:gear" class="mr-2 inline-block" />
          {{ t('settings.general') }}
        </TabsTrigger>
        <TabsTrigger 
          value="models" 
          class="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-100"
        >
          <Icon icon="radix-icons:rocket" class="mr-2 inline-block" />
          {{ t('settings.models') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general" class="space-y-8">
        <!-- 语言设置 -->
        <div class="setting-item bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <Icon icon="radix-icons:globe" class="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 class="font-semibold text-slate-800 mb-1">{{ t('settings.language') }}</h3>
                <p class="text-sm text-slate-500">选择您偏好的应用语言</p>
              </div>
            </div>
            <SelectRoot v-model="currentConfig.language" class="w-[160px]">
              <SelectTrigger class="inline-flex items-center justify-between rounded-lg px-4 py-3 text-sm gap-2 bg-white border border-slate-300 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                <SelectValue :placeholder="t('settings.selectLanguage')" />
                <SelectIcon>
                  <Icon icon="radix-icons:chevron-down" />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectContent class="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                  <SelectViewport class="p-2">
                    <SelectGroup>
                      <SelectItem value="zh" class="relative flex items-center px-4 py-3 text-sm text-slate-700 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <SelectItemText>{{ t('common.chinese') }}</SelectItemText>
                        <SelectItemIndicator class="absolute left-0.5 inline-flex items-center">
          <Icon icon="radix-icons:check" class="text-blue-600" />
        </SelectItemIndicator>                 </SelectItem>
                      <SelectItem value="en" class="relative flex items-center px-4 py-3 text-sm text-slate-700 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                        <SelectItemText>{{ t('common.english') }}</SelectItemText>
                        <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                          <Icon icon="radix-icons:check" class="text-blue-600" />
                        </SelectItemIndicator>
                      </SelectItem>
                    </SelectGroup>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </SelectRoot>
          </div>
        </div>

        <!-- 字体大小设置 -->
        <div class="setting-item bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                <Icon icon="radix-icons:text" class="text-green-600 text-xl" />
              </div>
              <div>
                <h3 class="font-semibold text-slate-800 mb-1">{{ t('settings.fontSize') }}</h3>
                <p class="text-sm text-slate-500">调整应用字体大小</p>
              </div>
            </div>
            <NumberFieldRoot v-model="currentConfig.fontSize" class="inline-flex items-center border border-slate-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
              <NumberFieldDecrement class="group px-1 py-0.5 hover:bg-blue-500 hover:text-white focus:outline-none transition-colors duration-200 cursor-pointer rounded-l-lg">
                <Icon icon="radix-icons:minus" class="text-sm text-blue-600 group-hover:text-white" />
              </NumberFieldDecrement>
              <NumberFieldInput
                class="w-10 px-1 py-0.5 text-center font-medium border-x border-slate-300 focus:outline-none"
                :min="12"
                :max="20"
              />
              <NumberFieldIncrement class="group px-1 py-0.5 hover:bg-blue-500 hover:text-white focus:outline-none transition-colors duration-200 cursor-pointer rounded-r-lg">
                <Icon icon="radix-icons:plus" class="text-sm text-blue-600 group-hover:text-white" />
              </NumberFieldIncrement>
            </NumberFieldRoot>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="models" class="space-y-6">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-slate-800 mb-2">AI 模型提供商</h3>
          <p class="text-slate-500 text-sm">配置您的 AI 服务提供商设置</p>
        </div>
        
        <AccordionRoot type="single" collapsible class="space-y-4">
          <AccordionItem v-for="provider in providers" :key="provider.id" :value="provider.name" class="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 overflow-hidden hover:shadow-lg transition-all duration-300">
            <AccordionTrigger class="flex items-center justify-between w-full p-6 text-left hover:bg-slate-50 transition-colors duration-200">
              <div class="flex items-center gap-4">
                <img :src="provider.avatar" :alt="provider.name" class="w-10 h-10 rounded-xl shadow-md">
                <div>
                  <span class="font-semibold text-slate-800 text-lg">{{ provider.title }}</span>
                  <p class="text-sm text-slate-500 mt-1">{{ provider.desc || '配置 API 设置' }}</p>
                </div>
              </div>
              <Icon icon="radix-icons:chevron-down" class="w-5 h-5 text-slate-400 transform transition-transform duration-200 ease-in-out data-[state=open]:rotate-180" />
            </AccordionTrigger>
            <AccordionContent class="px-6 pb-6 pt-0 border-t border-slate-100">
              <div class="space-y-6 mt-6">
                <div v-for="config in getProviderConfig(provider.name)" :key="config.key" class="space-y-2">
                  <label class="text-sm font-medium text-slate-700 flex items-center">
                    <span class="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></span>
                    {{ config.label }}
                    <span v-if="config.required" class="text-red-500 ml-1">*</span>
                  </label>
                  <div class="relative">
                    <input 
                      :type="config.type"
                      :placeholder="config.placeholder"
                      :required="config.required"
                      :value="config.value"
                      @input="(e) => updateProviderConfig(provider.name, config.key, (e.target as HTMLInputElement).value)"
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-slate-400"
                    />
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50/30 to-purple-50/30 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { AppConfig } from '../types'
import { setI18nLanguage } from '../i18n'
import { useProviderStore } from '../stores/provider'
import { providerConfigs, ProviderConfigItem } from '../config/providerConfig'
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'radix-vue'

const { t } = useI18n()
const activeTab = ref('general')
const providerStore = useProviderStore()
const providers = computed(() => providerStore.items)

const currentConfig = reactive<AppConfig>({
  language: 'zh',
  fontSize: 14,
  providerConfigs: {}
})

onMounted(async () => {
  const config = await window.electronAPI.getConfig()
  Object.assign(currentConfig, config)
})

// 监听配置变化并自动保存
watch(currentConfig, async (newConfig) => {
  // 创建一个普通对象来传递配置
  const configToSave = {
    language: newConfig.language,
    fontSize: newConfig.fontSize,
    providerConfigs: JSON.parse(JSON.stringify(newConfig.providerConfigs))
  }
  await window.electronAPI.updateConfig(configToSave)
  // 更新界面语言
  setI18nLanguage(newConfig.language)
}, { deep: true })

// 获取provider对应的配置项
const getProviderConfig = (providerName: string): ProviderConfigItem[] => {
  const configs = providerConfigs[providerName] || []
  // 确保配置值被初始化
  if (!currentConfig.providerConfigs[providerName]) {
    currentConfig.providerConfigs[providerName] = {}
  }
  return configs.map(config => ({
    ...config,
    value: currentConfig.providerConfigs[providerName][config.key] || config.value
  }))
}

// 更新provider配置值
const updateProviderConfig = (providerName: string, key: string, value: string) => {
  if (!currentConfig.providerConfigs[providerName]) {
    currentConfig.providerConfigs[providerName] = {}
  }
  currentConfig.providerConfigs[providerName][key] = value
}
</script>