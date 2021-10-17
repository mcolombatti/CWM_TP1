<template>
    <div>
        <div class="mb-3">
            <h1>Perfil de {{ authUser.email }}</h1>
        </div>
        <form
            action="#"
            id="profileForm"
            @submit.prevent="updateProfile"
        >
            <div class="mb-3">
                <label for="profileDisplayName" class="form-label">Nombre de usuario</label>
                <input
                    type="text"
                    id="profileDisplayName"
                    class="form-control"
                    v-model="form.displayName"
                >
            </div>
            <button type="submit" class="btn btn-primary">Actualizar</button>
        </form>
        <div id="profileConsole"></div>
    </div>
</template>

<script>
import {authStateSubscribe, updateUserProfile} from "../services/auth.js";
import {onUnmounted, ref} from "vue";
import useAuth from "../composition/useAuth.js";

export default {
    name: "Profile",
    // data: function() {
    //     return {
    //         authUser: {
    //             email: null,
    //             displayName: null,
    //         },
    //         authUnsubscribe: null,
    //         form: {
    //             displayName: null,
    //         }
    //     };
    // },
    // methods: {
    //     updateProfile() {
    //         updateUserProfile(this.form);
    //     }
    // },
    // mounted() {
    //     this.authUnsubscribe = authStateSubscribe(user => this.authUser = user);
    //     this.form.displayName = this.authUser.displayName;
    // },
    // unmounted() {
    //     // Cancelamos la suscripción.
    //     this.authUnsubscribe();
    // },
    setup() {
        /*
         |--------------------------------------------------------------------------
         | Autenticación
         |--------------------------------------------------------------------------
         */
        // const authUser = ref({
        //     email: null,
        //     displayName: null,
        // });
        //
        // const unsubscribe = authStateSubscribe(user => authUser.value = user);
        //
        // onUnmounted(() => {
        //     unsubscribe();
        // });
        const {authUser} = useAuth();

        /*
         |--------------------------------------------------------------------------
         | Formulario
         |--------------------------------------------------------------------------
         */
        const form = ref({
            displayName: null,
        });

        form.value.displayName = authUser.value.displayName;

        function updateProfile() {
            updateUserProfile(form.value);
        }

        return {
            authUser,
            form,
            updateProfile,
        };
    }
};
</script>

<style>

</style>
