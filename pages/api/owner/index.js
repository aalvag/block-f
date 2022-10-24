import { createOwner, getOwners } from "../../../prisma/Owner";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      try {
        const users = await getOwners();
        res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const user = await createOwner(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
