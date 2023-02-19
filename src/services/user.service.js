import axios from 'axios'
import { useStore } from '@/store/index'
import authService from './auth.service'

class UserService {
  // getters
  getUserByUserId = async () => {
    const store = useStore()
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/people/' + store.userId
      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  //setters
  updateUser = async (user) => {
    const store = useStore()
    try {
      const url = import.meta.env.VITE_APP_API_URL + '/api/people/' + user.id
      const response = await axios({
        method: 'post',
        url: url,
        headers: authService.getApiHeaders(),
        params: {
          userId: store.userId,
          user,
        },
      })
      return response
    } catch (error) {
      alert('error in updateUser: '.error)
    }
  }


}
export default new UserService()
