import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue"; 
import Profile from "../components/Profile.vue";

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
        name: 'profile',
        component: Profile,
        path: '/perfil',
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default router;
 
