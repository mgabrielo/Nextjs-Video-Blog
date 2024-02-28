import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

interface IUseProtectedRoutes {
  checkChannel?: boolean;
}

export const useProtectedRoute = ({
  checkChannel = true,
}: IUseProtectedRoutes = {}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentChannel = useContext(CurrentChannelContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser && (!currentChannel || checkChannel)) {
      router.push("/");
    }
  }, [checkChannel, currentChannel, currentUser, router]);
};
