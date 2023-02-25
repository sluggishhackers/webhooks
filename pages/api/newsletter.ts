import type { NextApiRequest, NextApiResponse } from "next";

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

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
