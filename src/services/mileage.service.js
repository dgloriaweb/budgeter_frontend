import axios from 'axios'
import authService from './auth.service'
import { useStore } from '@/store/index'


class MileageService {
  getMileagesByUser = async (user_id) => {
    const store = useStore()
    user_id = store.userId
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/mileage_report/' + user_id
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
  getMileageDetails = async (mileage_id) => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/mileages/' + mileage_id
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
  setMileage = async (mileage) => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/mileages/' + mileage.id
      const response = await axios({
        method: 'post',
        url: url,
        headers: authService.getApiHeaders(),
        params: {
          mileage
        }
      })
      return response
    } catch (error) {
      alert('error in setMileage: '.error)
    }
  }

  setNewMileage = async (new_mileage_data) => {
    var data = new_mileage_data
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/mileages/'
      const response = await axios({
        method: 'post',
        url: url,
        headers: authService.getApiHeaders(),
        data
      })
      return response
    } catch (error) {
      alert('error in setNewMileage: '.error)
    }
  }
  getLastMileageData = async () => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/last_mileage_data/'
      const response = await axios({
        method: 'get',
        url: url,
        headers: authService.getApiHeaders()
      })
      return response
    } catch (error) {
      alert('error in setMileage: '.error)
    }
  }
}
export default new MileageService()
