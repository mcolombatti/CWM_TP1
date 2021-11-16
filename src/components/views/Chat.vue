<template>
    <div class="vista-container">
        <div class="mb-3">
            <h2>Chat</h2>
        </div>
        <div class="row">
            <section class="col-8">
                <h3 class="visually-hidden">Lista de mensajes</h3>
                <div id="chatMessages" class="chat">
                <p  v-for="message in messages"> 
                {{message.user }}
                {{message.user }}
                </p></div>
            </section>
            <section class="col-4">
                <h3 class="visually-hidden">Escribir un mensaje</h3>
                <form id="chatForm">
                    <div class="mb-3">
                        <div class="mb-2">Nombre de usuario</div>
                        {{ authUser.displayName || authUser.email }}
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Mensaje</label>
                        <textarea id="message" class="form-control"></textarea>
                    </div>
                    <button class="btn btn-primary" type="submit">Enviar</button>
                </form>
            </section>
        </div>
    </div>
</template>

<script>
import useAuth from "../../composition/useAuth.js";

import useAuth from "../../composition/useAuth.js";
import {getInitialMessages, sendMessage, subscribeToIncomingMessages} from "../../services/chat.js";
import {ref} from "vue";
import UserName from "../UserName.vue";
export default {
    name: "Chat",
    components: {UserName},
    setup() {
        const {authUser} = useAuth();
           const messages = ref([]);
        getInitialMessages()
            .then(data => {
                messages.value = [...data].reverse();

                subscribeToIncomingMessages(newMsgs => {
                    console.log("messages: ", messages.value);
                    console.log("newMsgs: ", newMsgs);

                    messages.value = [...messages.value, ...newMsgs];
                });
            });

        const newMessage = ref('');
        const handleSubmit = () => {
            sendMessage(newMessage.value).then(() => newMessage.value = '');
        }

        return {
            authUser,
            messages,
            newMessage,
            handleSubmit,
        }
    }
}
</script>

<style>

</style>
