
import { onUnmounted, ref } from "vue";
import { authStateSubscribe } from "../services/auth.js";

/**
 * Cuando se loguea con exito retorna el usuario autenticado, y  automáticamente con los cambios en el estado de
 * autenticación se actualiza
 *
 * @return {{authUser: ToRef<{email: null,displayName: null,rol:null,id: null, nombre: null, apellido: null, fechanac: null}>}}
 */
export default () => {
    const authUser = ref({
        email: null,
        displayName: null,
        plan: null,
        id: null,
        apellido: null,
        nombre: null,
        fechanac: null

    });

    const unsubscribe = authStateSubscribe(user => authUser.value = user);

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        authUser,
    };
}
