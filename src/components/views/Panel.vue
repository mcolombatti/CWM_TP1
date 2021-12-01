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
        <div class="container ">
            <div class="row">
                <div class="col-md-2 mt-5">
                    <router-link class="btn btn-success btn-sm " to="/create">Crear Plan</router-link>
                </div>
                <div class="col-md-12 mb-5">
                    <div class="card mt-4 ">
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
                                        <form action="#" method="post" @submit.prevent>
                                            <router-link class="btn btn-primary btn-sm me-2 mb-2" :to="`/edit/${id}`">
                                                Editar
                                            </router-link>
                                        </form>
                                        <form action="#" method="post" @submit.prevent>
                                            <button type="submit" class="mt-2 btn btn-danger btn-sm"
                                                @click="deleteAction(id)">
                                                Eliminar
                                            </button></form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
            const form = ref({
                displayName: null,
            });
            form.value.displayName = authUser.value.displayName;
            const deleteAction = (id) => {
                if (confirm("¿Estas seguro que deseas eliminar el plan"))
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