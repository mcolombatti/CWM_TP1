<template>
    <div>
        <div class="container py-5 px-4">


            <div class="row rounded-lg overflow-hidden shadow">

                <div class="col-5 px-0">
                    <div class="bg-white">

                        <div class="bg-gray px-4 py-2 bg-light">
                            <h2>Chat Privado con {{ interlocutorEmail }}</h2>
                        </div>

                        <div class="messages-box">
                            <div class="list-group rounded-0">


                                <div v-for="message in messages">
                                    <div class="list-group-item list-group-item-action list-group-item-light rounded-0">
                                        <div class="media">
                                            <div class="media-body ml-4">
                                                <div class="d-flex align-items-center justify-content-between mb-1">
                                                    <div v-if="message.user == 'admin@email.com'">

                                                        <UserName :email="message.user">{{message.user}}</UserName>

                                                    </div>
                                                    <div v-else>
                                                        <UserName :email="message.user">{{message.user}}</UserName>
                                                    </div>
                                                </div>
                                                <p>{{message.message}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-7 px-0">
                    <div class="px-4 py-5 chat-box bg-white">

                        <div class="media w-50 mb-3" v-for="message in messages">
                            <div v-if="authUser.profile.avatar">
                                <div v-if="message.user != 'admin@email.com'">
                                    <img :src="authUser.profile.avatar" class="img-fluid avatar-chat"
                                        :alt="`Imagen que corresponde al Avatar del usuario ${authUser.profile.displayName || authUser.email}`">
                                                                </div> <div v-else>
                                <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50"
                                    class="rounded-circle">
                            </div>
                                </div> 
                            <div v-else>
                                <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50"
                                    class="rounded-circle">
                            </div>
                            <div class="media-body ml-3">
                                <div class="bg-light rounded py-2 px-3 mb-2">
                                    <p class="text-small mb-0 text-muted">{{message.message}}</p>
                                </div>

                            </div>
                        </div>


                    </div>


                    <form @submit.prevent="handleSubmit">
                        <div>
                            <label for="message" class="form-label">Mensaje</label>
                            <div class="bg-light">

                                <textarea id="message" class="form-control rounded-0 border-0 py-4 bg-light"
                                    v-model="newMessage"></textarea>
                                <button class="btn btn-primary" type="submit">Enviar</button>
                                <div class="input-group-append">
                                    <button id="button-addon2" type="submit" class="btn btn-link"> <i
                                            class="fa fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>

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