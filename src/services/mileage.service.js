import axios from 'axios'
import authService from './auth.service'

class MileageService {
  getMileages = async () => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/mileages'
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
        params:{
            mileage
        }
      })
      return response
    } catch (error) {
      alert('error in setMileage: '.error)
    }
  }

  createMileage = async (mileage) => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/mileages/'
      const response = await axios({
        method: 'post',
        url: url,
        headers: authService.getApiHeaders(),
        params:{
          mileage
        }
      })
      return response
    } catch (error) {
      alert('error in createMileage: '.error)
    }
  }
}
export default new MileageService()
