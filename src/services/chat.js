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
 const db = getFirestore();
 const chatCollection = collection(db, 'chat');

const collectionTimestamps = {
    start: null,
    last: null,
}
let user = {
    email: null,
    displayName: null,
};
 let privateChatRefs = {};

authStateSubscribe(userData => {
    user = userData;
     
});

/**
 * Retorna los mensajes iniciales del chat.
 *
 * @return {Promise<Array<QueryDocumentSnapshot<DocumentData>> | void>}
 */
export function getInitialMessages() {
     const queryMessages = query(chatCollection, orderBy('created_at', 'desc'), limit(10));

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
       const startTime = Timestamp.fromDate(collectionTimestamps.last || (new Date('1999-01-01')));
    const queryMessages = query(chatCollection, where('created_at', '>', startTime), orderBy('created_at', 'desc'));

    return onSnapshot(queryMessages, snap => {
        const docs = snap.docs.map(item => item.data());
        
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

    
    return addDoc(chatCollection, data);
}
 
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
      return getPrivateChatRef(from, to)
        .then(docRef => {
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
      if(privateChatRefs[to] != null) {
        return new Promise(resolve => resolve(privateChatRefs[to]));
    }

    const users = {
          [from]: true,
        [to]: true,
    };
     const collectionRef = collection(db, 'chat-users');
    const docQuery = query(collectionRef, where('users', '==', users));
    return getDocs(docQuery).then(snapshot => {
         if(snapshot.docs.length === 1) {
            privateChatRefs[to] = snapshot.docs[0]
            return privateChatRefs[to];    }

           return addDoc(collectionRef, {
            created_at: Timestamp.now(),
            users,
        }).then(docRef => {
            privateChatRefs[to] = docRef;
            return privateChatRefs[to];
        });
    });
}
