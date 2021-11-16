import {initializeApp} from "firebase/app"; 

import {  getFirestore,    collection,    getDocs,    addDoc,    query,    where,    limit,    orderBy,    onSnapshot,    Timestamp,} from "firebase/firestore";
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

export function getInitialMessages(){
    
    const queryMessages = query(chatCollection, orderBy('created_at', 'desc'), limit(10))
    return getDocs(queryMessages)
    .then(snap => { 
        const docs = snap.docs


        if(docs.length > 0) {
            collectionTimestamps.start = docs[docs.length - 1].data().created_at.toDate();
            collectionTimestamps.last = docs[0].data().created_at.toDate();
        }
        let documentData = docs.map(doc => doc.data());
        return documentData;
    })
    .catch(err => console.error(err))
   
}

export function suscribeToIncomingMessages(callback){
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

    // addDoc es la función para pushear un documento a una collection.
    // Recibe 2 parámetros:
    // 1. La collection.
    // 2. La data.
    return addDoc(chatCollection, data);
}
