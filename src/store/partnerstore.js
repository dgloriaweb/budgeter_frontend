import { defineStore } from 'pinia'
import partnerService from '@/services/partner.service'
import { useStore } from '@/store/index'

// always rename the defineStore because it can cause disambiguity if names are the same
export const usePartnerStore = defineStore('partners', {
    state: () => ({
        partner: null,
        partners: null
    }),
    getters: {
        getPartner(state) {
            return state.partner
        },
        getPartners(state) {
            return state.partners
        },
    },
    actions: {
        setPartner(id) {
            partnerService
                .getPartnerDetails(id)
                .then((response) => {
                    this.partner = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        setPartners() {
            partnerService
                .getAllPartners()
                .then((response) => {
                    this.partners = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        unsetPartner() {
            this.partner = null
            //also clear it from the cache
        },
    },
})
