import { Partner } from ".";

/**
 * DONUS
 */

export enum INTERACT_TYPES {
  GENERAL = "GENERAL",
  PARTICIPATION = "PARTICIPATION",
}

export enum INTERACT_CHANNELS {
  CAMPAIGN = "CAMPAIGN",
  FACEBOOK = "FACEBOOK",
  CHANNEL_TALK = "CHANNEL_TALK",
  PHONE = "PHONE",
  TWITTER = "TWITTER",
  CMS = "CMS",
  EVENT = "EVENT",
  EMAIL = "EMAIL",
  SMS = "SMS",
  ALIMTALK = "ALIMTALK",
  FRIEND_TALK = "FRIEND_TALK",
  CTI = "CTI",
  PAYMENT_PAGE = "PAYMENT_PAGE",
  MY_PAGE = "MY_PAGE",
}

export const DONUS_NEWSLETTER_ID = {
  [Partner.GREENKOREA]: {
    GREENHOPE: "223567",
    SOSSOSO: "70929",
    WILDLETTER: "243656",
    CLIMATELETTER: "220694",
    CIRCULARLETTER: "142812",
  },
  [Partner.SEOULKFEM]: {},
};

const NEWSLETTER_DONUS_REGISTER_CODE = {
  [Partner.GREENKOREA]: {
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].GREENHOPE]: "H1",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].SOSSOSO]: "H2",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].WILDLETTER]: "H3",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].CLIMATELETTER]: "H4",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].CIRCULARLETTER]: "H5",
  },
  [Partner.SEOULKFEM]: {},
};

const NEWSLETTER_DONUS_NEWSLETTER_TITLE = {
  [Partner.GREENKOREA]: {
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].GREENHOPE]: "녹색희망",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].SOSSOSO]: "소소사소",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].WILDLETTER]: "야생레터",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].CLIMATELETTER]: "기후레터",
    [DONUS_NEWSLETTER_ID[Partner.GREENKOREA].CIRCULARLETTER]: "순환레터",
  },
  [Partner.SEOULKFEM]: {},
};

const INTERACT_CHANNEL_CODE = {
  [Partner.GREENKOREA]: {
    [INTERACT_CHANNELS.CAMPAIGN]: "AC003",
    [INTERACT_CHANNELS.FACEBOOK]: "AC004",
    [INTERACT_CHANNELS.CHANNEL_TALK]: "AC005",
    [INTERACT_CHANNELS.PHONE]: "AC008",
    [INTERACT_CHANNELS.TWITTER]: "AC009",
    [INTERACT_CHANNELS.CMS]: "AC902",
    [INTERACT_CHANNELS.EVENT]: "AC903",
    [INTERACT_CHANNELS.EMAIL]: "AC904",
    [INTERACT_CHANNELS.SMS]: "AC905",
    [INTERACT_CHANNELS.ALIMTALK]: "AC906",
    [INTERACT_CHANNELS.FRIEND_TALK]: "AC907",
    [INTERACT_CHANNELS.CTI]: "AC909",
    [INTERACT_CHANNELS.PAYMENT_PAGE]: "AC910",
    [INTERACT_CHANNELS.MY_PAGE]: "AC911",
  },
};

const INTERACT_TYPE_CODE = {
  [Partner.GREENKOREA]: {
    [INTERACT_TYPES.GENERAL]: "GEN",
    [INTERACT_TYPES.PARTICIPATION]: "ENG",
  },
};

export function getDonusNewsletterCodeByPartner({
  newsletterId,
  partner,
}: {
  newsletterId: string;
  partner: Partner;
}) {
  return NEWSLETTER_DONUS_REGISTER_CODE[partner][newsletterId];
}

export function getDonusNewsletterTitleByPartner({
  newsletterId,
  partner,
}: {
  newsletterId: string;
  partner: Partner;
}) {
  return NEWSLETTER_DONUS_NEWSLETTER_TITLE[partner][newsletterId];
}

export function getDonusInteractChannelCode({
  interactChannel,
  partner,
}: {
  interactChannel: INTERACT_CHANNELS;
  partner: Partner;
}) {
  return INTERACT_CHANNEL_CODE[partner][interactChannel];
}

export function getDonusInteractTypeCode({
  interactType,
  partner,
}: {
  interactType: INTERACT_TYPES;
  partner: Partner;
}) {
  return INTERACT_TYPE_CODE[partner][interactType];
}

/**
 * STIBEE
 */
