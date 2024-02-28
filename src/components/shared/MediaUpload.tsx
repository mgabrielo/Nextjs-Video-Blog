"use client";
import { CldUploadWidget } from "next-cloudinary";
import { ReactNode } from "react";

declare global {
  var cloudinary: any;
}

interface MediaUploadProps {
  onChange: (value: string) => void;
  children: ReactNode;
}
const MediaUpload = ({ children, onChange }: MediaUploadProps) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <CldUploadWidget
      uploadPreset="xnoifwz7"
      onSuccess={handleUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open()} className="inline-block">
            {children}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default MediaUpload;
