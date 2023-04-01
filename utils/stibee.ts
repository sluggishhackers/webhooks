type Subscriber = {
  $createdTime: string;
  $status: "S";
  $type: "S";
  $unsubscribe_reason?: string;
  email: string;
  name: string;
  status: "R";
};

export type Webhook = {
  id: string;
  action: "SUBSCRIBED" | "PURGED" | "UNSUBSCRIBED";
  eventOccuredBy: "SUBSCRIBER" | "MANUAL";
  actionType: "SUBSCRIBER" | "MANUAL";
  subscribers: Subscriber[];
};
