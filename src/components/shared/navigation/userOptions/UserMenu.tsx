"use client";

import { FC, useContext } from "react";
import MenuItem from "./MenuItem";
import { PiSignOut, PiUserSquareFill, PiYoutubeLogo } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { CreateChannelModalContext } from "@/context/ChannelModalContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { useRouter } from "next/navigation";
interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: FC<UserMenuProps> = ({ onClose }) => {
  const createChannelModal = useContext(CreateChannelModalContext);
  const currentChannels = useContext(CurrentChannelContext);
  const router = useRouter();
  function handleChannelAccess() {
    if (!currentChannels) {
      createChannelModal?.onOpen();
      onClose();
    } else {
      router.push(`/channel/${currentChannels.id}`);
    }
  }
  return (
    <>
      <div className="min-h-screen w-screen fixed z-30" onClick={onClose} />
      <div className="absolute rounded-md bg-gray-700 w-72 right-2 top-16 text-sm flex flex-col overflow-hidden z-40">
        <MenuItem
          label="Your Channel"
          logo={<PiUserSquareFill className="w-7 h-7" />}
          onClick={() => handleChannelAccess()}
        />
        <MenuItem
          label="Your Streaming Studio"
          logo={<PiYoutubeLogo className="w-7 h-7" />}
          onClick={() => {
            if (!currentChannels) {
              createChannelModal?.onOpen();
            } else {
              router.push("/studio");
            }
            onClose();
          }}
        />
        <MenuItem
          label="Sign Out"
          logo={<PiSignOut className="w-7 h-7" />}
          onClick={() => {
            signOut();
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default UserMenu;
