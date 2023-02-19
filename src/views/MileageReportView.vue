<template>
    <div>
        <!-- <table>
            <div v-for="mileageData in mileageStore.mileages" :key="mileageData">
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Partner/Cause
                    </th>
                    <th>
                        Location of starting
                    </th>
                    <th>
                        Location of finishing
                    </th>
                    <th>
                        Personal travel to location
                    </th>
                    <th>
                        Opening odometer
                    </th>
                     <th>
                        Delivery mileage
                    </th>
                    <th>
                        Personal travel from location

                    </th>
                    <th>
                        Closing odometer
                    </th>
                    <th>
                        Comments
                    </th>
                </tr>

                <tr>
                    <td>
                        {{ mileageData.date }}
                    </td>
                    <td>
                        {{ mileageData.partner.partner }}
                    </td>
                    <td>
                        {{ mileageData.locationstart.location_name }}
                    </td>
                    <td>
                        {{ mileageData.locationend.location_name }}
                    </td>
                    <td>
                        {{ mileageData.opening_mileage }}
                    </td>
                    <td>
                        {{ mileageData.personal_travel_at_start }}
                    </td>
                    <td>
                        {{ mileageData.closing_mileage- mileageData.opening_mileage}}
                    </td>
                    <td>
                        {{ mileageData.personal_travel_at_end }}
                    </td>
                    <td>
                        {{ mileageData.closing_mileage }}
                    </td>
                    <td>
                        {{ mileageData.comments }}
                    </td>
                </tr>
            </div>

        </table> -->
        {{mileageStore.mileages_report}}
    </div>
</template>

<script setup>
import { useMileageStore } from '@/store/mileagestore'
import { useStore } from '@/store/index'

const mileageStore = useMileageStore()
const store = useStore()

if (store.isLoggedIn) {
    mileageStore.setMileagesReport()
} else {
    console.log('not logged in')
}
</script>
<style>
tr,
td,
th {
    border: 1px solid #ccc;
}
</style>
