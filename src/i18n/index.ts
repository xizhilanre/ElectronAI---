import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'

type MessageSchema = typeof zh
type LanguageType = 'zh' | 'en'

export const i18n = createI18n<[MessageSchema], LanguageType>({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

// 初始化i18n的语言设置
export async function initI18n() {
  const config = await window.electronAPI.getConfig()
  setI18nLanguage(config.language)
}

export function setI18nLanguage(locale: LanguageType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    (i18n.global.locale as any).value = locale
  }
} 