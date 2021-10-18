<template>
     <div id="register"> 
       <div>
           <section id="section-register" class="mb-5 container">
               <h1>Registrarse</h1>
               <form action="#" id="authRegisterForm"
            method="post"
            @submit.prevent="handleRegister()"
              >
            <div class="mb-3">
                <label for="authRegisterEmail" class="form-label">Email</label>
                <input  v-model="user.email" type="email" id="authRegisterEmail" class="form-control">
            </div>
            <div class="mb-3">
                <label for="authRegisterPassword" class="form-label">Password</label>
                <input  v-model="user.password" type="password" id="authRegisterPassword" class="form-control">
            </div>
            <button class="btn btn-primary w-100" type="submit">Registrarse</button>
               </form>
               <p>Si ya tenés cuenta hace <a href="#/iniciar-sesion">click aqui</a> para iniciar sesión</p>
               <div id="authRegisterConsole"></div>
           </section>
       </div>
</div>
</template>

<script>

import {register} from "../services/auth.js";
export default {
    name: "Register",
    // components: {},
    // props: {},
    // data: () => ({}),
     data: () => ({
        user: {
            email: '',
            password: '',
        }
    }),
    // computed: {},
    methods: {
        handleRegister() {
            // TODO: Validar...

            register(this.user.email, this.user.password)
                .then(() => {
                    console.log("Usuario registrado.");
                });
        }
    }
    // computed: {},
    // methods: {}
};
</script>

<style>

</style>
