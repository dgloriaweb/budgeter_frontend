import { defineStore } from 'pinia'
import kareszService from '@/services/karesz.service'
import { useStore } from '@/store/index'

export const useKareszStore = defineStore('karesz', {
    state: () => ({
        earnings: null,
    }),
    getters: {
        getEarnings(state) {
            return state.earnings
        }
    },
    actions: {
        getEarningsReport() {
            this.earnings =  [
                { title: 'Post Title 1' },
                { title: 'Post Title 2' },
                { title: 'Post Title 3' },
                { title: 'Post Title 4' },
                { title: 'Post Title 5' }
            ]
        }
    }
})
