import { defineStore } from 'pinia'
import { db } from '../db'
import { ConversationProps } from '../types'

export interface ConversationStore {
  items: ConversationProps[];
  selectedId: number;
}

export const useConversationStore = defineStore('conversation', {
  state: (): ConversationStore => {
    return {
      items: [],
      selectedId: -1
    }
  },
  actions: {
    async fetchConversations() {
      const items = await db.conversations.toArray()
      this.items = items
    },
    async createConversation(createdData: Omit<ConversationProps, 'id'>) {
      const newCId = await db.conversations.add(createdData)
      this.items.push({
        id: newCId,
        ...createdData
      })
      return newCId
    },
    async deleteConversation(id: number) {
      await db.conversations.delete(id)
      const index = this.items.findIndex(item => item.id === id)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    }
  },
  getters: {
    totalNumber: (state) => state.items.length,
    getConversationById: (state) => (id: number) => {
      return state.items.find(item => item.id === id)
    }
  }
})