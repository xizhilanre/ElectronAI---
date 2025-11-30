import { ChatMessageProps, UniversalChunkProps } from '../types'
export abstract class BaseProvider {
  abstract chat(messages: ChatMessageProps[], modelName: string): Promise<AsyncIterable<UniversalChunkProps>>; 
  protected abstract transformResponse(chunk: any): UniversalChunkProps;
}