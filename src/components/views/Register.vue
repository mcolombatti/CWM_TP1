<template>
    <div class="vista-container">
        <div>
            <section id="section-register" class="mb-5 container">
                <h1>Registrarse</h1>
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" class="form-control" v-model="form.email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" class="form-control" v-model="form.password">
                    </div>
                    <button type="submit" class="btn btn-primary">Registrarse</button>
                </form>
                <p>Si ya tenés cuenta hace <a href="#/iniciar-sesion" id="iniciar">click aqui</a> para iniciar sesión
                </p>
                <div id="authRegisterConsole"></div>
            </section>
        </div>
    </div>
</template>

<script>
    import {
        ref
    } from "vue";
    import {
        register
    } from "../../services/auth.js";
    export default {
        name: "Register",
        setup() {
            const form = ref({
                email: '',
                password: '',
            });

            const handleSubmit = () => {
                register(form.value.email, form.value.password)
                    .then(() => {
                        form.value = {
                            email: '',
                            password: '',
                        }
                    });
            }

            return {
                form,
                handleSubmit,
            }
        }
    };
</script>

<style>
    #iniciar {
        font-weight: 700;
    }
</style>