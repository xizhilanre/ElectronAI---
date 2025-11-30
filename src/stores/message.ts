import { defineStore } from 'pinia'
import { db } from '../db'
import { MessageProps, MessageStatus, UpdatgedStreamData } from '../types'

export interface MessageStore {
  items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
  state: (): MessageStore => {
    return {
      items: []
    }
  },
  actions: {
    async fetchMessagesByConversation(conversationId: number) {
      const items = await db.messages.where({ conversationId }).toArray()
      this.items = items
    },
    async createMessage(createdData: Omit<MessageProps, 'id'>) {
      const newMessageId = await db.messages.add(createdData)
      this.items.push( { id: newMessageId, ...createdData })
      return newMessageId
    },
    async updateMessage(messageId: number, updatedData: Partial<MessageProps>) {
      await db.messages.update(messageId, updatedData)
      const index = this.items.findIndex(item => item.id === messageId)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updatedData }
      }
    }
  },
  getters: {
    getLastQuestion: (state) => (conversationId: number) => {
      return state.items.findLast(item => item.conversationId === conversationId && item.type === 'question')
    },
    isMessageLoading: (state) => {
      return state.items.some(item => item.status === 'loading' || item.status === 'streaming')
    }
  }
})