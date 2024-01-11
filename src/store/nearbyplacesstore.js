import { defineStore } from 'pinia';
import NearbyPlacesService from '@/services/nearbyplaces.service.js'

export const useNearbyPlacesStore = defineStore({
  id: 'nearbyplacesstore',
  state: () => ({
    userLocation: null,
    location: null,
    mcdonalds: [],
  }),
  getters: {
    getLocation: (state) => state.location,
    getUserLocation: (state) => state.userLocation,
    getMcdonalds: (state) => state.mcdonalds,
  },
  actions: {
    setLocation(location) {
      this.location = location;
    },
    setUserLocation(userlocation) {
      this.userLocation = userlocation;
    },
    setMcdonalds(mcdonalds) {
      this.mcdonalds = mcdonalds;
    },
    async getLocationAndUpdateStore() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              const location = `${latitude},${longitude}`;

              // Update the store with the user location
              this.setUserLocation(location);
              resolve(location);
            },
            (error) => {
              console.error(`Error getting location: ${error.message}`);
              reject(error);
            }
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    },
    async findNearbyMcDonalds(userLocation) {
      if (!userLocation) {
        alert("Please provide a user location.");
        return;
      }

      const radius = 2500;

      try {
        const placesData = await NearbyPlacesService.getNearbyPlaces(
          userLocation.split(',')[0],
          userLocation.split(',')[1],
          radius
        );

        // Update the store with the list of nearby places (McDonald's)
        this.setMcdonalds(placesData.results);
        console.log(placesData.results);
      } catch (error) {
        console.error(`Error fetching nearby McDonald's: ${error.message}`);
      }
    },

  },
});
