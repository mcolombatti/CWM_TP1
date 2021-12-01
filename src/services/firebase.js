import {
  initializeApp
} from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot
} from "firebase/firestore";
import 'babel-polyfill';

const app = initializeApp({
  apiKey: "AIzaSyDlmxtrIl3TI1DTJT6AW-lwBlmMhuYFn5c",
  authDomain: "clienteswebmobile-noche.firebaseapp.com",
  databaseURL: "https://clienteswebmobile-noche-default-rtdb.firebaseio.com",
  projectId: "clienteswebmobile-noche",
  storageBucket: "clienteswebmobile-noche.appspot.com",
  messagingSenderId: "480976720676",
  appId: "1:480976720676:web:965538416f033307de99b1"
});
const db = getFirestore();

/**
 * Permite obtener los datos del listado de planes de la collection Planes.
 *
 * @param {{Firestore}} db
 * @return {Promise<void>}
 */
export async function getPlanes(db) {
  const priceList = collection(db, 'planes');
  const pricesSnapshot = await getDocs(priceList);
  const test = {};
  pricesSnapshot.forEach((doc) => {
    test[doc.id] = {
      id: doc.id,
      ...doc.data()
    }
  });
  return test
}
/**
 * Permite obtener los datos de los usuarios de la collection Users.
 *
 * @param {{Firestore}} db
 * @return {Promise<void>}
 */
export async function getUsersFromCollection(db) {
  const priceList = collection(db, 'users');
  const pricesSnapshot = await getDocs(priceList);
  const test = {};
  pricesSnapshot.forEach((doc) => {
    test[doc.id] = {
      id: doc.id,
      ...doc.data()
    }
  });
  return test
}
/**
 * Permite obtener los datos de un determinado plan pasandole el id como parametro
 *
 * @param {{number}} id
 * @return {Promise<void>}
 */
export const getPlan = async id => {
  const docRef = doc(db, "planes", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data()
}