<template>
    <div class="vista-container">
        <div>
            <h1>Iniciar Sesión</h1>
            <form action="#" method="post" @keyup="validateInput" @submit.prevent="handleLogin()">
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" name="email" id="email" class="form-control" v-model="form.email">
                </div>
                 <div class="ui basic label pointing red" v-if="error">
     {{ error }}
    </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" id="password" class="form-control" v-model="form.password">
                </div>
                   <div class="ui basic label pointing red" v-if="errorPass">
     {{ errorPass }}
    </div>
                <button type="submit" class="btn btn-primary w-100">Ingresar</button>
            </form>

        </div>
    </div>
</template>

<script>
    import {
        login
    } from "../../services/auth.js";
    import {
        useRouter
    } from "vue-router";
    import {
        useToast
    } from "vue-toastification";
    import {
        ref 
    } from "vue";
    export default {
        name: "Login",
        setup() {

         
 
            const router = useRouter();
            const form = ref({
                email: null,
                password: null,
            });
            const error = ref('');
            const errorPass = ref('');
   const validateInput = () => {
     error.value = form.value.email === "" ? "el campo es obligatorio" : "";
     errorPass.value = form.value.password === "" ? "el campo es obligatorio" : "";
         };
          
            const handleLogin = () => {

                login(form.value.email, form.value.password)
                   .then(function (result) {
                       if(form.value.email == 'admin@email.com')
                        router.push({
                            path: '/panel'
                        })
                        else{
                             router.push({
                            path: '/perfil'
                        })
                        }
                    })






            }

            return {
                form,error, validateInput,errorPass,
                handleLogin
            }
        }
    };
</script>

<style>

</style>