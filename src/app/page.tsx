import getTrendingVideos from "@/actions/getTrendingVideos";
import VideoCard from "@/components/shared/VideoCard";

export default async function Home() {
  const trendingVids = await getTrendingVideos();
  return (
    <div className="mx-12 sm:mx-20 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {trendingVids
        ? trendingVids.length > 0 &&
          trendingVids.map((trendVideo) => (
            <VideoCard
              key={trendVideo.id}
              video={trendVideo}
              channel={trendVideo.channel}
              channelAvatar
            />
          ))
        : "No videos Available"}
    </div>
  );
}
