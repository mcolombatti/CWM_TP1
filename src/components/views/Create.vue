<template> <div class="sidebar">
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
                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" name="nombre" class="form-control" v-model="form.nombre">
                    </div>
                    <div class="mb-3">
                        <label for="precio" class="form-label">Precio</label>
                        <input type="number"  name="precio" class="form-control" v-model="form.precio">
                    </div>
                    <div class="mb-3">
                        <label for="caracteristicas" class="form-label">caracteristicas</label>
                        <input type="text" name="caracteristicas" class="form-control" v-model="form.caracteristicas">
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
        setup() {  const {
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
            });
            const handleSubmit = () => {
                publicar(form.value.nombre, form.value.precio, form.value.caracteristicas)
                    .then(() => {
                        form.value = {
                            nombre: '',
                            precio: ''
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
                handleSubmit,
            }
        }
    };
</script>

<style>

</style>