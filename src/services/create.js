 
import {
    getFirestore,
    addDoc,collection,
     Timestamp,
} from "firebase/firestore";
 

const db = getFirestore();
 
/**
 * Publica un plan
 *
 * @param {string} nombre
 */
 export async function publicar(nombre, precio, caracteristicas) {
  
        
    const docRef = await addDoc(collection(db, "planes"), {
        nombre: nombre,
        precio: precio,
        caracteristicas: [caracteristicas]
      });
      console.log("Document written with ID: ", docRef.id);
       
}
 
 