<template>
    <div>
        <div class="">
            <label for="date">
                Select Date
            </label>
            <br>
            <input type="date" name="date" v-model="new_mileage_data.date" />
        </div>

        <div class="">
            <label for="opening_mileage">Opening mileage</label>
            <br>
            <input type="text" name="opening_mileage" v-model="new_mileage_data.opening_mileage" />
        </div>

        <div class="">
            <label for="closing_mileage">Closing mileage</label>
            <br>
            <input type="text" name="closing_mileage" v-model="new_mileage_data.closing_mileage" />
        </div>
        <div class="">
            <label for="selected_partner">Select a Partner</label>
            <br>
            <select name="selected_partner" v-model="new_mileage_data.partner_id">
                <option v-for="(option, key) in partnerStore.partners" :value="option.id" :key="key">
                    {{ option.partner }}
                </option>
            </select>
            <div>Selected: {{ selected_partner }}</div>
        </div>
        <div class="">
            <label for="selected_location_start">Select a location start</label>
            <br>
            <select name="selected_location_start" v-model="new_mileage_data.location_id_start">
                <option v-for="(option, key) in locationStore.locations" :value="option.id" :key="key">
                    {{ option.location_name }}
                </option>
            </select>
            <div>Selected: {{ location_id_start }}</div>
        </div>
        <div class="">
            <label for="selected_location_end">Select a location end</label>
            <br>
            <select name="selected_location_end" v-model="new_mileage_data.location_id_end">
                <option v-for="(option, key) in locationStore.locations" :value="option.id" :key="key">
                    {{ option.location_name }}
                </option>
            </select>
            <div>Selected: {{ location_id_end }}</div>
        </div>
    </div>
    <button @click="store_mileage">Create</button>
</template>

<script setup>
import { ref } from 'vue';
import mileageService from '@/services/mileage.service'
import { usePartnerStore } from '@/store/partnerstore'
import { useLocationStore } from '@/store/locationstore'
import { onMounted } from 'vue'
import { useStore } from '@/store/index'

const partnerStore = usePartnerStore()
const locationStore = useLocationStore()
const mainStore = useStore()

var user_id = mainStore.userId


/**
    @property {array} new_mileage_data
    @property {object} partners
    @property {number} selected_partner
*/
//  location id start has to be the previous location id end

var new_mileage_data =
{
    "user_id": user_id,
    "date": "2023-02-11",//set this to be the last date by default
    "opening_mileage": "94655",
    "closing_mileage": "94658",
    "partner_id": 7,
    "location_id_start": 4,
    "location_id_end": 1,
    "personal_travel_at_start": 0,
    "personal_travel_at_end": 0
}

var selected_partner = ref(null)
var location_id_start = ref(null)
var location_id_end = ref(null)

// when user changes the partner in the list, update the object
// if (selected_partner != new_mileage_data.partner_id) {
//     setSelectedPartner()
// }
// function setSelectedPartner() {
//     new_mileage_data.partner_id = selected_partner
// }

function store_mileage() {
    mileageService.setNewMileage(new_mileage_data).then(
        (response) => {
            if (response.status != 200) {
                alert('unhandled error');
            }
        })
        .catch(error => {
            if (error.response.data.errors) {
                alert(error.response.data.errors);
            } else {
                alert('unhandled error');
            }
        })

}
onMounted(() => {
    partnerStore.setPartners()
    locationStore.setLocations()
})
</script>
