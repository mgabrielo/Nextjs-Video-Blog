"use client";

import { Channel, Comment as CommentType } from "@prisma/client";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

interface ICommentSection {
  videoId: string;
  comments: (CommentType & { channel: Channel })[];
}

const CommentSection = ({ videoId, comments }: ICommentSection) => {
  return (
    <div className="flex flex-col gap-4 w-full mb-4 my-3 ">
      <p>{comments.length} Comments</p>
      <CommentInput videoId={videoId} />
      <div className=" flex flex-col gap-4 mt-4">
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default CommentSection;
