"use client";
import Image from "next/image";
import React, { FC } from "react";

export enum AvatarSize {
  extraSmall = 24,
  small = 32,
  medium = 40,
  large = 120,
}

interface AvatarProps {
  className?: string;
  onClick?: () => void;
  size?: AvatarSize;
  imageSrc?: string | null;
}
const Avatar: FC<AvatarProps> = ({
  className,
  onClick,
  size = AvatarSize.medium,
  imageSrc,
}) => {
  return (
    <Image
      className={`rounded-full aspect-square object-cover ${
        onClick && "cursor-pointer"
      } ${className}`}
      alt="avatar"
      height={size}
      width={size}
      onClick={onClick}
      src={
        imageSrc ||
        ("https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" as string)
      }
    />
  );
};

export default Avatar;
