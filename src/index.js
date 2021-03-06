import 'bootstrap/dist/css/bootstrap.min.css'; 
import './services/firebase.js';
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import {createApp} from "vue"; 

import router from "./router/router.js";
import App from './App.vue';
import "./style.css" 

import img from './assets/images/domains.jpg';

createApp(App)
    .use(router) 
    .use(Toast)
    .mount('#root'); 