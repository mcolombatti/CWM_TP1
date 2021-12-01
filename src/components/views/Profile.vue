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
                    <a href="#/perfil" class="nav-link active" aria-current="page">
                        Mi cuenta
                    </a>
                </li>
                <li class="nav-item pr-5">
                    <router-link class="nav-link" to="/perfil/suscripciones">Suscripciones</router-link>
                </li>
            </ul>
        </div>
        <div class="vista-container">
            <div>
                <div class="mb-3">
                    <h1>Perfil de {{ authUser.email }}</h1>
                </div>
                <form action="#" id="profileForm" @submit.prevent="updateProfile">
                    <div class="mb-3">
                        <label for="profileDisplayName" class="form-label">Nombre de usuario</label>
                        <input type="text" id="profileDisplayName" class="form-control" v-model="form.displayName">
                    </div>
                    <button type="submit" class="btn btn-primary">Actualizar</button>
                </form> 
            </div>
        </div>
    </div>
</template>

<script>
    import {
        authStateSubscribe,
        updateUserProfile
    } from "../../services/auth.js"; 
    import {
        getFirestore
    } from "firebase/firestore";
    import {
        useToast
    } from "vue-toastification";
    import { 
        ref
    } from "vue";
    const db = getFirestore();
    import useAuth from "../../composition/useAuth.js";
    export default {
        name: "Profile",

        setup() {
            const toast = useToast();
            const {
                authUser
            } = useAuth();
            const form = ref({
                displayName: null,
            });
            form.value.displayName = authUser.value.displayName;

            function updateProfile() {
                updateUserProfile(form.value)
                    .then(toast.success("Modificación Exitosa"), )
            }
            return {
                authUser,
                form,
                updateProfile,
            };
        }
    }
</script>

<style>
    .sidebar {
        display: flex;
        flex-wrap: nowrap;
        height: 100vh;
        height: -webkit-fill-available;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
    }
</style>