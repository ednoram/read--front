import { useEffect, RefObject } from "react";

const useHideLongArticle = (
  divRef: RefObject<HTMLDivElement>,
  showingAll: boolean
): void => {
  useEffect(() => {
    if (divRef.current) {
      if (showingAll) {
        divRef.current.style.height = "";
        divRef.current.style.overflow = "";
      } else {
        divRef.current.style.height = "600px";
        divRef.current.style.overflow = "hidden";
      }
    }
  }, [showingAll, divRef.current?.clientHeight]);
};

export default useHideLongArticle;
