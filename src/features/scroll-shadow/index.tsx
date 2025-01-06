import useScrollShadow2 from "@/hooks/use-scroll-shadow-2";
import { cn } from "@/lib/utils";
import { Card, Inset, Switch, Text } from "@radix-ui/themes";
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
      <Card>
        <Inset
          ref={listRef}
          className={cn(
            "relative h-[40rem] overflow-auto",
            topOverflowing && "border-t-4",
            bottomOverflowing && "border-b-4",
          )}
        >
          <div className="mx-auto w-full py-2">
            {items.map((item) => (
              <div
                key={item}
                className="hover:bg-gray-2 px-4 py-1 text-sm transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </Inset>
      </Card>
    </div>
  );
};

export default ScrollShadowDemo;
