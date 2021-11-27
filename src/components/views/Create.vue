<template>
     <div class="vista-container"> 
       <div>
           <section id="section-register" class="mb-5 container">
               <h1>Panel</h1>
               <form
        @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
            <label for="nombre" class="form-label">nombre</label>
            <input
                type="nombre"
                id="nombre"
                class="form-control"
                v-model="form.nombre"
            >
        </div>
      
        <button type="submit" class="btn btn-primary">publicar</button>
    </form>
           
           </section>
       </div>
</div>
</template>

<script>

import {ref} from "vue";
import {publicar} from "../../services/create.js";
export default {
    name: "Create",
    setup() {
        const form = ref({
            nombre: '', 
        });

        const handleSubmit = () => {
            publicar(form.value.nombre)
                .then(() => {
                    form.value = {
                        nombre: '',
                    }
                });
        }

        return {
            form,
            handleSubmit,
        }
    }
};
</script>

<style>

</style>
