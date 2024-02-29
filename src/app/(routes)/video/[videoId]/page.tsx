import getChannelById from "@/actions/getChannelById";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";
import LikeSubscribeSection from "@/components/video/LikeSubscribeSection/LikeSubscribeSection";
import Description from "@/components/video/VideoDescription";
import VideoPlayer from "@/components/video/VideoPlayer";

interface IVideoPage {
  videoId?: string;
}
export default async function page({ params }: { params: IVideoPage }) {
  const { videoId } = params;
  const video = await increaseVideoViewCount({ videoId });
  const channel =
    video?.channelId && (await getChannelById({ id: video?.channelId }));
  return video ? (
    <div className="flex flex-col lg:flex-row mx-6 mt-4 gap-4">
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        <VideoPlayer videoSrc={video.videoSrc} />
        <h1 className="text-2xl font-medium break-all">{video.title}</h1>
        {video && channel && (
          <LikeSubscribeSection video={video} channel={channel} />
        )}
      </div>
      <div className="w-full lg:w-1/4 flex flex-col gap-4 pb-4">
        <Description video={video} />
      </div>
    </div>
  ) : (
    <h1> Video Not Found</h1>
  );
}
