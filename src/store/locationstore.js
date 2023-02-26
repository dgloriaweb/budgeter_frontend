import { defineStore } from 'pinia'
import locationService from '@/services/location.service'
import { useStore } from '@/store/index'

// always rename the defineStore because it can cause disambiguity if names are the same
export const useLocationStore = defineStore('locations', {
    state: () => ({
        location: null,
        locations: null
    }),
    getters: {
        getLocation(state) {
            return state.location
        },
        getLocations(state) {
            return state.locations
        },
    },
    actions: {
        setLocation(id) {
            locationService
                .getLocationDetails(id)
                .then((response) => {
                    this.location = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        setLocations() {
            locationService
                .getAllLocations()
                .then((response) => {
                    this.locations = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        unsetLocation() {
            this.location = null
            //also clear it from the cache
        },
    },
})
