import { VercelRequest } from "@vercel/node";

export const getIdToken = (req: VercelRequest) => req.headers.authorization.split(" ")[1];
