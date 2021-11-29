 
import {
  getFirestore, writeBatch, doc
} from "firebase/firestore";


const db = getFirestore();
export async function publicar(id, userIds) {
  
  console.log(userIds)
  const batch = writeBatch(db);
  const nycRef = doc(db, "users", userIds);
  batch.update(nycRef, {plan: id});  
  await batch.commit();

}
export async function unsuscribeSuscription(  userIds) {
  
  console.log(userIds)
  const batch = writeBatch(db);
  const nycRef = doc(db, "users", userIds);
  batch.update(nycRef, {plan: null});  
  await batch.commit();

}