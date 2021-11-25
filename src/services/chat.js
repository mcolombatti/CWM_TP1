import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    where,
    limit,
    orderBy,
    onSnapshot,
    Timestamp,
} from "firebase/firestore";
import {authStateSubscribe} from "./auth.js";

// Obtenemos la conexión a Firestore. Debe haberse ejecutado previamente el initializeApp.
const db = getFirestore();

// Definimos la referencia a la collection del chat.
// collection() crea una referencia a una collection.
// Recibe 2 parámetros.
// 1. La conexión a Firestore.
// 2. La ruta a la collection.
const chatCollection = collection(db, 'chat');

const collectionTimestamps = {
    start: null,
    last: null,
}
let user = {
    email: null,
    displayName: null,
};

// Vamos a guardar asociado a cada email de los usuarios que visitemos en su chat privado la referencia al
// mismo. De forma tal que solo tengamos que buscarla la primera vez por refresh.
let privateChatRefs = {};

authStateSubscribe(userData => {
    user = userData;
    // privateChatRefs = {};
});

/**
 * Retorna los mensajes iniciales del chat.
 *
 * @return {Promise<Array<QueryDocumentSnapshot<DocumentData>> | void>}
 */
export function getInitialMessages() {
    // Armamos el query para poder traer los últimos 10 mensajes, ordenados.
    // Los queries se crean con la función "query" (una suerrrrrrrrrte de "Statement" antes del execute, por
    // así decirlo), que recibe como parámetros las características del query: La collection sobre la que
    // buscar, y todos los orders, wheres, limits, etc.
    const queryMessages = query(chatCollection, orderBy('created_at', 'desc'), limit(10));

    // Leemos los documentos usando la función getDocs, que recibe como parámetro la collection de la cual
    // queremos leer.
    // Alternativamente, podemos pasar por parámetro una query también.
    return getDocs(queryMessages)
        .then(snap => {
            // console.log("snap: ", snap.docs);
            const docs = snap.docs;

            if(docs.length > 0) {
                collectionTimestamps.start = docs[docs.length - 1].data().created_at.toDate();
                collectionTimestamps.last = docs[0].data().created_at.toDate();
            }

            let documentData = docs.map(doc => doc.data());
            return documentData;
        })
        .catch(err => console.error(err));
}

/**
 * Suscripción a los nuevos mensajes del chat a partir de la fecha de inicio obtenida en getInitialMessages.
 *
 * @param callback
 * @return {Function} - La función para cancelar la suscripción.
 */
export function subscribeToIncomingMessages(callback) {
    // console.log(collectionTimestamps.last);
    const startTime = Timestamp.fromDate(collectionTimestamps.last || (new Date('1999-01-01')));
    const queryMessages = query(chatCollection, where('created_at', '>', startTime), orderBy('created_at', 'desc'));

    return onSnapshot(queryMessages, snap => {
        const docs = snap.docs.map(item => item.data());
        // console.log("Llamando al callback del chat: ", docs);

        callback(docs);
    });
}

/**
 * Guarda un nuevo mensaje.
 *
 * @param {string} message
 * @return {Promise<DocumentReference<DocumentData>>}
 */
export function sendMessage(message) {
    const data = {
        message,
        user: user.email,
        created_at: Timestamp.now(),
    };

    // addDoc es la función para pushear un documento a una collection.
    // Recibe 2 parámetros:
    // 1. La collection.
    // 2. La data.
    return addDoc(chatCollection, data);
}

/*
 |--------------------------------------------------------------------------
 | Privados
 |--------------------------------------------------------------------------
 | Los chats privados van a ser entre 2 usuarios.
 | Tiene una dinámica diferente al chat global, ya que necesitamos poder registrar
 | múltiples chats, uno por cada combinación de usuarios que decidan chatear entre ellos.
 | Para esto vamos a crear una nueva collection llamada "chat-users", que va a contener
 | cada documento con el formato:
 |
 | chat-usets: Collection(
 |      qweasd: Document(
 |          created_at: '...',
 |          users: {
 |              'sara@za.com': true,
 |              'peepo@leave.com': true,
 |          },
 |          messages: Collection(
 |              zxcasd: Document(
 |                  created_at: '...',
 |                  user: '',
 |                  message: ''
 |              )
 |          )
 |      )
 | )
*/

/**
 *
 * @param {string} from
 * @param {string} to
 * @param {Function} callback
 * @return Promise<Function> - Promesa con la función para cancelar la suscripción.
 */
export function chatSubscribeToPrivateChat(from, to, callback) {
    return getPrivateChatRef(from, to)
        .then(docRef => {
            // Armamos el camino a la Collection de los mensajes.
            // docRef.id retorna el id del Document.
            const chatCollection = collection(db, `chat-users/${docRef.id}/messages`);
            const queryChat = query(chatCollection, orderBy('created_at'));
            return onSnapshot(queryChat, snapshot => {
                const msgs = snapshot.docs.map(item => item.data());
                callback(msgs);
            });
        });
}

/**
 * Graba un mensaje privado.
 *
 * @param {string} from
 * @param {string} to
 * @param {string} message
 * @return Promise
 */
export function chatSendPrivateMessage(from, to, message) {
    // Tenemos que verificar si ya existe el documento que representa el chat entre estos dos usuarios, o
    // si tenemos que crearlo.
    return getPrivateChatRef(from, to)
        .then(docRef => {
            // Armamos el camino a la Collection de los mensajes.
            // docRef.id retorna el id del Document.
            const chatCollection = collection(db, `chat-users/${docRef.id}/messages`);
            return addDoc(chatCollection, {
                created_at: Timestamp.now(),
                user: from,
                message,
            });
        });
}

/**
 * Retorna la referencia al documento del chat privado.
 * Si no existe, lo crea.
 *
 * @param {string} from
 * @param {string} to
 * @return Promise
 */
export function getPrivateChatRef(from, to) {
    // Primero, verificamos si no tenemos ya la referencia para este chat. Si la tenemos, la retornamos.
    if(privateChatRefs[to] != null) {
        return new Promise(resolve => resolve(privateChatRefs[to]));
    }

    // En Firestore, las Collections no se crean manualmente, las crea y borra automáticamente el servidor
    // según si le adjudicamos algún documento o si queda sin documentos.
    // Eso no aplica para Documents. Los Documents tenemos que crearlos manualmente.
    // Para saber si un documento existe bajo ciertos criterios de búsqueda (los emails, en este caso),
    // tenemos que preparar el query, y traer _todos_ los documentos que matcheen ese query.
    // Si bien en este caso sabemos que no va a haber más que, como máximo, un documento que pueda matchear
    // el query, siempre las búsquedas por un query deben pedir potencialmente múltiples resultados usando
    // getDocs.
    const users = {
        // Usamos los valores de las variables "from" y "to" como las claves del objeto.
        [from]: true,
        [to]: true,
    };
    /*
    Lo de arriba es idéntico a:
    const users = {};
    users[from] = true;
    users[to] = true;
    */
    const collectionRef = collection(db, 'chat-users');
    const docQuery = query(collectionRef, where('users', '==', users));
    return getDocs(docQuery).then(snapshot => {
        // Preguntamos si vino un resultado o no.
        if(snapshot.docs.length === 1) {
            privateChatRefs[to] = snapshot.docs[0]
            return privateChatRefs[to]; // Retornamos el documento 0, que es el primero y único.
        }

        // El documento no existe, tenemos que crearlo.
        return addDoc(collectionRef, {
            created_at: Timestamp.now(),
            users,
        }).then(docRef => {
            privateChatRefs[to] = docRef;
            return privateChatRefs[to];
        });
    });
}
