 
import {
  getFirestore, writeBatch, doc
} from "firebase/firestore";


const db = getFirestore();
export async function publicar(id, userIds) {
  
  console.log(userIds)
  const batch = writeBatch(db);
  const userRef = doc(db, "users", userIds);
  batch.update(userRef, {plan: id});  
  await batch.commit();

}
export async function unsuscribeSuscription(  userIds) {
  
  console.log(userIds)
  const batch = writeBatch(db);
  const userRef = doc(db, "users", userIds);
  batch.update(userRef, {plan: null});  
  await batch.commit();

}