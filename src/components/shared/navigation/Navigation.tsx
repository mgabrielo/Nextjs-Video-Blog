import React from "react";
import NavBar from "./NavBar";
import SideBar from "./sidebar/SideBar";
import { Channel } from "@prisma/client";

interface INavSubscription {
  subscriptions: Channel[];
}
const Navigation = ({ subscriptions }: INavSubscription) => {
  return (
    <>
      <SideBar subscribedChannels={subscriptions} />
      <NavBar />
    </>
  );
};

export default Navigation;
