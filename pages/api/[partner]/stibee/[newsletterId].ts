import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook as StibeeWebhook } from "@/utils/stibee";
import { Partner } from "@/partners";
import { submitMember, submitInteract } from "@/partners/donus";
import {
  INTERACT_CHANNELS,
  INTERACT_TYPES,
  getDonusInteractChannelCode,
  getDonusInteractTypeCode,
  getDonusNewsletterCodeByPartner,
  getDonusNewsletterTitleByPartner,
} from "@/partners/constants";

const { GREENKOREA_DONUS_FORM_KEY, API_TOKEN } = process.env;

function getDonusFormKeyByPartner(partner: Partner): string {
  switch (partner) {
    case Partner.GREENKOREA:
      return GREENKOREA_DONUS_FORM_KEY;
    default:
      throw new Error("지원하지 않는 조직입니다.");
  }
}

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { partner, newsletterId, token } = req.query as {
    partner: Partner;
    newsletterId: string;
    token: string;
  };

  const body: StibeeWebhook = req.body;
  const method = req.method;

  const newsletterTitle = getDonusNewsletterTitleByPartner({
    newsletterId,
    partner,
  });
  const newsletterCode = getDonusNewsletterCodeByPartner({
    newsletterId,
    partner,
  });

  if (token !== API_TOKEN) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!(newsletterCode && newsletterTitle)) {
    res.status(400).json({ message: "Invalid Newsletter Type" });
    return;
  }

  const formKey = getDonusFormKeyByPartner(partner);

  switch (method) {
    case "POST":
      const { action, subscribers } = body;
      switch (action) {
        case "SUBSCRIBED": {
          const result = await submitMember({
            partner,
            formKey,
            body: {
              name: subscribers[0].name,
              email: subscribers[0].email,
            },
          });

          const member = result.data.members[0];

          await submitInteract({
            partner,
            formKey,
            body: {
              memberIdx: member.memberIdx,
              interactTypeCode: getDonusInteractTypeCode({
                partner,
                interactType: INTERACT_TYPES.PARTICIPATION,
              }),
              interactCategoryCode: newsletterCode,
              interactChannelCode: getDonusInteractChannelCode({
                partner,
                interactChannel: INTERACT_CHANNELS.EMAIL,
              }),
              newsletterTitle: newsletterTitle,
              subscriberName: subscribers[0].name,
            },
          });

          break;
        }
        // case "UNSUBSCRIBED": {
        //   console.log(action);
        //   console.log(subscribers);
        //   const result = await submitMember({
        //     formKey,
        //     updateOnMatch: false,
        //     members: [
        //       {
        //         name: subscribers[0].name,
        //         email: subscribers[0].email,
        //         memo: "Green Korea Newsletter",
        //       },
        //     ],
        //   });

        //   const member = result.data.members[0];

        //   await submitInteract({
        //     formKey: GREENKOREA_DONUS_FORM_KEY,
        //     memberIdx: member.memberIdx,
        //     interactTypeCode: INTERACT_TYPE_CODE.PARTICIPATION,
        //     interactDate: formatInTimeZone(
        //       new Date(),
        //       "Asia/Seoul",
        //       "yyyy-MM-dd"
        //     ),
        //     interactCategoryCode: newsletterCode,
        //     interactChannelCode: INTERACT_CHANNEL_CODE.EMAIL,
        //     title: `${newsletterTitle} 구독취소`,
        //     description: `구독자 이름 ${subscribers[0].name}\n구독취소 사유: ${
        //       subscribers[0].$unsubscribe_reason || ""
        //     }\n구독취소 주체: ${body.eventOccuredBy}`,
        //   });

        //   break;
        // }
      }

      res.status(200).json({ message: "SUCCESS!" });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
