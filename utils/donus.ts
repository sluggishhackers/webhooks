import axios from "axios";

// export enum INTERACT_CHANNEL_CODE {
//   CAMPAIGN = "AC003",
//   FACEBOOK = "AC004",
//   CHANNEL_TALK = "AC005",
//   PHONE = "AC008",
//   TWITTER = "AC009",
//   CMS = "AC902",
//   EVENT = "AC903",
//   EMAIL = "AC904",
//   SMS = "AC905",
//   ALIMTALK = "AC906",
//   FRIEND_TALK = "AC907",
//   CTI = "AC909",
//   PAYMENT_PAGE = "AC910",
//   MY_PAGE = "AC911",
// }

// export enum INTERACT_TYPE_CODE {
//   GENERAL = "GEN",
//   PARTICIPATION = "ENG",
// }

type Member = {
  name: string;
  email: string;
  memo?: string;
};

export const submitMember = ({
  formKey,
  updateOnMatch,
  members,
}: {
  formKey: string;
  updateOnMatch: boolean;
  members: Member[];
}) => {
  return axios.post(
    `https://cloud.donus.org/api/forms/v0/submit/members/${formKey}`,
    {
      updateOnMatch,
      members,
    }
  );
};

export const submitInteract = async ({
  formKey,
  memberIdx,
  interactTypeCode,
  interactDate,
  interactCategoryCode,
  interactChannelCode,
  title,
  description,
}: {
  formKey: string;
  memberIdx: string;
  interactTypeCode: string;
  interactDate: string;
  interactCategoryCode: string;
  interactChannelCode: string;
  title: string;
  description: string;
}) => {
  return axios.post(
    `https://cloud.donus.org/api/forms/v0/submit/interact/${formKey}`,
    {
      memberIdx,
      interactTypeCode,
      interactDate,
      interactCategoryCode,
      interactChannelCode,
      title,
      description,
    }
  );
};
