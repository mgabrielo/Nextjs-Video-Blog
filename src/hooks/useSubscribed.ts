import { CurrentUserContext } from "@/context/CurrentUserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo } from "react";
import { toast } from "react-hot-toast";

interface ISubscribedProps {
  id: any;
}

export const useSubscribed = ({ id }: ISubscribedProps) => {
  const router = useRouter();
  const currentUser = useContext(CurrentUserContext);

  const hasSubscribed = useMemo(() => {
    if (!currentUser) {
      return false;
    }
    const subscriptions = currentUser?.subscribedChannelIds;
    if (id) {
      return subscriptions.includes(id);
    }
  }, [currentUser, id]);

  const toggleSubscribed = useCallback(async () => {
    if (!currentUser) {
      toast.error("please sign in to subscribe");
      return;
    }
    try {
      if (id) {
        if (hasSubscribed) {
          await axios.put("/api/users/subscriptions", {
            data: { id },
          });
        } else {
          await axios.post("/api/users/subscriptions", {
            data: { id },
          });
        }
      }
      router.refresh();
      toast.success(
        hasSubscribed ? "Unsubcribed Successfully" : "Subscribed Successfully"
      );
    } catch (error) {
      toast.error(
        hasSubscribed ? "could not unsubscribe" : "could not subscribe"
      );
    }
  }, [currentUser, hasSubscribed, router, id]);

  return { hasSubscribed, toggleSubscribed };
};
