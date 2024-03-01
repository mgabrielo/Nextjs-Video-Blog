import { CreateChannelModalContext } from "@/context/ChannelModalContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-hot-toast";

interface UseCommentProps {
  videoId: string | null;
}

export const useComment = ({ videoId }: UseCommentProps) => {
  const currentChannel = useContext(CurrentChannelContext);
  const currentUser = useContext(CurrentUserContext);
  const router = useRouter();
  const createChannelModal = useContext(CreateChannelModalContext);

  const [text, setText] = useState("");
  const submitComment = useCallback(async () => {
    if (!currentUser) {
      toast.error("sign in to comment");
      return;
    }

    if (!currentChannel) {
      createChannelModal?.onOpen();
      return;
    }
    if (!videoId) {
      return;
    }

    const data = { videoId, text, channelId: currentChannel?.id };

    try {
      if (text.trim()) {
        await axios
          .post(`/api/comments/${videoId}`, data)
          .then(() => setText(" "));
        router.refresh();
        toast.success("Comment Successfully added");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  }, [
    createChannelModal,
    currentChannel,
    currentUser,
    videoId,
    text,
    setText,
    router,
  ]);

  return { text, setText, submitComment };
};
