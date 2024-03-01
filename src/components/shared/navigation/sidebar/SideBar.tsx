"use client";

import { SidebarContext } from "@/context/SideBarContext";
import { Channel } from "@prisma/client";
import { useContext } from "react";
import NavigationHeader from "../NavigationHeader";
import MenuItem from "../userOptions/MenuItem";
import { MdOutlineHome, MdOutlineSubscriptions } from "react-icons/md";
import { useRouter } from "next/navigation";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import Avatar, { AvatarSize } from "../../Avatar";
interface ISideBar {
  subscribedChannels: any;
}
const SideBar = ({ subscribedChannels }: ISideBar) => {
  const router = useRouter();
  const currentUser = useContext(CurrentUserContext);
  const sidebar = useContext(SidebarContext);

  const handleitemClick = (onClick: () => void) => {
    onClick();
    sidebar?.onClose();
  };

  return (
    <>
      {sidebar?.isOpen ? (
        <div
          className={`bg-block bg-opacity-50 h-screen w-screen fixed z-30`}
          onClick={() => sidebar.onClose()}
        />
      ) : null}
      <div
        className={`fixed w-64 bg-stone-800 z-40 pt-3 px-6 flex flex-col h-screen overflow-scroll no-scrollbar ${
          sidebar?.isOpen ? "translate-x-0" : "-translate-x-full"
        } ease-in-out duration-300`}
      >
        <NavigationHeader />
        <div className="pt-4 pb-3 border-b border-b-neutral-500">
          <MenuItem
            label="Home"
            logo={<MdOutlineHome className="w-6 h-6 mr-4" />}
            rounded
            onClick={() => handleitemClick(() => router.push("/"))}
          />
          {currentUser ? (
            <MenuItem
              label="Subscription"
              logo={<MdOutlineSubscriptions className="w-6 h-6 mr-4" />}
              rounded
              onClick={() =>
                handleitemClick(() => router.push("/subscriptions"))
              }
            />
          ) : null}
        </div>
        {currentUser ? (
          <div className="pt-3">
            <h2 className="font-medium mb-2">Subscriptions</h2>
            {subscribedChannels &&
              subscribedChannels?.length > 0 &&
              subscribedChannels.map((subChannel: any) => (
                <MenuItem
                  key={subChannel.id}
                  label={subChannel.name}
                  logo={
                    <Avatar
                      imageSrc={subChannel.imageSrc}
                      size={AvatarSize.small}
                      className="mr-1"
                    />
                  }
                  rounded
                  onClick={() =>
                    handleitemClick(() =>
                      router.push(`/channel/${subChannel.id}`)
                    )
                  }
                />
              ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SideBar;
