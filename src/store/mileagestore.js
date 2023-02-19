import { defineStore } from 'pinia'
import mileageService from '@/services/mileage.service'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useMileageStore = defineStore('mileages', {
  state: () => ({
    mileages: null,
    mileage: null,
  }),
  getters: {
    getMileages(state) {
      return state.mileages
    },
    getMileage(state) {
      return state.mileage
    },
  },
  actions: {
    setMileages() {
      console.log('here');
      mileageService.getMileages().then((response) => {
        console.log(response);

        this.mileages = response.data
      })
        .catch((error) => {
          console.log(error)
        })
    },
    setMileage(id) {
      mileageService
        .getMileageDetails(id)
        .then((response) => {
          this.mileage = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    unsetMileage() {
      this.mileage = null
      //also clear it from the cache
    },
  },
})
