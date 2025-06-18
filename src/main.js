import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faPencil } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faTrashCan, faSquareCheck } from '@fortawesome/free-regular-svg-icons'


library.add(
    faPlus, 
    faSquare,
    faTrashCan,
    faSquareCheck,
    faPencil
)



const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
