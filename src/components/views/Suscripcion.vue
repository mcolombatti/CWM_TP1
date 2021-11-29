<template>
  <div class="sidebar">
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32">
          <use xlink:href="#bootstrap" /></svg>
        <span class="fs-5">Hola {{ authUser.email }}!</span>
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">

        <li class="nav-item pr-5">

          <router-link class="nav-link " to="/perfil">Mi Cuenta</router-link>
        </li>

        <li class="nav-item">
          <a href="#/perfil/suscripciones" class="nav-link active" aria-current="page">

            Suscripciones
          </a>
        </li>

      </ul>
    </div>
    <div class="vista-container">

      <div class="container">

        <div class="row mb-3">
          <div class="col-md-12">

            <h1>Suscripciones de {{ authUser.email }}</h1>
            <p>Aca vas a poder ver los detalles del plan al que te suscribiste</p>
          </div>
          
    <div class="table-responsive">
    
      <table class="table text-center">
        <thead>
          <tr>
            <th style="width: 34%;"></th>
            <th style="width: 22%;">{{nombrePlan}}</th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-start">Ancho de banda </th>
            <td> {{caracteristicas[4]}}</td> 
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Soporte</th>
            <td>{{caracteristicas[0]}}</td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" class="text-start">Espacio en Disco</th>
            <td>{{caracteristicas[1]}}<svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
                   </tr>
          <tr>
            <th scope="row" class="text-start">Sitios</th>
            <td>{{caracteristicas[3]}}</td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Cuentas correos</th>
            <td>{{caracteristicas[2]}}</td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
               </tbody>
      </table>  
<div class="row d-flex ">
  <div class="col-md-6 "> 
    <form action="#" class=" d-flex justify-content-center" method="post" @submit.prevent="unsuscribe( userId)">   
      <button   class="mt-3  btn btn-danger btn-sm">
         Desuscribirse 

      </button> </form>
        </div>
</div>
      </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    authStateSubscribe,
    updateUserProfile
  } from "../../services/auth.js";
  import {
    setPrices
  } from "../../services/firebase.js";
  import {
    getFirestore,
    doc,
    getDoc

  } from "firebase/firestore";
   import {
        unsuscribeSuscription
    } from '../../services/suscribe.js'

  import {
    onUnmounted,
    onMounted,
    ref
  } from "vue";
  import { useToast } from "vue-toastification";
  const db = getFirestore();

  import useAuth from "../../composition/useAuth.js";
  export default {
    name: "Suscripcion",

    setup() {

const toast = useToast();
      const {
        authUser
      } = useAuth();

      /*,
       |--------------------------------------------------------------------------
       | Formulario
       |--------------------------------------------------------------------------
       */
      const form = ref({
        displayName: null,
      });
      const caracteristicas = ref({
        
      });
      const nombrePlan = ref({
        
      });

      form.value.displayName = authUser.value.displayName;

      function updateProfile() {
        updateUserProfile(form.value);
      }

      const userIds = authUser.value.id


      onMounted(async () => {

        const docRef = doc(db, "users", userIds);
        const docSnap = await getDoc(docRef);
        

        console.log("Document data:", docSnap.data().plan);
        const planUser = docSnap.data().plan
        const docRefPlan = doc(db, "planes", planUser);
        const docPlanSnap = await getDoc(docRefPlan);

        console.log("Document data:", docPlanSnap.data().caracteristicas);
        console.log("Document data:", docPlanSnap.data().nombre);
          caracteristicas.value = docPlanSnap.data().caracteristicas 
          nombrePlan.value = docPlanSnap.data().nombre 
      });
       const unsuscribe = () => {
            unsuscribeSuscription(userIds)
            
                .then(() => {
                    toast.success(`Te desuscribiste del Plan ${nombrePlan.value}`)
                })
                .then(() => {
                    nombrePlan.value =  ''
                    caracteristicas.value = ''
                }) 
        }
 
      return {
        authUser,
        form,
        updateProfile, caracteristicas,nombrePlan, unsuscribe
      };
    }
  }
</script>

<style>
  .sidebar {
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
    height: -webkit-fill-available;
    max-height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>