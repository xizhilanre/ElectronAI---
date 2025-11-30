/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Conversation from './views/Conversation.vue'
import Settings from './views/Settings.vue'
import { useConversationStore } from './stores/conversation'
import './index.css'
import 'highlight.js/styles/github-dark.min.css'
import { i18n } from './i18n'

const routes = [
  { path: '/', component: Home },
  { path: '/conversation/:id', component: Conversation },
  { path: '/settings', component: Settings }
]
const router = createRouter({
  history: createMemoryHistory(),
  routes
})
router.beforeEach((to) => {
  const store = useConversationStore()
  console.log('path', to.path)
  if (!to.path.startsWith('/conversation/')) {
    store.selectedId = -1
  }
})
const pinia = createPinia()
console.log('👋 This message is being logged by "renderer.ts", included via Vite');

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')