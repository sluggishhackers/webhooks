import type { NextApiRequest, NextApiResponse } from "next";
import { formatInTimeZone } from "date-fns-tz";
import { Webhook as StibeeWebhook } from "../../../../utils/stibee";
import {
  INTERACT_CHANNEL_CODE,
  INTERACT_TYPE_CODE,
  submitInteract,
  submitMember,
} from "../../../../utils/donus";

const { GREENKOREA_DONUS_FORM_KEY, API_TOKEN } = process.env;

enum GREENPEACE_NEWSLETTER_ID {
  GREENHOPE = "223567",
  SOSSOSO = "70929",
  WILDLETTER = "243656",
  CLIMATELETTER = "220694",
  CIRCULARLETTER = "142812",
}

const GREENPEACE_NEWSLETTER_DONUS_REGISTER_CODE: {
  [key in GREENPEACE_NEWSLETTER_ID]: "H1" | "H2" | "H3" | "H4" | "H5";
} = {
  [GREENPEACE_NEWSLETTER_ID.GREENHOPE]: "H1",
  [GREENPEACE_NEWSLETTER_ID.SOSSOSO]: "H2",
  [GREENPEACE_NEWSLETTER_ID.WILDLETTER]: "H3",
  [GREENPEACE_NEWSLETTER_ID.CLIMATELETTER]: "H4",
  [GREENPEACE_NEWSLETTER_ID.CIRCULARLETTER]: "H5",
};

const GREENPEACE_NEWSLETTER_TITLE: {
  [key in GREENPEACE_NEWSLETTER_ID]: string;
} = {
  [GREENPEACE_NEWSLETTER_ID.GREENHOPE]: "녹색희망",
  [GREENPEACE_NEWSLETTER_ID.SOSSOSO]: "소소사소",
  [GREENPEACE_NEWSLETTER_ID.WILDLETTER]: "야생레터",
  [GREENPEACE_NEWSLETTER_ID.CLIMATELETTER]: "기후레터",
  [GREENPEACE_NEWSLETTER_ID.CIRCULARLETTER]: "순환레터",
};

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, token } = req.query as {
    type: GREENPEACE_NEWSLETTER_ID;
    token: string;
  };

  const body: StibeeWebhook = req.body;
  const method = req.method;
  const formKey = GREENKOREA_DONUS_FORM_KEY;

  const newsletterTitle =
    GREENPEACE_NEWSLETTER_TITLE[type as GREENPEACE_NEWSLETTER_ID];
  const newsletterCode =
    GREENPEACE_NEWSLETTER_DONUS_REGISTER_CODE[type as GREENPEACE_NEWSLETTER_ID];

  if (token !== API_TOKEN) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!(newsletterCode && newsletterTitle)) {
    res.status(400).json({ message: "Invalid Newsletter Type" });
    return;
  }

  // const body: StibeeWebhook = req.body;
  // const method = req.method;

  // /**
  //  * body
  //  *
  //  * 구독완료
  //  * {
  //  * id: '70929',
  //  * action: 'SUBSCRIBED',
  //  * eventOccuredBy: 'SUBSCRIBER',
  //  * actionType: 'SUBSCRIBER',
  //  * subscribers: [{
  //  * '$createdTime': '2023-02-25T15:22:08+09:00',
  //  * '$status': 'S',
  //  * '$type': 'S',
  //  * email: 'the6thm0nth@outlook.com',
  //  * name: '장승훈',
  //  * status: 'R'
  //  * }]}
  //  *
  //  * 신청하기
  //  * {
  //  * id: '70929',
  //  * action: 'PURGED',
  //  * eventOccuredBy: 'MANUAL',
  //  * actionType: 'MANUAL',
  //  * subscribers: [ { email: 'hoony@chainlogis.co.kr' } ]}
  //  */

  // if (body.subscribers[0].email !== "hoonyland.newsletter@gmail.com") {
  //   res.status(200).json({});
  // }

  switch (method) {
    case "POST":
      const { action, subscribers } = body;
      switch (action) {
        case "SUBSCRIBED": {
          const result = await submitMember({
            formKey,
            updateOnMatch: false,
            members: [
              {
                name: subscribers[0].name,
                email: subscribers[0].email,
                memo: "Green Korea Newsletter",
              },
            ],
          });

          const member = result.data.members[0];

          await submitInteract({
            formKey: GREENKOREA_DONUS_FORM_KEY,
            memberIdx: member.memberIdx,
            interactTypeCode: INTERACT_TYPE_CODE.PARTICIPATION,
            interactDate: formatInTimeZone(
              new Date(),
              "Asia/Seoul",
              "YYYY-MM-DD"
            ),
            interactCategoryCode: newsletterCode,
            interactChannelCode: INTERACT_CHANNEL_CODE.EMAIL,
            title: `${newsletterTitle} 구독신청`,
            description: `구독자 이름 ${subscribers[0].name}`,
          });

          break;
        }
        case "UNSUBSCRIBED": {
          const result = await submitMember({
            formKey,
            updateOnMatch: false,
            members: [
              {
                name: subscribers[0].name,
                email: subscribers[0].email,
                memo: "Green Korea Newsletter",
              },
            ],
          });

          const member = result.data.members[0];

          await submitInteract({
            formKey: GREENKOREA_DONUS_FORM_KEY,
            memberIdx: member.memberIdx,
            interactTypeCode: INTERACT_TYPE_CODE.PARTICIPATION,
            interactDate: formatInTimeZone(
              new Date(),
              "Asia/Seoul",
              "YYYY-MM-DD"
            ),
            interactCategoryCode: newsletterCode,
            interactChannelCode: INTERACT_CHANNEL_CODE.EMAIL,
            title: `${newsletterTitle} 구독취소`,
            description: `구독자 이름 ${subscribers[0].name}\n구독취소 사유: ${
              subscribers[0].$unsubscribe_reason || ""
            }\n구독취소 주체: ${body.eventOccuredBy}`,
          });

          break;
        }
      }

      res.status(200).json({ message: "SUCCESS!" });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
