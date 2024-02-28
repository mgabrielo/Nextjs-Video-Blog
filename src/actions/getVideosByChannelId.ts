import { Video } from "@prisma/client";
import prisma from "@/vendor/db";
import { NextResponse } from "next/server";
interface IGetVideoByChannelById {
  id: string;
}

export default async function getVideoByChannelById(
  params: IGetVideoByChannelById
): Promise<Video[]> {
  try {
    const { id } = params;
    const query: any = {};
    if (id) {
      query.channelId = id;
    }

    const videos = await prisma.video.findMany({
      where: query,
    });
    return videos || [];
  } catch (error: any) {
    throw new Error(error);
  }
}
