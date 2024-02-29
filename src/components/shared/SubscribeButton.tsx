import { useSubscribed } from "@/hooks/useSubscribed";
import Button from "./Button";
import { useContext } from "react";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";

interface ISubscribeButton {
  id: string;
}

const SubscribeButton = ({ id }: ISubscribeButton) => {
  const { hasSubscribed, toggleSubscribed } = useSubscribed({
    id,
  });

  return (
    <Button
      className={`text-md capitalize ${
        hasSubscribed ? "text-neutral-200" : "text-neutral-600"
      }`}
      type={hasSubscribed ? "rounded-dark" : "rounded"}
      onClick={toggleSubscribed}
    >
      {hasSubscribed ? "Subscribed" : "Suscribe"}
    </Button>
  );
};

export default SubscribeButton;
