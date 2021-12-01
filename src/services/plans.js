import {
    initializeApp
} from "firebase/app";

import {
    getFirestore,
    writeBatch,
    doc
} from "firebase/firestore";

const db = getFirestore();
/**
 * Permite borrar un plan pasandole el id por parametro. Retorna una promesa.
 *
 * @param {{number}} id
 * @return {Promise<void>}
 */
export async function deletePlan(id) {
     
    const batch = writeBatch(db);
    const plansRef = doc(db, "planes", id);
    batch.delete(plansRef);

    await batch.commit();
}
/**
 * Permite actualizar un plan pasandole el id por parametro. Retorna una promesa.
 *
 * @param {{number}} id
 * @return {Promise<void>}
 */
export async function updatePlan(id, plan) {

    const batch = writeBatch(db);
    const planRef = doc(db, "planes", id);
    batch.set(planRef, plan);
    await batch.commit();

}