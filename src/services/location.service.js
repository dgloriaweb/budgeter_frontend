import axios from 'axios'
import authService from './auth.service'
import { useStore } from '@/store/index'


class LocationService {
    getLocationDetails = async (location_id) => {
        try {
            const url = import.meta.env.VITE_APP_API_URL + '/api/locations/' + location_id
            const response = await axios.get(url, {
                headers: authService.getApiHeaders(),
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    getAllLocations = async () => {
        try {            
            const url = import.meta.env.VITE_APP_API_URL + '/api/locations/' 
            const response = await axios.get(url, {
                headers: authService.getApiHeaders(),
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
}
export default new LocationService()
