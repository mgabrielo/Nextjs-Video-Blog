"use client";
import { LikeDislikeStatus, useLikeDislike } from "@/hooks/useLikeDislike";
import { compactNumberFormat } from "@/utils/numUtils";
import { Video } from "@prisma/client";
import React from "react";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";

interface ILikeDislikeButton {
  video: Video;
}

const LikeDislikeButton = ({ video }: ILikeDislikeButton) => {
  const { likeDislikeStatus, toggleLikeDislike } = useLikeDislike({
    videoId: video.id,
  });

  return (
    <div className="flex items-center gap-1 bg-neutral-800 rounded-full px-3 py-2 text-white font-medium">
      <button
        className="pr-3 border-r-2 border-neutral-600 flex items-center gap-3"
        onClick={() => toggleLikeDislike("like")}
      >
        {likeDislikeStatus === LikeDislikeStatus.Liked ? (
          <MdThumbUp className="w-6 h-6" />
        ) : (
          <MdOutlineThumbUp className="w-6 h-6" />
        )}
        <p>{compactNumberFormat(video.likeCount)}</p>
      </button>
      <button
        className="pl-3 flex items-center gap-3"
        onClick={() => toggleLikeDislike("dislike")}
      >
        {likeDislikeStatus === LikeDislikeStatus.Disliked ? (
          <MdThumbDown className="w-6 h-6" />
        ) : (
          <MdOutlineThumbDown className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default LikeDislikeButton;
