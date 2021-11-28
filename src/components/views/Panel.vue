<template>
    <div> 
          <section class="bg-light py-5 border-bottom">
            <div class="container px-5 my-5">
                <div class="text-center mb-5">
                    <h1 class="fw-bolder">Panel de Administrador</h1>
                    <p class="lead mb-0">Planes de Suscripcion</p>
                </div>
                <div class="row gx-5 justify-content-center"> 
                    <ul v-for="plan in planes"  v-bind:key="plan">  <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6 col-xl-4">
                        <div class="card mb-5 mb-xl-0">
                            <div class="card-body p-5"><h3>{{plan.nombre}}</h3><h3>{{plan.id}}</h3>
                     
                        
                            
                             
                                         <div class="mb-3">
                                    <span class="display-4 fw-bold">{{plan.precio}}</span>
                                    <span class="display-4 fw-bold">{{planes.id}}</span>
                                    <span class="text-muted">/mes</span>
                                </div> 
                            <li v-for="item in plan.caracteristicas"  v-bind:key="item"> {{item}}</li> </div>
                        </div>
                    </div> 
                </div></ul>
                       
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {
        getFirestore
    } from "firebase/firestore";
    import 'babel-polyfill';
    import {
        getPlanes  
    } from '../../services/firebase.js'
    import {
        onMounted,
        ref,
    } from "vue"; 
    const db = getFirestore();
    export default {
        name: "Home",
        setup() {
             
             
            const planes = ref({     });     
            
            onMounted(async () => {
                const res = await getPlanes(db) 
                 
                planes.value = res   
                console.log(planes) 
            });
            return {
               planes 
            };
            
        }
    }
</script>
<style>
    #logo {
        color: #093eae;
        font-weight: 700;
    }

    .options {
        display: flex;
        align-items: baseline;
    }
</style>