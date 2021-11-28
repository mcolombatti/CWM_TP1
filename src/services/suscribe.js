 
import {
  getFirestore, writeBatch, doc
} from "firebase/firestore";


const db = getFirestore();
export async function publicar(id) {
  const batch = writeBatch(db);
  const nycRef = doc(db, "users", "vy2ficPf90SArMEaooZ7PfHJbGh2");
  batch.update(nycRef, {plan: id});  
  await batch.commit();

}