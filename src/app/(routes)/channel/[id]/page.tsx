import getChannelById from "@/actions/getChannelById";
import getVideoByChannelById from "@/actions/getVideosByChannelId";
import ChannelHeader from "@/components/channel/ChannelHeader";
import ChannelVideoGrid from "@/components/channel/ChannelVideoGrid";

interface IChannelPageParams {
  id?: string;
}
export default async function page({ params }: { params: IChannelPageParams }) {
  const { id } = params;
  const channel = id && (await getChannelById({ id }));
  const videos = id && (await getVideoByChannelById({ id }));

  return (
    <>
      {channel ? (
        <div className="flex flex-col min-h-screen w-full">
          <ChannelHeader
            channel={channel}
            videoCount={videos?.length as number}
          />
          <div className="border-b-2 border-b-neutral-800 capitalize">
            <div className="border-b-2 border-b-neutral-400 w-24 mx-auto text-center px-5 py-2 md:mx-32">
              Videos
            </div>
          </div>
          <ChannelVideoGrid videos={videos || []} />
        </div>
      ) : (
        <h1>Channel Not Found</h1>
      )}
    </>
  );
}
