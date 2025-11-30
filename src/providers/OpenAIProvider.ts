import OpenAI from 'openai'
import { BaseProvider } from './BaseProvider'
import { ChatMessageProps, UniversalChunkProps } from '../types'
import { convertMessages } from '../helper'

export class OpenAIProvider extends BaseProvider {
  private client: OpenAI;
  constructor(apiKey: string, baseURL: string) {
    super()
    this.client = new OpenAI({
      apiKey,
      baseURL
    })
  }
  async chat(messages: ChatMessageProps[], model: string) {
    const convertedMessages = await convertMessages(messages)
    const stream = await this.client.chat.completions.create({
      model,
      messages: convertedMessages as any,
      stream: true
    })
    const self = this
    return {
      async *[Symbol.asyncIterator]() {
        for await (const chunk of stream) {
          yield self.transformResponse(chunk)
        }
      }
    }
  }
  protected transformResponse(chunk: OpenAI.Chat.Completions.ChatCompletionChunk): UniversalChunkProps {
    const choice = chunk.choices[0]
    return {
      is_end: choice.finish_reason === 'stop',
      result: choice.delta.content || ''
    }
  }
}