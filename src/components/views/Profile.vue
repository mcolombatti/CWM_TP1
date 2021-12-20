<template>
    <div class="sidebar">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32">
                    <use xlink:href="#bootstrap" /></svg>
                <span class="fs-5">¡Hola {{authUser.profile.displayName || authUser.email}}!</span>
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
                    <h1>Perfil de {{ authUser.profile.displayName  ||  authUser.email }}</h1>
                </div>
                <div v-if="authUser.profile.avatar" class="mb-3">
                    <div class="text-center">
                        <img :src="authUser.profile.avatar" class="img-fluid avatar-profile "
                            :alt="`Imagen que corresponde al Avatar del usuario ${authUser.profile.displayName || authUser.email}`">
                    </div>    </div>
                <div class="mb-3">
                    <label for="avatar" class="form-label">Avatar</label>
                    <input type="file" id="avatar" class="form-control" ref="avatar">
                </div>

                <div v-if="preview">
                    <img :src="preview" alt="Previsualización">
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
        authStateSubscribe,getProfile,
        updateUserProfile
    } from "../../services/auth.js";
    import {
        getFirestore
    } from "firebase/firestore";
    import {
        useToast
    } from "vue-toastification";
    import {
        ref,
        watch
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
            const avatar = ref(null);
            const preview = ref(null);

        form.value.displayName = authUser.value.displayName;
    
            watch(avatar, (current, old) => {
                if (current) {
                    current.addEventListener('change', function () {
                        const reader = new FileReader();

                        reader.addEventListener('load', function () {
                            console.log(reader.result);
                            preview.value = reader.result;
                        });

                        reader.readAsDataURL(avatar.value.files[0]);
                    });
                }
            });


 
            function updateProfile() {
                const file = avatar.value.files[0] || null;
                updateUserProfile(form.value, file)
                    .then(toast.success("Modificación Exitosa"), )
            }
            return {
                authUser,
                form,
                avatar,
                preview,
                updateProfile
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