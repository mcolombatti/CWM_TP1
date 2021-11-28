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
            <th style="width: 22%;">Free</th>
            <th style="width: 22%;">Pro</th>
            <th style="width: 22%;">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-start">Public</th>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Private</th>
            <td></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <th scope="row" class="text-start">Permissions</th>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Sharing</th>
            <td></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Unlimited members</th>
            <td></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
          <tr>
            <th scope="row" class="text-start">Extra security</th>
            <td></td>
            <td></td>
            <td><svg class="bi" width="24" height="24"><use xlink:href="#check"/></svg></td>
          </tr>
        </tbody>
      </table>
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
    onUnmounted,
    onMounted,
    ref
  } from "vue";
  const db = getFirestore();

  import useAuth from "../../composition/useAuth.js";
  export default {
    name: "Suscripcion",

    setup() {

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

        console.log("Document data:", docPlanSnap.data());

      });

      return {
        authUser,
        form,
        updateProfile
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