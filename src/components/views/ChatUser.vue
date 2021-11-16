<template>
    <div>
        <div class="mb-3">
            <h2>Chat Privado con {{ email }}</h2>
        </div>
        <div class="row">
            <section class="col-8">
                <h3 class="visually-hidden">Lista de mensajes</h3>
                <div id="chatMessages" class="chat">
                    <p
                        v-for="message in messages"
                        class='mb-3'
                    ><UserName :email="message.user">{{message.user}}</UserName>: {{message.message}}</p>
                </div>
            </section>
            <section class="col-4">
                <h3 class="visually-hidden">Escribir un mensaje</h3>
                <form
                    id="chatForm"
                    @submit.prevent="handleSubmit"
                >
                    <div class="mb-3">
                        <div class="mb-2">Nombre de usuario</div>
                        {{ authUser.displayName || authUser.email }}
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Mensaje</label>
                        <textarea
                            id="message"
                            class="form-control"
                            v-model="newMessage"
                        ></textarea>
                    </div>
                    <button class="btn btn-primary" type="submit">Enviar</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import useAuth from "../../composition/useAuth.js";
import {getInitialMessages, sendMessage, subscribeToIncomingMessages} from "../../services/chat.js";
import {ref} from "vue";
import UserName from "../UserName.vue";
import {useRoute} from "vue-router";

export default {
    name: "Chat",
    components: {UserName},
    setup() {
        // useRoute() es la función de composición para obtener los datos de la ruta de Vue Router.
        // Es el equivalente a this.$route en la Options API.
        const route = useRoute();
        console.log("Hola");

        const email = route.params.email;

        /*
         |--------------------------------------------------------------------------
         | Autenticación
         |--------------------------------------------------------------------------
         */
        const {authUser} = useAuth();

        /*
         |--------------------------------------------------------------------------
         | Chat
         |--------------------------------------------------------------------------
         */
        const messages = ref([]);


        const newMessage = ref('');
        const handleSubmit = () => {
            // sendMessage(newMessage.value).then(() => newMessage.value = '');
        }

        return {
            authUser,
            messages,
            newMessage,
            email,
            handleSubmit,
        }
    }
};
</script>

<style>

</style>
