import getCurrentChannel from "@/actions/getCurrentChannel";
import { NextResponse } from "next/server";
import prisma from "@/vendor/db";
interface IVideoParams {
  videoId: string;
}

export async function DELETE(_: Request, { params }: { params: IVideoParams }) {
  const { videoId } = params;
  const currentChannel = await getCurrentChannel();
  if (!currentChannel) {
    return NextResponse.error();
  }
  const video = await prisma.video.delete({
    where: {
      id: videoId,
    },
  });
  return NextResponse.json({ video });
}
