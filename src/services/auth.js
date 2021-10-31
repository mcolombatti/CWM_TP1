 
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'
 
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
    notifyAll();
});
  
let observers = [];

/**
 * Permite registrar un observer para ser notificado
 *
 * @param {Function} observerCallback
 * @return {Function} - Función para cancelar la suscripción.
 */
export function authState(observerCallback) {
    observers.push(observerCallback);
 
    notify(observerCallback);

    console.log("Observer agregado, stack actual: ", observers);

    return () => { 
        observers = observers.filter(callback => callback !== observerCallback);
    }
}

/**
 * si hay algún cambio notifica al callback de un observador
 *
 * @param {Function} callback
 */
function notify(callback) {
    
    callback({...userData});
}

/**
 * Avisa/notifica a todos los observadores
 */
function notifyAll() {
    observers.forEach(obs => notify(obs));
}
 
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
            console.log('inicio sesion')
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
 * Permite cerrar la sesión actual.
 *
 * @return {Promise<void>}
 */
export function logout() {
    return signOut(auth);
}

/**
 * Permite actualizar los datos del usuario autenticado.
 *
 * @param {{displayName: string}} newData
 * @return {Promise<void>}
 */
export function updateUserProfile(newData) {
    return updateProfile(auth.currentUser, newData)
        .then(() => {
             userData.displayName = newData.displayName;
            notifyAll();
        })
        .catch(err => {
            console.error("Error al actualizar el perfil: ", err);
        });
}
