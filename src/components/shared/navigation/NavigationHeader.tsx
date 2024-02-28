"use client";
import React from "react";
import { MdMenu } from "react-icons/md";
import IconButton from "../IconButton";
import Logo from "../Logo";

const NavigationHeader = () => {
  return (
    <div className="flex flex-row items-center">
      <IconButton>
        <MdMenu className="h-6 w-6" />
      </IconButton>
      <Logo className="w-6 h-6 text-white" />
    </div>
  );
};

export default NavigationHeader;
