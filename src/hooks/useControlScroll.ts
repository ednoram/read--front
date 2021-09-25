import { useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

const useControlScroll = (
  restrictScroll: boolean,
  setRestrictScroll: Dispatch<SetStateAction<boolean>>
): void => {
  const router = useRouter();

  useEffect(() => {
    setRestrictScroll(false);
  }, [router]);

  useEffect(() => {
    if (restrictScroll) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [restrictScroll]);

  useEffect(() => {
    return () => enableBodyScroll();
  }, []);

  const disableBodyScroll = () => {
    const body = document.querySelector("body");

    if (body?.style) {
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.position = "relative";
    }
  };

  const enableBodyScroll = () => {
    const body = document.querySelector("body");

    if (body?.style) {
      body.style.position = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }
  };
};

export default useControlScroll;
