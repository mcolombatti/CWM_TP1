<template>
    <div class="sidebar">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32">
                    <use xlink:href="#bootstrap" /></svg>
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
                                <h1 class="fw-bolder">Plan del usuario {{user}}</h1>
                                 </div>

                            <table class="table m-0">
                                 <thead>
                        <tr>
                           <th scope="row" class="text-start"></th>
                            

                        </tr>
                    </thead>
                       <tbody>
                        <tr>
                            <th scope="row" class="text-start">Nombre del Plan Contratado:</th>
                          <td> {{planes.nombre}}</td>
                            
                        </tr>  <tr>
                            <th scope="row" class="text-start">Precio del Plan:</th>
                          <td>  $ {{planes.precio}}</td>
                            
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
        getPlan
    } from '../../services/firebase.js'
    import {
        onMounted,
        ref,
        computed,
    } from "vue";

    import {
        useRoute,

    } from 'vue-router'
    const db = getFirestore();
    import useAuth from "../../composition/useAuth.js";

    export default {
        name: "UserPlanDetail",
        setup() {
 
            const route = useRoute()
            /*  const formPlanDetail = ref({
                  nombre: '', 
              }); */
            const planId = computed(() => route.params.plan)
            const user = computed(() => route.params.displayName)
            const planes = ref({});
            onMounted(async () => {
                const res = await getPlan(planId.value)
                planes.value = res
                console.log(planes)

            });
            return {
                planes,user

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