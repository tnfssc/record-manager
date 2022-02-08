import firebase from "firebase-admin";

import { ROLES } from "../../constants/auth";
import { firestore } from "../../lib/firebase";

export interface Value {
  role: ROLES;
  email: string;
}

export const getRole = async (user: firebase.auth.DecodedIdToken): Promise<Value> => {
  const data = await firestore.collection("roles").where("email", "==", user.email).get();
  if (data.empty) return { role: ROLES.NONE, email: user.email };
  return data.docs[0].data() as Value;
};

export const getAllRoles = async (): Promise<Value[]> => {
  const data = await firestore.collection("roles").get();
  return data.docs.map((doc) => doc.data() as Value);
};
