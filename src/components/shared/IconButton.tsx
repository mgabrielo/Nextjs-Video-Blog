"use client";

import { FC, MouseEventHandler, PropsWithChildren } from "react";

interface IconButtonProps {
  classname?: String;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const IconButton: FC<PropsWithChildren<IconButtonProps>> = ({
  children,
  classname = "",
  onClick,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-full p-2 hover:bg-neutral-800 ${classname}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconButton;
