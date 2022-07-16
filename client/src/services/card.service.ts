import {db} from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const cardCollectionRef = collection(db, "cards");
class CardDataService {
  addCard = (newCard:any) => {
    return addDoc(cardCollectionRef, newCard);
  };

  updateCard = (id:any, updatedCard:any) => {
    const cardDoc = doc(db, "cards", id);
    return updateDoc(cardDoc, updatedCard);
  };

  deleteCard = (id:any) => {
    const cardDoc = doc(db, "cards", id);
    return deleteDoc(cardDoc);
  };

  getAllCards = () => {
    return getDocs(cardCollectionRef);
  };

  getCard = (id:any) => {
    const cardDoc = doc(db, "cards", id);
    return getDoc(cardDoc);
  };
}

export default new CardDataService();
