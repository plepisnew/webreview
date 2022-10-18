import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.directive('visible', function (el, binding) {
  el.style.visibility = binding.value ? 'visible' : 'hidden'
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
