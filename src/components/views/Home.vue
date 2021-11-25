<template>
    <div>
        <div class="bg-dark py-5">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-9">
                        <div class="text-center my-5">

                            <h1 class="display-8 pb-5 fw-bolder text-white mb-2">Da Vinci Hosting, ofrecemos el mejor
                                servicio segun tus necesidades</h1>
                            <p class="lead text-white-50 mb-4">Necesitas un servicio de hosting web potente. Nuestras
                                soluciones de hosting harán que tus sitios web sean realmente veloces.</p>
                            <img src="../../assets/images/hero.png" class="img-fluid" alt="dominios disponibles">
                            <div class="d-grid pt-5 gap-3 d-sm-flex justify-content-sm-center">
                                <router-link class="  btn btn-primary btn-lg px-4 me-sm-3" to="/registro">Comenzar
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ACA DEBERIA TRAER LOS DATOS DE FIRESTORE--->

        <section class="py-5 border-bottom" id="features">
            <div class="container px-5 my-5">
                <div class="row gx-5">
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                class="bi bi-collection"></i></div>
                        <h2 class="text-h-meteorite-dark mt-15 mt-25-xxl mb-20 mb-30-xxl">Sitios web realmente rápidos
                        </h2>
                        <p class="text-h-gray paragraph fw-400">La velocidad de tu proyecto web es vital para que tu
                            presencia en línea crezca. Sorprendé a tus posibles clientes con una velocidad increíble.
                        </p>
                    </div>
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                class="bi bi-building"></i></div>
                        <h2 class="text-h-meteorite-dark mt-15 mt-25-xxl mb-20 mb-30-xxl">Fácil de configurar</h2>
                        <p class="text-h-gray paragraph fw-400">Hacé que tu sitio web esté online de forma fácil, solo
                            deberás hacer un clic. Todo lo que buscas en un servicio de alojamiento, ofrecido de una
                            forma clara.</p>

                    </div>
                    <div class="col-lg-4">
                        <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i
                                class="bi bi-toggles2"></i></div>
                        <h2 class="text-h-meteorite-dark mt-15 mt-25-xxl mb-20 mb-30-xxl">Para proyectos grandes o
                            pequeños</h2>
                        <p class="text-h-gray paragraph fw-400">Variedad de proyectos requiere variedad de tecnologías.
                            Elegí el plan de alojamiento web que se ajuste a tus necesidades, después podrás mejorarlo a
                            medida que tu negocio crezca.</p>

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container px-5 my-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bolder">Ofrecemos los mejores Dominios a tu alcance</h2>
                    <p class="lead mb-0">Elegi el que mejor se adapte a tus necesidades</p>
                </div>
            </div>
            <div class="mt-5 mb-5">
                <div class="container container-2020">
                    <div id="domain-tlds">
                        <div class="domain-tlds-container m-auto">
                            <div class="d-flex align-items-center">
                                <img src="../../assets/images/domains.jpg" class="img-fluid" alt="dominios disponibles">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-light py-5 border-bottom">
            <div class="container px-5 my-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bolder">Pagá según tu uso</h2>
                    <p class="lead mb-0">Con nuestros planes económicos ya no tendrás que preocuparte por altos costos
                        en tu servicio de Hosting</p>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6 col-xl-4">
                        <div class="card mb-5 mb-xl-0">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold text-muted">Enterprise</div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">{{free.precio}}</span>
                                    <span class="text-muted">/mes</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2 options h5">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{free.anchobanda}}</p>
                                    </li>
                                    <li class="mb-2 options h5">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{free.web}}</p>
                                    </li> 
                                    
                                    <li class="mb-2 options  h5">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{free.capacidad}}</p>
                                    </li>
                                   

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xl-4">
                        <div class="card mb-5 mb-xl-0">
                           <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold text-muted">Free</div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">{{pro.precio}}</span>
                                    <span class="text-muted">/mes</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2 options h5">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{pro.anchobanda}}</p>
                                    </li>
                                    <li class="mb-2 options h5">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{pro.web}}</p>
                                    </li>
                                    
                                    <li class="mb-2 options h5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{pro.correo}}</p>
                                    </li>
                                    <li class="mb-2 options  h5">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{pro.capacidad}}</p>
                                    </li>
                                    <li class="mb-2 options h5">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{pro.atencion}}</p>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xl-4">
                        <div class="card">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold text-muted">Enterprise</div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">{{enterprise.precio}}</span>
                                    <span class="text-muted">/mes</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2 options h5">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{enterprise.anchobanda}}</p>
                                    </li>
                                    <li class="mb-2 options h5">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{enterprise.web}}</p>
                                    </li>
                                    <li class="mb-2 options h5">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{enterprise.dominio}}</p>
                                    </li>
                                    <li class="mb-2 options h5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{enterprise.correo}}</p>
                                    </li>
                                    <li class="mb-2 options  h5">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{enterprise.capacidad}}</p>
                                    </li>
                                    <li class="mb-2 options h5">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                        <p>{{enterprise.atencion}}</p>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-5 border-bottom">
            <div class="container px-5 my-5 px-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bolder">Opiniones de nuestros clientes</h2>
                    <p class="lead mb-0">Nuestros clientes estan contentos de usar DaVinci Hosting</p>
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="card mb-4">
                            <div class="card-body p-4">
                                <div class="d-flex">
                                    <div class="flex-shrink-0"><i
                                            class="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                    <div class="ms-4">
                                        <p class="mb-1">La mejor velocidad y acceso en el mercado</p>
                                        <div class="small text-muted">- Mariana, Santiago de Chile</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body p-4">
                                <div class="d-flex">
                                    <div class="flex-shrink-0"><i
                                            class="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                    <div class="ms-4">
                                        <p class="mb-1">
                                            El mejor servicio de hosting lejos!</p>
                                        <div class="small text-muted">- Maximiliano, Buenos Aires</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        getPrices
    } from '../../services/firebase.js'
    import {
        onMounted,
        ref
    } from "vue";

    const db = getFirestore();
    export default {
        name: "Home",
        setup() {
            // const free = ref([]);
            // onMounted(async () => {
            //     const res = await getPrices(db)
            //     free.value = res
            //     console.log(free);
            // });
            // const premium = ref([]);
            // onMounted(async () => {
            //     const res = await getPrices2(db)
            //     premium.value = res
            //     console.log(premium);
            // });

            // const enterprise = ref([]);
            // onMounted(async () => {
            //     const res = await getPrices3(db)
            //     enterprise.value = res
            //     console.log(enterprise);
            // });
            const free = ref([]);
            const pro = ref([]);
            const enterprise = ref([]);
            onMounted(async () => {
                const res = await getPrices(db)
                free.value = res.free;
                pro.value = res.pro;
                enterprise.value = res.enterprise;
                console.log(res);
                console.log(free.value);
                console.log(free.value.capacidad);

            });
            return {
                pro,
                free,
                enterprise
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