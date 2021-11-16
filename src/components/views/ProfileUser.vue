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
        // useRoute() es la función de composición para obtener los datos de la ruta de Vue Router.
        // Es el equivalente a this.$route en la Options API.
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
