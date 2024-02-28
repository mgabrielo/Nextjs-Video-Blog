"use client";

import Button from "@/components/shared/Button";
import UploadVideoModal from "@/components/shared/modals/UploadVideoModal";
import VideoPreview from "@/components/stuidio/upload/VideoPreview";
import VideoUploadForm from "@/components/stuidio/upload/VideoUploadForm";
import { UploadVideoModalContext } from "@/context/UploadVideoModalContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuid } from "uuid";

export default function UploadPage() {
  useProtectedRoute();
  const router = useRouter();
  const uploadVideoModal = useContext(UploadVideoModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const videoId = useMemo(() => {
    const buffer = Buffer.alloc(12);
    return uuid({}, buffer).toString("hex");
  }, []);
  useEffect(() => {
    uploadVideoModal?.onOpen();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      videoSrc: "",
    },
  });
  const thumbnailSrc: string = watch("thumbnailSrc");
  const videoSrc: string = watch("videoSrc");
  const changeValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await axios
      .post("/api/videos", data)
      .then((res) => {
        console.log(res.data);
        toast.success("Video Publish Successful");
        router.push("/studio");
      })
      .catch(() => {
        toast.error("could not publish video");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className=" flex flex-col min-h-screen w-full p-3">
      {uploadVideoModal?.isOpen ? (
        <UploadVideoModal
          onUpload={(value) => changeValue("videoSrc", value)}
        />
      ) : null}
      <div className="flex flex-col px-8 pt-4">
        <div className="flex justify-between">
          <h1 className="text-2xl"> Video Details</h1>
          <span className="flex gap-4">
            <Button type="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="box" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </span>
        </div>
        <div className="mt-6 flex flex-col md:flex-row gap-4 md:gap-2">
          <VideoUploadForm
            register={register}
            errors={errors}
            changeValue={changeValue}
            thumbnailSrc={thumbnailSrc}
            isLoading={isLoading}
          />
          <VideoPreview videoSrc={videoSrc} videoId={videoId} />
        </div>
      </div>
    </div>
  );
}
