import { defineStore } from 'pinia';
import { useMe } from '@/store/me';
import axios from 'axios';

export const useAuth = defineStore('auth', {
  state: () => ({}),

  actions: {
    sanctum() {
      return axios.get('sanctum/csrf-cookie');
    },
    async login(email, password) {
      await this.sanctum()
      return axios.post('api/login', {
        email, password
      }).then(r => {
        const meStore = useMe();
        meStore.getMe()
          .catch(() => {})
          .finally(() => {
          })
        meStore.user = r.data.data
        console.log(meStore.user)
      })
    },
    logout() {
      const meStore = useMe()
      return axios.post('api/logout').then(() => {
        meStore.user = null
      })
    },
    register(firstName, lastName = '', email, password) {
      return axios.post('api/register', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      })
    },
    verifyEmail(token) {
      return axios.post('api/verify-email', {
        token
      })
    },
    forgotPassword(email) {
      return axios.post('api/forgot-password', {
        email
      })
    },
    resetPassword(token, password) {
      return axios.post('api/reset-password', {
        token, password
      })
    }
  },
  getters: {
    isLoggedIn() {
      const meStore = useMe()
      return !!meStore.user
    }
  }
})
