<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="mb-3">
                        <h2>Chat Privado con {{ interlocutorEmail }}</h2>
                    </div>
                    <div class="row">
                        <section class="col-8">
                            <h3 class="visually-hidden">Lista de mensajes</h3>
                            <div id="chatMessages" class="chat">
                                <p v-for="message in messages" class='mb-3'>
                                    <UserName :email="message.user">{{message.user}}</UserName>: {{message.message}}
                                </p>
                            </div>
                        </section>
                        <section class="col-4">
                            <h3 class="visually-hidden">Escribir un mensaje</h3>
                            <form id="chatForm" @submit.prevent="handleSubmit">
                                <div class="mb-3">
                                    <div class="mb-2">Nombre de usuario</div>
                                    {{ authUser.displayName || authUser.email }}
                                </div>
                                <div class="mb-3">
                                    <label for="message" class="form-label">Mensaje</label>
                                    <textarea id="message" class="form-control" v-model="newMessage"></textarea>
                                </div>
                                <button class="btn btn-primary" type="submit">Enviar</button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import useAuth from "../../composition/useAuth.js";
    import {
        chatSendPrivateMessage,
        chatSubscribeToPrivateChat,
        getInitialMessages,
        sendMessage,
        subscribeToIncomingMessages
    } from "../../services/chat.js";
    import {
        onUnmounted,
        ref
    } from "vue";
    import UserName from "../UserName.vue";
    import {
        useRoute
    } from "vue-router";

    export default {
        name: "Chat",
        components: {
            UserName
        },
        setup() {
            const route = useRoute();
            const interlocutorEmail = route.params.email;
            const {
                authUser
            } = useAuth();
            const messages = ref([]);
            let unsubscribe;
            chatSubscribeToPrivateChat(authUser.value.email, interlocutorEmail, msgs => messages.value = msgs)
                .then(unsub => unsubscribe = unsub);

            onUnmounted(() => {
                if (typeof unsubscribe != null) unsubscribe();
            });
            const newMessage = ref('');
            const handleSubmit = () => {
                chatSendPrivateMessage(authUser.value.email, interlocutorEmail, newMessage.value)
                    .then(() => newMessage.value = '');
            }
            return {
                authUser,
                messages,
                newMessage,
                interlocutorEmail,
                handleSubmit,
            }
        }
    };
</script>

<style>

</style>