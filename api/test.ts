import { VercelApiHandler } from "@vercel/node";

const handler: VercelApiHandler = async (req, res) => {
  res.status(200).json({ message: "The API is working!" });
};

export default handler;
