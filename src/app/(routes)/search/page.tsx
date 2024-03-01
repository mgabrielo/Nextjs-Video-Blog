"use client";
import VideoCard from "@/components/shared/VideoCard";
import { Channel, Video } from "@prisma/client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const params = useSearchParams();
  const searchQuery = params.get("searchQuery");
  const [videos, setVideos] = useState<(Video & { channel: Channel })[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api/videos", { params: { searchQuery } })
        .then((res) => {
          setVideos(res.data as unknown as (Video & { channel: Channel })[]);
        })
        .catch(() => {
          toast.error("could not fetch data");
        });
    };
    fetchData();
  }, [searchQuery]);
  return (
    <div className="w-4/5  mx-auto flex flex-col gap-4 items-center pb-4">
      {videos.length > 0
        ? videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isVertical={false}
              channel={video.channel}
              channelAvatar
              includeDescription
            />
          ))
        : "No videos Found"}
    </div>
  );
};

export default page;
