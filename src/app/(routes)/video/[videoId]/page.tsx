import getChannelById from "@/actions/getChannelById";
import getCommentsByVideoId from "@/actions/getCommentsVideoId";
import getRecommendedVideos from "@/actions/getRecommendedVideo";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";
import VideoCard from "@/components/shared/VideoCard";
import CommentSection from "@/components/video/CommentSection/CommentSection";
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
  const comments = await getCommentsByVideoId({ videoId });
  const recommendedVideos = await getRecommendedVideos({ video });
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
        {comments && videoId && (
          <CommentSection comments={comments} videoId={videoId} />
        )}
        {recommendedVideos
          ? recommendedVideos.map((recommendVideo) => (
              <VideoCard
                key={recommendVideo.id}
                isVertical={false}
                video={recommendVideo}
                channel={recommendVideo.channel}
                channelAvatar
              />
            ))
          : null}
      </div>
    </div>
  ) : (
    <h1> Video Not Found</h1>
  );
}
