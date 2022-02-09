import { VercelApiHandler } from "@vercel/node";

import db from "../../controllers/db";

const handler: VercelApiHandler = async (req, res) => {
  console.log(await db("persons").select("*"));
  res.status(200).json({ message: "The API is working!" });
};

export default handler;
