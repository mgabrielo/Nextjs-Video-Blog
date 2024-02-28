"use client";

import { MouseEventHandler, ReactNode, useMemo } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "primary" | "secondary" | "box" | "rounded" | "rounded-dark";
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
};

const Button = ({
  children,
  type,
  className,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const typeClassName = useMemo(() => {
    switch (type) {
      case "primary":
        return "text-sm text-blue-400 uppercase";
      case "secondary":
        return "text-sm text-neutral-400 uppercase";
      case "box":
        return "text-blue-900 uppercase font-medium bg-sky-500 rounded-sm px-4 py-2";
      case "rounded":
        return "text-blue-400 uppercase font-medium bg-zinc-300 rounded-full px-3 py-2";
      case "rounded-dark":
        return "text-white uppercase font-medium bg-neutral-800 rounded-full px-3 py-2";
      default:
        return "";
    }
  }, [type]);
  return (
    <button
      onClick={onClick}
      className={`${typeClassName} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
