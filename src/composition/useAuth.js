
import {onUnmounted, ref} from "vue";
import {authState} from "../services/auth.js";

/**
 * Cuando se loguea con exito retorna el usuario autenticado, y  automáticamente con los cambios en el estado de
 * autenticación se actualiza
 *
 * @return {{authUser: ToRef<{displayName: null, email: null}>}}
 */
export default () => {
    const authUser = ref({
        email: null,
        displayName: null,
    });
    
    const unsubscribe = authState(user => authUser.value = user);

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        authUser,
    };
}
