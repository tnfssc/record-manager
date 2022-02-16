import { VercelApiHandler } from "@vercel/node";

import { ROLES } from "../../constants/auth";
import { getUser } from "../../controllers/auth/user";
import { getMainLabels } from "../../controllers/db/main";

const handler: VercelApiHandler = async (req, res) => {
  const { status, error, role } = await getUser(req);
  if (error) {
    res.status(status).json({ error });
    return;
  }
  if (!(role === ROLES.ADMIN || role === ROLES.USER)) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  try {
    const data = await getMainLabels();
    res.status(200).json(data);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export default handler;
