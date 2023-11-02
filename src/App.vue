<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStore } from '@/store/index'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

const store = useStore()
const route = useRouter()

onMounted(() => {
  store.initialiseComponents()
})
function logout() {
  store.logout()
  store.setLoggedInStatus();
  route.push('/')
}
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- side menu here -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="!store.isLoggedIn" to="/login" class="btn btn-nav btn-primary">Login</RouterLink>
        <RouterLink v-if="!store.isLoggedIn" to="/register" class="btn btn-nav">Register</RouterLink>
        <RouterLink to="/mileage_create">Create Mileage</RouterLink>
        <RouterLink to="/mileage_update">Edit Mileages</RouterLink>
        <RouterLink to="/mileage_report">Mileages Report</RouterLink>
        <RouterLink to="/FAQ" class="btn btn-nav">FAQ</RouterLink>
        <div @click="logout" v-if="store.isLoggedIn" class="btn btn-nav">
          Logout
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
