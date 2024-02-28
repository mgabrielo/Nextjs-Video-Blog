"use client";
import { User } from "@prisma/client";
import { FC, PropsWithChildren, createContext } from "react";

export const CurrentUserContext = createContext<User | null>(null);

interface CurrentUserProviderProps {
  user: User | null;
}

const CurrentUserProvider: FC<PropsWithChildren<CurrentUserProviderProps>> = ({
  children,
  user,
}) => {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
