import { useState, useEffect } from "react";

type ReturnType = { width: number | null; height: number | null };

const useWindowSize = (): ReturnType => {
  const [windowSize, setWindowSize] = useState<ReturnType>({
    width: null,
    height: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
