import axios from "axios";

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

export const assignEmailToGroup = ({
  apiKey,
  groupId,
  listId,
  email,
}: {
  apiKey: string;
  groupId: string;
  listId: string;
  email: string;
}) => {
  return axios.post(
    `https://api.stibee.com/v1/lists/${listId}/groups/${groupId}/subscribers/assign`,
    [email],
    {
      headers: {
        AccessToken: apiKey,
      },
    }
  );
};
