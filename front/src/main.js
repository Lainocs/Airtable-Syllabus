import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Airtable from 'airtable'
import { io } from 'socket.io-client'

// title
document.title = 'Fiche Module'

const app = createApp(App)
app.use(router)
app.config.globalProperties.$airtable = new Airtable({
	apiKey: process.env.VUE_APP_AIRTABLE_API_KEY,
}).base(process.env.VUE_APP_AIRTABLE_BASE)

app.config.globalProperties.$socket = io(process.env.VUE_APP_SOCKET_DSN, {
	secure: true,
	rejectUnauthorized: false,
})

app.mount('#app')
