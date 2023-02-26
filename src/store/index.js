import { defineStore } from 'pinia'
import userService from '@/services/user.service'
import mileageService from '../services/mileage.service'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
    userId: null,
    user: null,
    access_token: null,
  }),
  getters: {
    getLoginState(state) {
      return state.isLoggedIn
    },
    getUserId(state) {
      return state.userId
    },
    getUser(state) {
      return state.user
    },
    getAccessToken(state) {
      return state.access_token
    },
  },
  actions: {
    setAccessToken() {
      let storedUser = JSON.parse(localStorage.getItem('user'))
      this.access_token = storedUser?.token
    },
    setUserId() {
      let storedUser = JSON.parse(localStorage.getItem('user'))
      this.userId = storedUser?.userId
    },
    setUser() {
      userService.getUserByUserId().then((response) => {
        this.user = response.data
      })

    },
    setLoggedInStatus() {
      this.setAccessToken()
      this.setUserId()
      if (this.access_token) {
        this.isLoggedIn = true
      }
    },
    setUserInLocalStore(userdata) {
      localStorage.setItem('user', userdata)
      this.setLoggedInStatus()
    },
    logout() {
      localStorage.removeItem('user')
      this.isLoggedIn = false
    },
    initialiseComponents() {
      this.setLoggedInStatus()
      if (this.isLoggedIn) {
      
      }
    }
  },
})
