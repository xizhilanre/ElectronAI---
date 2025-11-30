import { MessageProps, ConversationProps, ProviderProps } from './types'
export const messages: MessageProps[] = [
  { id: 1, content: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 1 },
  { id: 2, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 3, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 1 },
  { id: 4, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 5, content: '还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 1 },
  { id: 6, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 1 },
  { id: 7, content: '2 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 2 },
  { id: 8, content: '你的说法很请正确', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 9, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 2 },
  { id: 10, content: '你的说法很请正确，理解的很不错,你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 11, content: '3 还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 3 },
  { id: 12, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 3 },
]
export const conversations: ConversationProps[] = [
  { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '1 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 2, selectedModel: 'GPT-3.5-Turbo', title: '2 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 3, selectedModel: 'GPT-3.5-Turbo', title: '3 什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 4, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用, 你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 5, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用1', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 6, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 7, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1},
  { id: 8, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用, 你的说法很请正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', providerId: 1}
]

export const providers: ProviderProps[] = [
  {     
    id: 1,
    name: 'qianfan',
    title: '百度千帆',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-128K'],
    avatar: 'https://aip-static.cdn.bcebos.com/landing/product/ernie-bote321e5.png',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {     
    id: 2,
    name: 'dashscope', 
    title: '阿里灵积',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max', 'qwen-vl-plus'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4160791-200-qlqunomdvkyitpedtghnhsgjlutapgfl.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {     
    id: 3,
    name: 'deepseek', 
    title: 'DeepSeek',
    desc: 'DeepSeek',
    // https://api-docs.deepseek.com/zh-cn/
    models: ['deepseek-chat'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4981273-200-phhqenmywlkiybehuaqvsxpfekviajex.jpeg',
    createdAt: '2024-12-27',
    updatedAt: '2024-12-27'
  }
]