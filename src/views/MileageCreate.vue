<template>
    <div v-if="!store.isLoggedIn">
        <p>Please login to continue</p>
    </div>
    <div v-else>
        <div class="form_group_item">
            <label for="date">
                Select Date
            </label>
            <br>
            <input id="date" type="date" name="date" v-model="new_mileage_data.date" />
            <button v-if="new_mileage_data.date != last_mileage_data?.date" id="setToToday" @click="setToToday">Current day</button>
        </div>

        <div class="form_group_item">
            <label for="opening_mileage">Opening mileage</label>
            <br>
            <input id="opening_mileage" type="number" name="opening_mileage" v-model="new_mileage_data.opening_mileage" />
        </div>

        <div class="form_group_item">
            <label for="closing_mileage">Closing mileage</label>
            <br>
            <input id="closing_mileage" type="number" name="closing_mileage" v-model="new_mileage_data.closing_mileage" />
        </div>
        <div class="form_group_item">
            <label for="selected_partner">Select a Partner</label>
            <br>
            <select id="partner" name="selected_partner" v-model="new_mileage_data.partner_id">
                <option v-for="(option, key) in partnerStore.partners" :value="option.id" :key="key">
                    {{ option.partner }}
                </option>
            </select>
            <div>Selected: {{ selected_partner }}</div>
        </div>
        <div class="form_group_item">
            <label for="selected_location_start">Select a location start</label>
            <br>
            <select id="location_start" name="selected_location_start" v-model="new_mileage_data.location_id_start">
                <option v-for="(option, key) in locationStore.locations" :value="option.id" :key="key">
                    {{ option.location_name }}
                </option>
            </select>
            <div>Selected: {{ location_id_start }}</div>
        </div>
        <div class="form_group_item">
            <label for="selected_location_end">Select a location end</label>
            <br>
            <select id="location_end" name="selected_location_end" v-model="new_mileage_data.location_id_end">
                <option v-for="(option, key) in locationStore.locations" :value="option.id" :key="key">
                    {{ option.location_name }}
                </option>
            </select>
            <div>Selected: {{ location_id_end }}</div>
        </div>
    </div>
    <button @click="storeMileage">Create</button>
</template>

<script setup>
import { ref } from 'vue';
import mileageService from '@/services/mileage.service'
import { usePartnerStore } from '@/store/partnerstore'
import { useStore } from '@/store/index'
import { useLocationStore } from '@/store/locationstore'
import { useMileageStore } from '@/store/mileagestore'
import { onMounted } from 'vue'
import { format } from 'date-fns'

const mainStore = useStore()
const partnerStore = usePartnerStore()
const locationStore = useLocationStore()
const mileageStore = useMileageStore()


/**
    @property {array} new_mileage_data
    @property {object} partners
    @property {number} selected_partner
*/
//  location id start has to be the previous location id end
var new_mileage_data = ref(
    {
        "user_id": 1,
        "date": "",//set this to be the last date by default
        "opening_mileage": "", // last by default
        "closing_mileage": "",
        "partner_id": null,
        "location_id_start": "", // last location_id_end by default
        "location_id_end": null,
        "personal_travel_at_start": 0,
        "personal_travel_at_end": 0
    })

var last_mileage_data = null;
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

function storeMileage() {
    mileageService.setNewMileage(new_mileage_data.value).then(
        (response) => {
            if (response.status != 200) {
                alert('unhandled error');
            }
            else {
                alert('success');
            }
            store.initialiseComponents()
        })
        .catch(error => {
            if (error.response.data.errors) {
                alert(error.response.data.errors);
            } else {
                alert('unhandled error');
            }
        })
}

// this needs thinking about
// function setNextDay() {
//     var date = new Date(last_mileage_data.date);
//     date.setDate(date.getDate() + 1);
//     new_mileage_data.value.date = format(date, 'yyyy-MM-dd');
// }

function setToToday() {
    new_mileage_data.value.date = last_mileage_data.date;

}
function updateNewMileageData() {
    new_mileage_data.value.date = last_mileage_data.date
    new_mileage_data.value.opening_mileage = last_mileage_data.closing_mileage
    new_mileage_data.value.location_id_start = last_mileage_data.location_id_end
}
function getLastMileageData() {
    mileageService
        .getLastMileageData()
        .then((response) => {
            last_mileage_data = response.data
            updateNewMileageData()
        })
        .catch((error) => {
            console.log(error)
        })
}
onMounted(() => {
    partnerStore.setPartners()
    locationStore.setLocations()
    getLastMileageData()
})
</script>

<style>
.form_group_item {
    margin-top: 1rem;
}

#setToToday {
    font-size: 20px;
    margin-left: 17px;
}

#date,
#closing_mileage,
#partner,
#location_end {
    font-size: 20px;

}

#opening_mileage,
#closing_mileage {
    max-width: 100px;
}
</style>
