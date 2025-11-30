import { BaseProvider } from './BaseProvider'
import { QianfanProvider } from './QianfanProvider'
import { OpenAIProvider } from './OpenAIProvider'
import { configManager } from '../config'

export function createProvider(providerName: string): BaseProvider {
  const config = configManager.get()
  const providerConfig = config.providerConfigs[providerName] || {}
  switch (providerName) {
    case 'qianfan':
      if (!providerConfig.accessKey || !providerConfig.secretKey) {
        throw new Error('缺少千帆API配置：请在设置中配置 accessKey 和 secretKey')
      }
      return new QianfanProvider(providerConfig.accessKey, providerConfig.secretKey)
    case 'dashscope':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少通义千问API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    case 'deepseek':
      if (!providerConfig.apiKey || !providerConfig.baseUrl) {
        throw new Error('缺少DeepSeek API配置：请在设置中配置 apiKey 和 baseUrl')
      }
      return new OpenAIProvider(providerConfig.apiKey, providerConfig.baseUrl)
    default:
      throw new Error(`Unsupported provider: ${providerName}`)
  }
}
