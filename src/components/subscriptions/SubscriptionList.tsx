"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Channel, Video } from "@prisma/client";
import VideoCard from "../shared/VideoCard";

interface ISubscriptionList {
  videos: (Video & { channel: Channel })[];
}
const SubscriptionList = ({ videos }: ISubscriptionList) => {
  useProtectedRoute({ checkChannel: false });
  return (
    <div className="mx-12 sm:mx-24 py-8 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {videos.length > 0 &&
        videos.map((video) => (
          <VideoCard key={video.id} video={video} channel={video.channel} />
        ))}
    </div>
  );
};

export default SubscriptionList;
