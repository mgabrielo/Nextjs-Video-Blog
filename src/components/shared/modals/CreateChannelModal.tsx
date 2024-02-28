"use client";
import { useContext, useState } from "react";
import Avatar, { AvatarSize } from "../Avatar";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import MediaUpload from "../MediaUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateChannelModalContext } from "@/context/ChannelModalContext";

const CreateChannelModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const createChannelModal = useContext(CreateChannelModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      handle: "",
      imageSrc: "",
    },
  });
  const imageSrc = watch("imageSrc");
  const handleImageUpload = (value: string) => {
    setValue("imageSrc", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await axios
      .post("/api/channels", data)
      .then((res) => {
        toast.success("channel created successfully");
        reset({});
        createChannelModal?.onClose();
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("channel Not created successfully");
      })
      .finally(() => setIsLoading(false));
  };
  return createChannelModal?.isOpen ? (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between z-50 bg-zinc-800 w-3/5 max-w-zxl rounded-xl">
      <h1 className="text-xl text-center p-3 border-b border-neutral-700 ">
        How you will appear{" "}
      </h1>
      <div className="flex flex-col items-center py-3 gap-4">
        <Avatar size={AvatarSize.large} imageSrc={imageSrc} />
        <MediaUpload onChange={handleImageUpload}>
          <Button type="primary">Upload Picture</Button>
        </MediaUpload>

        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required={true}
          pattern={{
            value: /^[a-zA-Z0-9 ]*$/,
            message: "Invalid Name",
          }}
          className="w-3/4"
          placeholder="Name"
        />
        <Input
          id="handle"
          label="Handle"
          disabled={isLoading}
          register={register}
          errors={errors}
          required={true}
          pattern={{
            value: /^[a-z0-9_-]{3,16}$/,
            message: "Invalid Handle Format",
          }}
          className="w-3/4"
          placeholder="Handle"
        />
        <div className="p-2 border-t border-neutral-700 flex justify-end gap-3">
          <Button type="secondary" onClick={createChannelModal.onClose}>
            {" "}
            Cancel{" "}
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating ..." : " Create Channel"}
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateChannelModal;
