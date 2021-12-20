
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
    setDoc, Timestamp, getDoc
} from "firebase/firestore";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";

const auth = getAuth();

const db = getFirestore();

const storage = getStorage();

let userData = {
    email: null,
    displayName: null,
    id: null,
    plan: null,
    profile: {}
}

onAuthStateChanged(auth, user => {
    if (user) {
        userData = {

            ...userData,
            email: user.email,
            displayName: user.displayName,
            id: user.uid
        };
        getProfile();
    } else {
        userData = {
            email: null,
            displayName: null,
            id: null,
            plan: null,
            profile: {}
        };
    }
    notifyAll();
});

let observers = [];

/**
 * Permite registrar un observer para ser notificado
 *
 * @param {Function} observerCallback
 * @return {Function} - Retorna la funcion que permite cancelar la suscripción.
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

    callback({ ...userData });
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
            if (err == 'FirebaseError: Firebase: Error (auth/wrong-password).') {
                toast.error('La contraseña es incorrecta. Por favor intente nuevamente.');
            }
            if (err == 'FirebaseError: Firebase: Error (auth/user-not-found).') {
                toast.error('No encontramos el correo ingresado en nuestros registros. Por favor intente nuevamente.');
            }
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

    const toast = useToast();
    return createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {

            toast.success("Usuario registrado exitosamente")

            return setDoc(doc(db, 'users', credentials.user.uid), {
                email,
                displayName: null,
                created_at: Timestamp.now(),
                plan: null,
                id: credentials.user.uid
            });
        })
        .catch(err => {
            if (err == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).') {
                toast.error('La contraseña debe tener al menos 6 caracteres. Por favor intente nuevamente.');
            }
            console.error(err);
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
 * Actualiza los datos del usuario autenticado.
 *
 * @param {{newData: Object}} newData
 * @param {File|null} avatar
 * @return {Promise<void>}
 */
export async function updateUserProfile(newData, avatar = null) {

    await updateProfile(auth.currentUser, newData);
    userData.displayName = newData.displayName;
    userData.email = newData.email;

    if (avatar) {
        const filename = auth.currentUser.uid + ".jpg";
        const avatarRef = ref(storage, 'users/' + filename);

        const result = await uploadBytes(avatarRef, avatar);
        newData.avatar = result.ref.fullPath;
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userRef, newData, { merge: true });
    userData.profile = newData;

    if (userData.profile.avatar) {
        getDownloadURL(ref(storage, userData.profile.avatar))
            .then(url => {
                userData.profile.avatar = url;
                notifyAll();
            });
    }
    notifyAll();
    return true;
}
/**
 * 
 * @param {id:number} id 
 * @return {Promise<void>}
 */
export async function getProfile(id = null) {
    const uid = id || auth.currentUser.uid;


    if (id == null && userData.profile.displayName != null) {

        return userData.profile;

    }

    const snap = await getDoc(doc(db, 'users', uid));
    const data = snap.data();

    if (data.avatar) {
        data.avatar = await getDownloadURL(ref(storage, data.avatar));
    }

    if (id == null) {
        userData.profile = data;
        console.log(userData.profile)
        notifyAll();
    }

    return data;

}
