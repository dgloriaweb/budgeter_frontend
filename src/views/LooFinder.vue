<template>
    <div class="main">
        <h1>Find nearest Loo</h1>
        <button @click="getLocationAndUpdateStore">Get Location</button>
        <p v-if="store.userLocation">User Location: {{ store.userLocation }}</p>

        <button @click="findNearbyMcDonalds">Find Nearby Loos</button>
        <p v-if="store.mcdonalds.length">
            Nearby Places with Public Toilets:
        <ul>
            <li v-for="place in store.mcdonalds" :key="place.name">
                {{ place.name }} ({{ place.vicinity }}) distance: {{ place.distance }} -
                <!-- <a :href="`https://www.google.com/maps/dir/${place.place_id}/@${store.userLocation},14z/data=!4m2!4m1!3e0?entry=ttu`" target="_blank">Directions</a> -->
                <a :href="`https://www.google.com/maps/dir/?api=1&origin=${store.userLocation}&destination=${place.geometry.location.lat},${place.geometry.location.lng}`" target="_blank">Directions</a>
          </li>
        </ul>
        </p>
    </div>
</template>
  
<script setup>
import { useNearbyPlacesStore } from '@/store/nearbyplacesstore'


const store = useNearbyPlacesStore()
const getLocationAndUpdateStore = async () => {
    try {
        const location = await store.getLocationAndUpdateStore();
        // Optionally, you can perform additional logic with the location if needed
    } catch (error) {
        console.error(`Error getting location: ${error.message}`);
        // Handle error as needed
    }
};
const findNearbyMcDonalds = () => {
    store.findNearbyMcDonalds(store.userLocation);
};

</script>
  