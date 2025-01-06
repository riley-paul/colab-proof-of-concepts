import useScrollShadow2 from "@/hooks/use-scroll-shadow-2";
import { cn } from "@/lib/utils";
import { Switch, Text } from "@radix-ui/themes";
import React from "react";

const ScrollShadowDemo: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const { bottomOverflowing, topOverflowing } = useScrollShadow2(listRef);

  const items = Array.from({ length: isOverflowing ? 100 : 10 }, (_, i) => i);

  React.useEffect(() => {
    console.log("topOverflowing", topOverflowing);
    console.log("bottomOverflowing", bottomOverflowing);
  }, [topOverflowing, bottomOverflowing]);

  return (
    <div className="flex h-screen items-center justify-center bg-sky-100">
      <div className="grid w-full max-w-screen-sm gap-2">
        <Text
          as="label"
          className="flex items-center gap-2"
          size="2"
          weight="medium"
        >
          <Switch checked={isOverflowing} onCheckedChange={setIsOverflowing} />
          Overflowing list
        </Text>
        <div
          ref={listRef}
          className={cn(
            "relative h-[40rem] overflow-auto rounded-lg border-sky-600 bg-card shadow-md",
            topOverflowing && "border-t-4",
            bottomOverflowing && "border-b-4",
          )}
        >
          <div className="mx-auto w-full max-w-screen-sm py-2">
            {items.map((item) => (
              <div
                key={item}
                className="px-4 py-1 text-sm transition-colors hover:bg-gray-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollShadowDemo;
