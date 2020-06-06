import Vue from 'vue'
import App from './App.vue'
import router from './routes'

Vue.config.productionTip = false

//Filters
Vue.filter('to-float', function(value) {
  if (typeof value !== 'number') {
    return value
  }
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
