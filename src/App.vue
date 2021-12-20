<template>


    <div>
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container px-5">
                    <p class="nav-brand" id="logo"><a href="/">DaVinci Hosting </a> </p>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><span
                            class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li class="nav-item ml-3 px-3">
                                <router-link class="nav-link" to="/">Home</router-link>
                            </li><li class="nav-item mr-3 ml-3">
                                    <router-link class="nav-link pr-5 pl-5" to="/pricing">Precios</router-link>
                                </li>
                            <template v-if="authUser.email !== null">
                                <div v-if="authUser.email !== 'admin@email.com'">
                                    <li class="nav-item mr-3 ml-3">
                                        <router-link class="nav-link" to="/chat">Chat</router-link>
                                    </li>
                                </div>

                                <li class="nav-item ml-3 mr-3 pr-5">
                                    <router-link class="nav-link" to="/perfil">Perfil</router-link>
                                </li>
<li class="nav-item ml-3 mr-3" v-if="authUser.email == 'admin@email.com'">
                                    <router-link class="nav-link" to="/panel">Panel</router-link>
                                </li> 
                                <li class="nav-item px-3">
                                    <button type="button" class="btn nav-link" @click="doLogout">Cerrar Sesión
                                        ({{ authUser.displayName || authUser.email }})</button>
                                </li> 

                                
                            </template>
                            <template v-else>
                                <li class="nav-item px-3">
                                    <router-link class="nav-link" to="/iniciar-sesion">Iniciar Sesión</router-link>
                                </li>
                                <li class="nav-item px-3">
                                    <router-link class="nav-link" to="/registro">Registrarse</router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main>
            <router-view />
        </main>

        <footer class="py-5 bg-dark">
            <div class="container px-5">
                <p class="m-0 text-center text-white">Copyright &copy; Maximiliano Collombatti - Clientes Web Mobile 2
                    TN</p>
            </div>
        </footer>
    </div>


</template>

<script>
    import {
        authStateSubscribe,
        logout
    } from "./services/auth.js";
    import {
        useRouter
    } from "vue-router";
    import useAuth from "./composition/useAuth.js";
    import {
        onMounted,
        ref
    } from "vue";
    export default {
        name: "App",
        setup() {

            const {
                authUser
            } = useAuth();
            onMounted(  () => {
                console.log(authUser.email)
            });
            const router = useRouter();

            function doLogout() {
                logout().then(() => {

                    router.push({
                        path: '/iniciar-sesion'
                    });
                });
            }
            


            return {
                authUser,
                doLogout 
            };
        }
    };
</script>

<style>
    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #333;
        color: #fff;
    }

    a,
    a:hover,
    a:focus,
    a:active {
        text-decoration: none;
        color: inherit;
    }

    .footer p {
        margin: 0;
    }

    nav {
        min-height: 90px;
    }
</style>