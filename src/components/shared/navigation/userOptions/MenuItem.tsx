"use client";

import { FC, ReactNode } from "react";

interface MenuItemProps {
  logo: ReactNode;
  label: string;
  onClick?: () => void;
  rounded?: boolean;
  className?: string;
}
const MenuItem: FC<MenuItemProps> = ({
  logo,
  label,
  onClick,
  rounded = false,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center gap-2 hover:bg-neutral-700 p-2 cursor-pointer ${className} ${
        rounded && " rounded-lg"
      }`}
      onClick={onClick}
    >
      {logo}
      {label}
    </div>
  );
};

export default MenuItem;
