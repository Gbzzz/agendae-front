import { defineStore } from 'pinia';
import { useMe } from '@/store/me';
import axios from '@/axios';

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async sanctum() {
      await axios.get('sanctum/csrf-cookie');
    },
    async login(email, password) {
      await this.sanctum()
      const response = await axios.post('api/login', { email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      this.token = token

      const meStore = useMe()
      await meStore.getMe()
      return response.data
    },
    async logout() {
      await axios.post('api/logout')
      this.token = null
      const meStore = useMe()
      meStore.clearUser()
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
})
