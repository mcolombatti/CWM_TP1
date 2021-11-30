<template>

    <div class="sidebar">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32">
                    <use xlink:href="#bootstrap" /></svg>
                <span class="fs-5">Hola {{ authUser.email }}!</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">

                <li class="nav-item">
                    <a href="#/panel" class="nav-link " aria-current="page">
                        Planes
                    </a>
                </li>
                <li class="nav-item pr-5">

                    <router-link class="nav-link active" to="/panel/users-plans">Planes de Usuarios</router-link>
                </li>


            </ul>

        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <section class="   users-plan border-bottom">
                        <div class="container px-5 my-5">
                            <div class="text-center mb-5">
                                <h1 class="fw-bolder">Panel de Administrador</h1>
                                <p class="lead mb-0">Planes de Suscripcion</p>
                            </div>
                            
  <table class="table m-0">
                            <thead>
                                <tr>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Plan</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="{ id, email, plan, displayName } in users" :key="id">
                                    <td>{{ displayName }}</td>
                                    <td>{{ email }}</td>
                                    <td>{{ plan }}</td>
                                   
                                </tr>
                            </tbody>
                        </table>
                                
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getFirestore
    } from "firebase/firestore";
    import 'babel-polyfill';
    import {
        getPlanes,
        getUsersFromCollection
    } from '../../services/firebase.js'
    import {
        onMounted,
        ref,
    } from "vue";
    import useAuth from "../../composition/useAuth.js";
    const db = getFirestore();
    export default {
        name: "UsersPlans",
        setup() {
            const {
                authUser
            } = useAuth();

            /*
             |--------------------------------------------------------------------------
             | Formulario
             |--------------------------------------------------------------------------
             */
            const form = ref({
                displayName: null,
            });

            form.value.displayName = authUser.value.displayName;



            const planes = ref({});
            const users = ref({ }); 
            onMounted(async () => {
                const res = await getPlanes(db)

                const resUsers = await getUsersFromCollection(db)

                planes.value = res
                console.log(planes)
                users.value = resUsers
                console.log(users)
            });
            return {
                planes,
                authUser,
                form, users
            };

        }
    }
</script>
<style>
    #logo {
        color: #093eae;
        font-weight: 700;
    }

    .users-plan {
        min-height: 100vh;
    }

    .options {
        display: flex;
        align-items: baseline;
    }
</style>