<template>
     <div class="vista-container"> 
       <div>
           <section id="section-register" class="mb-5 container">
               <h1>Crear Nuevo Plan</h1>
               <form
        @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input
                type="text" 
                class="form-control"
                v-model="form.nombre"
            >
        </div>  
       <div class="mb-3">
            <label for="precio" class="form-label">Precio</label>
            <input
                type="number" 
                class="form-control"
                v-model="form.precio"
            >
        </div>   
       <div class="mb-3">
            <label for="caracteristicas" class="form-label">caracteristicas</label>
            <input
                type="text" 
                class="form-control"
                v-model="form.caracteristicas"
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
import {useRouter} from "vue-router";
export default {
    name: "Create",
    setup() {
        const router = useRouter();
        const form = ref({
            nombre: '',  
            precio: '',  
        });
        const handleSubmit = () => {
            publicar(form.value.nombre, form.value.precio , form.value.caracteristicas )
                .then(() => {
                form.value = {
                    nombre: '',
                    precio: ''
                }
            }).then(()=>{
                 router.push({
                    path: '/panel'
                });
            })  
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
