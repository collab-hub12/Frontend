import { useCallback, useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const useIsMobile = (required = true) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleScreenDimensions = useCallback(() => {
    if (typeof window !== undefined) {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    }
  }, []);

  useEffect(() => {
    handleScreenDimensions();
    if (required) window.addEventListener("resize", handleScreenDimensions);
    if (!required) window.removeEventListener("resize", handleScreenDimensions);

    return () => {
      window.removeEventListener("resize", handleScreenDimensions);
    };
  }, [required]);

  return isMobile;
};

export default useIsMobile;
