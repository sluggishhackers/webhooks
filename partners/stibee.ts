import { Partner } from ".";

type NewsletterIds = {
  [key: string]: string;
};

type NewsletterIdsByPartners = {
  [key in Partner]: NewsletterIds;
};

export const newsletterIdsByPartners: NewsletterIdsByPartners = {
  [Partner.GREENKOREA]: {
    GREENHOPE: "223567",
    SOSSOSO: "70929",
    WILDLETTER: "243656",
    CLIMATELETTER: "220694",
    CIRCULARLETTER: "142812",
  },
  [Partner.SEOULKFEM]: {},
};
