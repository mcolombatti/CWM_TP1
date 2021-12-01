<template>
    <div>
        <div class="container users-plan mt-5">
            <div class="row mb-3">
                <div class="col-md-12">
                    <h1>Lista de Planes</h1>
                    <p>Aca vas a poder ver la lista de planes disponibles</p>
                    <p>Si queres asociarte a alguno de nuestros planes, <router-link  to="/registro" class="strong">creá tu cuenta</router-link > o <router-link class="strong" to="/iniciar-sesion">inicia sesión</router-link> para suscribirte ahora.</p>
                </div>
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th v-for="{  nombre  } in planes" :key="nombre">{{nombre}}</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" class="text-start">Precio </th>
                            <td v-for="{  precio  } in planes" :key="precio"> $ {{precio}}</td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-start">Ancho de banda </th>
                            <td v-for="{  caracteristicas  } in planes" :key="caracteristicas"> {{caracteristicas[0]}}
                            </td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-start">Soporte</th>
                            <td v-for="{  caracteristicas  } in planes" :key="caracteristicas">{{caracteristicas[1]}}
                            </td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                        </tr>

                        <tr>
                            <th scope="row" class="text-start">Espacio en Disco</th>
                            <td v-for="{  caracteristicas  } in planes" :key="caracteristicas">
                                {{caracteristicas[2]}}<svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-start">Sitios</th>
                            <td v-for="{  caracteristicas  } in planes" :key="caracteristicas"> {{caracteristicas[3]}}
                            </td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-start">Cuentas correos</th>
                            <td v-for="{  caracteristicas  } in planes" :key="caracteristicas">{{caracteristicas[4]}}
                            </td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                        </tr>
                        <tr v-if="authUser.email !== null">
                            <th scope="row" class="text-start"> </th>
                            <td v-for="{  id  } in planes" :key="id">
                                <form action="#" class=" d-flex justify-content-center" method="post"
                                    @submit.prevent="suscribe(id, userId)">
                                    <button type="submit" class="mt-3  btn btn-success btn-sm">
                                        Suscribirse
                                    </button>
                                </form>
                            </td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                            <td><svg class="bi" width="24" height="24">
                                    <use xlink:href="#check" /></svg></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import 'babel-polyfill';
    import {
        getFirestore,
        doc,
        getDoc
    } from "firebase/firestore";
    import {
        onMounted,
        ref,
    } from "vue";
    import {
        getPlanes,
        getUsersFromCollection
    } from '../../services/firebase.js'
    import useAuth from "../../composition/useAuth";
    import {
        addSuscription
    } from '../../services/suscribe.js'
    import {
        useToast
    } from "vue-toastification";
    const db = getFirestore();
    export default {
        name: "Pricing",
        setup() {
            const {
                authUser
            } = useAuth();
            const toast = useToast();
            onMounted(() => {
                console.log(authUser)
            });
            const users = ref({
                id: null,
            });
            const planes = ref({});
            onMounted(async () => {
                const res = await getPlanes(db)
                const resUser = await getUsersFromCollection(db)
                planes.value = res
                users.value = resUser
            });
            const suscribe = (id) => {
                const userIds = authUser.value.id
                addSuscription(id, userIds)
                    .then(toast.success("Suscripción Exitosa"))
            }
            return {
                planes,
                suscribe,
                users,
                authUser
            };
        }
    }
</script>
<style>
    #logo {
        color: #093eae;
        font-weight: 700;
    }

    .users-plan {
        min-height: 100vh;
    }

    .options {
        display: flex;
        align-items: baseline;
    }
    .strong{
    font-weight: 700;
    }
</style>