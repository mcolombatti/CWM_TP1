 
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'
 
import {
    useToast
} from "vue-toastification";
import {
    getFirestore,
    doc,
    setDoc, Timestamp,
} from "firebase/firestore"; 
const auth = getAuth();

const db = getFirestore();

let userData = {
    email: null,
    displayName: null,
    id: null,
    plan: null,
    role: null
}

onAuthStateChanged(auth, user => {
    if(user) {
        userData = {
            email: user.email,
            displayName: user.displayName,
            id: user.uid, 
            role: null
        };
    } else {
        userData = {
            email: null,
            displayName: null,
            id: null,
            plan: null
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
export function authStateSubscribe(observerCallback) {
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
    
    const toast = useToast();
    return signInWithEmailAndPassword(auth, email, password)
        .then(credentials => { 
            toast.success("Logueado exitosamente")
        })
        .catch(err => { 
           if(err == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
            toast.error('La contraseña es incorrecta. Por favor intente nuevamente.');}
           if(err == 'FirebaseError: Firebase: Error (auth/user-not-found).'){
            toast.error('No encontramos el correo ingresado en nuestros registros. Por favor intente nuevamente.');}
            console.log(err)
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
        
            return setDoc(doc(db, 'users', credentials.user.uid), {
                email,
                displayName: null,
                created_at: Timestamp.now(),
                plan: null,
                role: null,
                id: credentials.user.uid
            });
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
