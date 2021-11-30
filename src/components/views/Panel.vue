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
                    <a href="#/panel" class="nav-link active" aria-current="page">
                        Planes
                    </a>
                </li>
                <li class="nav-item pr-5">

                    <router-link class="nav-link" to="/panel/users-plans">Planes de Usuarios</router-link>
                </li>


            </ul>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-2"> <router-link class="btn btn-success btn-sm " to="/create">Crear Plan</router-link></div>
                <div class="col-md-12">
                    
                    <div class="card mt-4">
                         
                        <table class="table m-0">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Caracteristicas</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="{ id, nombre, precio, caracteristicas } in planes" :key="id">
                                    <td>{{ id }}</td>
                                    <td>{{ nombre }}</td>
                                    <td>${{ precio }}</td>
                                    <td>
                                        <p v-for="item  in caracteristicas" :key="item">{{item}}</p>
                                    </td>
                                    <td>
                                        <router-link :to="`/edit/${id}`">
                                            <button class="btn btn-primary btn-sm me-2">
                                                Editar
                                            </button>
                                        </router-link>
                                        <button class="btn btn-danger btn-sm" @click="deleteAction(id)">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="vista-container">
            <div class="container">

                <div class="row mb-3">
                    <div class="col-md-12">
                        <div class="text-center mb-5">
                            <h1 class="fw-bolder">Panel de Administrador</h1>
                            <p class="lead mb-0">Planes de Suscripcion</p>
                        </div>
                    </div>
                    <ul class="row gx-5 justify-content-center">

                        <li v-for="{ id, nombre, precio, caracteristicas } in planes" :key="id">
                            <div>
                                <div class="col-lg-6 col-xl-4">
                                    <div class="card mb-5 mb-xl-0">
                                        <div class="card-body p-5">
                                            <h3>{{nombre}}</h3>
                                            <div class="mb-3">
                                                <span class="display-4 fw-bold">{{precio}}</span>
                                                <span class="text-muted">/mes</span>
                                            </div>
                                            <p v-for="item  in caracteristicas" :key="item">{{item}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
-->
    </div>
</template>

<script>
    import {
        getFirestore
    } from "firebase/firestore";
    import 'babel-polyfill';
    import {
        getPlanes
    } from '../../services/firebase.js'
    import {
        deletePlan
    } from '../../services/plans.js'
    import {
        onMounted,
        ref,
    } from "vue";
    import useAuth from "../../composition/useAuth.js";
    import {
        useToast
    } from "vue-toastification";
    const db = getFirestore();
    export default {
        name: "Home",
        setup() {
            const {
                authUser
            } = useAuth();

            const toast = useToast();
            /*
             |--------------------------------------------------------------------------
             | Formulario
             |--------------------------------------------------------------------------
             */
            const form = ref({
                displayName: null,
            });

            form.value.displayName = authUser.value.displayName;

            const deleteAction = (id) => {

                deletePlan(id)
                    .then(async () => {
                        
                            const res = await getPlanes(db)

                            planes.value = res
                        
                        
                        toast.success("Eliminacion Exitosa")
                    })
                    .catch(err => {

                        toast.error("No pudimos eliminar el plan")
                        console.error("Error al eliminar el plan: ", err);
                    });

            }

            const planes = ref({});

            onMounted(async () => {
                const res = await getPlanes(db)

                planes.value = res
                console.log(planes)
            });
            return {
                planes,
                authUser,
                form,
                deleteAction
            };

        }
    }
</script>
<style>
    #logo {
        color: #093eae;
        font-weight: 700;
    }

    .options {
        display: flex;
        align-items: baseline;
    }
</style>