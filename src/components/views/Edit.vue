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
                        Plans
                    </a>
                </li>
                <li class="nav-item pr-5">

                    <router-link class="nav-link" to="/panel/users-plans">Users List</router-link>
                </li>


            </ul>
        </div>
        <div class="container height-main">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-body mt-4 ">
                        <h3>Edit users</h3>
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label>Nombre</label>
                                <input v-model="formEdit.nombre" type="text" class="form-control" required />
                            </div>
                            <div class="form-group mt-3">
                                <label>Precio</label>
                                <input v-model="formEdit.precio" class="form-control" type="number" required />
                            </div>
                            <div class="form-group mt-3">
                                <label>Caracteristicas</label>
                                <input v-model="formEdit.caracteristicas" class="form-control" type="text" required />
                            </div>
                            <button type="submit" class="btn btn-primary  mt-3">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getFirestore
    } from "firebase/firestore";
    import 'babel-polyfill';
    import {
        getPlan
    } from '../../services/firebase.js'
    import {
        updatePlan
    } from '../../services/plans.js'
    import {
        onMounted,
        reactive,
        computed,
        ref,
    } from "vue";
    import useAuth from "../../composition/useAuth.js";
    import {
        useToast
    } from "vue-toastification";
    
import { useRoute, useRouter } from 'vue-router'
    const db = getFirestore();
    export default {
        name: "Edit",
        setup() {
            const {
                authUser
            } = useAuth();
 const router = useRouter()
    const route = useRoute()
            const toast = useToast();
            /*
             |--------------------------------------------------------------------------
             | Formulario
             |--------------------------------------------------------------------------
             */
            const form = ref({
                displayName: null,
            });

            form.value.displayName = authUser.value.displayName;

            const planes = ref({});
            const planId = computed(() => route.params.id)

            const formEdit = reactive({
                nombre: '',
                precio: '',
                caracteristicas: ''
            })


            const update = async () => {
                await updatePlan(planId.value, {
                    ...formEdit
                })
                router.push('/#/panel')
                formEdit.nombre = ''
                formEdit.precio = ''
                formEdit.caracteristicas = ''
            }
            onMounted(async () => {
                const plans = await getPlan(planId.value)
                console.log(plans, planId.value)
                formEdit.nombre = plans.nombre
                formEdit.precio = plans.precio 
                formEdit.caracteristicas = plans.caracteristicas 
                console.log(plans.value)
            });
            return {
                planes,
                authUser,
                form,formEdit, update
            };

        }
    }
</script>
<style>
    #logo {
        color: #093eae;
        font-weight: 700;
    }

    .options {
        display: flex;
        align-items: baseline;
    }

    .height-main {
        min-height: 100vh;
    }
</style>