import React, { useEffect, useState } from "react";

type Props = {
  containerRef: React.RefObject<HTMLElement>;
};

const ScrollShadows: React.FC<Props> = ({ containerRef }) => {
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const checkOverflow = () => {
    const container = containerRef.current;
    if (!container) return;

    const isTopOverflowing = container.scrollTop > 0;
    const isBottomOverflowing =
      container.scrollHeight > container.clientHeight + container.scrollTop;

    setShowTopShadow(isTopOverflowing);
    setShowBottomShadow(isBottomOverflowing);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check overflow on mount and on scroll
    checkOverflow();
    container.addEventListener("scroll", checkOverflow);

    // Cleanup
    return () => {
      container.removeEventListener("scroll", checkOverflow);
    };
  }, []);

  return (
    <>
      {showTopShadow && (
        <div className="from-panel-solid pointer-events-none absolute left-0 right-0 top-0 h-12 bg-gradient-to-b from-20%" />
      )}
      {showBottomShadow && (
        <div className="from-panel-solid pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-20%" />
      )}
    </>
  );
};

export default ScrollShadows;
