import { createApp } from 'vue'
import App from './App.vue'

import "./assets/styles/main.css";
import "atmosphere-ui/dist/style.css"
import router from "./router";
import { defineContract } from './utils/defineContract';
const contract = defineContract();

createApp(App)
.use(router)
.provide('contract', contract)
.mount('#app')
