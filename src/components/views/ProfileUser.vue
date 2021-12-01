<template>
    <div class="mb-3">
        <h1>Perfil de {{ email }}</h1>

        <router-link :to="`/chat/${email}`" class="btn btn-primary">Chatear con {{ email }}</router-link>
    </div>
</template>

<script>
import {useRoute} from "vue-router";

export default {
    name: "ProfileUser",
    setup() {
      
        const route = useRoute();

        const email = route.params.email;

        return {
            email,
        };
    }
};
</script>

<style>

</style>
