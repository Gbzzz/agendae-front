import { defineStore } from 'pinia';
import axios from '@/axios';

export const useMe = defineStore('me', {
  state: () => ({
    user: null
  }),

  actions: {
    async getMe() {
      try {
        const response = await axios.get('api/me')
        this.user = response.data.data
      } catch (error) {
        console.error('Erro ao obter informações do usuário: ', error)
      }
    }
  },

  clearUser(){
    this.user = null
  }
})
