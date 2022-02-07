import { VercelApiHandler } from "@vercel/node";
import firebase from "firebase-admin";

import { auth, firestore } from "../../lib/firebase";

const handler: VercelApiHandler = async (req, res) => {
  let user: firebase.auth.DecodedIdToken | undefined;
  try {
    user = await auth.verifyIdToken(req.headers.authorization.split(" ")[1]);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
  const data = await firestore.collection("roles").where("email", "==", user.email).get();
  if (data.empty) return res.status(200).send({ role: "none" });
  const role = data.docs[0].data();
  res.status(200).json(role);
};

export default handler;
