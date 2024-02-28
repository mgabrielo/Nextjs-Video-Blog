"use client";
import { Channel } from "@prisma/client";
import { FC, PropsWithChildren, createContext } from "react";

export const CurrentChannelContext = createContext<Channel | null>(null);

interface CurrentChannelProviderProps {
  channel: Channel | null;
}

const CurrentChannelProvider: FC<
  PropsWithChildren<CurrentChannelProviderProps>
> = ({ children, channel }) => {
  return (
    <CurrentChannelContext.Provider value={channel}>
      {children}
    </CurrentChannelContext.Provider>
  );
};

export default CurrentChannelProvider;
