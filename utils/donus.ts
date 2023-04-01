import axios from "axios";

export enum INTERACT_CHANNEL_CODE {
  CAMPAIGN = "A003",
  FACEBOOK = "A004",
  CHANNEL_TALK = "A005",
  PHONE = "A008",
  TWITTER = "A009",
  CMS = "A902",
  EVENT = "A903",
  EMAIL = "A904",
  SMS = "A905",
  ALIMTALK = "A906",
  FRIEND_TALK = "A907",
  CTI = "A909",
  PAYMENT_PAGE = "A910",
  MY_PAGE = "A911",
}

export enum INTERACT_TYPE_CODE {
  GENERAL = "GEN",
  PARTICIPATION = "MSG",
}

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
  interactTypeCode: INTERACT_TYPE_CODE;
  interactDate: string;
  interactCategoryCode: string;
  interactChannelCode: INTERACT_CHANNEL_CODE;
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
