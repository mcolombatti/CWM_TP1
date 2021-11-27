import {initializeApp} from "firebase/app"; 

import {getFirestore,  collection, getDocs } from "firebase/firestore";
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
export async function getPlanes(db) {
  const priceList = collection(db, 'planes');
  const pricesSnapshot = await getDocs(priceList);
  const test = {}; pricesSnapshot.forEach((doc) => {
    test[doc.id] = doc.data();
  });
  return test
} 
