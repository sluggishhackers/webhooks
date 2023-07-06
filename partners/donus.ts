import { Partner } from "./index";
import {
  submitMember as _submitMember,
  submitInteract as _submitInteract,
} from "../utils/donus";
import formatInTimeZone from "date-fns-tz/formatInTimeZone";

type SUBMIT_MEMBER_PARAMS =
  | {
      partner: Partner.GREENKOREA;
      formKey: string;
      body: {
        name: string;
        email: string;
      };
    }
  | {
      partner: Partner.SEOULKFEM;
      formKey: string;
      body: {
        name: string;
        email: string;
      };
    };

type SUBMIT_INTERACT_PARAMS =
  | {
      partner: Partner.GREENKOREA;
      formKey: string;
      body: {
        memberIdx: string;
        interactTypeCode: string;
        interactCategoryCode: string;
        interactChannelCode: string;
        newsletterTitle: string;
        subscriberName: string;
      };
    }
  | {
      partner: Partner.SEOULKFEM;
      formKey: string;
      body: {
        memberIdx: string;
        interactTypeCode: string;
        interactCategoryCode: string;
        interactChannelCode: string;
        newsletterTitle: string;
        subscriberName: string;
      };
    };

export const submitMember = (params: SUBMIT_MEMBER_PARAMS) => {
  switch (params.partner) {
    case Partner.GREENKOREA:
      return _submitMember({
        formKey: params.formKey,
        updateOnMatch: false,
        members: [
          {
            ...params.body,
            memo: "Green Korea Newsletter",
          },
        ],
      });
    default:
      throw new Error("지원하지 않는 조직입니다.");
  }
};

export const submitInteract = async (params: SUBMIT_INTERACT_PARAMS) => {
  switch (params.partner) {
    case Partner.SEOULKFEM:
    case Partner.GREENKOREA: {
      return _submitInteract({
        formKey: params.formKey,
        memberIdx: params.body.memberIdx,
        interactTypeCode: params.body.interactTypeCode,
        interactDate: formatInTimeZone(new Date(), "Asia/Seoul", "yyyy-MM-dd"),
        interactCategoryCode: params.body.interactCategoryCode,
        interactChannelCode: params.body.interactChannelCode,
        title: `${params.body.newsletterTitle} 구독신청`,
        description: `구독자 이름 ${params.body.subscriberName}`,
      });
    }
  }
};
