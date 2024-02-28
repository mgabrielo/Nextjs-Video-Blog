import getCurrentChannel from "@/actions/getCurrentChannel";
import { NextResponse } from "next/server";
import prisma from "@/vendor/db";
export async function POST(request: Request) {
  const currentChannel = await getCurrentChannel();
  if (!currentChannel) {
    return NextResponse.error();
  }

  const { id, title, description, videoSrc, thumbnailSrc } =
    await request.json();
  const video = await prisma.video.create({
    data: {
      title,
      description,
      videoSrc,
      thumbnailSrc,
      id,
      channelId: currentChannel?.id,
    },
  });
  return NextResponse.json(video);
}
