"use client";

import IconButton from "@/components/shared/IconButton";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineContentCopy } from "react-icons/md";
interface IVideoPreviewProps {
  videoId: string;
  videoSrc: string;
}
const VideoPreview = ({ videoId, videoSrc }: IVideoPreviewProps) => {
  const [videoLink, setVideoLink] = useState("");
  useEffect(() => {
    setVideoLink(`${window.location.host}/video/${videoId}`);
  }, [videoId]);

  const copyLink = () => {
    navigator.clipboard.writeText(videoLink).then(() => {
      toast.success("Link Copied Successfully");
    });
  };
  return (
    <div className="w-full md:w-255 flex flex-col overflow-hidden rounded-md">
      <iframe src={videoSrc} />
      <div className="bg-stone-800 p-4 flex  justify-between items-center">
        <div className="w-4/5 truncate">
          <div className="text-sm text-zinc-400">Video Link</div>
          <a href={videoSrc} className="text-sky-500">
            {videoLink}
          </a>
        </div>
        <IconButton onClick={copyLink}>
          <MdOutlineContentCopy className="cursor pointer h-6 w-6" />
        </IconButton>
      </div>
    </div>
  );
};

export default VideoPreview;
