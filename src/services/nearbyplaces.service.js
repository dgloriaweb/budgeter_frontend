import axios from 'axios';
import { useNearbyPlacesStore } from '@/store/nearbyplacesstore'; 
import authService from './auth.service'

class NearbyPlacesService {
  
  async getNearbyPlaces(latitude, longitude, radius) {
    const nearbyPlacesStore = useNearbyPlacesStore();

    try {
      const url = `${import.meta.env.VITE_APP_API_URL}/api/getNearbyPlaces?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

      const response = await axios.get(url, {
        headers: authService.getApiHeaders(),
      });

      // Dispatch an action to update the location in the store
      nearbyPlacesStore.setLocation(`${latitude},${longitude}`);
      // Dispatch an action to update the McDonald's places in the store
      nearbyPlacesStore.setMcdonalds(response.data.results);

      return response.data;
    } catch (error) {
      console.error('Error fetching nearby places:', error);
      throw error;
    }
  }

}

export default new NearbyPlacesService();
