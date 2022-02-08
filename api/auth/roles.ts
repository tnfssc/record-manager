import { VercelApiHandler } from "@vercel/node";

import { getIdToken } from "../../controllers/auth/token";
import { getUser } from "../../controllers/auth/user";

const handler: VercelApiHandler = async (req, res) => {
  const idToken = getIdToken(req);
  const { status, error, role } = await getUser(idToken);
  if (error) {
    res.status(status).json({ error });
    return;
  }
  res.status(status).json(role);
};

export default handler;
