 
// En esta implementación, vamos a trabajar con Firebase Authentication.
// Pero ese dato solo va a ser conocido para _este_ archivo. El resto del programa entero no va a saber de
// Firebase Authentication.
// Por supuesto, vamos a usar la versión nueva modular de Firebase.
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'

// Inicializamos la autenticación de Firebase.
const auth = getAuth();

let userData = {
    email: null,
    displayName: null,
}

onAuthStateChanged(auth, user => {
    if(user) {
        userData = {
            email: user.email,
            displayName: user.displayName,
        };
    } else {
        userData = {
            email: null,
            displayName: null,
        };
    }
    // Notificamos a todos los observers.
    notifyAll();
});

/*
 |--------------------------------------------------------------------------
 | Implementación de Observer
 |--------------------------------------------------------------------------
 */
// Definimos un array con los callbacks de los observers.
let observers = [];

/**
 * Registra un observer para ser notificado.
 *
 * @param {Function} observerCallback
 * @return {Function} - Función para cancelar la suscripción.
 */
export function authStateSubscribe(observerCallback) {
    observers.push(observerCallback);

    // Notificamos inmediatamente al observer de la data actual del usuario, para que la tenga disponible.
    notify(observerCallback);

    console.log("Observer agregado, stack actual: ", observers);

    return () => {
        // Eliminamos el callback agregado del stack.
        observers = observers.filter(callback => callback !== observerCallback);
    }
}

/**
 * Notifica a un callback de un observador de algún cambio.
 *
 * @param {Function} callback
 */
function notify(callback) {
    // Invocamos el callback (que provendrá del array de observers) y le pasamos la data del usuario
    // autenticado.
    callback({...userData});
}

/**
 * Notifica a todos los observadores.
 */
function notifyAll() {
    observers.forEach(obs => notify(obs));
}

/*
 |--------------------------------------------------------------------------
 | Exports de las funciones.
 |--------------------------------------------------------------------------
 */
/**
 * Autentica al usuario.
 *
 * @param {string} email
 * @param {string} password
 * @return {Promise<UserCredential>}
 */
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            console.log("Usuario autenticado... ", credentials);
        })
        .catch(err => {
            console.error("Error al autenticar al usuario: ", err);
        });
}

/**
 * Registra un usuario.
 *
 * @param {string} email
 * @param {string} password
 * @return {Promise<UserCredential>}
 */
export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            console.log("Usuario creado... ", credentials);
        })
        .catch(err => {
            console.error("Error al crear el usuario: ", err);
        });
}

/**
 * Cierra la sesión actual.
 *
 * @return {Promise<void>}
 */
export function logout() {
    return signOut(auth);
}

/**
 * Actualiza los datos del usuario autenticado.
 *
 * @param {{displayName: string}} newData
 * @return {Promise<void>}
 */
export function updateUserProfile(newData) {
    return updateProfile(auth.currentUser, newData)
        .then(() => {
            // Si hubo éxito, actualizamos la data del usuario, y notificamos a los observers del cambio.
            userData.displayName = newData.displayName;
            notifyAll();
        })
        .catch(err => {
            console.error("Error al actualizar el perfil: ", err);
        });
}
