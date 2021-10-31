<template>
    <div><div id="profile"> 
 
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
            <form action="#"
                    id="price"
                    @submit.prevent="setPrice"><input type="text"   > 
                    <button type="submit" class="btn btn-primary">enviar</button></form>
                <div id="profileConsole"></div>
        </div>
    </div>
    </div>
</template>

<script>
import {authStateSubscribe, updateUserProfile} from "../services/auth.js";
import {setPrices} from "../services/firebase.js";
    import {
        getFirestore,

    } from "firebase/firestore";
import {onUnmounted, ref} from "vue"; const db = getFirestore();
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
    },
    methods:
    {
        setPrice(db) {
            db.collection("pricing").doc("Master").set({
    price: 3000,
   
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
  
        }
    },
};
</script>

<style>

</style>
