"use client";

import Avatar from "@/components/shared/Avatar";
import { Channel, Comment as CommentType } from "@prisma/client";
import React from "react";
import dayjs from "@/vendor/dayjs";

interface IComment {
  comment: CommentType & { channel: Channel };
}
const Comment = ({ comment }: IComment) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar imageSrc={comment.channel.imageSrc} />
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center text-sm">
          <p className="font-medium">@{comment.channel.handle}</p>
          <p className="font-light text-neutral-400">
            {dayjs(comment.createdAt).fromNow()}
          </p>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
