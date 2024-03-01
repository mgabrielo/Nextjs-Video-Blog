"use client";
import React, { useContext } from "react";
import { MdMenu } from "react-icons/md";
import IconButton from "../IconButton";
import Logo from "../Logo";
import { SidebarContext } from "@/context/SideBarContext";

const NavigationHeader = () => {
  const sidebar = useContext(SidebarContext);
  return (
    <div className="flex flex-row items-center">
      <IconButton
        onClick={() =>
          sidebar?.isOpen ? sidebar.onClose() : sidebar?.onOpen()
        }
      >
        <MdMenu className="h-6 w-6" />
      </IconButton>
      <Logo className="w-6 h-6 text-white" />
    </div>
  );
};

export default NavigationHeader;
