import { defineStore } from 'pinia'
import mileageService from '@/services/mileage.service'
import { useStore } from '@/store/index'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useMileageStore = defineStore('mileages', {
  state: () => ({
    mileages_report: null,
    mileage: null,
  }),
  getters: {
    getMileagesByUser(state) {
      return state.mileages
    },
    getMileage(state) {
      return state.mileage
    },
  },
  actions: {
    setMileagesReport() {
      const store = useStore()
      mileageService.getMileagesByUser(store.userId).then((response) => {
        this.mileages_report = response.data
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
