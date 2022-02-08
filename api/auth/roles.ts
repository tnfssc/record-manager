import { VercelApiHandler } from "@vercel/node";

import { getUser } from "../../controllers/auth/user";

const handler: VercelApiHandler = async (req, res) => {
  const idToken = req.headers.authorization.split(" ")[1];
  const { status, error, role } = await getUser(idToken);
  if (error) {
    res.status(status).json({ error });
    return;
  }
  res.status(status).json(role);
};

export default handler;
