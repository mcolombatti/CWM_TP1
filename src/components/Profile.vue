<template>
    <div><div id="profile"><template>
  <button @click="toast">Toast it!</button>
</template>
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
    </div>
    </div>
</template>

<script>
import {authStateSubscribe, updateUserProfile} from "../services/auth.js";
import {onUnmounted, ref} from "vue";
import useAuth from "../composition/useAuth.js";
export default {
    name: "Profile", 
    setup() {
     
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
