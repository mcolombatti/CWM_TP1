import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../components/views/Home.vue";
import Login from "../components/views/Login.vue";
import Chat from "../components/views/Chat.vue";
import Register from "../components/views/Register.vue"; 
import Profile from "../components/views/Profile.vue"; 
import ProfileUser from "../components/views/ProfileUser.vue"; 
import ChatUser from "../components/views/ChatUser.vue";

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
          //  authRequired: true,
        }
    },
    {
        name: 'profile',
        component: Profile,
        path: '/perfil',
        meta: {
            authRequired: true,
        }
    },
    {
        name: 'chat-user',
        component: ChatUser,
        path: '/chat/:email',
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
    },
    {
        name: 'profile-user',
        component: ProfileUser,
        path: '/perfil/:email',
        meta: {
            authRequired: true,
        }
    },
];
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

/*
 |--------------------------------------------------------------------------
 | Manejo del acceso a rutas que requieran autenticación.
 |--------------------------------------------------------------------------
 */
let authUser = {
    email: null,
    displayName: null,
}

authStateSubscribe(user => authUser = user);

router.beforeEach((to) => {
    if(to.meta.authRequired && authUser.email === null) {
        // Si retornamos un objeto, Vue Router va a redireccionar a esa ruta.
        return {
            path: '/iniciar-sesion',
            query: {
                redirect: to.fullPath
            }
        }
    }
});

export default router;
