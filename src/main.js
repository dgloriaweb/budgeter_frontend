import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueResource from "vue-resource"

Vue.config.productionTip = false
Vue.use(VueResource);

//Filters
Vue.filter('toFloat', function(value) {
  if (typeof value !== 'number') {
    return value
  }
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // other option
  // var formatter = new Intl.NumberFormat('en-UK', {  })
  // return formatter.format(value.toFixed(2))
})

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
