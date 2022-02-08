import { VercelApiHandler } from "@vercel/node";

import { ROLES } from "../../constants/auth";
import { getAllRoles } from "../../controllers/auth/roles";
import { getUser } from "../../controllers/auth/user";
import { auth } from "../../lib/firebase";

const handler: VercelApiHandler = async (req, res) => {
  const { status, error, role } = await getUser(req);
  if (error) {
    res.status(status).json({ error });
    return;
  }
  if (role !== ROLES.ADMIN) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  const { users } = await auth.listUsers();
  const allRoles = await getAllRoles();
  const result = users.map((user) => ({
    email: user.email,
    displayName: user.displayName,
    role: allRoles.find((role) => role.email === user.email)?.role ?? ROLES.NONE,
  }));
  res.status(status).json(result);
};

export default handler;
