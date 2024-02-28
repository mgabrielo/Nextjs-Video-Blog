"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

type ModalState = {
  isOpen?: boolean;
  onOpen?: Function | any;
  onClose?: Function | any;
};
export const CreateChannelModalContext = createContext<ModalState | null>(null);

const ChannelModalProvider: FC<PropsWithChildren<ModalState>> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CreateChannelModalContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </CreateChannelModalContext.Provider>
  );
};

export default ChannelModalProvider;
