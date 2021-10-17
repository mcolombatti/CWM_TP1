
import {onUnmounted, ref} from "vue";
import {authStateSubscribe} from "../services/auth.js";

/**
 * Retorna el usuario autenticado, que se actualiza automáticamente con los cambios en el estado de
 * autenticación.
 *
 * @return {{authUser: ToRef<{displayName: null, email: null}>}}
 */
export default () => {
    const authUser = ref({
        email: null,
        displayName: null,
    });

    const unsubscribe = authStateSubscribe(user => authUser.value = user);

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        authUser,
    };
}
