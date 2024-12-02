import React from "react";
import { useEventListener } from "usehooks-ts";

export default function useScrollShadow2(
  listRef: React.RefObject<HTMLElement>,
) {
  const [topOverflowing, setTopOverflowing] = React.useState(false);
  const [bottomOverflowing, setBottomOverflowing] = React.useState(false);

  const handleScroll = () => {
    const element = listRef.current;
    if (!element) return;

    const { clientHeight, scrollHeight, scrollTop } = element;

    setTopOverflowing(scrollTop > 0);
    setBottomOverflowing(scrollTop < scrollHeight - clientHeight);
  };

  // Do not add a dependency array to this effect
  React.useEffect(() => {
    handleScroll();
  });

  // Attach the scroll event listener
  // react-use has a similar hook
  useEventListener("scroll", handleScroll, listRef);

  return { topOverflowing, bottomOverflowing };
}
