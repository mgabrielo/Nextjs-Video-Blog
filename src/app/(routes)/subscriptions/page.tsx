import getSubscriptionVideos from "@/actions/getSubscriptionsVideos";
import SubscriptionList from "@/components/subscriptions/SubscriptionList";
import React from "react";

const page = async () => {
  const subscriptionVideos = await getSubscriptionVideos();
  return subscriptionVideos.length > 0 ? (
    <SubscriptionList videos={subscriptionVideos} />
  ) : (
    "No Videos"
  );
};

export default page;
