import { VercelApiHandler } from "@vercel/node";

import { ROLES } from "../../constants/auth";
import { getUser } from "../../controllers/auth/user";
import getMain from "../../controllers/db/main";

const handler: VercelApiHandler = async (req, res) => {
  const { status, error, role } = await getUser(req);
  let { limit, offset } = req.query;
  if (error) {
    res.status(status).json({ error });
    return;
  }
  if (!(role === ROLES.ADMIN || role === ROLES.USER)) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  if (isNaN(Number(limit))) limit = "10";
  if (isNaN(Number(offset))) offset = "0";
  try {
    const data = await getMain(Number(limit), Number(offset));
    res.status(200).json(data);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export default handler;
