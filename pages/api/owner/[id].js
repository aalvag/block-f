import { getOwner, updateOwner } from "../../../prisma/Owner";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      try {
        const user = await getOwner(req.query.id);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const user = await updateOwner(req.query.id, req.body);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
