<template>
    <div class="chat">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="mb-3">
                        <h2>Chat</h2>
                    </div>
                    <div class="row">
                        <section class="col-8">
                            <h3 class="visually-hidden">Lista de mensajes</h3>
                            <div id="chatMessages" class="chat mb-5">
                                <p v-for="message in messages" class='mb-3 mt-5'>
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
        getInitialMessages,
        sendMessage,
        subscribeToIncomingMessages
    } from "../../services/chat.js";
    import {
        onUnmounted,
        ref
    } from "vue";
    import UserName from "../UserName.vue";

    export default {
        name: "Chat",
        components: {
            UserName
        },
        setup() {
            const {
                authUser
            } = useAuth();
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
                authUser,
                messages,
                newMessage,
                handleSubmit,
            }
        }
    };
</script>

<style>
    #chatForm,
    #chatMessages {
        border: 1px solid rgb(0 0 0 / 15%);
        border-radius: 10%;
        padding: 3em;
    }

    .chat {
        min-height: 100vh;
    }
</style>