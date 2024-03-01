import getCurrentChannel from "@/actions/getCurrentChannel";
import getVideoByChannelById from "@/actions/getVideosByChannelId";
import AnalyticsSummary from "@/components/studio/AnalyticsSummary";
import VideoDetailsCard from "@/components/studio/VideoDetailsCard";
import React from "react";

const page = async () => {
  const currentChannel = await getCurrentChannel();
  const videos =
    currentChannel && (await getVideoByChannelById({ id: currentChannel?.id }));

  return (
    <div className="flex flex-col w-full h-full p-8">
      {videos && <AnalyticsSummary videos={videos} />}
      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-2xl">Videos</h2>
        {videos && videos.length > 0
          ? videos.map((video) => (
              <VideoDetailsCard key={video.id} video={video} />
            ))
          : "Upload Videos To Get Started"}
      </div>
    </div>
  );
};

export default page;
