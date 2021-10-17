<template>
 
 
<div>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-5">
                <p><a class="navbar-brand" href="/">DaVinci Hosting</a></p>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <router-link class="nav-link" to="/">Home</router-link>
                        <template
                        v-if="authUser.email !== null"
                    >
                        <li class="nav-item">
                            <router-link class="nav-link" to="/chat">Chat</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/perfil">Perfil</router-link>
                        </li>
                        <li class="nav-item">
                            <button
                                type="button"
                                class="btn nav-link"
                                @click="doLogout"
                            >Cerrar Sesión ({{ authUser.displayName || authUser.email }})</button>
                        </li>
                    </template>
                    <template
                        v-else
                    >
                        <li class="nav-item">
                            <router-link class="nav-link" to="/iniciar-sesion">Iniciar Sesión</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/registro">Registrarse</router-link>
                        </li>
                    </template>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Header-->
        <main  >
        <router-view />
    </main>
        <footer class="py-5 bg-dark">
            <div class="container px-5"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2021</p></div>
        </footer>
</div>

 
</template>

<script>
import {authStateSubscribe, logout} from "./services/auth.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import useAuth from "./composition/useAuth.js";

export default {
    name: "App",
      setup() {
        // "ref" define una "ref"erencia reactiva, que se asocia al sistema de reactividad de Vue.
        // Por ejemplo, si este valor cambia, cualquier vista que lo utiliza se va a actualizar también.
        // Lo que hay que saber es que para usar luego los valores de una "ref", tenemos que accederlos
        // siempre a través de su propiedad ".value" (pueden pensarlo como el reemplazo del "this." de la
        // API de Options).
        // Ese ".value" no aplica en la vista.
        // const authUser = ref({
        //     email: null,
        //     displayName: null,
        // });
        //
        // authStateSubscribe(user => {
        //     // Actualizamos el "value" de la "ref" definida.
        //     authUser.value = user;
        // });
        const {authUser} = useAuth();

        const router = useRouter();

        function doLogout() {
            logout().then(() => {
                // this.$router.push({
                //     path: '/iniciar-sesion'
                // });
                // Para acceder al router, tenemos que usar la función de composición "useRouter" de Vue
                // Router.
                router.push({
                    path: '/iniciar-sesion'
                });
            });
        }

        return {
            // Lo que retornemos acá va a estar en la vista.
            authUser,
            doLogout,
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

.footer p {
    margin: 0;
}
</style>
