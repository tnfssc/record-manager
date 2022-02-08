import { VercelApiHandler } from "@vercel/node";

import { ROLES } from "../../constants/auth";
import { User } from "../../constants/users";
import { getUser } from "../../controllers/auth/user";
import { firestore } from "../../lib/firebase";

const handler: VercelApiHandler = async (req, res) => {
  const { status, error, role } = await getUser(req);
  const changes = req.body as Omit<User, "displayName">[];
  if (error) {
    res.status(status).json({ error });
    return;
  }
  if (role !== ROLES.ADMIN) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  const batch = firestore.batch();
  for (const change of changes) {
    const users = await firestore
      .collection("roles")
      .where("email", "==", change.email)
      .get();
    if (users.empty) {
      firestore.collection("roles").add(change);
    } else
      users.forEach((doc) => {
        batch.update(doc.ref, {
          ...change,
          role: change.role ?? ROLES.NONE,
        });
      });
  }
  try {
    await batch.commit();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
