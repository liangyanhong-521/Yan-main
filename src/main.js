import Vue from 'vue'
import App from './App.vue'
import YToast from './components/toast'

Vue.config.productionTip = false
Vue.use(YToast)

new Vue({
  render: h => h(App),
}).$mount('#app')
