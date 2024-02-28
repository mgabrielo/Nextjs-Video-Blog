import { Channel } from "@prisma/client";
import prisma from "@/vendor/db";
import { NextResponse } from "next/server";
interface IGetChannelById {
  id: string;
}

export default async function getChannelById(
  params: IGetChannelById
): Promise<Channel | null> {
  try {
    const { id } = params;
    const query: any = {};
    if (id) {
      query.id = id;
    }

    const channel = await prisma.channel.findFirst({
      where: query,
    });
    return channel;
  } catch (error: any) {
    throw new Error(error);
  }
}
