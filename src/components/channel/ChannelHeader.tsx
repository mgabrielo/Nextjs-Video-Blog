"use client";

import { CurrentUserContext } from "@/context/CurrentUserContext";
import { Channel } from "@prisma/client";
import { useContext } from "react";
import Avatar, { AvatarSize } from "../shared/Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import Link from "next/link";
import Button from "../shared/Button";
import SubscribeButton from "../shared/SubscribeButton";

interface IChannelHeader {
  channel: Channel;
  videoCount: number;
}

const ChannelHeader = ({ channel, videoCount }: IChannelHeader) => {
  const currentUser = useContext(CurrentUserContext);
  const numOfSubs = compactNumberFormat(channel.subscriberCount);

  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-0 px-24 py-6 justify-between items-center">
      <div className="flex flex-col md:flex-row gap-0  md:gap-4 items-center md:items-start">
        <Avatar size={AvatarSize.large} imageSrc={channel.imageSrc} />
        <div className="flex flex-col pt-4 gap-4 md:gap-0">
          <h1 className="text-xl text-center md:text-start">{channel.name}</h1>
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-stone-400">
            <p className="font_medium">@{channel.handle}</p>
            <p>
              {`${numOfSubs} ${
                channel.subscriberCount == 0 || channel.subscriberCount > 1
                  ? "subscibers"
                  : "subscriber"
              }`}
            </p>
            <p>{compactNumberFormat(videoCount)} Videos</p>
          </div>
        </div>
      </div>
      {channel.userId !== currentUser?.id ? (
        <Link href={"/studio"}>
          <Button type="rounded-dark" className="capitalize">
            Manage Videos
          </Button>
        </Link>
      ) : (
        <>{channel.id !== undefined && <SubscribeButton id={channel.id} />}</>
      )}
    </div>
  );
};

export default ChannelHeader;
