"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";

type ModalState = {
  isOpen?: boolean;
  onOpen?: Function | any;
  onClose?: Function | any;
};
export const UploadVideoModalContext = createContext<ModalState | null>(null);

const UploadVideoModalProvider: FC<PropsWithChildren<ModalState>> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UploadVideoModalContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </UploadVideoModalContext.Provider>
  );
};

export default UploadVideoModalProvider;
