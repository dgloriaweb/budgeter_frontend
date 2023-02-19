<template>
    <div>
        <table>
            <div v-for="mileageData in mileageStore.mileages" :key="mileageData">
                <tr>
                    <td>
                        {{ mileageData.date }}
                    </td>
                    <td>
                        {{ mileageData.location_id_start }}
                    </td>
                    <td>
                        {{ mileageData.location_id_end }}
                    </td>
                    <td>
                        {{ mileageData.partner.partner }}
                    </td>
                </tr>
            </div>

        </table>
    </div>
</template>

<script setup>
import { useMileageStore } from '@/store/mileagestore'
import { useStore } from '@/store/index'

const mileageStore = useMileageStore()

mileageStore.setMileages()

</script>
