import { Channel, Video } from "@prisma/client";
import prisma from "@/vendor/db";

export default async function getTrendingVideos(): Promise<
  (Video & { channel: Channel })[]
> {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const videos = await prisma.video.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        channel: true,
      },
      orderBy: [
        {
          viewCount: "desc",
        },
      ],
      take: 50,
    });
    return videos;
  } catch (error: any) {
    throw new Error(error);
  }
}
