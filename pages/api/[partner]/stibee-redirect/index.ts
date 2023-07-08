import type { NextApiRequest, NextApiResponse } from "next";
import { assignEmailToGroup } from "@/utils/stibee";
import { Partner } from "@/partners";
import { getStibeeApiKey } from "@/partners/constants";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { partner, email, listId, groupId, redirectTo } = req.query as {
    partner: Partner;
    type: string;
    listId: string;
    groupId: string;
    email: string;
    redirectTo: string;
  };

  const method = req.method;

  switch (method) {
    case "GET": {
      await assignEmailToGroup({
        apiKey: getStibeeApiKey({ partner }),
        groupId,
        listId,
        email,
      });

      res.redirect(redirectTo);
      break;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
