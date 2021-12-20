<template>
    <div class="container py-5 px-4">


        <div class="row rounded-lg overflow-hidden shadow">
            <h1>Chat</h1>
            <div class="col-5 px-0">
                <div class="bg-white">

                    <div class="bg-gray px-4 py-2 bg-light">
                        <h2 class="h5 mb-0 py-1">Lista de Mensajes</h2>
                    </div>

                    <div class="messages-box">
                        <div class="list-group rounded-0">


                            <div v-for="message in messages">
                                <div class="list-group-item list-group-item-action list-group-item-light rounded-0">
                                    <div class="media">
                                        <div class="media-body ml-4">
                                            <div class="d-flex align-items-center justify-content-between mb-1">
                                           
                                                    <UserName :email="message.user">{{message.user}}</UserName>
                                                 
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

                    <div class="media w-50 mb-3" v-for="message in messages">   <div v-if="authUser.profile.avatar">
                              <div v-if="message.user == 'admin@email.com'">
                                <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50"
                                    class="rounded-circle">
                            </div>
                            </div>
                        <div class="media-body ml-3">
                            <div class="bg-light rounded py-2 px-3 mb-2">
                                <p class="text-small mb-0 text-muted">{{message.message}}</p>
                            </div>

                        </div>
                    </div>


                </div>


                <form   @submit.prevent="handleSubmit" >
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


</template>

<script>
    import useAuth from "../../composition/useAuth.js";
    import {
        getInitialMessages,
        sendMessage,
        subscribeToIncomingMessages
    } from "../../services/chat.js";
    import {
      onMounted,
        onUnmounted,
        ref,watch
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
            const avatar = ref(null);
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
            onMounted((avatar)=>{
                
                     watch(avatar, () => {
              
                 
                        const reader = new FileReader();


                        reader.readAsDataURL(avatar.value.files[0]);
             
               
            });

            }) 

            return {
                authUser,avatar,
                messages,
                newMessage,
                handleSubmit,
            }
        }
    };
</script>

<style>
    .chat {
        min-height: 100vh;
    }
</style>