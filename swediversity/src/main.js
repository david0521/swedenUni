import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axiosConfig.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
library.add(far)


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

app.use(router)

app.component('fa', FontAwesomeIcon)

app.mount('#app')