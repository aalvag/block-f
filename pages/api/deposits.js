import { getOwners } from "../../prisma/Owner";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await getOwners();

        const totalDeposits = users.reduce((acc, user) => {
          return acc + user.amount;
        }, 0);

        const totalPaidUsers = users.filter((user) => user.amount > 0).length;

        res.status(200).json({ totalPaidUsers, totalDeposits });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
