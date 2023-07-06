import { Partner } from ".";

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
