import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/views/Home.vue";
import Login from "../components/views/Login.vue";
import Chat from "../components/views/Chat.vue";
import Register from "../components/views/Register.vue";
import Profile from "../components/views/Profile.vue";
import ProfileUser from "../components/views/ProfileUser.vue";
import ChatUser from "../components/views/ChatUser.vue";
import Create from "../components/views/Create.vue";
import Panel from "../components/views/Panel.vue";
import UsersPlans from "../components/views/UsersPlans.vue";
import Edit from "../components/views/Edit.vue";
import UserPlanDetail from "../components/views/UserPlanDetail.vue";
import Suscripcion from "../components/views/Suscripcion.vue";
import Restricted from "../components/views/Restricted.vue";
import Pricing from "../components/views/Pricing.vue";
import { authStateSubscribe } from "../services/auth.js";
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
    }, {
        name: 'login',
        component: Login,
        path: '/iniciar-sesion',
    },
    {
        name: 'chat',
        component: Chat,
        path: '/chat',
        meta: {

            onlyStandardUsers: true
        }
    },
    {
        name: 'pricing',
        component: Pricing,
        path: '/pricing'
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
    {
        name: 'panel',
        component: Panel,
        path: '/panel',
        meta: {
            authRequired: true,
            adminRequired: true
        }

    },
    {
        name: 'users-plans',
        component: UsersPlans,
        path: '/panel/users-plans',
        meta: {
            authRequired: true,
            adminRequired: true
        }

    },
    {
        name: 'create',
        component: Create,
        path: '/create',
        meta: {
            authRequired: true,
            adminRequired: true
        }

    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: Edit,
        meta: {
            authRequired: true,
            adminRequired: true
        }
    }, {
        path: '/user/:plan/:displayName',
        name: 'user-plan',
        component: UserPlanDetail,
        meta: {
            authRequired: true,
            adminRequired: true
        }
    }, {
        name: 'suscripciones',
        component: Suscripcion,
        path: '/perfil/suscripciones',
        meta: {
            authRequired: true
        }

    }, {
        name: 'Restricted',
        component: Restricted,
        path: '/restricted',


    },
];
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let authUser = {
    email: null,
    displayName: null,
    role: null
}

authStateSubscribe(user => authUser = user);

router.beforeEach((to) => {
    if (to.meta.authRequired && authUser.email === null) {
        return {
            path: '/iniciar-sesion',
            query: {
                redirect: to.fullPath
            }
        }
    }
    if (to.meta.adminRequired && authUser.email != 'admin@email.com') {
        return {
            path: '/restricted',
            query: {
                redirect: to.fullPath
            }
        }
    } if (to.meta.onlyStandardUsers && authUser.email == 'admin@email.com') {
        return {
            path: '/',
            query: {
                redirect: to.fullPath
            }
        }
    }
});

export default router;
