import { useState, useEffect } from "react";

export const useCanHover = () => {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);

    const listener = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", listener);

    return () => mq.removeEventListener("change", listener);
  }, []);

  return canHover;
};
