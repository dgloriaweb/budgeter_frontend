import { defineStore } from 'pinia'
import mileageService from '@/services/mileage.service'
import { useStore } from '@/store/index'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useMileageStore = defineStore('mileages', {
  state: () => ({
    mileages_report: null,
    mileage: null,
    last_mileage_data: null,
    new_mileage_data: {
      "user_id": 1,
      "date": "",//set this to be the last date by default
      "opening_mileage": "", // last by default
      "closing_mileage": "",
      "partner_id": null,
      "location_id_start": "", // last location_id_end by default
      "location_id_end": null,
      "personal_travel_at_start": 0,
      "personal_travel_at_end": 0
    }
  }),
  getters: {
    getMileagesByUser(state) {
      return state.mileages
    },
    getMileage(state) {
      return state.mileage
    },
    getNewMileageData(state) {
      return state.new_mileage_data
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

    getLastMileageData() {
      mileageService
        .getLastMileageData()
        .then((response) => {
          this.last_mileage_data = response.data
          // update data with the last values
          this.new_mileage_data.date = this.last_mileage_data.date
          this.new_mileage_data.opening_mileage = this.last_mileage_data.closing_mileage
          this.new_mileage_data.location_id_start = this.last_mileage_data.location_id_end
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
})
