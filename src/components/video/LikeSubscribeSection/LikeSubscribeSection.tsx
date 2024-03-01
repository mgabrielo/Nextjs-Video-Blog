"use client";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { Channel, Video } from "@prisma/client";
import React, { useContext, useEffect } from "react";
import LikeDislikeButton from "./LikeDislikeButton";
import Link from "next/link";
import Avatar, { AvatarSize } from "@/components/shared/Avatar";
import { compactNumberFormat } from "@/utils/numUtils";
import SubscribeButton from "@/components/shared/SubscribeButton";
import Button from "@/components/shared/Button";
interface ILikeSubscribeSection {
  channel: Channel;
  video: Video;
}
const LikeSubscribeSection = ({ channel, video }: ILikeSubscribeSection) => {
  const currentUser = useContext(CurrentUserContext);
  const numOfSubs = compactNumberFormat(channel.subscriberCount);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Link href={`/channel/${channel.id}`}>
          <Avatar size={AvatarSize.medium} imageSrc={channel.imageSrc} />
        </Link>
        <div className="flex flex-col items-center justify-between mr-2 ">
          <Link href={`/channel/${channel.id}`}>
            <h2 className="text-lg">{channel.name}</h2>
          </Link>
          <p className="text-sm text-neutral-400">{`${numOfSubs} ${
            channel.subscriberCount == 0 || channel.subscriberCount > 1
              ? "subscibers"
              : "subscriber"
          }`}</p>
        </div>
        {channel.userId === currentUser?.id ? (
          <Link href={"/studio"}>
            <Button type="rounded-dark" className="capitalize text-sm">
              Manage Videos
            </Button>
          </Link>
        ) : (
          <SubscribeButton id={channel.id} />
        )}
      </div>
      <LikeDislikeButton video={video} />
    </div>
  );
};

export default LikeSubscribeSection;
