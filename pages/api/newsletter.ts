import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../../interfaces";

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { query, method, body } = req;
  const id = parseInt(query.id as string, 10);
  const name = query.name as string;

  console.log(body);

  switch (method) {
    case "POST":
      // Update or create data in your database
      res.status(200).json({ id: 1 });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
