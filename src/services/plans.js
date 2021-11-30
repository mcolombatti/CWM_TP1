
import {initializeApp} from "firebase/app"; 

import {  getFirestore, writeBatch, doc } from "firebase/firestore";

const db = getFirestore();
export async function deletePlan(id){
    console.log(id)
    const batch = writeBatch(db);
    const plansRef = doc(db, "planes", id);
    batch.delete(plansRef);
 
    await batch.commit();
}
export async function updatePlan(id, plan) {
   
    const batch = writeBatch(db);
    const planRef = doc(db, "planes", id);
    batch.set(planRef, plan);
    await batch.commit();
    
  }