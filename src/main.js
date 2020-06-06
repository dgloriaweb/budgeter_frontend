import Vue from 'vue'
import App from './App.vue'
import router from './routes'
// import db from './db.json'

Vue.config.productionTip = false

// const db_json = db

//Filters
Vue.filter('toFloat', function(value) {
  if (typeof value !== 'number') {
    return value
  }
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // var formatter = new Intl.NumberFormat('en-UK', {  })
  // return formatter.format(value.toFixed(2))
})

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
