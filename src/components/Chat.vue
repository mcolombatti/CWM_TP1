<template><div>
    
        <div class="mb-3">
            <h2>Chat</h2>
        </div>
        <div class="row">
            <section class="col-8">
                <h3 class="visually-hidden">Lista de mensajes</h3>
                <div id="chatMessages" class="chat"></div>
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
import useAuth from "../composition/useAuth.js";

export default {
    name: "Chat",
    setup() {
        const {authUser} = useAuth();

        return {
            authUser,
        }
    }
};
</script>

<style>

</style>
