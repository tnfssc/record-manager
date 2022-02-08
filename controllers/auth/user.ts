import { VercelRequest } from "@vercel/node";
import firebase from "firebase-admin";

import { ROLES } from "../../constants/auth";
import { auth } from "../../lib/firebase";
import { getRole } from "./roles";
import { getIdToken } from "./token";

export const getUser = async (idTokenOrReq: string | VercelRequest) => {
  const idToken =
    typeof idTokenOrReq === "string" ? idTokenOrReq : getIdToken(idTokenOrReq);
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
