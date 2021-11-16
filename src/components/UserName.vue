<template>
    <router-link :to="`/perfil/${email}`" class="UserName">{{email}}</router-link>
</template>

<script>
import {useRoute} from "vue-router";

export default {
    name: "UserName",
    props: {
        email: {
            type: String,
            required: true,
        }
    },
    // Las props en la API de Composition llegan como el primer parámetro del setup.
    setup(props) {
        const email = props.email;

        return {
            email,
        }
    }
};
</script>

<style>
.UserName {
    font-weight: 700;
}
</style>
