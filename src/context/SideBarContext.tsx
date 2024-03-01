"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

type SidebarState = {
  isOpen?: boolean;
  onOpen?: Function | any;
  onClose?: Function | any;
};
export const SidebarContext = createContext<SidebarState | null>(null);

const SidebarProvider: FC<PropsWithChildren<SidebarState>> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
