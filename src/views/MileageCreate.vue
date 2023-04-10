<template>
    <div v-if="!mainStore.isLoggedIn">
        <p>Please login to continue</p>
        <RouterLink to="/login">Login</RouterLink>

    </div>
    <div v-else>
        <div class="form_group_item">
            <label for="date">
                Select Date
            </label>
            <br>
            <input id="date" type="date" name="date" v-model="mileageStore.new_mileage_data.date" />
            <button v-if="mileageStore.new_mileage_data.date != mileageStore.last_mileage_data?.date" id="setToToday" @click="setToToday">Current day</button>
        </div>

        <div class="form_group_item">
            <label for="opening_mileage">Opening mileage</label>
            <br>
            <input id="opening_mileage" type="number" name="opening_mileage" v-model="mileageStore.new_mileage_data.opening_mileage" />
        </div>

        <div class="form_group_item">
            <label for="closing_mileage">Closing mileage</label>
            <br>
            <input id="closing_mileage" type="number" name="closing_mileage" v-model="mileageStore.new_mileage_data.closing_mileage" />
        </div>
        <div class="form_group_item">
            <label for="selected_partner">Select a Partner</label>
            <br>
            <select id="partner" name="selected_partner" v-model="mileageStore.new_mileage_data.partner_id">
                <option v-for="(option, key) in partnerStore.partners" :value="option.id" :key="key">
                    {{ option.partner }}
                </option>
            </select>
            <div>Selected: {{ selected_partner }}</div>
        </div>
        <div class="form_group_item">
            <label for="selected_location_start">Select a location start</label>
            <br>
            <select id="location_start" name="selected_location_start" v-model="mileageStore.new_mileage_data.location_id_start">
                <option v-for="(option, key) in locationStore.locations" :value="option.id" :key="key">
                    {{ option.location_name }}
                </option>
            </select>
            <div>Selected: {{ location_id_start }}</div>
        </div>
        <div class="form_group_item">
            <label for="selected_location_end">Select a location end</label>
            <br>
            <select id="location_end" name="selected_location_end" v-model="mileageStore.new_mileage_data.location_id_end">
                <option v-for="(option, key) in locationStore.locations" :value="option.id" :key="key">
                    {{ option.location_name }}
                </option>
            </select>
            <div>Selected: {{ location_id_end }}</div>
        </div>
        <button @click="validateMileage">Create</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import mileageService from '@/services/mileage.service'
import { useStore } from '@/store/index'
import { usePartnerStore } from '@/store/partnerstore'
import { useLocationStore } from '@/store/locationstore'
import { useMileageStore } from '@/store/mileagestore'
import { onMounted } from 'vue'
import { format } from 'date-fns'

const mainStore = useStore()
const partnerStore = usePartnerStore()
const locationStore = useLocationStore()
const mileageStore = useMileageStore()
var isValid = false

/**
    @property {object} partners
    @property {number} selected_partner
*/


var selected_partner = ref(null)
var location_id_start = ref(null)
var location_id_end = ref(null)
var user_id = mainStore.userId

// when user changes the partner in the list, update the object
// if (selected_partner != mileageStore.new_mileage_data.partner_id) {
//     setSelectedPartner()
// }
// function setSelectedPartner() {
//     mileageStore.new_mileage_data.partner_id = selected_partner
// }

function storeMileage() {
    if (isValid) {
        console.log(isValid);
        mileageService.setNewMileage(mileageStore.new_mileage_data).then(
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
            }
            )
    }
}

function validateMileage() {
    //new mileage number cannot be more than 200+ miles and cannot be less than previous mileage
    var prevMileage = mileageStore.last_mileage_data.closing_mileage
    var newMileage = mileageStore.new_mileage_data.closing_mileage
    if (newMileage >= prevMileage + 200 || newMileage < prevMileage) {
        alert('new data cannot be this value')
        mileageStore.new_mileage_data.closing_mileage = prevMileage
        document.getElementById('closing_mileage').focus()
        return false
    }

    
    //selected partner cannot be empty
    if (!document.getElementById("partner").value || document.getElementById("partner").value == "") {
        alert('partner must be set')
        document.getElementById("partner").focus()
        return false
    }
    //selected end location cannot be empty
    if (!document.getElementById("location_end").value || document.getElementById("location_end").value == "") {
        alert('location end must be set')
        document.getElementById("location_end").focus()
        return false
    }
    isValid = true
    storeMileage()
}
// this needs thinking about
// function setNextDay() {
//     var date = new Date(mileageStore.last_mileage_data.date);
//     date.setDate(date.getDate() + 1);
//     mileageStore.new_mileage_data.date = format(date, 'yyyy-MM-dd');
// }

function setToToday() {
    mileageStore.new_mileage_data.date = mileageStore.last_mileage_data.date;

}

onMounted(() => {
    mainStore.setLoggedInStatus()
    if (mainStore.isLoggedIn) {
        partnerStore.setPartners()
        locationStore.setLocations()
        mileageStore.getLastMileageData()
    }
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
