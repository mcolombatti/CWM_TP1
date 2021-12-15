<template>
    <div class="vista-container">
        <div>
            <section id="section-register" class="mb-5 container">
                <h1>Registrarse</h1>
                <form @keyup="validateInput(); validateInputPass();" @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" class="form-control" v-model="form.email">
                    </div>
                    <div class="ui basic label pointing red" v-if="error">
                        {{ error }}
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" class="form-control" v-model="form.password">
                    </div>
                    <div class="ui basic label pointing red" v-if="errorPass">
                        {{ errorPass }}
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
            const error = ref('');
            const errorPass = ref('');
            const validateInput = () => {
                if (form.value.email === "") {
                    error.value = "el campo es obligatorio"
                } else if (form.value.email.length < 3) {
                    error.value = "el campo debe tener al menos 3 caracteres"
                } else {
                    error.value = ''
                }
               
                };
            const validateInputPass = () => {
              
                if (form.value.password === "") {
                    errorPass.value = "el campo es obligatorio"
                } else if (form.value.password.length < 8) {
                    errorPass.value = "el campo debe tener al menos 8 caracteres"
                } else {
                    errorPass.value = ''
                } 
                };
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
                error,
                validateInput,validateInputPass,
                errorPass,
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