 
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
 
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
