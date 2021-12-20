<template>
    <div class="sidebar">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg class="bi me-2" width="40" height="32">
                    <use xlink:href="#bootstrap" /></svg>
                <span class="fs-5">Hola{{ authUser.email }}!</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <a href="#/panel" class="nav-link " aria-current="page">
                        Planes
                    </a>
                </li>
                <li class="nav-item pr-5">
                    <router-link class="nav-link active" to="/panel/users-plans">Planes de Usuarios</router-link>
                </li>
            </ul>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <section class="   users-plan border-bottom">
                        <div class="container px-5 my-5">
                            <div class="text-center mb-5">
                                <h1 class="fw-bolder">Suscripciones de los usuarios</h1>
                                <p>Acá vas a poder ver los usuarios que tienen un plan contratado</p>
                            </div>

                            <table class="table m-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Usuario</th>
                                        <th scope="col">Email</th>
                                        <th scope="col"> </th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="{ id, email, plan, displayName, admin } in users" :key="id">
                                        <td>{{ displayName }}</td>
                                        <td>{{ email }}</td>
                                        <td></td>
                                        <td>
                                            <div v-if="!admin  ">
                                                <form action="#" method="post" @submit.prevent>
                                                    <router-link class="btn btn-primary btn-sm me-2 mb-2"
                                                        :to="`/user/${plan}/${displayName}`">
                                                        Ver detalles
                                                    </router-link>
                                                </form>



                                            </div>
                                        </td>
                                        <td><div  v-if="!admin  ">
                                            
                                                <router-link class="btn btn-primary btn-sm me-2 mb-2"
                                                    :to="`/chat/${email}`">Iniciar Chat Privado</router-link>
                                        </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getFirestore
    } from "firebase/firestore";
    import {
        getInitialMessages,
        sendMessage,
        subscribeToIncomingMessages
    } from "../../services/chat.js";
    import 'babel-polyfill';
    import {
        getPlanes,
        getUsersFromCollection
    } from '../../services/firebase.js'
    import {
        onMounted,
        onUnmounted,
        ref,
    } from "vue";

    import useAuth from "../../composition/useAuth.js";
    const db = getFirestore();

    export default {
        name: "UsersPlans",

        setup() {
            const {
                authUser
            } = useAuth();

            const form = ref({
                displayName: null,
            });

            form.value.displayName = authUser.value.displayName;
            const planes = ref({});
            const users = ref({});
            const admin = authUser.value.profile.admin
            onMounted(async () => {
                const res = await getPlanes(db)
                const resUsers = await getUsersFromCollection(db)
                planes.value = res
                users.value = resUsers
                console.log(users.value)
            });
            const messages = ref([]);
            let unsubscribe;
            getInitialMessages()
                .then(data => {
                    messages.value = [...data].reverse();

                    unsubscribe = subscribeToIncomingMessages(newMsgs => {
                        console.log("messages: ", messages.value);
                        console.log("newMsgs: ", newMsgs);

                        messages.value = [...messages.value, ...newMsgs];
                    });
                });
            onUnmounted(() => {
                if (typeof unsubscribe === 'function') unsubscribe();
            });
            const newMessage = ref('');
            const handleSubmit = () => {
                sendMessage(newMessage.value).then(() => newMessage.value = '');
            }
            return {
                planes,
                authUser,
                form,
                users,
                admin,
                messages,
                newMessage,
                handleSubmit,
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
</style>