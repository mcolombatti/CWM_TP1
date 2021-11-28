 
import {
  getFirestore, writeBatch, doc
} from "firebase/firestore";


const db = getFirestore();
export async function publicar(id) {
  const batch = writeBatch(db);
  const nycRef = doc(db, "users", "kuHlaQXWWUM5M9VqtGNdPH5ghjS2");
  batch.update(nycRef, {plan: id});  
  await batch.commit();

}