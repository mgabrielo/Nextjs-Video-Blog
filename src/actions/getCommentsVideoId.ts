import { Channel, Comment } from "@prisma/client";
import prisma from "@/vendor/db";
interface IGetCommentVideoId {
  videoId?: string;
}

export default async function getCommentsByVideoId(
  params: IGetCommentVideoId
): Promise<(Comment & { channel: Channel })[] | null> {
  try {
    const { videoId } = params;
    const query: any = {};
    if (videoId) {
      query.videoId = videoId;
    }
    const comments = await prisma.comment.findMany({
      where: query,
      include: {
        channel: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return comments;
  } catch (error: any) {
    throw new Error(error);
  }
}
