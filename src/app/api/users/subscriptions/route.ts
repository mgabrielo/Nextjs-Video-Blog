import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/vendor/db";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const data = await request.json();
  console.log();
  await prisma.channel.update({
    where: {
      id: data?.data?.id,
    },
    data: {
      subscriberCount: { increment: 1 },
    },
  });
  const subscribedChannels = currentUser.subscribedChannelIds;
  subscribedChannels.push(data?.data?.id);
  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      subscribedChannelIds: subscribedChannels,
    },
  });
  return NextResponse.json(updatedUser);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const data = await request.json();
  const subscribedChannels = currentUser.subscribedChannelIds;

  if (subscribedChannels.includes(data?.data?.id)) {
    await prisma.channel.update({
      where: {
        id: data?.data?.id,
      },
      data: {
        subscriberCount: { decrement: 1 },
      },
    });
  }
  const updatedChannels = subscribedChannels.filter(
    (channelIds) => channelIds !== data?.data?.id
  );
  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      subscribedChannelIds: updatedChannels,
    },
  });
  return NextResponse.json(updatedUser);
}
