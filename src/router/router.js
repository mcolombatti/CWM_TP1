import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Chat from "../components/Chat.vue";
import Register from "../components/Register.vue"; 
import Profile from "../components/Profile.vue";

import {authStateSubscribe} from "../services/auth.js";
const routes = [
    {
        name: 'home',
        component: Home,
        path: '/',
    },
    
    {
        name: 'register',
        component: Register,
        path: '/registro',
    },{
        name: 'login',
        component: Login,
        path: '/iniciar-sesion',
    },
    {
        name: 'chat',
        component: Chat,
        path: '/chat',
        meta: {
            authRequired: true,
        }
    },
    {
        name: 'profile',
        component: Profile,
        path: '/perfil',
        meta: {
            authRequired: true,
        }
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default router;
 
