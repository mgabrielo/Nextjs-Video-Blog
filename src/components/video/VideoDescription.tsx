"use client";

import { compactNumberFormat } from "@/utils/numUtils";
import { Video } from "@prisma/client";
import { useState } from "react";
import dayjs from "@/vendor/dayjs";
interface IVideoDesc {
  video: Video;
}
const Description = ({ video }: IVideoDesc) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`bg-neutral-800 rounded-xl p-3 overflow-hidden ${
        expanded ? "h-fit" : "line-clamp-2 max-h-28"
      }`}
    >
      <div className={`flex gap-2 text-neutral-200 font-medium`}>
        <p>{compactNumberFormat(video.viewCount)} views</p>
        <p>{dayjs(video.createdAt).format("MMM D, YYYY")}</p>
      </div>
      <div className={expanded ? "" : "line-clamp-2"}>
        <div className="whitespace-pre-line">
          {video.description.split("\n").map((line, index) => {
            if (line === "") {
              return <br key={index} />;
            } else {
              return <p key={index}>{line}</p>;
            }
          })}
        </div>
      </div>
      <p
        onClick={() => setExpanded((prev) => !prev)}
        className={`cursor-pointer ${expanded ? "mt-2" : ""}`}
      >
        {expanded ? "Show Less" : "...more"}
      </p>
    </div>
  );
};

export default Description;
