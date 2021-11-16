<template>
    <div class="vista-container">
        <div>
            <h1>Iniciar Sesión</h1>
            <form
                action="#"
                method="post"
                @submit.prevent="handleLogin() & open()"
            >
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        class="form-control"
                        v-model="user.email"
                    >
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        class="form-control"
                        v-model="user.password"
                    >
                </div>
                <button type="submit" class="btn btn-primary w-100">Ingresar</button>
            </form>
     
        </div>
    </div>
</template>

<script>
import {login} from "../../services/auth.js";

export default {
    name: "Login",
    // components: {},
    // props: {},
    data: () => ({
        user: {
            email: '',
            password: '',
        }
    }),
    
    methods: {
        handleLogin() {
            // TODO: Validar...

            login(this.user.email, this.user.password)
                .then(() => {
                    
                    if(this.$route.query?.redirect !== undefined) {
                        this.$router.push({
                            path: this.$route.query.redirect
                        });
                    }
                });
                
        }, 
    }
};
</script>

<style>

</style>
