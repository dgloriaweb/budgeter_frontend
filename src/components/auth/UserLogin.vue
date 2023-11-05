<template>
  <div class="wrapper">
    <div class="form-group">
      <label for="email">Email</label>
      <br />
      <input name="email" type="email" class="form-control" v-model="email" placeholder="email" focus/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <br />
      <input
        name="password"
        type="password"
        class="form-control"
        v-model="password"
        placeholder="password"
      />
    </div>
    <div class="form-group">
      <div class="btn btn-success" @click="handleLogin">Login</div>
      <br />
      <br />
      <router-link :to="{ name: 'register' }" class="">
        Or click here to register
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import authService from '@/services/auth.service'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

// data
var email = ref('email')
var password = ref('password')
const store = useStore()
const route = useRouter()

// methods
function handleLogin() {
  let user = {
    email: email.value,
    password: password.value
  }
  authService.login(user).then(() =>
    route.push({ name: 'home' })
  )
}
onMounted(() => {
  if (store.userId) {
    route.push({ name: 'home' })
  }
})
</script>

<style scoped>
</style>