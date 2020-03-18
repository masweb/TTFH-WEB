import './sass/app.scss'
import '@fortawesome/fontawesome-free/css/all.css'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@fortawesome/fontawesome-free/js/all.js'
import Notifications from 'vue-notification'
import moment from 'moment'
require('moment/locale/es')

import VModal from 'vue-js-modal'
import i18n from './i18n'
Vue.prototype.moment = moment

Vue.config.productionTip = false

Vue.use(Notifications)
Vue.use(VModal, { dialog: true })

new Vue({
 store,
 i18n,
 render: h => h(App)
}).$mount('#app')
