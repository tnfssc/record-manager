import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_ADMIN_CLIENTEMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATEKEY!.replace(/\\n/g, "\n"),
    projectId: process.env.FIREBASE_ADMIN_PROJECTID!,
  }),
});
export default admin;

export const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

export const auth = admin.auth();
