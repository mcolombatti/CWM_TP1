 
import {
    getFirestore,
    doc,
    setDoc, Timestamp,
} from "firebase/firestore";
 

const db = getFirestore();
 
/**
 * Publica un plan
 *
 * @param {string} nombre
 */
export function publicar(nombre) {
  
        
    return setDoc(doc(db, 'pricing', nombre),{
        nombre
    })
       
}
 
 