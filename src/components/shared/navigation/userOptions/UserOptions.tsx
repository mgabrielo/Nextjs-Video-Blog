"use client";

import { useContext, useState } from "react";
import SignInButton from "./SignInButton";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import IconButton from "../../IconButton";
import { MdOutlinePerson, MdOutlineVideoCall } from "react-icons/md";
import Avatar, { AvatarSize } from "../../Avatar";
import UserMenu from "./UserMenu";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CreateChannelModalContext } from "@/context/ChannelModalContext";
import { useRouter } from "next/navigation";
const UserOptions = () => {
  const currentUser = useContext(CurrentUserContext);
  const currentChannels = useContext(CurrentChannelContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const createChannelModal = useContext(CreateChannelModalContext);
  const router = useRouter();
  const handleUploadClick = () => {
    if (!currentChannels) {
      createChannelModal?.onOpen();
    } else {
      router.push("studio/upload");
    }
  };
  return currentUser ? (
    <>
      <div className="flex flex-row items-center mr-4 gap-2">
        <IconButton onClick={handleUploadClick}>
          <MdOutlineVideoCall className="h-7 w-7" />
        </IconButton>
        <Avatar
          size={AvatarSize.small}
          imageSrc={currentUser?.image}
          onClick={() => setMenuOpen(true)}
        />
      </div>
      {menuOpen ? <UserMenu onClose={() => setMenuOpen(false)} /> : null}
    </>
  ) : (
    <SignInButton />
  );
};

export default UserOptions;
