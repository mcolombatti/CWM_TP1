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
/*
 export async function getPrices(db) {
  const priceList = collection(db, 'pricing');
  const pricesSnapshot = await getDocs(priceList);
  const pricesList = pricesSnapshot.docs.map(doc => `   ${doc.data().free}  `);

  console.log(pricesList[0])
  return pricesList[0]
  
} 
 export async function getPrices2(db) {
  const priceList = collection(db, 'pricing');
  const pricesSnapshot = await getDocs(priceList);
  const pricesList = pricesSnapshot.docs.map(doc => `   ${doc.data().premium}  `);

  console.log(pricesList[0])
  return pricesList[0]
  
} 
 export async function getPrices3(db) {
  const priceList = collection(db, 'pricing');
  const pricesSnapshot = await getDocs(priceList);
  const pricesList = pricesSnapshot.docs.map(doc => `   ${doc.data().enterprise}  `);

  console.log(pricesList[0])
  return pricesList[0]
  
} */
export async function getPrices(db) {
  const priceList = collection(db, 'pricing');
  const pricesSnapshot = await getDocs(priceList);
  const test = {}; pricesSnapshot.forEach((doc) => {
    test[doc.id] = doc.data();
  });
  return test
} 
