import { defineStore } from 'pinia'
import { db } from '../db'
import { ProviderProps } from '../types'

export interface ProviderStore {
  items: ProviderProps[]
}

export const useProviderStore = defineStore('provider', {
  state: (): ProviderStore => {
    return {
      items: []
    }
  },
  actions: {
    async fetchProviders() {
      const items = await db.providers.toArray()
      this.items = items
    }
  },
  getters: {
    getProviderById: (state) => (id: number) => {
      return state.items.find(item => item.id === id)
    }
  }
})