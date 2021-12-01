 
import {
  getFirestore, writeBatch, doc
} from "firebase/firestore";


const db = getFirestore();

/**
 * Permite a un usuario suscribirse a un plan pasandole el id del plan y el id del User. Retorna una promesa.
 *
 * @param {{number}} id
 * @param {{number}} userIds
 * @return {Promise<void>}
 */ 

export async function addSuscription(id, userIds) {
  
  const batch = writeBatch(db);
  const userRef = doc(db, "users", userIds);
  batch.update(userRef, {plan: id});  
  await batch.commit();

}

/**
 * Permite a un usuario desuscribirse de un plan pasandole a la funcion el id del User como parametro. Retorna una promesa.
 *
 * @param {{number}} id
 * @param {{number}} userIds
 * @return {Promise<void>}
 */ 

export async function unsuscribeSuscription(  userIds) {
  
  console.log(userIds)
  const batch = writeBatch(db);
  const userRef = doc(db, "users", userIds);
  batch.update(userRef, {plan: null});  
  await batch.commit();

}