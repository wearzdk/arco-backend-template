import { createApp } from 'vue'
import { Message } from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from './router'
import store from './store'
import directive from './directive'
import './mock'
import App from './App.vue'
import '@/assets/style/global.less'
import '@/api/interceptor'

// unocss
import '@unocss/reset/tailwind-compat.css'
import 'uno.css'

const app = createApp(App)

Message._context = app._context
app.use(ArcoVueIcon)
app.use(router)
app.use(store)
app.use(directive)

app.mount('#app')
