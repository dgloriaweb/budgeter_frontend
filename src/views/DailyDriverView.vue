<template>
    <div class="main" v-if="store.isLoggedIn">
        <h1>Daily Earnings</h1>
        <div>
            <div class="container container1">
                <div class="item center-align">Company</div>
                <div class="item center-align">Amount</div>
                <div class="item center-align">
                    <select name="companyDropdown" id="companyDropdown" class="dropdown">
                        <option value="Amazon">Amazon</option>
                        <option value="UberEats">UberEats</option>
                        <option value="Deliveroo">Deliveroo</option>
                    </select>
                </div>
                <div class="item center-align amount-item">
                    £ <input type="number" name="newAmount" id="newAmount" />
                </div>


                <div class="btn btn-success" @click="setAmount('add')">
                    Add amount
                </div>

                <div class="btn btn-danger" @click="setAmount('deduct')">
                    Deduct amount
                </div>
            </div>
        </div>
        <hr>
        <div class="">
            <h2>Earnings</h2>
            <div class="container container2" v-for="myitem in myobject">
                <div class="item">{{ myitem.name }}</div>
                <div class="item">£</div>
                <div class="item">{{ myitem.serviceTotal }}</div>

            </div>

        </div>
        <hr>
        <div class="center-align">
            Today's Total:
            <br>
        </div>
        <div class="total-amount center-align">{{ Total.toFixed(2) }}</div>
        <br>
        <div ref="container" class="swipercontainer select-none">
            <button id="resetswiper" @click="reset">
                Reset this
            </button>
            <div ref="target" class="swiperoverlay" :class="{ animated: !isSwiping }" :style="{ left, opacity }">
                <p>Swipe to Reset <span>&rsaquo;&rsaquo;</span></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useKareszStore } from '@/store/kareszstore'
import { useStore } from '@/store/index'
import { ref, onMounted } from 'vue';
import { useSwipe } from '@vueuse/core'

const kareszStore = useKareszStore()
kareszStore.getEarningsReport()
const store = useStore()

const myobject = ref({
    0: {
        name: "Amazon",
        serviceTotal: 0
    },
    1: {
        name: "UberEats",
        serviceTotal: 0
    },
    2: {
        name: "Deliveroo",
        serviceTotal: 0
    }
});


function setAmount(mode) {
    // console.log (companyDropdown.companyDropdown.value)
    // console.log (setAmount.value)
    var selectedService = companyDropdown.value
    var amount = newAmount.value
    //find service name from the myobject and add the amount to the servicetotal
    const foundObject = findObjectByName(selectedService);
    if (mode == "add") {
        foundObject.serviceTotal += Number(amount)
    }
    if (mode == "deduct") {
        if (foundObject.serviceTotal > Number(amount)) {
            foundObject.serviceTotal -= Number(amount)
        }
        else {
            foundObject.serviceTotal = 0
        }
    }
    localStorage.setItem(foundObject.name + "Amount", foundObject.serviceTotal.toFixed(2))
    document.getElementById('newAmount').value = ''
    getAmountsFromLocalStorage()
}

function findObjectByName(nameToFind) {
    const keys = Object.keys(myobject.value);
    for (const key of keys) {
        if (myobject.value[key].name === nameToFind) {
            return myobject.value[key];
        }
    }
    return null; // Return null if not found
}

function resetAmounts() {
    for (const key in myobject.value) {
        if (Object.hasOwnProperty.call(myobject.value, key)) {
            myobject.value[key].serviceTotal = 0;
            Total = 0
        }
    }
    localStorage.clear()
    // reset swiper button
    setTimeout(() => {
        reset();
    },1000) 
        
}


const target = ref(null)
const container = ref(null)
const containerWidth = ref(0)
const left = ref('0')
const opacity = ref(1)
var Total = 0

function reset() {
    left.value = '0'
    opacity.value = 1
}

const { direction, isSwiping, lengthX, lengthY } = useSwipe(target, {
    passive: false,
    onSwipe(e) {
        if (containerWidth.value) {
            if (lengthX.value < 0) {
                const length = Math.abs(lengthX.value)
                left.value = `${length}px`
                opacity.value = 1.1 - length / containerWidth.value
            } else {
                left.value = '0'
                opacity.value = 1
            }
        }
    },
    onSwipeEnd(e, direction) {
        if (
            lengthX.value < 0 &&
            containerWidth.value &&
            Math.abs(lengthX.value) / containerWidth.value >= 0.5
        ) {
            left.value = '100%'
            opacity.value = 0
        } else {
            left.value = '0'
            opacity.value = 1
        }
        resetAmounts()
    },
})

function getAmountsFromLocalStorage() {
    Total = 0
    var AmazonAmount = localStorage.getItem("AmazonAmount")
    if (AmazonAmount > 0) {
        const foundObject = findObjectByName("Amazon")
        foundObject.serviceTotal = Number(AmazonAmount)
        Total += foundObject.serviceTotal
    }
    var UberEatsAmount = localStorage.getItem("UberEatsAmount")
    if (UberEatsAmount > 0) {
        const foundObject = findObjectByName("UberEats")
        foundObject.serviceTotal = Number(UberEatsAmount)
        Total += foundObject.serviceTotal
    }
    var DeliverooAmount = localStorage.getItem("DeliverooAmount")
    if (DeliverooAmount > 0) {
        const foundObject = findObjectByName("Deliveroo")
        foundObject.serviceTotal = Number(DeliverooAmount)
        Total += foundObject.serviceTotal
    }
    return Total
}
onMounted(() => {
    containerWidth.value = container.value?.offsetWidth || 0
    getAmountsFromLocalStorage()
})

</script>

<style scoped>
h1,
h2,
h3,
h4 {
  text-align: center;
 }
</style>