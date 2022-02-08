import { VercelApiHandler } from "@vercel/node";

import { getUser } from "../../controllers/auth/user";

const handler: VercelApiHandler = async (req, res) => {
  const { status, error, role } = await getUser(req);
  if (error) {
    res.status(status).json({ error });
    return;
  }
  res.status(status).json({ role });
};

export default handler;
