import axios from 'axios'
import authService from './auth.service'
import { useStore } from '@/store/index'


class PartnerService {
    getPartnerDetails = async (partner_id) => {
        try {
            const url = import.meta.env.VITE_APP_API_URL + '/api/partners/' + partner_id
            const response = await axios.get(url, {
                headers: authService.getApiHeaders(),
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    getAllPartners = async () => {
        try {            
            const url = import.meta.env.VITE_APP_API_URL + '/api/partners/' 
            const response = await axios.get(url, {
                headers: authService.getApiHeaders(),
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
}
export default new PartnerService()
