import firebase from "firebase-admin";

import { ROLES } from "../../constants/auth";
import { auth } from "../../lib/firebase";
import { getRole } from "./roles";

export const getUser = async (idToken: string) => {
  let user: firebase.auth.DecodedIdToken | undefined;
  let role: ROLES | undefined;
  try {
    user = await auth.verifyIdToken(idToken);
    role = (await getRole(user)).role;
  } catch (error) {
    return {
      error: "Unauthorized",
      status: 401,
    };
  }
  return {
    user,
    role,
    status: 200,
  };
};
