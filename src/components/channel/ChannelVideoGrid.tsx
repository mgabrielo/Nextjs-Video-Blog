"use client";
import { Video } from "@prisma/client";
import React from "react";
import VideoCard from "../shared/VideoCard";
interface IChannelGrid {
  videos: Video[];
}

const ChannelVideoGrid = ({ videos }: IChannelGrid) => {
  return (
    <div className="mx-auto sm:mx-24 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-center">
      {videos?.length > 0 &&
        videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </div>
  );
};

export default ChannelVideoGrid;
