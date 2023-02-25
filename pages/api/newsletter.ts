import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const { GREENKOREA_DONUS_FORM_KEY } = process.env;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  /**
   * body
   *
   * 구독완료
   * {
   * id: '70929',
   * action: 'SUBSCRIBED',
   * eventOccuredBy: 'SUBSCRIBER',
   * actionType: 'SUBSCRIBER',
   * subscribers: [{
   * '$createdTime': '2023-02-25T15:22:08+09:00',
   * '$status': 'S',
   * '$type': 'S',
   * email: 'the6thm0nth@outlook.com',
   * name: '장승훈',
   * status: 'R'
   * }]}
   *
   * 신청하기
   * {
   * id: '70929',
   * action: 'PURGED',
   * eventOccuredBy: 'MANUAL',
   * actionType: 'MANUAL',
   * subscribers: [ { email: 'hoony@chainlogis.co.kr' } ]}
   */

  if (body.subscribers[0].email !== "hoonyland.newsletter@gmail.com") {
    res.status(200).json({});
  }

  switch (method) {
    case "POST":
      const { action, subscribers } = req.body;
      switch (action) {
        case "SUBSCRIBED": {
          const result = await axios.post(
            `https://cloud.donus.org/api/forms/v0/submit/members/${GREENKOREA_DONUS_FORM_KEY}`,
            {
              updateOnMatch: false,
              members: [
                {
                  name: subscribers[0].name,
                  //   cellphone: subscribers[0].mobile,
                  email: subscribers[0].email,
                  memo: "Green Korea Newsletter",
                },
              ],
            }
          );

          const member = result.data.members[0];

          const result2 = await axios.post(
            `https://cloud.donus.org/api/forms/v0/submit/interact/${GREENKOREA_DONUS_FORM_KEY}`,
            {
              memberIdx: member.memberIdx,
              interactTypeCode: "GEN",
              interactDate: "2023-02-25",
              interactCategoryCode: "E4",
              interactChannelCode: "AC903",
              title: "테스트!",
              description: "활동기록 내용",
            }
          );

          console.log(result2);

          break;
        }
        case "PURGED": {
          //   const result = await axios.post(
          //     `https://cloud.donus.org/api/forms/v0/submit/members/${GREENKOREA_DONUS_FORM_KEY}`,
          //     {
          //       body: {
          //         members: [
          //           {
          //             email: subscribers[0].email,
          //             memo: "Green Korea Newsletter",
          //           },
          //         ],
          //       },
          //     }
          //   );

          //   console.log(result);

          break;
        }
      }

      res.status(200).json({ id: 1 });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
