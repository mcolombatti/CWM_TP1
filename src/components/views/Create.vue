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
                    <a href="#/panel" class="nav-link active" aria-current="page">
                        Planes
                    </a>
                </li>
                <li class="nav-item pr-5">

                    <router-link class="nav-link" to="/panel/users-plans">Planes de Usuarios</router-link>
                </li>


            </ul>
        </div>
        <div class="vista-container">
            <div>
                <section id="section-register" class="mb-5 container">
                    <h1>Crear Nuevo Plan</h1>
                    <form @keyup=" validateInputNombre(),validateInputPrecio(), validateInputCaracteristicas()"
                        @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" name="nombre" class="form-control" v-model="form.nombre">
                        </div>
                        <div class="ui basic label pointing red" v-if="errorNombre">
                            {{ errorNombre }}
                        </div>
                        <div class="mb-3">
                            <label for="precio" class="form-label">Precio</label>
                            <input type="number" name="precio" class="form-control" v-model="form.precio">
                        </div>
                        <div class="ui basic label pointing red" v-if="errorPrecio">
                            {{ errorPrecio }}
                        </div>
                        <div class="mb-3">
                            <label for="caracteristicas" class="form-label">caracteristicas</label>
                            <input type="text" name="caracteristicas" class="form-control"
                                v-model="form.caracteristicas">
                        </div>
                        <div class="ui basic label pointing red" v-if="errorCaracteristicas">
                            {{ errorCaracteristicas }}
                        </div>
                        <button type="submit" class="btn btn-primary">publicar</button>
                    </form>

                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        ref
    } from "vue";
    import {
        publicar
    } from "../../services/create.js";
    import {
        useRouter
    } from "vue-router";
    import {
        useToast
    } from "vue-toastification";
    import useAuth from "../../composition/useAuth.js";
    export default {
        name: "Create",
        setup() {
            const {
                authUser
            } = useAuth();

            /*
             |--------------------------------------------------------------------------
             | Formulario
             |--------------------------------------------------------------------------
             */
            const formName = ref({
                displayName: null,
            });

            formName.value.displayName = authUser.value.displayName;
            const toast = useToast();
            const router = useRouter();
            const form = ref({
                nombre: '',
                precio: '',
                caracteristicas: '',
            });
            const errorNombre = ref('');
            const errorPrecio = ref('');
            const errorCaracteristicas = ref('');
            const validateInputNombre = () => {

                if (form.value.nombre === "") {
                    errorNombre.value = "el campo es obligatorio"
                } else if (form.value.nombre.length < 3) {
                    errorNombre.value = "el campo debe tener al menos 3 caracteres"
                } else {
                    errorNombre.value = ''
                }
            };
            const validateInputPrecio = () => {

                if (form.value.precio === "") {
                    errorPrecio.value = "el campo es obligatorio"
                } else if ((form.value.precio) < 0) {
                    errorPrecio.value = "el precio debe estar compuesto por numeros mayores a 0"
                }  
            };
            const validateInputCaracteristicas = () => {

                if (form.value.caracteristicas === "") {
                    errorCaracteristicas.value = "el campo es obligatorio"
                } else {
                    errorCaracteristicas.value = ''
                }
            };
            const handleSubmit = () => {
                publicar(form.value.nombre, form.value.precio, form.value.caracteristicas)
                    .then(() => {
                        form.value = {
                            nombre: '',
                            precio: '',
                            caracteristicas: ''
                        }
                    })
                    .then(
                        toast.success("Plan creado exitosamente")
                    )
                    .then(() => {
                        router.push({
                                path: '/panel'
                            })
                            .catch(err => {

                                toast.error("No pudimos crear el plan")
                                console.error("Error al crear el plan: ", err);
                            });
                    })
            }

            return {
                form,
                authUser,
                errorPrecio,
                errorNombre,
                validateInputNombre,
                validateInputPrecio,
                validateInputCaracteristicas,
                handleSubmit,
                errorCaracteristicas
            }
        }
    };
</script>

<style>

</style>