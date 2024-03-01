"use client";

import Avatar from "@/components/shared/Avatar";
import Button from "@/components/shared/Button";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { useComment } from "@/hooks/useComment";
import React, { useContext } from "react";
interface ICommentInput {
  videoId: string;
}
const CommentInput = ({ videoId }: ICommentInput) => {
  const currentChannel = useContext(CurrentChannelContext);
  const { text, setText, submitComment } = useComment({ videoId });

  return (
    <div className="flex gap-2 items-start">
      <Avatar imageSrc={currentChannel?.imageSrc || null} />
      <div className="flex flex-col w-full">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Comment...."
          className="bg-transparent outline-none border-b border-b-neutral-500 focus:border-b-2 focus:border-b-neutral-300 pb-1"
        />
        {text ? (
          <div className="flex justify-end gap-4 mt-2">
            <Button type="secondary" onClick={() => setText("")}>
              Cancel
            </Button>
            <Button type="primary" onClick={submitComment}>
              Submit
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentInput;
