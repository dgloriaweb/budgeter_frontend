<template>
  <div class="wrapper">
    <div class="form-group">
      <label for="name">Name</label>
      <br />
      <input name="name" type="text" class="form_control" v-model="name"/>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <br />
      <input name="email" type="email" class="form_control" v-model="email" />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <br />
      <input
        name="password"
        type="password"
        class="form_control"
        v-model="password"
      />
    </div>
    <div class="form-group">
      <label for="password_confirmation">Confirm Password</label>
      <br />
      <input
        name="password_confirmation"
        type="password"
        v-model="password_confirmation"
        class="form_control"
      />
    </div>
    <div class="form-group">
      <div class="btn btn-success" @click="validate">Sign Up</div>
      </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
import authService from '@/services/auth.service'
import { ref, onMounted } from 'vue'


// data
var name = ref("dgloria")
var email = ref("dgloria2.web@gmail.com")
var password = ref("p@X9eT&7KvDD")
var password_confirmation = ref("p@X9eT&7KvDD")
const store = useStore()
const route = useRouter()

function validate() {
  let user = {
    email: email.value,
    password: password.value,
    name: name.value,
    password_confirmation: password_confirmation.value,
  }
  // validation
  if (!user.name || !user.email || !user.password || !user.password_confirmation) {
    alert('please fill in all details.')
  }
  else {
    register(user)
  }
}

// methods
function register(user) {

  authService.register(user).then(() =>
    route.push({ name: 'home' })
  )

}
onMounted(() => {
  if (store.userId) {
    route.push({ name: 'home' })
  }
})
</script>
