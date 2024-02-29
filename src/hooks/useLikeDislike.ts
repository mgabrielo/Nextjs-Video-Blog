import { CurrentUserContext } from "@/context/CurrentUserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo } from "react";
import { toast } from "react-hot-toast";

interface IUseLikeDislike {
  videoId: string;
}
export enum LikeDislikeStatus {
  Liked = 1,
  Disliked = 2,
  None = 3,
}
export const useLikeDislike = ({ videoId }: IUseLikeDislike) => {
  const currentUser = useContext(CurrentUserContext);
  const router = useRouter();

  const likeDislikeStatus = useMemo(() => {
    if (!currentUser || !videoId) {
      return false;
    }
    const likeVideoIds = currentUser?.likedVideoIds;
    const disLikedVideoIds = currentUser?.dislikedVideoIds;
    if (likeVideoIds.includes(videoId)) {
      return LikeDislikeStatus.Liked;
    } else if (disLikedVideoIds.includes(videoId)) {
      return LikeDislikeStatus.Disliked;
    } else {
      return LikeDislikeStatus.None;
    }
  }, [currentUser, videoId, LikeDislikeStatus]);

  const toggleLikeDislike = useCallback(
    async (action: "like" | "dislike") => {
      if (!currentUser) {
        toast.error("Please sign in to like or dislike");
        return;
      } else if (!videoId) {
        return;
      }
      try {
        if (action === "like" && likeDislikeStatus) {
          switch (likeDislikeStatus) {
            case LikeDislikeStatus.Liked:
              await axios.delete(`/api/videos/${videoId}/like`);
              break;
            case LikeDislikeStatus.Disliked:
              await axios.delete(`/api/videos/${videoId}/dislike`).then(() => {
                axios.post(`/api/videos/${videoId}/like`);
              });
              break;
            default:
              await axios.post(`/api/videos/${videoId}/like`);
              break;
          }
        } else if (action === "dislike" && likeDislikeStatus) {
          switch (likeDislikeStatus) {
            case LikeDislikeStatus.Liked:
              await axios.delete(`/api/videos/${videoId}/like`).then(() => {
                axios.post(`/api/videos/${videoId}/dislike`);
              });
              break;
            case LikeDislikeStatus.Disliked:
              await axios.delete(`/api/videos/${videoId}/dislike`);
              break;
            default:
              await axios.post(`/api/videos/${videoId}/dislike`);
              break;
          }
        } else {
          return;
        }
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went Wrong");
      }
    },
    [currentUser, videoId, router, likeDislikeStatus]
  );
  return { toggleLikeDislike, likeDislikeStatus };
};
